import type React from "react";
import type { ElementPositionOptions } from "../types";
import { useIntersectionRatio } from "./useIntersectionRatio";

/**
 * 元素视口可见性 Hook
 *
 * 检测元素是否在视口中可见，基于 useIntersectionRatio 的简化版本。
 * 专门用于需要简单可见性检测的场景。
 *
 * 特性：
 * - 返回元素是否在视口中可见（boolean）
 * - 支持所有 useIntersectionRatio 的配置选项
 * - 自动处理可见性更新和清理
 * - 类型安全：支持 null 值处理
 *
 * @param ref 要检测可见性的元素的 ref
 * @param options 配置选项
 * @returns 元素是否在视口中可见（boolean）
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const isInViewport = useInViewport(ref, {
 *   step: 0.1, // 每 10% 触发一次
 *   throttle: 16 // 60fps
 * });
 *
 * if (isInViewport) {
 *   console.log('元素在视口中可见');
 * } else {
 *   console.log('元素不在视口中');
 * }
 * ```
 */
export const useInViewport = (
	ref: React.RefObject<HTMLElement | null>,
	options: ElementPositionOptions = {},
): boolean => {
	const intersectionRatio = useIntersectionRatio(ref, options);
	// 如果交叉比例大于 0，说明元素在视口中可见
	return intersectionRatio !== undefined && intersectionRatio > 0;
};
// test npm token configuration
