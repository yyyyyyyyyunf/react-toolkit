import type React from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { lazyloadManager } from "../base/IntersectionObserverManager";
import type { ObserverCallbackParamType } from "../types";
import { useIsMounted } from "./useIsMounted";

/**
 * 元素检测器 Hook
 *
 * 检测元素是否满足指定的条件，支持自定义计算逻辑。
 * 当元素满足条件后，状态会保持为 true，直到元素重新回到不满足条件的状态。
 *
 * 浏览器兼容性：
 * - 支持 IntersectionObserver 的浏览器：使用原生 API，性能最佳
 * - 不支持 IntersectionObserver 的浏览器：自动降级到 scroll 事件 + getBoundingClientRect
 * - 降级策略提供相同的 API 接口，确保功能一致性
 *
 * 特性：
 * - 灵活的条件检测：支持传入自定义的计算逻辑
 * - 默认贴顶检测：未提供 compute 函数时，默认检测元素是否贴顶（top <= 0）
 * - 状态持久化：一旦满足条件就保持激活状态
 * - 性能优化：使用 IntersectionObserver + 动态 rootMargin
 * - 类型安全：完整的 TypeScript 支持
 * - 自动清理：组件卸载时自动清理资源
 * - 浏览器兼容性：自动降级支持旧版浏览器
 *
 * @param ref 要检测的元素的 ref
 * @param options 配置选项
 *   - compute: 自定义计算函数，接受 boundingClientRect 参数，返回 boolean
 * @returns 元素是否满足指定条件（boolean）
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 *
 * // 默认贴顶检测
 * const isCeiling = useElementDetector(ref);
 *
 * // 自定义条件检测
 * const isCustom = useElementDetector(ref, {
 *   compute: (rect) => rect.top <= 50 && rect.bottom >= 100
 * });
 *
 * // 复杂条件检测：检测元素是否在视口中心
 * const isInCenter = useElementDetector(ref, {
 *   compute: (rect) => {
 *     const viewportHeight = window.innerHeight;
 *     const centerY = viewportHeight / 2;
 *     const elementCenter = rect.top + rect.height / 2;
 *     const tolerance = 50;
 *     return Math.abs(elementCenter - centerY) <= tolerance;
 *   }
 * });
 *
 * if (isCeiling) {
 *   console.log('元素已贴顶');
 * }
 * ```
 */
export const useElementDetector = (
	ref: React.RefObject<HTMLElement | null>,
	options: { compute?: (boundingClientRect: DOMRect) => boolean } = {},
): boolean => {
	const [isConditionMet, setIsConditionMet] = useState(false);
	const isMountedRef = useIsMounted();
	const lastConditionMetRef = useRef(false);

	// 默认计算函数：检测元素是否贴顶（top <= 0）
	const defaultCompute = (boundingClientRect: DOMRect): boolean => {
		return boundingClientRect.top <= 0;
	};

	// 使用用户提供的计算函数或默认函数
	const compute = options.compute ?? defaultCompute;

	// 设置 Intersection Observer
	useLayoutEffect(() => {
		if (!ref.current) return;

		const callback = (entry: ObserverCallbackParamType) => {
			// 检查组件是否仍然挂载
			if (!isMountedRef.current) return;

			// 使用计算函数判断元素是否满足条件
			const newConditionMet = compute(entry.boundingClientRect);

			// 只在状态改变时更新，避免频繁触发
			if (newConditionMet !== lastConditionMetRef.current) {
				lastConditionMetRef.current = newConditionMet;
				setIsConditionMet(newConditionMet);
			}
		};

		// 使用标准的观察区域，让计算函数决定触发时机
		const rootMargin = "0px 0px 0px 0px";

		const unSubscribe = lazyloadManager.observe(ref.current, callback, {
			threshold: [0, 1], // 在元素进入/离开观察区域时触发
			rootMargin, // 标准观察区域
		});

		// 清理函数
		return () => {
			if (unSubscribe) {
				unSubscribe();
			}
		};
	}, [ref, compute, isMountedRef]);

	return isConditionMet;
};
