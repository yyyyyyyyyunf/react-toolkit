/**
 * @fileoverview 特性检测器库主入口文件
 * @description 一个用于检测浏览器对特定特性支持情况的工具库
 *
 * @example
 * ```typescript
 * import { createFeatureDetector, defaultFeatureConfigs } from '@fly4react/feature-detector';
 *
 * // 创建检测器实例
 * const detector = createFeatureDetector();
 *
 * // 检测 WebP 支持
 * const webpSupported = detector.check('webp');
 *
 * // 检测多个特性
 * const [webp, avif] = detector.check(['webp', 'avif']);
 *
 * // 获取详细检测结果
 * const result = detector.detect('webp');
 * console.log(result.supported, result.confidence);
 * ```
 */

// 导出所有类型定义
export * from './types';

// 导出默认配置
export * from './defaults';

// 导出工具函数
export { createFeatureDetector } from './utils';
