import type React from "react";
import { useLayoutEffect, useState } from "react";
import { lazyloadManager } from "../base/IntersectionObserverManager";
import type { ObserverCallbackParamType } from "../types";
import { useIsMounted } from "./useIsMounted";

/**
 * 元素视口可见性 Hook
 *
 * 检测元素是否在视口中可见，基于 IntersectionObserver 实现。
 * 专门用于需要简单可见性检测的场景，性能更优。
 *
 * 浏览器兼容性：
 * - 支持 IntersectionObserver 的浏览器：使用原生 API，性能最佳
 * - 不支持 IntersectionObserver 的浏览器：自动降级到 scroll 事件 + getBoundingClientRect
 * - 降级策略提供相同的 API 接口，确保功能一致性
 *
 * 特性：
 * - 返回元素是否在视口中可见（boolean）
 * - 自动处理可见性更新和清理
 * - 类型安全：支持 null 值处理
 * - 性能优化：只关注可见性状态，无额外开销
 * - 简单易用：无需复杂配置，开箱即用
 * - 浏览器兼容性：自动降级支持旧版浏览器
 *
 * @param ref 要检测可见性的元素的 ref
 * @returns 元素是否在视口中可见（boolean）
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const isInViewport = useInViewport(ref);
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
): boolean => {
	const [isInViewport, setIsInViewport] = useState(false);
	const isMountedRef = useIsMounted();

	// 设置 Intersection Observer
	useLayoutEffect(() => {
		if (!ref.current) return;

		const callback = (entry: ObserverCallbackParamType) => {
			// 检查组件是否仍然挂载
			if (!isMountedRef.current) return;

			// 只关注是否在视口中可见
			const newIsInViewport = entry.isIntersecting;
			setIsInViewport(newIsInViewport);
		};

		// 开始观察元素，使用简单的配置
		const unSubscribe = lazyloadManager.observe(ref.current, callback, {
			threshold: [0], // 只关心是否可见
		});

		// 清理函数
		return () => {
			if (unSubscribe) {
				unSubscribe();
			}
		};
	}, [ref, isMountedRef]);

	return isInViewport;
};
