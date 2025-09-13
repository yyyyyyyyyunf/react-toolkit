import { useCallback, useMemo, useState } from "react";
import type {
	ObserverCallbackParamType,
	ObserverOptions,
	OneOffVisibilityOptions,
} from "../types";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { useIsMounted } from "./useIsMounted";

/**
 * 一次性可见性检测 Hook
 *
 * 检测元素是否曾经可见过，一旦可见就保持为 true。
 * 适用于懒加载、一次性动画触发等场景。
 *
 * 浏览器兼容性：
 * - 支持 IntersectionObserver 的浏览器：使用原生 API，性能最佳
 * - 不支持 IntersectionObserver 的浏览器：使用标准的 intersection-observer polyfill
 * - 使用标准的 intersection-observer polyfill，确保在所有浏览器中都能正常工作
 *
 * 特性：
 * - 一旦元素可见，状态永久保持为 true
 * - 自动设置 once: true，避免重复触发
 * - 自动处理组件挂载状态，防止内存泄漏
 * - 简单易用，无需手动管理状态
 * - 类型安全：支持 null 值处理
 * - 使用 threshold 参数设置触发阈值
 * - 浏览器兼容性：使用标准 polyfill 支持所有浏览器
 *
 * @param ref 要检测可见性的元素的 ref
 * @param options 配置参数，包含可选的 threshold 和 offset
 *
 * @returns 元素是否曾经可见过
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 *
 * // 使用自定义 threshold
 * const isVisible1 = useOneOffVisibility(ref, { threshold: 0.5, offset: 100 });
 *
 * // 使用默认配置
 * const isVisible2 = useOneOffVisibility(ref); // 默认 { threshold: 0.1, offset: 100 }
 *
 * if (isVisible) {
 *   // 元素已经可见过，执行一次性逻辑
 *   console.log('元素已可见');
 *   // 可以在这里执行懒加载、动画等操作
 * }
 * ```
 */
export const useOneOffVisibility = (
	ref: React.RefObject<HTMLElement | null>,
	options: OneOffVisibilityOptions = {},
) => {
	/** 元素是否曾经可见过 */
	const [isVisible, setIsVisible] = useState(false);

	/** 组件挂载状态跟踪 */
	const isMountedRef = useIsMounted();

	// 解构 options 以避免对象引用问题
	const { threshold = 0.1, offset = 100 } = options;

	// 构建稳定的 observer options 对象
	const observerOptions: ObserverOptions = useMemo(() => {
		return {
			threshold,
			rootMargin: offset > 0 ? `${offset}px` : "0px",
			once: true, // 确保只触发一次
		};
	}, [threshold, offset]);

	// 使用 useCallback 稳定回调函数，内部处理挂载状态
	const callback = useCallback(
		(entry: ObserverCallbackParamType) => {
			// 只有在组件仍然挂载时才更新状态
			if (entry.isIntersecting && isMountedRef.current) {
				setIsVisible(true);
			}
		},
		[isMountedRef],
	);

	// 使用 Intersection Observer 检测可见性
	useIntersectionObserver(ref, callback, observerOptions);

	return isVisible;
};
