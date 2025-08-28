import type React from "react";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { lazyloadManager } from "../base/IntersectionObserverManager";
import type {
	ObserverCallbackParamType,
	UseElementDetectorOptions,
} from "../types";
import { generateThresholdArray, getDefaultThresholdArray } from "../utils";
import { useIsMounted } from "./useIsMounted";

/**
 * 元素检测器 Hook
 *
 * 检测元素是否满足指定的条件，支持自定义计算逻辑和细致的 threshold 配置。
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
 * - 细致的 threshold 配置：支持 step 和 threshold 两种配置方式
 * - 节流控制：可控制更新频率，提升性能
 * - 状态持久化：一旦满足条件就保持激活状态
 * - 性能优化：使用 IntersectionObserver + 动态 rootMargin
 * - 类型安全：完整的 TypeScript 支持
 * - 自动清理：组件卸载时自动清理资源
 * - 浏览器兼容性：自动降级支持旧版浏览器
 *
 * @param ref 要检测的元素的 ref
 * @param options 配置选项
 *   - compute: 自定义计算函数，接受 boundingClientRect 参数，返回 boolean
 *   - step: 步长值（0-1之间），用于自动生成 threshold 数组
 *   - threshold: 手动指定的 threshold 数组
 *   - throttle: 节流时间（毫秒），控制更新频率
 *   - skipWhenOffscreen: 元素完全不可见时跳过更新
 *   - offset: 偏移量（像素）
 * @returns 元素是否满足指定条件（boolean）
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 *
 * // 默认贴顶检测
 * const isCeiling = useElementDetector(ref);
 *
 * // 自定义条件检测，使用细致的 threshold 配置
 * const isCustom = useElementDetector(ref, {
 *   compute: (rect) => rect.top <= 50 && rect.bottom >= 100,
 *   step: 0.1, // 每 10% 触发一次
 *   throttle: 16, // 60fps
 *   skipWhenOffscreen: true
 * });
 *
 * // 使用自定义 threshold 数组
 * const isInCenter = useElementDetector(ref, {
 *   compute: (rect) => {
 *     const viewportHeight = window.innerHeight;
 *     const centerY = viewportHeight / 2;
 *     const elementCenter = rect.top + rect.height / 2;
 *     const tolerance = 50;
 *     return Math.abs(elementCenter - centerY) <= tolerance;
 *   },
 *   threshold: [0, 0.25, 0.5, 0.75, 1], // 自定义阈值
 *   throttle: 32 // 30fps
 * });
 *
 * if (isCeiling) {
 *   console.log('元素已贴顶');
 * }
 * ```
 */
export const useElementDetector = (
	ref: React.RefObject<HTMLElement | null>,
	options: UseElementDetectorOptions = {},
): boolean => {
	const [isConditionMet, setIsConditionMet] = useState(false);
	const isMountedRef = useIsMounted();
	const lastConditionMetRef = useRef(false);
	/** 上次更新时间戳，用于节流控制 */
	const lastUpdateTimeRef = useRef(0);
	/** 节流定时器引用 */
	const timeoutRef = useRef<number | null>(null);

	// 解构配置选项，设置默认值
	const offset = options.offset ?? 0;
	const throttle = options.throttle ?? 16; // 默认 60fps
	const skipWhenOffscreen = options.skipWhenOffscreen ?? true; // 元素完全不可见时跳过更新

	// 处理 root 选项
	const root = "root" in options ? options.root : null;

	// 解构 step 和 threshold 以避免对象引用问题
	const step = "step" in options ? options.step : undefined;
	const threshold = "threshold" in options ? options.threshold : undefined;

	/**
	 * 计算最终的 threshold 数组
	 * 根据配置的 step 或 threshold 生成用于 Intersection Observer 的阈值数组
	 */
	const finalThreshold = useMemo(() => {
		// 运行时检查：确保 step 和 threshold 不同时设置
		if (step !== undefined && threshold !== undefined) {
			console.warn(
				"useElementDetector: step 和 threshold 不能同时设置，将使用 threshold",
			);
		}

		// 如果明确指定了 threshold，优先使用
		if (threshold !== undefined) {
			return threshold;
		}

		// 如果指定了 step，根据 step 生成 threshold 数组
		if (step !== undefined) {
			return generateThresholdArray(step);
		}

		// 否则使用默认的 threshold 数组
		return getDefaultThresholdArray();
	}, [step, threshold]);

	// 默认计算函数：检测元素是否贴顶（top <= 0）
	const defaultCompute = (boundingClientRect: DOMRect): boolean => {
		return boundingClientRect.top <= 0;
	};

	// 使用用户提供的计算函数或默认函数
	const compute = options.compute ?? defaultCompute;

	/**
	 * 节流更新条件状态
	 * 确保在指定时间间隔内只更新一次
	 *
	 * @param newConditionMet 新的条件状态
	 */
	const throttledSetCondition = useCallback(
		(newConditionMet: boolean) => {
			// 检查组件是否仍然挂载
			if (!isMountedRef.current) return;

			const now = Date.now();

			if (now - lastUpdateTimeRef.current >= throttle) {
				// 立即更新
				lastConditionMetRef.current = newConditionMet;
				setIsConditionMet(newConditionMet);
				lastUpdateTimeRef.current = now;

				// 清除之前的延迟更新
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current);
					timeoutRef.current = null;
				}
			} else {
				// 延迟更新，确保最后一次更新被记录
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current);
				}
				timeoutRef.current = setTimeout(
					() => {
						// 再次检查组件是否仍然挂载
						if (isMountedRef.current) {
							lastConditionMetRef.current = newConditionMet;
							setIsConditionMet(newConditionMet);
							lastUpdateTimeRef.current = Date.now();
						}
						timeoutRef.current = null;
					},
					throttle - (now - lastUpdateTimeRef.current),
				);
			}
		},
		[throttle, isMountedRef],
	);

	/** 存储 throttledSetCondition 的 ref，避免依赖问题 */
	const throttledSetConditionRef = useRef(throttledSetCondition);

	// 更新 ref 中的值
	throttledSetConditionRef.current = throttledSetCondition;

	// 设置 Intersection Observer
	useLayoutEffect(() => {
		if (!ref.current) return;

		const callback = (entry: ObserverCallbackParamType) => {
			// 检查组件是否仍然挂载
			if (!isMountedRef.current) return;

			// 如果元素完全不可见且启用了跳过选项，则不更新
			if (skipWhenOffscreen && entry.intersectionRatio === 0) {
				return;
			}

			// 使用计算函数判断元素是否满足条件
			const newConditionMet = compute(entry.boundingClientRect);

			// 只在状态改变时更新，避免频繁触发
			if (newConditionMet !== lastConditionMetRef.current) {
				throttledSetConditionRef.current(newConditionMet);
			}
		};

		// 计算 rootMargin，考虑 offset
		const rootMargin = offset !== 0 ? `${offset}px` : "0px 0px 0px 0px";

		const unSubscribe = lazyloadManager.observe(ref.current, callback, {
			threshold: finalThreshold,
			rootMargin,
			root,
		});

		// 清理函数
		return () => {
			if (unSubscribe) {
				unSubscribe();
			}
			// 清理定时器
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
		};
	}, [
		ref,
		compute,
		finalThreshold,
		offset,
		skipWhenOffscreen,
		root,
		isMountedRef,
	]);

	return isConditionMet;
};
