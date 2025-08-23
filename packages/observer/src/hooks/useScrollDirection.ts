import { useCallback, useMemo, useRef, useState } from "react";
import type { ScrollDirection, UseScrollDirectionOptions } from "../types";
import { generateThresholdArray } from "../utils";
import { useIntersectionObserver } from "./useIntersectionObserver";

/**
 * 滚动方向检测 Hook
 *
 * 专门用于检测元素在滚动过程中的移动方向。
 * 提供实时的滚动方向信息和滚动状态，支持节流控制和自定义配置。
 * 
 * 浏览器兼容性：
 * - 支持 IntersectionObserver 的浏览器：使用原生 API，性能最佳
 * - 不支持 IntersectionObserver 的浏览器：自动降级到 scroll 事件 + getBoundingClientRect
 * - 降级策略提供相同的 API 接口，确保功能一致性
 *
 * 特性：
 * - 实时检测滚动方向（上、下、左、右、无）
 * - 内置节流机制，可控制更新频率
 * - 支持基于 viewport 和自定义 root 的检测
 * - 提供滚动状态指示器
 * - 支持 step 和 threshold 两种配置方式
 * - 类型安全：支持 null 值处理
 * - 浏览器兼容性：自动降级支持旧版浏览器
 *
 * @param ref 要检测滚动方向的元素的 ref
 * @param options 配置选项
 * @returns 包含滚动方向和滚动状态的对象
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const { scrollDirection, isScrolling } = useScrollDirection(ref, {
 *   step: 0.1, // 每 10% 触发一次
 *   throttle: 100, // 100ms 节流
 *   offset: 50 // 50px 偏移
 * });
 *
 * // 根据滚动方向执行不同逻辑
 * if (scrollDirection === 'up') {
 *   console.log('向上滚动');
 * } else if (scrollDirection === 'down') {
 *   console.log('向下滚动');
 * }
 *
 * // 检查是否正在滚动
 * if (isScrolling) {
 *   console.log('正在滚动中...');
 * }
 * ```
 */
export const useScrollDirection = (
	ref: React.RefObject<HTMLElement | null>,
	options: UseScrollDirectionOptions = {},
) => {
	/** 当前滚动方向 */
	const [scrollDirection, setScrollDirection] =
		useState<ScrollDirection>("none");
	/** 是否正在滚动 */
	const [isScrolling, setIsScrolling] = useState(false);
	/** 上次滚动方向，用于避免重复更新 */
	const lastDirectionRef = useRef<ScrollDirection>("none");
	/** 滚动状态重置定时器 */
	const timeoutRef = useRef<number | null>(null);

	// 解构配置选项，设置默认值，避免对象引用问题
	const offset = options.offset ?? 0;
	const throttle = options.throttle ?? 100; // 默认 100ms 节流，避免过于频繁的更新

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
				"useScrollDirection: step 和 threshold 不能同时设置，将使用 threshold",
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
		return [0, 0.25, 0.5, 0.75, 1];
	}, [step, threshold]);

	/**
	 * 节流更新滚动方向
	 * 确保在指定时间间隔内只更新一次，同时管理滚动状态
	 *
	 * @param direction 新的滚动方向
	 */
	const throttledSetScrollDirection = useCallback(
		(direction: ScrollDirection) => {
			// 如果方向没有变化，不更新
			if (direction === lastDirectionRef.current) {
				return;
			}

			lastDirectionRef.current = direction;
			setScrollDirection(direction);
			setIsScrolling(true);

			// 清除之前的定时器
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			// 设置定时器，在指定时间后重置滚动状态
			timeoutRef.current = setTimeout(() => {
				setIsScrolling(false);
				timeoutRef.current = null;
			}, throttle);
		},
		[throttle],
	);

	// 使用 Intersection Observer 监听元素位置变化
	useIntersectionObserver(
		ref,
		(entry) => {
			// 获取滚动方向
			if (entry.scrollDirection && entry.scrollDirection !== "none") {
				throttledSetScrollDirection(entry.scrollDirection);
			}
		},
		{
			threshold: finalThreshold,
			rootMargin: `${offset}px`,
			root,
		},
	);

	// 使用 useMemo 包裹返回值，避免不必要的重新渲染
	return useMemo(
		() => ({ scrollDirection, isScrolling }),
		[scrollDirection, isScrolling],
	);
};
