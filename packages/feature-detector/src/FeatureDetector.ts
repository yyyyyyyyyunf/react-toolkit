import { defaultDetectorConfig, defaultFeatureConfigs } from "./defaults";
import type {
	BrowserInfo,
	BrowserName,
	BrowserPattern,
	BrowserSupport,
	DetectionResult,
	DetectorConfig,
	DetectorInfo,
	FeatureConfig,
	FeatureConfigMap,
	FeatureDetectorOptions,
} from "./types";
import { compareVersions } from "./utils";

/**
 * 特性检测器类
 * @description 用于检测浏览器对特定特性的支持情况
 * @template T 特性配置映射类型
 * @example
 * ```typescript
 * // 基本使用
 * const detector = new FeatureDetector({
 *   'webp': {
 *     browsers: { chrome: '32', firefox: '65' },
 *     runtimeTest: () => document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0
 *   }
 * });
 *
 * const result = detector.detect('webp');
 * console.log(result.supported); // true/false
 * ```
 */
export class FeatureDetector<T extends FeatureConfigMap = FeatureConfigMap> {
	/** 检测结果缓存 */
	private cache: Map<string, DetectionResult> = new Map();
	/** 特性配置映射 */
	private featureConfig: T;
	/** 动态添加的特性配置 */
	private dynamicFeatures: Map<string, FeatureConfig> = new Map();

	/** 是否启用缓存 */
	private readonly useCache: boolean;
	/** 是否启用运行时检测 */
	private readonly enableRuntimeTest: boolean;

	/** 浏览器模式匹配规则 */
	private readonly browserPatterns: BrowserPattern[];
	/** 版本号提取配置 */
	private readonly versionExtraction: Required<DetectorConfig>["versionExtraction"];
	/** WebView 浏览器列表 */
	private readonly webViewBrowsers: BrowserName[];

	/**
	 * 创建特性检测器实例
	 * @param initialConfig 初始特性配置
	 * @param detectorConfig 检测器配置选项
	 * @example
	 * ```typescript
	 * const detector = new FeatureDetector(
	 *   { 'webp': { browsers: { chrome: '32' } } },
	 *   { useCache: true, enableRuntimeTest: true }
	 * );
	 * ```
	 */
	constructor(initialConfig: T, detectorConfig: FeatureDetectorOptions = {}) {
		this.featureConfig = { ...initialConfig };

		// 自动检测运行环境
		const isBrowser =
			typeof window !== "undefined" && typeof document !== "undefined";
		this.useCache = detectorConfig.useCache ?? isBrowser;
		this.enableRuntimeTest = detectorConfig.enableRuntimeTest ?? isBrowser;

		// 合并配置，使用默认值作为后备
		this.browserPatterns =
			detectorConfig.browserPatterns || defaultDetectorConfig.browserPatterns;
		this.versionExtraction = {
			...defaultDetectorConfig.versionExtraction,
			...detectorConfig.versionExtraction,
		};
		this.webViewBrowsers =
			detectorConfig.webViewBrowsers || defaultDetectorConfig.webViewBrowsers;
	}

	/**
	 * 检测特性支持情况
	 * @description 返回详细的检测结果，包含支持状态、检测方法、置信度等信息
	 * @param featureOrFeatures 要检测的特性名称或特性名称数组
	 * @param ua 用户代理字符串，可选（不提供时使用当前环境的 navigator.userAgent）
	 * @returns 检测结果对象或结果对象数组
	 * @example
	 * ```typescript
	 * // 检测单个特性
	 * const result = detector.detect('webp', 'Mozilla/5.0...');
	 * console.log(result.supported); // true/false
	 * console.log(result.method); // 'ua-only' | 'runtime-only' | 'ua-runtime' | 'runtime-ua'
	 * console.log(result.confidence); // 'high' | 'medium' | 'low'
	 *
	 * // 检测多个特性
	 * const results = detector.detect(['webp', 'avif'], 'Mozilla/5.0...');
	 * results.forEach(result => console.log(result.supported));
	 * ```
	 */
	detect<K extends keyof T | string>(feature: K, ua: string): DetectionResult;
	detect<K extends keyof T | string>(
		features: K[],
		ua: string,
	): DetectionResult[];
	detect<K extends keyof T | string>(
		featureOrFeatures: K | K[],
		ua: string,
	): DetectionResult | DetectionResult[] {
		if (Array.isArray(featureOrFeatures)) {
			return featureOrFeatures.map((feature) => this.detectSingle(feature, ua));
		}
		return this.detectSingle(featureOrFeatures, ua);
	}

	/**
	 * 快速检测特性支持情况
	 * @description 只返回是否支持的布尔值，性能更好
	 * @param featureOrFeatures 要检测的特性名称或特性名称数组
	 * @param ua 用户代理字符串，可选
	 * @returns 是否支持的布尔值或布尔值数组
	 * @example
	 * ```typescript
	 * // 检测单个特性
	 * const supported = detector.check('webp', 'Mozilla/5.0...');
	 * if (supported) {
	 *   // 使用 WebP 格式
	 * }
	 *
	 * // 检测多个特性
	 * const [webpSupported, avifSupported] = detector.check(['webp', 'avif'], 'Mozilla/5.0...');
	 * ```
	 */
	check<K extends keyof T | string>(feature: K, ua: string): boolean;
	check<K extends keyof T | string>(features: K[], ua: string): boolean[];
	check<K extends keyof T | string>(
		featureOrFeatures: K | K[],
		ua: string,
	): boolean | boolean[] {
		if (Array.isArray(featureOrFeatures)) {
			return featureOrFeatures.map(
				(feature) => this.detectSingle(feature, ua).supported,
			);
		}
		return this.detectSingle(featureOrFeatures, ua).supported;
	}

	/**
	 * 批量检测特性并返回对象格式
	 * @description 将检测结果以对象形式返回，键为特性名称，值为检测结果
	 * @param features 要检测的特性名称数组
	 * @param ua 用户代理字符串
	 * @returns 特性名称到检测结果的映射对象
	 * @example
	 * ```typescript
	 * const results = detector.detectAsRecord(['webp', 'avif'], 'Mozilla/5.0...');
	 * console.log(results.webp.supported); // true/false
	 * console.log(results.avif.supported); // true/false
	 * ```
	 */
	detectAsRecord<K extends keyof T | string>(
		features: K[],
		ua: string,
	): Record<K, DetectionResult> {
		const results = {} as Record<K, DetectionResult>;
		for (const feature of features) {
			results[feature] = this.detectSingle(feature, ua);
		}
		return results;
	}

	/**
	 * 批量检测特性并返回布尔值对象格式
	 * @description 将检测结果以对象形式返回，键为特性名称，值为是否支持的布尔值
	 * @param features 要检测的特性名称数组
	 * @param ua 用户代理字符串
	 * @returns 特性名称到支持状态的映射对象
	 * @example
	 * ```typescript
	 * const support = detector.checkAsRecord(['webp', 'avif'], 'Mozilla/5.0...');
	 * if (support.webp) {
	 *   // 使用 WebP 格式
	 * } else if (support.avif) {
	 *   // 使用 AVIF 格式
	 * }
	 * ```
	 */
	checkAsRecord<K extends keyof T | string>(
		features: K[],
		ua: string,
	): Record<K, boolean> {
		const results = {} as Record<K, boolean>;
		for (const feature of features) {
			results[feature] = this.detectSingle(feature, ua).supported;
		}
		return results;
	}

	/**
	 * 动态注册特性配置
	 * @description 在运行时添加或更新特性配置，支持动态扩展检测能力
	 * @param name 特性名称
	 * @param config 特性配置
	 * @example
	 * ```typescript
	 * detector.registerFeature('custom-feature', {
	 *   browsers: { chrome: '90' },
	 *   runtimeTest: () => 'customAPI' in window
	 * });
	 *
	 * const supported = detector.check('custom-feature');
	 * ```
	 */
	registerFeature(name: string, config: FeatureConfig): void {
		const isUpdate =
			this.dynamicFeatures.has(name) || name in this.featureConfig;

		this.dynamicFeatures.set(name, config);

		// 只有更新已存在的特性时，才清除该特性相关的缓存
		if (isUpdate && this.useCache) {
			this.clearFeatureCache(name);
		}
	}

	/**
	 * 移除动态注册的特性配置
	 * @description 移除通过 registerFeature 添加的特性配置
	 * @param name 要移除的特性名称
	 * @returns 是否成功移除
	 * @example
	 * ```typescript
	 * const removed = detector.removeFeature('custom-feature');
	 * if (removed) {
	 *   console.log('特性配置已移除');
	 * }
	 * ```
	 */
	removeFeature(name: string): boolean {
		const removed = this.dynamicFeatures.delete(name);
		if (removed && this.useCache) {
			this.clearFeatureCache(name);
		}
		return removed;
	}

	/**
	 * 清除所有检测结果缓存
	 * @description 清空所有缓存的检测结果，下次检测将重新计算
	 * @example
	 * ```typescript
	 * detector.clearCache();
	 * // 下次调用 detect 或 check 时将重新计算
	 * ```
	 */
	clearCache(): void {
		this.cache.clear();
	}

	/**
	 * 获取检测器状态信息
	 * @description 返回检测器的当前运行状态和统计信息
	 * @returns 检测器状态信息对象
	 * @example
	 * ```typescript
	 * const status = detector.getStatus();
	 * console.log(`缓存大小: ${status.cacheSize}`);
	 * console.log(`动态特性数量: ${status.dynamicFeaturesCount}`);
	 * console.log(`启用缓存: ${status.useCache}`);
	 * console.log(`启用运行时检测: ${status.enableRuntimeTest}`);
	 * ```
	 */
	getStatus(): DetectorInfo {
		// 检测当前浏览器信息
		const currentUA =
			typeof navigator !== "undefined" ? navigator.userAgent : "";
		const browserInfo = currentUA ? this.detectBrowser(currentUA) : null;

		return {
			useCache: this.useCache,
			enableRuntimeTest: this.enableRuntimeTest,
			cacheSize: this.cache.size,
			dynamicFeaturesCount: this.dynamicFeatures.size,
			browserInfo,
		};
	}

	// 内部实现方法
	private detectSingle<K extends keyof T | string>(
		feature: K,
		ua: string,
	): DetectionResult {
		const cacheKey = `${String(feature)}_${ua}`;

		if (this.useCache && this.cache.has(cacheKey)) {
			return this.cache.get(cacheKey)!;
		}

		const config = this.getFeatureConfig(feature);
		if (!config) {
			console.warn(`Feature "${String(feature)}" is not configured`);
			return {
				supported: false,
				method: "ua-only",
				uaSupport: false,
				runtimeSupport: null,
				confidence: "high",
			};
		}

		let result: DetectionResult;

		if (!this.enableRuntimeTest || !config.runtimeTest) {
			const uaSupport = this.checkByUA(String(feature), ua, config);
			result = {
				supported: uaSupport,
				method: "ua-only",
				uaSupport: uaSupport,
				runtimeSupport: null,
				confidence: "high",
			};
		} else {
			result = this.doubleCheck(String(feature), ua, config);
		}

		if (this.useCache) {
			this.cache.set(cacheKey, result);
		}

		return result;
	}

	private getFeatureConfig(feature: string | keyof T): FeatureConfig | null {
		return (
			this.dynamicFeatures.get(String(feature)) ||
			this.featureConfig[feature as keyof T] ||
			null
		);
	}

	private checkByUA(
		_feature: string,
		ua: string,
		config: FeatureConfig,
	): boolean {
		const browserInfo = this.detectBrowser(ua);
		if (!browserInfo) return false;

		// 使用统一的浏览器支持检查
		return this.checkBrowserSupport(browserInfo, config.browsers);
	}

	private doubleCheck(
		feature: string,
		ua: string,
		config: FeatureConfig,
	): DetectionResult {
		const uaSupport = this.checkByUA(feature, ua, config);

		try {
			const runtimeSupport = config.runtimeTest?.();

			if (uaSupport && runtimeSupport) {
				return {
					supported: true,
					method: "ua-runtime",
					uaSupport: true,
					runtimeSupport: true,
					confidence: "high",
				};
			}
			if (!uaSupport && !runtimeSupport) {
				return {
					supported: false,
					method: "ua-runtime",
					uaSupport: false,
					runtimeSupport: false,
					confidence: "high",
				};
			}
			if (runtimeSupport) {
				return {
					supported: true,
					method: "runtime-ua",
					uaSupport: false,
					runtimeSupport: true,
					confidence: "medium",
				};
			}
			return {
				supported: false,
				method: "ua-runtime",
				uaSupport: true,
				runtimeSupport: false,
				confidence: "medium",
			};
		} catch (error) {
			console.error(`Runtime test failed for ${feature}:`, error);
			return {
				supported: uaSupport,
				method: "ua-only",
				uaSupport: uaSupport,
				runtimeSupport: null,
				confidence: "low",
			};
		}
	}

	public detectBrowser(ua: string): BrowserInfo | null {
		// 检测浏览器
		for (const pattern of this.browserPatterns) {
			// 尝试匹配每个pattern
			for (const regex of pattern.patterns) {
				const match = ua.match(regex);
				if (match) {
					// 特殊处理：safariWebview 需要排除 Chrome
					if (pattern.name === "safariWebview" && /chrome/i.test(ua)) {
						continue; // 跳过包含 Chrome 的 UA
					}

					const version = match[pattern.versionIndex || 1] || "0";
					let webkitVersion: string | undefined;

					// 对于 safariWebview，保存原始 WebKit 版本
					if (pattern.name === "safariWebview") {
						webkitVersion = version;
					}

					// 判断是否为 WebView
					const isWebView = this.webViewBrowsers.some(
						(name) => name === pattern.name,
					);

					return {
						name: pattern.name,
						version: this.normalizeVersion(version),
						isWebView,
						webkitVersion,
						userAgent: ua,
					};
				}
			}
		}

		return null;
	}

	private checkBrowserSupport(
		browserInfo: BrowserInfo,
		browsers: BrowserSupport,
	): boolean {
		const requiredVersion = browsers[browserInfo.name];

		if (requiredVersion === undefined) {
			return false;
		}

		if (requiredVersion === false) {
			return false;
		}

		return compareVersions(browserInfo.version, requiredVersion) >= 0;
	}

	private normalizeVersion(version: string): string {
		const match = this.versionExtraction.versionPattern
			? version.match(this.versionExtraction.versionPattern)
			: null;
		return match ? match[1] : "0";
	}

	private clearFeatureCache(feature: string): void {
		const prefix = `${feature}_`;
		for (const key of this.cache.keys()) {
			if (key.startsWith(prefix)) {
				this.cache.delete(key);
			}
		}
	}
}

/**
 * 创建特性检测器实例（工厂函数）
 * @description 使用默认配置创建特性检测器，支持自定义配置
 * @param config 自定义特性配置，将与默认配置合并
 * @param detectorConfig 检测器配置选项
 * @returns 特性检测器实例
 * @example
 * ```typescript
 * // 使用默认配置
 * const detector = createFeatureDetector();
 *
 * // 自定义特性配置
 * const detector = createFeatureDetector({
 *   'custom-feature': {
 *     browsers: { chrome: '90' },
 *     runtimeTest: () => 'customAPI' in window
 *   }
 * });
 *
 * // 自定义检测器配置
 * const detector = createFeatureDetector(undefined, {
 *   useCache: true,
 *   enableRuntimeTest: true
 * });
 * ```
 */
export function createFeatureDetector(
	config?: Partial<FeatureConfigMap>,
	detectorConfig?: DetectorConfig & {
		useCache?: boolean;
		enableRuntimeTest?: boolean;
	},
): FeatureDetector {
	const featureConfig: FeatureConfigMap = { ...defaultFeatureConfigs };
	if (config) {
		for (const key in config) {
			const value = config[key];
			if (value !== undefined) {
				featureConfig[key] = value;
			}
		}
	}
	return new FeatureDetector(featureConfig, detectorConfig);
}

/**
 * 创建 SSR 专用的特性检测器实例
 * @description 为服务端渲染环境优化的检测器，禁用运行时检测，启用缓存
 * @param config 自定义特性配置，将与默认配置合并
 * @returns 适用于 SSR 的特性检测器实例
 * @example
 * ```typescript
 * // 在服务端使用
 * const detector = createSSRDetector();
 * const supported = detector.check('webp', req.headers['user-agent']);
 *
 * // 自定义配置
 * const detector = createSSRDetector({
 *   'server-feature': {
 *     browsers: { chrome: '90' }
 *   }
 * });
 * ```
 */
export function createSSRDetector(
	config?: Partial<FeatureConfigMap>,
): FeatureDetector {
	const featureConfig: FeatureConfigMap = { ...defaultFeatureConfigs };
	if (config) {
		for (const key in config) {
			const value = config[key];
			if (value !== undefined) {
				featureConfig[key] = value;
			}
		}
	}
	return new FeatureDetector(featureConfig, {
		useCache: true,
		enableRuntimeTest: false,
	});
}
