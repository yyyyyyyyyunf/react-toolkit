import type React from "react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { lazyloadManager } from "../base/IntersectionObserverManager";
import type {
	ObserverCallbackParamType,
	ViewportElementPositionOptions,
} from "../types";
import { generateThresholdArray } from "../utils";

/**
 * 元素视口可见性 Hook
 *
 * 检测元素是否在视口中可见，直接基于 IntersectionObserver 实现。
 * 专门用于需要简单可见性检测的场景，性能更优。
 *
 * 特性：
 * - 返回元素是否在视口中可见（boolean）
 * - 支持所有位置相关 Hook 的配置选项
 * - 自动处理可见性更新和清理
 * - 类型安全：支持 null 值处理
 * - 性能优化：只关注可见性状态，不计算位置信息
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
 *   offset: 50 // 偏移量
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
	options: ViewportElementPositionOptions = {},
): boolean => {
	const [isInViewport, setIsInViewport] = useState(false);
	const isMountedRef = useRef(true);

	// 解构配置选项，避免对象引用问题
	const offset = options.offset ?? 0;
	const step = "step" in options ? options.step : undefined;
	const threshold = "threshold" in options ? options.threshold : undefined;

	// 计算最终的 threshold 数组
	const finalThreshold = useMemo(() => {
		if (step !== undefined && threshold !== undefined) {
			console.warn(
				"useInViewport: step 和 threshold 不能同时设置，将使用 threshold",
			);
		}

		if (threshold !== undefined) {
			return threshold;
		}

		if (step !== undefined) {
			return generateThresholdArray(step);
		}

		// 对于 useInViewport，只需要检测是否在视口中，使用简单的阈值
		return [0];
	}, [step, threshold]);

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

			// 只关注是否在视口中可见
			const newIsInViewport = entry.isIntersecting;

			setIsInViewport(newIsInViewport);
		};

		// 开始观察元素
		const unSubscribe = lazyloadManager.observe(ref.current, callback, {
			threshold: finalThreshold,
			rootMargin: `${offset}px`,
		});

		// 清理函数
		return () => {
			if (unSubscribe) {
				unSubscribe();
			}
		};
	}, [ref, finalThreshold, offset]);

	return isInViewport;
};
