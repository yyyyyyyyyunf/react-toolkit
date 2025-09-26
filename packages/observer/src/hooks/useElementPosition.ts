import type React from "react";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { lazyloadManager } from "../base/IntersectionObserverManager";
import type {
	ElementPosition,
	ObserverCallbackParamType,
	ObserverOptions,
	Options,
	UnSubscribeType,
} from "../types";
import {
	calculateFinalThreshold,
	calculateScrollBasedPosition,
	checkIfShouldSyncPosition,
} from "../utils";
import { useIsMounted } from "./useIsMounted";

/**
 * 元素位置跟踪 Hook (State 版本)
 *
 * 实时跟踪元素在视口中的位置变化，会触发组件重新渲染。
 * 适用于需要根据元素位置变化更新 UI 的场景。
 * 
 * 浏览器兼容性：
 * - 支持 IntersectionObserver 的浏览器：使用原生 API，性能最佳
 * - 不支持 IntersectionObserver 的浏览器：使用标准的 intersection-observer polyfill
 * - 使用标准的 intersection-observer polyfill，确保在所有浏览器中都能正常工作

 * 核心特性：
 * - 使用 useState 存储位置信息，会触发组件重新渲染
 * - 支持基于 viewport 和自定义 root 的位置跟踪
 * - 内置节流机制，可控制更新频率
 * - 支持 step 和 threshold 两种配置方式
 * - 提供相对位置计算功能
 * - 自动处理组件挂载状态，防止内存泄漏
 * - 类型安全：支持 null 值处理
 * - 浏览器兼容性：使用标准 polyfill 支持所有浏览器
 *
 * 性能优化策略：
 * - 智能计算策略：结合 Intersection Observer 和 scroll 事件
 * - 避免重复计算：元素部分可见时，依赖 Intersection Observer 自动触发
 * - 精确更新：元素完全可见/不可见时，使用 scroll 事件进行位置同步
 * - 校准机制：定期使用 Intersection Observer 校准位置，确保数据准确性
 * - 节流控制：scroll 事件使用节流机制，避免过度计算
 *
 * @param ref 要跟踪的元素的 ref
 * @param options 配置选项
 * @returns 元素位置信息，如果元素一开始就在视口中会立即有值，否则为 null
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const position = useElementPosition(ref, {
 *   step: 0.1, // 每 10% 触发一次
 *   throttle: 16, // 60fps
 *   forceCalibrate: true, // 启用强制校准
 *   calibrateInterval: 2500, // 校准间隔 2.5 秒
 * });
 *
 * if (position) {
 *   console.log('元素位置:', position.boundingClientRect);
 *   console.log('交叉比例:', position.intersectionRatio);
 *   console.log('是否相交:', position.isIntersecting);
 *   console.log('滚动位置:', { x: position.scrollX, y: position.scrollY });
 *   console.log('时间戳:', position.time);
 * }
 * ```
 */
export const useElementPosition = (
	ref: React.RefObject<HTMLElement | null>,
	options: Options = {},
) => {
	/** 当前元素位置信息，使用 useState 会触发重新渲染 */
	const [position, setPosition] = useState<ElementPosition | null>(null);
	/** 使用 ref 存储最新的 position 值，避免依赖问题 */
	const positionRef = useRef<ElementPosition | null>(null);
	/** 上次更新时间戳，用于节流控制 */
	const lastUpdateTimeRef = useRef(0);
	/** 上次强制校准时间戳，用于控制校准频率 */
	const lastCalibrateTimeRef = useRef(0);
	/** 节流定时器引用 */
	const timeoutRef = useRef<number | null>(null);
	/** scroll 事件节流定时器引用 */
	const scrollTimeoutRef = useRef<number | null>(null);
	/** 组件挂载状态跟踪 */
	const isMountedRef = useIsMounted();

	// 解构配置选项，设置默认值，避免对象引用问题
	const offset = options.offset ?? 0;
	const throttle = options.throttle ?? 16; // 默认 60fps
	const forceCalibrate = options.forceCalibrate ?? true; // 元素完全不可见时跳过更新
	const calibrateInterval = options.calibrateInterval ?? 2500; // 校准间隔

	// 处理 root 和 relativeToRoot 选项
	const root = "root" in options ? options.root : null;
	const relativeToRoot =
		root && "relativeToRoot" in options ? options.relativeToRoot : false;

	/**
	 * 计算最终的 threshold 数组
	 * 根据配置的 step 或 threshold 生成用于 Intersection Observer 的阈值数组
	 */
	const finalThreshold = useMemo(() => {
		return calculateFinalThreshold(options, "useElementPosition");
	}, [options]);

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
				setPosition(newPosition);
				positionRef.current = newPosition; // 同时更新 ref
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
							setPosition(newPosition);
							positionRef.current = newPosition; // 同时更新 ref
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

	// 同步 position 到 positionRef，确保 ref 中始终有最新值
	useLayoutEffect(() => {
		positionRef.current = position;
	}, [position]);

	const unSubscribeRef = useRef<UnSubscribeType | undefined>(undefined);

	/**
	 * Intersection Observer 回调函数
	 * 处理元素位置变化，计算相对位置并更新状态
	 */
	const callback = useCallback(
		(entry: ObserverCallbackParamType) => {
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
				scrollX: window.scrollX,
				scrollY: window.scrollY,
			};

			// 使用节流更新位置
			throttledSetPositionRef.current(newPosition);
		},
		[relativeToRoot, root],
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

			// 使用 ref 获取最新的 position 值，避免依赖问题
			const currentPosition = positionRef.current;
			if (!currentPosition) {
				scrollTimeoutRef.current = null;
				return;
			}

			// 智能判断当前状态下的处理策略
			const { shouldCalibrate, shouldCalculateOnScroll } =
				checkIfShouldSyncPosition(
					currentPosition,
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
				currentPosition,
				currentScrollX,
				currentScrollY,
				now,
			);

			throttledSetPositionRef.current(newPosition);

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
		// 移除 position 依赖，使用 positionRef.current 获取最新值
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

	return position;
};
