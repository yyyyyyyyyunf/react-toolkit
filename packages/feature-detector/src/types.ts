/**
 * 支持的浏览器名称
 * @description 包含主流浏览器、WebView和特定厂商浏览器名称
 */
export type BrowserName =
	// 主流浏览器
	| "chrome"
	| "firefox"
	| "safari"
	| "edge"
	| "opera"
	| "samsung"
	// WebView类型
	| "safariWebview"
	| "chromeWebview"
	// 特定厂商浏览器
	| "xiaomi" // 小米浏览器
	| "harmony" // 鸿蒙浏览器
	| "wechat" // 微信内置浏览器
	| "alipay" // 支付宝内置浏览器
	| "baidu" // 百度内置浏览器
	| "bytedance" // 字节跳动内置浏览器
	| "lark" // 飞书内置浏览器
	| "didi" // 滴滴内置浏览器
	| "cmcc" // 中国移动内置浏览器
	// 其他自定义浏览器
	| string;

/**
 * 浏览器版本支持配置
 * @description 键为浏览器名称，值为最低支持版本号或 false（不支持）
 * @example
 * ```typescript
 * const support: BrowserSupport = {
 *   chrome: '90',    // Chrome 90+ 支持
 *   firefox: '88',   // Firefox 88+ 支持
 *   safari: false    // Safari 不支持
 * };
 * ```
 */
export type BrowserSupport = Partial<Record<BrowserName, string | false>>;

/**
 * 检测方法类型
 * @description 定义特性检测的优先级和方法
 * - 'ua-only': 仅使用 User Agent 检测
 * - 'runtime-only': 仅使用运行时检测
 * - 'ua-runtime': 优先 UA 检测，失败时使用运行时检测
 * - 'runtime-ua': 优先运行时检测，失败时使用 UA 检测
 */
export type DetectionMethod =
	| "ua-only"
	| "runtime-only"
	| "ua-runtime"
	| "runtime-ua";

/**
 * 检测结果置信度
 * @description 表示检测结果的可靠性
 * - 'high': 高置信度，检测结果非常可靠
 * - 'medium': 中等置信度，检测结果基本可靠
 * - 'low': 低置信度，检测结果可能不准确
 */
export type Confidence = "high" | "medium" | "low";

/**
 * 特性配置接口
 * @description 定义单个特性的检测配置
 */
export interface FeatureConfig {
	/** 浏览器版本支持配置 */
	browsers: BrowserSupport;
	/** 运行时检测函数，用于在浏览器环境中进行实际测试 */
	runtimeTest?: () => boolean;
}

/**
 * 特性配置映射
 * @description 包含多个特性的配置，键为特性名称
 */
export interface FeatureConfigMap {
	[feature: string]: FeatureConfig;
}

/**
 * 检测结果接口
 * @description 包含特性检测的详细结果信息
 */
export interface DetectionResult {
	/** 是否支持该特性 */
	supported: boolean;
	/** 使用的检测方法 */
	method: DetectionMethod;
	/** UA 检测结果 */
	uaSupport: boolean;
	/** 运行时检测结果，null 表示未进行运行时检测 */
	runtimeSupport: boolean | null;
	/** 检测结果置信度 */
	confidence: Confidence;
}

/**
 * 浏览器信息接口
 * @description 包含检测到的浏览器详细信息
 */
export interface BrowserInfo {
	/** 浏览器名称 */
	name: BrowserName;
	/** 浏览器版本号 */
	version: string;
	/** 是否为 WebView 环境 */
	isWebView: boolean;
	/** WebKit 版本号（仅 iOS WebView） */
	webkitVersion?: string;
	/** 原始 User Agent 字符串 */
	userAgent: string;
}

/**
 * 浏览器模式匹配配置
 * @description 定义如何从 User Agent 中识别浏览器
 */
export interface BrowserPattern {
	/** 浏览器名称 */
	name: BrowserName;
	/** 匹配 User Agent 的正则表达式数组 */
	patterns: RegExp[];
	/** 版本号在匹配结果中的索引位置，默认为 1 */
	versionIndex?: number;
}

/**
 * 检测器配置接口
 * @description 配置特性检测器的行为
 */
export interface DetectorConfig {
	/** 浏览器模式匹配规则 */
	browserPatterns?: BrowserPattern[];
	/** 版本号提取配置 */
	versionExtraction?: VersionExtractionConfig;
	/** WebView 浏览器列表 */
	webViewBrowsers?: BrowserName[];
}

/**
 * 检测器信息接口
 * @description 获取检测器当前状态信息
 */
export interface DetectorInfo {
	/** 是否启用缓存 */
	useCache: boolean;
	/** 是否启用运行时检测 */
	enableRuntimeTest: boolean;
	/** 当前缓存大小 */
	cacheSize: number;
	/** 动态特性数量 */
	dynamicFeaturesCount: number;
	/** 当前浏览器信息 */
	browserInfo: BrowserInfo | null;
}

/**
 * 版本号提取配置
 * @description 定义用于版本号提取的正则表达式
 */
export interface VersionExtractionConfig {
	/** 版本号提取正则表达式 */
	versionPattern?: RegExp;
}

/**
 * 特性检测器选项
 * @description 扩展检测器配置，添加运行时选项
 */
export interface FeatureDetectorOptions extends DetectorConfig {
	/** 是否启用缓存，默认根据环境自动判断 */
	useCache?: boolean;
	/** 是否启用运行时检测，默认根据环境自动判断 */
	enableRuntimeTest?: boolean;
}
