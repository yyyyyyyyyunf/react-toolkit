import { useState } from "react";
import type { ObserverCallbackParamType, ObserverOptions } from "../types";
import { useIntersectionObserver } from "./useIntersectionObserver";

/**
 * 一次性可见性检测 Hook
 *
 * 检测元素是否曾经可见过，一旦可见就保持为 true。
 * 适用于懒加载、一次性动画触发等场景。
 *
 * 特性：
 * - 一旦元素可见，状态永久保持为 true
 * - 自动设置 once: true，避免重复触发
 * - 简单易用，无需手动管理状态
 * - 类型安全：支持 null 值处理
 *
 * @param ref 要检测可见性的元素的 ref
 * @param options 配置选项
 * @returns 元素是否曾经可见过
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const isVisible = useOneOffVisibility(ref, {
 *   threshold: 0.5, // 50% 可见时触发
 *   rootMargin: '100px' // 提前 100px 触发
 * });
 *
 * if (isVisible) {
 *   // 元素已经可见过，执行一次性逻辑
 *   console.log('元素已可见');
 *   // 可以在这里执行懒加载、动画等操作
 * }
 * ```
 */
export const useOneOffVisibility = (
	ref: React.RefObject<HTMLElement | null>,
	options: ObserverOptions = {},
) => {
	/** 元素是否曾经可见过 */
	const [isVisible, setIsVisible] = useState(false);

	// 使用 Intersection Observer 检测可见性
	useIntersectionObserver(
		ref,
		(entry: ObserverCallbackParamType) => {
			if (entry.isIntersecting) {
				setIsVisible(true);
			}
		},
		{
			...options,
			once: true, // 确保只触发一次
		} satisfies ObserverOptions,
	);

	return isVisible;
};
