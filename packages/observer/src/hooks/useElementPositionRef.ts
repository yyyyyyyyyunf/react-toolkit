import type React from "react";
import {
	useCallback,
	useLayoutEffect,
	useMemo,
	useRef,
} from "react";
import { lazyloadManager } from "../base/IntersectionObserverManager";
import type {
	ElementPosition,
	ObserverCallbackParamType,
	Options,
} from "../types";
import { generateThresholdArray, getDefaultThresholdArray } from "../utils";
import { useIsMounted } from "./useIsMounted";

/**
 * 元素位置跟踪 Hook (Ref 版本)
 *
 * 实时跟踪元素在视口中的位置变化，但不触发组件重新渲染。
 * 适用于需要实时获取元素位置但不想影响渲染性能的场景。
 * 
 * 浏览器兼容性：
 * - 支持 IntersectionObserver 的浏览器：使用原生 API，性能最佳
 * - 不支持 IntersectionObserver 的浏览器：自动降级到 scroll 事件 + getBoundingClientRect
 * - 降级策略提供相同的 API 接口，确保功能一致性

 * 特性：
 * - 使用 useRef 存储位置信息，不会触发组件重新渲染
 * - 支持基于 viewport 和自定义 root 的位置跟踪
 * - 内置节流机制，可控制更新频率
 * - 支持 step 和 threshold 两种配置方式
 * - 提供相对位置计算功能
 * - 性能优化：元素完全不可见时跳过更新
 * - 自动处理组件挂载状态，防止内存泄漏
 * - 类型安全：支持 null 值处理
 * - 浏览器兼容性：自动降级支持旧版浏览器
 *
 * @param ref 要跟踪的元素的 ref
 * @param options 配置选项
 * @returns 包含位置信息的 ref 对象，可以通过 .current 访问最新的位置信息
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const positionRef = useElementPositionRef(ref, {
 *   step: 0.1, // 每 10% 触发一次
 *   throttle: 16, // 60fps
 *   skipWhenOffscreen: true
 * });
 *
 * // 在事件处理函数或其他地方获取位置信息
 * const handleClick = () => {
 *   if (positionRef.current) {
 *     console.log('元素位置:', positionRef.current.boundingClientRect);
 *     console.log('交叉比例:', positionRef.current.intersectionRatio);
 *     console.log('是否相交:', positionRef.current.isIntersecting);
 *     console.log('时间戳:', positionRef.current.time);
 *   }
 * };
 * ```
 */
export const useElementPositionRef = (
	ref: React.RefObject<HTMLElement | null>,
	options: Options = {},
) => {
	/** 当前元素位置信息，存储在 ref 中不会触发重新渲染 */
	const positionRef = useRef<ElementPosition | null>(null);
	/** 上次更新时间戳，用于节流控制 */
	const lastUpdateTimeRef = useRef(0);
	/** 节流定时器引用 */
	const timeoutRef = useRef<number | null>(null);
	/** 组件挂载状态跟踪 */
	const isMountedRef = useIsMounted();

	// 解构配置选项，设置默认值，避免对象引用问题
	const offset = options.offset ?? 0;
	const throttle = options.throttle ?? 16; // 默认 60fps
	const skipWhenOffscreen = options.skipWhenOffscreen ?? true; // 元素完全不可见时跳过更新

	// 处理 root 和 relativeToRoot 选项
	const root = "root" in options ? options.root : null;
	const relativeToRoot =
		root && "relativeToRoot" in options ? options.relativeToRoot : false;

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
				"useElementPositionRef: step 和 threshold 不能同时设置，将使用 threshold",
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

	/**
	 * 节流更新位置信息
	 * 确保在指定时间间隔内只更新一次，同时保证最后一次更新被记录
	 *
	 * @param newPosition 新的位置信息
	 */
	const throttledSetPosition = useCallback(
		(newPosition: ElementPosition) => {
			// 检查组件是否仍然挂载
			if (!isMountedRef.current) return;

			const now = Date.now();

			if (now - lastUpdateTimeRef.current >= throttle) {
				// 立即更新
				positionRef.current = newPosition;
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
							positionRef.current = newPosition;
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

	/** 存储 throttledSetPosition 的 ref，避免依赖问题 */
	const throttledSetPositionRef = useRef(throttledSetPosition);

	// 更新 ref 中的值
	throttledSetPositionRef.current = throttledSetPosition;

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
			throttledSetPositionRef.current(newPosition);
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
	}, [ref, finalThreshold, offset, root, relativeToRoot, skipWhenOffscreen]);

	return positionRef;
};
