import type React from "react";
import { useLayoutEffect, useRef } from "react";
import { lazyloadManager } from "../base/IntersectionObserverManager";
import type { ObserverCallbackType, ObserverOptions } from "../types";

/**
 * 基础 Intersection Observer Hook
 *
 * 提供 Intersection Observer API 的 React 封装，支持元素可见性检测。
 * 这是库中最底层的 Hook，其他高级 Hook 都基于此构建。
 *
 * 浏览器兼容性：
 * - 支持 IntersectionObserver 的浏览器：使用原生 API，性能最佳
 * - 不支持 IntersectionObserver 的浏览器：使用标准的 intersection-observer polyfill
 * - 使用标准的 intersection-observer polyfill，确保在所有浏览器中都能正常工作
 *
 * 特性：
 * - 支持所有 Intersection Observer 原生配置
 * - 自动清理资源，防止内存泄漏
 * - 支持扩展的 entry 对象，包含滚动方向信息
 * - 使用 useLayoutEffect 确保在浏览器绘制前开始观察
 * - 类型安全：支持 null 值处理
 * - 浏览器兼容性：使用标准 polyfill 支持所有浏览器
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
	// 使用 useRef 来存储最新的 callback 和 options，避免依赖问题
	const callbackRef = useRef(callback);
	const optionsRef = useRef(options);
	const hasTriggeredRef = useRef(false);

	// 更新 ref 中的值
	callbackRef.current = callback;
	optionsRef.current = options;

	useLayoutEffect(() => {
		if (!ref.current) return;

		// 如果 once 为 true 且已经触发过，就不再观察
		if (optionsRef.current.once && hasTriggeredRef.current) {
			return;
		}

		// 开始观察元素，返回清理函数
		const unSubscribe = lazyloadManager.observe(
			ref.current,
			(entry) => {
				if (entry) {
					callbackRef.current(entry); // 使用 ref 中的最新值
					// 如果 once 为 true 且元素可见，标记为已触发
					if (optionsRef.current.once && entry.isIntersecting) {
						hasTriggeredRef.current = true;
					}
				}
			},
			optionsRef.current, // 使用 ref 中的最新值
		);

		// 清理函数：取消观察
		return () => {
			if (unSubscribe) {
				unSubscribe();
			}
		};
	}, [ref]); // 只依赖 ref，不依赖 callback 和 options
};
