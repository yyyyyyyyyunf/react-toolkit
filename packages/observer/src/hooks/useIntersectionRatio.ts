import type React from 'react';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { lazyloadManager } from '../base/IntersectionObserverManager';
import type {
  ObserverCallbackParamType,
  ObserverOptions,
  UseIntersectionRatioOptions,
} from '../types';
import { calculateFinalThreshold } from '../utils';
import { useIsMounted } from './useIsMounted';

/**
 * 元素交叉比例 Hook
 *
 * 获取元素与根元素的交叉比例，专门用于需要监控元素可见程度的场景。
 * 基于 Intersection Observer 实现，性能优异。
 *
 * 特性：
 * - 返回元素的交叉比例（0-1 或 undefined）
 * - 支持 threshold、offset、root、throttle 等配置选项
 * - 内置节流机制，可控制更新频率
 * - 自动处理比例更新和清理
 * - 类型安全：支持 undefined 值处理
 * - 性能优化：直接使用 Intersection Observer，避免不必要的复杂计算
 *
 * @param ref 要获取交叉比例的元素的 ref
 * @param options 配置选项
 * @returns 元素的交叉比例（0-1），初始为 undefined
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const intersectionRatio = useIntersectionRatio(ref, {
 *   step: 0.1, // 每 10% 触发一次
 *   throttle: 16, // 60fps
 *   offset: 50 // 50px 偏移
 * });
 *
 * if (intersectionRatio !== undefined) {
 *   const percentage = Math.round(intersectionRatio * 100);
 *   console.log(`元素 ${percentage}% 可见`);
 *
 *   if (intersectionRatio > 0.5) {
 *     console.log('元素超过一半可见');
 *   }
 *
 *   if (intersectionRatio === 1) {
 *     console.log('元素完全可见');
 *   }
 * }
 * ```
 */
export const useIntersectionRatio = (
  ref: React.RefObject<HTMLElement | null>,
  options: UseIntersectionRatioOptions = {}
) => {
  const [intersectionRatio, setIntersectionRatio] = useState<number | undefined>(undefined);
  const isMountedRef = useIsMounted();
  /** 上次更新时间戳，用于节流控制 */
  const lastUpdateTimeRef = useRef(0);
  /** 节流定时器引用 */
  const timeoutRef = useRef<number | null>(null);

  // 解构配置选项，设置默认值
  const throttle = options.throttle ?? 16; // 默认 60fps

  /**
   * 计算最终的 threshold 数组
   * 根据配置的 step 或 threshold 生成用于 Intersection Observer 的阈值数组
   */
  const finalThreshold = useMemo(() => {
    return calculateFinalThreshold(options, 'useIntersectionRatio');
  }, [options]);

  /**
   * 创建观察器选项
   */
  const observerOptions: ObserverOptions = useMemo(
    () => ({
      threshold: finalThreshold,
      rootMargin: options.offset ? `${options.offset}px` : undefined,
      root: 'root' in options ? options.root : undefined,
    }),
    [finalThreshold, options]
  );

  /**
   * 节流更新交叉比例
   * 确保在指定时间间隔内只更新一次，同时保证最后一次更新被记录
   *
   * @param newRatio 新的交叉比例
   */
  const throttledSetRatio = useCallback(
    (newRatio: number) => {
      // 检查组件是否仍然挂载
      if (!isMountedRef.current) return;

      const now = Date.now();

      if (now - lastUpdateTimeRef.current >= throttle) {
        // 立即更新
        setIntersectionRatio(newRatio);
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
              setIntersectionRatio(newRatio);
              lastUpdateTimeRef.current = Date.now();
            }
            timeoutRef.current = null;
          },
          throttle - (now - lastUpdateTimeRef.current)
        );
      }
    },
    [throttle, isMountedRef]
  );

  /** 存储 throttledSetRatio 的 ref，避免依赖问题 */
  const throttledSetRatioRef = useRef(throttledSetRatio);

  // 更新 ref 中的值
  throttledSetRatioRef.current = throttledSetRatio;

  /**
   * 设置 Intersection Observer
   */
  useLayoutEffect(() => {
    if (!ref.current) return;

    const callback = (entry: ObserverCallbackParamType) => {
      // 检查组件是否仍然挂载
      if (!isMountedRef.current) return;

      // 使用节流更新交叉比例
      throttledSetRatioRef.current(entry.intersectionRatio);
    };

    // 开始观察
    const unsubscribe = lazyloadManager.observe(ref.current, callback, observerOptions);

    // 清理函数
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }

      // 清理定时器
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [ref.current, observerOptions, isMountedRef, throttledSetRatio]);

  return intersectionRatio;
};
