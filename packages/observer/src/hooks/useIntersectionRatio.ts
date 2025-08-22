import type { ElementPositionOptions } from "../types";
import { useElementPosition } from "./useElementPosition";

/**
 * 元素交叉比例 Hook
 *
 * 获取元素与根元素的交叉比例，基于 useElementPosition 的简化版本。
 * 专门用于需要监控元素可见程度的场景。
 *
 * 特性：
 * - 返回元素的交叉比例（0-1 或 undefined）
 * - 支持所有 useElementPosition 的配置选项
 * - 自动处理比例更新和清理
 * - 类型安全：支持 undefined 值处理
 *
 * @param ref 要获取交叉比例的元素的 ref
 * @param options 配置选项
 * @returns 元素的交叉比例（0-1），初始为 undefined
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const intersectionRatio = useIntersectionRatio(ref, {
 *   step: 0.1, // 每 10% 触发一次
 *   throttle: 16 // 60fps
 * });
 *
 * if (intersectionRatio !== undefined) {
 *   const percentage = Math.round(intersectionRatio * 100);
 *   console.log(`元素 ${percentage}% 可见`);
 *
 *   if (intersectionRatio > 0.5) {
 *     console.log('元素超过一半可见');
 *   }
 *
 *   if (intersectionRatio === 1) {
 *     console.log('元素完全可见');
 *   }
 * }
 * ```
 */
export const useIntersectionRatio = (
	ref: React.RefObject<HTMLElement | null>,
	options: ElementPositionOptions = {},
) => {
	const elPosition = useElementPosition(ref, options);
	return elPosition?.intersectionRatio;
};
