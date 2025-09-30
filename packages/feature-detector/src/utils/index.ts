import { FeatureDetector } from "../FeatureDetector";
import { defaultDetectorConfig, defaultFeatureConfigs } from "../defaults";
import type { FeatureConfigMap, FeatureDetectorOptions } from "../types";

/**
 * 比较两个版本字符串
 * @param v1 第一个版本字符串
 * @param v2 第二个版本字符串
 * @returns 正数表示 v1 > v2，负数表示 v1 < v2，0 表示相等
 */
export function compareVersions(v1: string, v2: string): number {
	const parts1 = v1.split(".").map(Number);
	const parts2 = v2.split(".").map(Number);

	for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
		const part1 = parts1[i] || 0;
		const part2 = parts2[i] || 0;

		if (part1 > part2) return 1;
		if (part1 < part2) return -1;
	}

	return 0;
}

/**
 * 创建特性检测器实例（工具函数）
 * @description 直接创建特性检测器实例的便捷函数
 * @param config 特性配置映射
 * @param detectorConfig 检测器配置选项
 * @returns 特性检测器实例
 * @example
 * ```typescript
 * const detector = createFeatureDetector(
 *   { 'webp': { browsers: { chrome: '32' } } },
 *   { useCache: true }
 * );
 * ```
 */
export function createFeatureDetector(
	config: FeatureConfigMap = defaultFeatureConfigs,
	detectorConfig: FeatureDetectorOptions = defaultDetectorConfig,
): FeatureDetector {
	return new FeatureDetector(config, detectorConfig);
}
