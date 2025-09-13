import type React from "react";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { lazyloadManager } from "../base/IntersectionObserverManager";
import type {
	ElementPosition,
	ObserverCallbackParamType,
	ObserverOptions,
	UnSubscribeType,
	UseElementDetectorOptions,
} from "../types";
import {
	calculateFinalThreshold,
	calculateScrollBasedPosition,
	checkIfShouldSyncPosition,
} from "../utils";
import { useIsMounted } from "./useIsMounted";

/**
 * 元素检测器 Hook
 *
 * 检测元素是否满足指定的条件，支持自定义计算逻辑和细致的 threshold 配置。
 * 当元素满足条件后，状态会保持为 true，直到元素重新回到不满足条件的状态。
 *
 * 浏览器兼容性：
 * - 支持 IntersectionObserver 的浏览器：使用原生 API，性能最佳
 * - 不支持 IntersectionObserver 的浏览器：使用标准的 intersection-observer polyfill
 * - 使用标准的 intersection-observer polyfill，确保在所有浏览器中都能正常工作
 *
 * 核心特性：
 * - 灵活的条件检测：支持传入自定义的计算逻辑
 * - 默认贴顶检测：未提供 compute 函数时，默认检测元素是否贴顶（top <= 0）
 * - 细致的 threshold 配置：支持 step 和 threshold 两种配置方式
 * - 节流控制：可控制更新频率，提升性能
 * - 状态持久化：一旦满足条件就保持激活状态
 * - 类型安全：完整的 TypeScript 支持
 * - 自动清理：组件卸载时自动清理资源
 * - 浏览器兼容性：使用标准 polyfill 支持所有浏览器
 *
 * 性能优化策略：
 * - 智能计算策略：结合 Intersection Observer 和 scroll 事件
 * - 避免重复计算：元素部分可见时，依赖 Intersection Observer 自动触发
 * - 精确更新：元素完全可见/不可见时，使用 scroll 事件进行位置同步
 * - 校准机制：定期使用 Intersection Observer 校准位置，确保数据准确性
 * - 节流控制：scroll 事件使用节流机制，避免过度计算
 *
 * @param ref 要检测的元素的 ref
 * @param options 配置选项
 *   - compute: 自定义计算函数，接受 boundingClientRect 参数，返回 boolean
 *   - step: 步长值（0-1之间），用于自动生成 threshold 数组
 *   - threshold: 手动指定的 threshold 数组
 *   - throttle: 节流时间（毫秒），控制更新频率
 *   - forceCalibrate: 是否强制校准，每次更新都强制校准，默认 true
 *   - calibrateInterval: 校准间隔（毫秒），默认 2500
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
 *   forceCalibrate: true, // 启用强制校准
 *   calibrateInterval: 2500, // 校准间隔 2.5 秒
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
	const lastConditionMetRef = useRef<boolean | null>(null);
	/** 当前元素位置信息，用于智能计算策略 */
	const positionRef = useRef<ElementPosition | null>(null);
	/** 上次更新时间戳，用于节流控制 */
	const lastUpdateTimeRef = useRef(0);
	/** 上次强制校准时间戳，用于控制校准频率 */
	const lastCalibrateTimeRef = useRef(0);
	/** 节流定时器引用 */
	const timeoutRef = useRef<number | null>(null);
	/** scroll 事件节流定时器引用 */
	const scrollTimeoutRef = useRef<number | null>(null);

	// 解构配置选项，设置默认值
	const offset = options.offset ?? 0;
	const throttle = options.throttle ?? 16; // 默认 60fps
	const forceCalibrate = options.forceCalibrate ?? true; // 元素完全不可见时跳过更新
	const calibrateInterval = options.calibrateInterval ?? 2500; // 校准间隔

	// 处理 root 选项
	const root = "root" in options ? options.root : null;

	/**
	 * 计算最终的 threshold 数组
	 * 根据配置的 step 或 threshold 生成用于 Intersection Observer 的阈值数组
	 */
	const finalThreshold = useMemo(() => {
		return calculateFinalThreshold(options, "useElementDetector");
	}, [options]);

	// 默认计算函数：检测元素是否贴顶（top <= 0）
	const defaultCompute = useCallback((boundingClientRect: DOMRect): boolean => {
		return boundingClientRect.top <= 0;
	}, []);

	// 使用用户提供的计算函数或默认函数
	const compute = useCallback(
		(boundingClientRect: DOMRect): boolean => {
			const computeFn = options.compute ?? defaultCompute;
			return computeFn(boundingClientRect);
		},
		[options.compute, defaultCompute],
	);

	/**
	 * 节流更新条件状态
	 * 确保在指定时间间隔内只更新一次
	 *
	 * @param newConditionMet 新的条件状态
	 * @param newPosition 新的位置信息（可选）
	 */
	const throttledSetCondition = useCallback(
		(newConditionMet: boolean, newPosition?: ElementPosition) => {
			// 检查组件是否仍然挂载
			if (!isMountedRef.current) return;

			// 更新位置信息
			if (newPosition) {
				positionRef.current = newPosition;
			}

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

	const unSubscribeRef = useRef<UnSubscribeType | undefined>(undefined);

	/**
	 * Intersection Observer 回调函数
	 * 处理元素位置变化，计算条件状态并更新
	 */
	const callback = useCallback(
		(entry: ObserverCallbackParamType) => {
			// 构建位置信息对象
			const newPosition: ElementPosition = {
				boundingClientRect: entry.boundingClientRect,
				intersectionRatio: entry.intersectionRatio,
				isIntersecting: entry.isIntersecting,
				time: entry.time,
				relativeRect: undefined,
				scrollX: window.scrollX,
				scrollY: window.scrollY,
			};

			// 使用计算函数判断元素是否满足条件
			const newConditionMet = compute(entry.boundingClientRect);

			// 更新条件状态和位置信息
			throttledSetConditionRef.current(newConditionMet, newPosition);
		},
		[compute],
	);

	const observerOptions: ObserverOptions = useMemo(
		() => ({
			threshold: finalThreshold,
			rootMargin: `${offset}px`,
			root,
		}),
		[finalThreshold, offset, root],
	);

	/**
	 * 节流的 scroll 事件处理函数
	 *
	 * 智能处理 scroll 事件，根据元素当前状态决定是否需要执行复杂计算：
	 * - 元素部分可见时：依赖 Intersection Observer 自动触发，跳过计算
	 * - 元素完全可见/不可见时：执行位置计算和校准检查
	 *
	 * 性能优化：
	 * - 使用节流机制避免过度计算
	 * - 智能判断是否需要复杂计算
	 * - 定期校准确保数据准确性
	 */
	const throttledHandleScroll = useCallback(() => {
		// 如果已经有待执行的 scroll 处理，直接返回
		if (scrollTimeoutRef.current) return;

		scrollTimeoutRef.current = setTimeout(() => {
			// 检查组件是否仍然挂载
			if (!isMountedRef.current) {
				scrollTimeoutRef.current = null;
				return;
			}

			if (!positionRef.current) {
				scrollTimeoutRef.current = null;
				return;
			}

			// 智能判断当前状态下的处理策略
			const { shouldCalibrate, shouldCalculateOnScroll } =
				checkIfShouldSyncPosition(
					positionRef.current || {},
					forceCalibrate,
					lastCalibrateTimeRef.current,
					calibrateInterval,
				);

			const now = Date.now();

			// 执行校准：重新使用 Intersection Observer 获取准确位置
			if (shouldCalibrate && ref.current) {
				lastCalibrateTimeRef.current = now;
				unSubscribeRef.current?.();
				unSubscribeRef.current = lazyloadManager.observe(
					ref.current,
					callback,
					observerOptions,
				);
				scrollTimeoutRef.current = null;
				return;
			}

			// 跳过计算：元素部分可见时，依赖 Intersection Observer 自动触发
			if (!shouldCalculateOnScroll) {
				if (scrollTimeoutRef.current) {
					clearTimeout(scrollTimeoutRef.current);
					scrollTimeoutRef.current = null;
				}
				return;
			}

			// 执行复杂的位置计算：元素完全可见或完全不可见时
			const currentScrollX = window.scrollX;
			const currentScrollY = window.scrollY;
			const newPosition = calculateScrollBasedPosition(
				positionRef.current,
				currentScrollX,
				currentScrollY,
				now,
			);

			// 使用计算函数判断元素是否满足条件
			const newConditionMet = compute(newPosition.boundingClientRect);

			// 更新条件状态和位置信息
			throttledSetConditionRef.current(newConditionMet, newPosition);

			scrollTimeoutRef.current = null;
		}, throttle); // 使用相同的节流时间
	}, [
		throttle,
		isMountedRef,
		forceCalibrate,
		calibrateInterval,
		ref,
		callback,
		observerOptions,
		compute,
	]);

	// 设置 Intersection Observer
	useLayoutEffect(() => {
		if (!ref.current) return;

		// 开始观察元素
		unSubscribeRef.current = lazyloadManager.observe(
			ref.current,
			callback,
			observerOptions,
		);

		window.addEventListener("scroll", throttledHandleScroll, { passive: true });

		// 清理函数
		return () => {
			if (unSubscribeRef.current) {
				unSubscribeRef.current();
			}

			window.removeEventListener("scroll", throttledHandleScroll);

			// 清理定时器
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}

			// 清理 scroll 节流定时器
			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current);
				scrollTimeoutRef.current = null;
			}
		};
	}, [ref, callback, observerOptions, throttledHandleScroll]);

	return isConditionMet;
};
