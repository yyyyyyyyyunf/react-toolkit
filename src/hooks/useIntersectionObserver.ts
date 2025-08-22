import type React from "react";
import { useLayoutEffect } from "react";
import { lazyloadManager } from "../base/IntersectionObserverManager";
import type { ObserverCallbackType, ObserverOptions } from "../types";

/**
 * 基础 Intersection Observer Hook
 *
 * 提供 Intersection Observer API 的 React 封装，支持元素可见性检测。
 * 这是库中最底层的 Hook，其他高级 Hook 都基于此构建。
 *
 * 特性：
 * - 支持所有 Intersection Observer 原生配置
 * - 自动清理资源，防止内存泄漏
 * - 支持扩展的 entry 对象，包含滚动方向信息
 * - 使用 useLayoutEffect 确保同步执行
 * - 类型安全：支持 null 值处理
 *
 * @param ref 要观察的元素的 ref
 * @param callback 回调函数，接收扩展的 entry 对象
 * @param options 配置选项
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 *
 * useIntersectionObserver(
 *   ref,
 *   (entry) => {
 *     console.log('元素可见性变化:', entry.isIntersecting);
 *     console.log('滚动方向:', entry.scrollDirection);
 *     console.log('交叉比例:', entry.intersectionRatio);
 *     console.log('元素位置:', entry.boundingClientRect);
 *   },
 *   {
 *     threshold: [0, 0.5, 1],
 *     rootMargin: '50px',
 *     once: true // 只触发一次
 *   }
 * );
 * ```
 */
export const useIntersectionObserver = (
	ref: React.RefObject<HTMLElement | null>,
	callback: ObserverCallbackType,
	options: ObserverOptions,
) => {
	useLayoutEffect(() => {
		if (!ref.current) return;

		// 开始观察元素，返回清理函数
		const unSubscribe = lazyloadManager.observe(ref.current, callback, options);

		// 清理函数：取消观察
		return () => {
			if (unSubscribe) {
				unSubscribe();
			}
		};
	}, [ref, callback, options]);
};
