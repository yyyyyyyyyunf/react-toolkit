import { useLayoutEffect, useMemo, useRef } from 'react';
import { lazyloadManager } from '../base/IntersectionObserverManager';
import type { ObserverOptions, OneOffVisibilityOptions } from '../types';
import { useIsMounted } from './useIsMounted';

/**
 * 一次性可见性检测 Effect Hook
 *
 * 检测元素是否曾经可见过，一旦可见就执行用户指定的回调函数。
 * 适用于懒加载、一次性动画触发、数据加载等场景。
 *
 * 浏览器兼容性：
 * - 支持 IntersectionObserver 的浏览器：使用原生 API，性能最佳
 * - 不支持 IntersectionObserver 的浏览器：使用标准的 intersection-observer polyfill
 * - 使用标准的 intersection-observer polyfill，确保在所有浏览器中都能正常工作
 *
 * 特性：
 * - 一旦元素可见，立即执行回调函数
 * - 自动设置 once: true，避免重复触发
 * - 自动处理组件挂载状态，防止内存泄漏
 * - 简单易用，无需手动管理状态
 * - 类型安全：支持 null 值处理
 * - 使用 threshold 参数设置触发阈值
 * - 浏览器兼容性：使用标准 polyfill 支持所有浏览器
 *
 * @param ref 要检测可见性的元素的 ref
 * @param callback 当元素可见时要执行的回调函数
 * @param options 配置参数，包含可选的 threshold、offset 和 enable
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const [shouldObserve, setShouldObserve] = useState(true);
 *
 * // 执行懒加载
 * useOneOffVisibilityEffect(ref, () => {
 *   console.log('元素已可见，开始加载数据');
 *   loadData();
 * }, { threshold: 0.5, offset: 100 });
 *
 * // 使用 enable 控制是否观察
 * useOneOffVisibilityEffect(ref, () => {
 *   elementRef.current?.classList.add('animate-in');
 * }, {
 *   threshold: 0.1,
 *   offset: 100,
 *   enable: shouldObserve
 * });
 *
 * // 发送分析事件
 * useOneOffVisibilityEffect(ref, () => {
 *   analytics.track('element_viewed', { elementId: 'hero-section' });
 * });
 * ```
 */
export const useOneOffVisibilityEffect = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
  options: OneOffVisibilityOptions = {}
) => {
  /** 组件挂载状态跟踪 */
  const isMountedRef = useIsMounted();

  /** 是否已经执行过回调的标记 */
  const hasExecutedRef = useRef(false);

  // 解构 options 以避免对象引用问题
  const { threshold = 0.1, offset = 100, enable = true } = options;

  // 构建稳定的 observer options 对象
  const observerOptions: ObserverOptions = useMemo(() => {
    return {
      threshold,
      rootMargin: offset > 0 ? `${offset}px` : '0px',
      once: true, // 确保只触发一次
    };
  }, [threshold, offset]);

  // 使用 useRef 来存储最新的 callback，避免依赖问题
  const callbackRef = useRef<() => void>();

  // 更新 ref 中的回调函数
  callbackRef.current = callback;

  // 使用 useLayoutEffect 确保在浏览器绘制前开始观察
  useLayoutEffect(() => {
    if (!ref.current || !enable) return;

    // 如果已经执行过回调，就不再观察
    if (hasExecutedRef.current) {
      return;
    }

    // 开始观察元素，返回清理函数
    const unSubscribe = lazyloadManager.observe(
      ref.current,
      entry => {
        // 只有在组件仍然挂载、元素可见且未执行过回调时才执行
        if (
          entry.isIntersecting &&
          isMountedRef.current &&
          !hasExecutedRef.current &&
          callbackRef.current
        ) {
          hasExecutedRef.current = true;
          callbackRef.current();
        }
      },
      observerOptions
    );

    // 清理函数：取消观察
    return () => {
      if (unSubscribe) {
        unSubscribe();
      }
    };
  }, [ref, enable, observerOptions, isMountedRef]);
};
