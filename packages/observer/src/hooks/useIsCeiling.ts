import type React from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { lazyloadManager } from "../base/IntersectionObserverManager";
import type { ObserverCallbackParamType } from "../types";

/**
 * 元素贴顶检测 Hook
 *
 * 检测元素的顶部是否达到或超过指定的位置，用于实现贴顶效果。
 * 当元素顶部达到指定位置后，状态会保持为 true，直到元素重新回到指定位置以下。
 *
 * 浏览器兼容性：
 * - 支持 IntersectionObserver 的浏览器：使用原生 API，性能最佳
 * - 不支持 IntersectionObserver 的浏览器：自动降级到 scroll 事件 + getBoundingClientRect
 * - 降级策略提供相同的 API 接口，确保功能一致性
 *
 * 特性：
 * - 精确的位置检测：基于元素顶部位置进行判断
 * - 状态持久化：一旦达到条件就保持激活状态
 * - 性能优化：使用 IntersectionObserver + 动态 rootMargin
 * - 类型安全：完整的 TypeScript 支持
 * - 自动清理：组件卸载时自动清理资源
 * - 浏览器兼容性：自动降级支持旧版浏览器
 *
 * @param ref 要检测贴顶状态的元素的 ref
 * @param position 位置阈值（像素），默认为 0
 *   - position = 0：元素顶部到达视口顶部时触发
 *   - position > 0：元素顶部到达距离视口顶部 position 像素时触发
 *   - position < 0：元素顶部超出视口顶部 |position| 像素时触发
 * @returns 元素是否达到指定位置（boolean）
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 *
 * // 检测是否贴顶（默认）
 * const isCeiling = useIsCeiling(ref);
 *
 * // 检测是否达到距离顶部 100px 的位置
 * const isAtPosition = useIsCeiling(ref, 100);
 *
 * // 检测是否超出视口顶部 50px
 * const isOverTop = useIsCeiling(ref, -50);
 *
 * if (isCeiling) {
 *   console.log('元素已贴顶');
 * }
 *
 * if (isAtPosition) {
 *   console.log('元素已达到指定位置');
 * }
 * ```
 */
export const useIsCeiling = (
	ref: React.RefObject<HTMLElement | null>,
	position = 0,
): boolean => {
	const [isCeiling, setIsCeiling] = useState(false);
	const isMountedRef = useRef(true);
	const lastIsCeilingRef = useRef(false);

	// 组件卸载时设置标记
	useLayoutEffect(() => {
		return () => {
			isMountedRef.current = false;
		};
	}, []);

	// 设置 Intersection Observer
	useLayoutEffect(() => {
		if (!ref.current) return;

		const callback = (entry: ObserverCallbackParamType) => {
			// 检查组件是否仍然挂载
			if (!isMountedRef.current) return;

			// 计算元素是否达到指定位置
			const elementTop = entry.boundingClientRect.top;
			const newIsCeiling = elementTop <= position;

			// 只在状态改变时更新，避免频繁触发
			if (newIsCeiling !== lastIsCeilingRef.current) {
				lastIsCeilingRef.current = newIsCeiling;
				setIsCeiling(newIsCeiling);
			}
		};

		// 根据 position 动态设置 rootMargin 来调整观察区域
		// 这样可以精确控制触发时机
		const rootMargin =
			position >= 0
				? `${-position}px 0px 0px 0px` // 缩小观察区域，让元素在指定位置触发
				: `${Math.abs(position)}px 0px 0px 0px`; // 扩展观察区域，让元素在指定位置触发

		const unSubscribe = lazyloadManager.observe(ref.current, callback, {
			threshold: [0, 1], // 在元素进入/离开观察区域时触发
			rootMargin, // 动态调整的观察区域
		});

		// 清理函数
		return () => {
			if (unSubscribe) {
				unSubscribe();
			}
		};
	}, [ref, position]);

	return isCeiling;
};
