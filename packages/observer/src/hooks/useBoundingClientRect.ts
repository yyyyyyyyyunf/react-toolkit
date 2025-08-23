import type { Options } from "../types";
import { useElementPosition } from "./useElementPosition";

/**
 * 元素边界矩形 Hook
 *
 * 获取元素的边界矩形信息，基于 useElementPosition 的简化版本。
 * 专门用于需要获取元素位置和尺寸的场景。
 *
 * 特性：
 * - 返回元素的边界矩形信息（DOMRect 或 null）
 * - 支持所有 useElementPosition 的配置选项
 * - 自动处理位置更新和清理
 * - 类型安全：支持 null 值处理
 *
 * @param ref 要获取边界矩形的元素的 ref
 * @param options 配置选项
 * @returns 元素的边界矩形信息，初始为 null
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const boundingRect = useBoundingClientRect(ref, {
 *   step: 0.1, // 每 10% 触发一次
 *   throttle: 16 // 60fps
 * });
 *
 * if (boundingRect) {
 *   console.log('元素位置:', boundingRect);
 *   console.log('元素尺寸:', {
 *     width: boundingRect.width,
 *     height: boundingRect.height
 *   });
 *   console.log('元素坐标:', {
 *     x: boundingRect.x,
 *     y: boundingRect.y,
 *     left: boundingRect.left,
 *     top: boundingRect.top
 *   });
 * }
 * ```
 */
export const useBoundingClientRect = (
	ref: React.RefObject<HTMLElement | null>,
	options: Options = {},
) => {
	const elPosition = useElementPosition(ref, options);
	return elPosition?.boundingClientRect || null;
};
