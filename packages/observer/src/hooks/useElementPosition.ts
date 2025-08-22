import type React from "react";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { lazyloadManager } from "../base/IntersectionObserverManager";
import type {
	ElementPosition,
	ElementPositionOptions,
	ObserverCallbackParamType,
} from "../types";
import { generateThresholdArray, getDefaultThresholdArray } from "../utils";

/**
 * 元素位置跟踪 Hook
 *
 * 实时跟踪元素在视口中的位置变化，支持节流、自定义根元素和相对位置计算。
 * 适用于滚动动画、位置监控、性能分析等场景。
 *
 * 特性：
 * - 支持基于 viewport 和自定义 root 的位置跟踪
 * - 内置节流机制，可控制更新频率
 * - 支持 step 和 threshold 两种配置方式
 * - 提供相对位置计算功能
 * - 性能优化：元素完全不可见时跳过更新
 * - 类型安全：支持 null 值处理
 *
 * @param ref 要跟踪的元素的 ref
 * @param options 配置选项
 * @returns 元素位置信息，初始为 null
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const position = useElementPosition(ref, {
 *   step: 0.1, // 每 10% 触发一次
 *   throttle: 16, // 60fps
 *   skipWhenOffscreen: true
 * });
 *
 * if (position) {
 *   console.log('元素位置:', position.boundingClientRect);
 *   console.log('交叉比例:', position.intersectionRatio);
 *   console.log('是否相交:', position.isIntersecting);
 *   console.log('时间戳:', position.time);
 * }
 * ```
 */
export const useElementPosition = (
	ref: React.RefObject<HTMLElement | null>,
	options: ElementPositionOptions = {},
) => {
	/** 当前元素位置信息 */
	const [position, setPosition] = useState<ElementPosition | null>(null);
	/** 上次更新时间戳，用于节流控制 */
	const lastUpdateTimeRef = useRef(0);
	/** 缓存的最新位置信息，确保最后一次更新被记录 */
	const lastPositionRef = useRef<ElementPosition | null>(null);
	/** 节流定时器引用 */
	const timeoutRef = useRef<number | null>(null);

	// 解构配置选项，设置默认值
	const {
		offset = 0,
		throttle = 16, // 默认 60fps
		skipWhenOffscreen = true, // 元素完全不可见时跳过更新
	} = options;

	// 处理 root 和 relativeToRoot 选项
	const root = "root" in options ? options.root : null;
	const relativeToRoot =
		root && "relativeToRoot" in options ? options.relativeToRoot : false;

	/**
	 * 计算最终的 threshold 数组
	 * 根据配置的 step 或 threshold 生成用于 Intersection Observer 的阈值数组
	 */
	const finalThreshold = useMemo(() => {
		// 运行时检查：确保 step 和 threshold 不同时设置
		if (
			"step" in options &&
			"threshold" in options &&
			options.step !== undefined &&
			options.threshold !== undefined
		) {
			console.warn(
				"useElementPosition: step 和 threshold 不能同时设置，将使用 threshold",
			);
		}

		// 如果明确指定了 threshold，优先使用
		if ("threshold" in options && options.threshold) {
			return options.threshold;
		}

		// 如果指定了 step，根据 step 生成 threshold 数组
		if ("step" in options && options.step) {
			return generateThresholdArray(options.step);
		}

		// 否则使用默认的 threshold 数组
		return getDefaultThresholdArray();
	}, [options]);

	/**
	 * 节流更新位置信息
	 * 确保在指定时间间隔内只更新一次，同时保证最后一次更新被记录
	 *
	 * @param newPosition 新的位置信息
	 */
	const throttledSetPosition = useCallback(
		(newPosition: ElementPosition) => {
			const now = Date.now();
			lastPositionRef.current = newPosition; // 总是缓存最新值

			if (now - lastUpdateTimeRef.current >= throttle) {
				// 立即更新
				setPosition(newPosition);
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
						if (lastPositionRef.current) {
							setPosition(lastPositionRef.current);
							lastUpdateTimeRef.current = Date.now();
						}
						timeoutRef.current = null;
					},
					throttle - (now - lastUpdateTimeRef.current),
				);
			}
		},
		[throttle],
	);

	// 设置 Intersection Observer
	useLayoutEffect(() => {
		if (!ref.current) return;

		/**
		 * Intersection Observer 回调函数
		 * 处理元素位置变化，计算相对位置并更新状态
		 */
		const callback = (entry: ObserverCallbackParamType) => {
			// 如果元素完全不可见且启用了跳过选项，则不更新
			if (skipWhenOffscreen && entry.intersectionRatio === 0) {
				return;
			}

			/** 相对于 root 的位置信息 */
			let relativeRect: DOMRect | undefined;

			// 如果需要相对位置且设置了 root
			if (relativeToRoot && root) {
				const rootRect = root.getBoundingClientRect();
				const elementRect = entry.boundingClientRect;

				relativeRect = new DOMRect(
					elementRect.left - rootRect.left,
					elementRect.top - rootRect.top,
					elementRect.width,
					elementRect.height,
				);
			}

			// 构建位置信息对象
			const newPosition: ElementPosition = {
				boundingClientRect: entry.boundingClientRect,
				intersectionRatio: entry.intersectionRatio,
				isIntersecting: entry.isIntersecting,
				time: entry.time,
				relativeRect,
			};

			// 使用节流更新位置
			throttledSetPosition(newPosition);
		};

		// 开始观察元素
		const unSubscribe = lazyloadManager.observe(ref.current, callback, {
			threshold: finalThreshold,
			rootMargin: `${offset}px`,
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
		finalThreshold,
		offset,
		root,
		relativeToRoot,
		throttledSetPosition,
		skipWhenOffscreen,
	]);

	return position;
};
