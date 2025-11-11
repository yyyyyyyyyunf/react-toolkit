import type React from 'react';
import { useCallback, useLayoutEffect, useRef } from 'react';
import type { ElementPosition, UseLazyElementPositionEffectOptions } from '../types';
import { useLazyElementPositionRef } from './useLazyElementPositionRef';

/**
 * 延迟计算元素位置并定时检测 Hook
 *
 * 基于 useLazyElementPositionRef，增加定时检测功能。
 * 返回一个函数，调用时才开始执行定时检测。
 * 每隔指定时间间隔检测一次元素位置，如果位置发生变化则调用回调函数。
 *
 * 浏览器兼容性：
 * - 支持 IntersectionObserver 的浏览器：使用原生 API，性能最佳
 * - 不支持 IntersectionObserver 的浏览器：使用标准的 intersection-observer polyfill
 * - 使用标准的 intersection-observer polyfill，确保在所有浏览器中都能正常工作
 *
 * 核心特性：
 * - 延迟执行：返回一个函数，调用时才开始执行定时检测
 * - 定时检测：每隔指定时间间隔检测一次元素位置
 * - 变化检测：只有当位置发生变化时才调用回调
 * - 执行次数控制：可以指定执行次数，达到次数后自动停止
 * - 立即执行：如果 interval 为 0，立即执行一次检测
 * - 自动清理：组件卸载时自动清理定时器
 *
 * @param ref 要跟踪的元素的 ref
 * @param options 配置选项
 *   - interval: 时间间隔（毫秒），默认 0（立即调用）
 *   - count: 执行次数，默认 1
 *   - callback: 回调函数，当位置变化时调用
 *   - 其他选项继承自 useLazyElementPositionRef
 * @returns 返回一个函数，调用时才开始执行定时检测
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const startDetection = useLazyElementPositionEffect(ref, {
 *   interval: 100, // 每 100ms 检测一次
 *   count: 10, // 执行 10 次
 *   callback: (position) => {
 *     if (position) {
 *       console.log('位置变化:', position.boundingClientRect);
 *     }
 *   },
 *   step: 0.1,
 *   throttle: 16,
 * });
 *
 * // 在需要时开始检测
 * const handleClick = () => {
 *   startDetection();
 * };
 * ```
 */
export const useLazyElementPositionEffect = (
  ref: React.RefObject<HTMLElement | null>,
  options: UseLazyElementPositionEffectOptions
): (() => void) => {
  // 获取 useLazyElementPositionRef 返回的 getPosition 函数
  const getPosition = useLazyElementPositionRef(ref, options);

  // 解构新增的选项
  const interval = options.interval ?? 0;
  const count = options.count ?? 1;
  const callback = options.callback;

  // 存储上次的位置信息，用于比较变化
  const lastPositionRef = useRef<ElementPosition | null>(null);
  // 存储已执行次数
  const executedCountRef = useRef<number>(0);
  // 存储定时器 ID
  const intervalIdRef = useRef<number | null>(null);

  /**
   * 执行一次位置检测
   */
  const checkPosition = useCallback(() => {
    // 获取当前位置
    const currentPosition = getPosition();

    // 比较位置是否变化（useLazyElementPositionRef 的 getPosition 在位置不一样时会返回不同的引用）
    // 如果 lastPositionRef.current 为 null，说明是第一次检测，应该视为位置变化
    const hasChanged =
      lastPositionRef.current === null || lastPositionRef.current !== currentPosition;

    // 如果位置发生变化，调用回调
    if (hasChanged && callback && currentPosition) {
      callback(currentPosition);
    }

    // 更新上次位置
    lastPositionRef.current = currentPosition;
    // 增加执行次数
    executedCountRef.current += 1;

    // 如果已经达到执行次数，停止检测并重置状态
    if (executedCountRef.current >= count) {
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      // 重置状态，为下次调用做准备
      lastPositionRef.current = null;
      executedCountRef.current = 0;
    }
  }, [getPosition, count, callback]);

  /**
   * 启动定时检测的函数
   * 调用时才开始执行定时检测
   * 如果已经有任务在运行，直接返回，不中断当前任务
   */
  const startDetection = useCallback(() => {
    // 如果已经在运行，直接返回，不中断当前任务
    if (intervalIdRef.current !== null) {
      return;
    }

    // 重置状态（开始新的检测周期）
    lastPositionRef.current = null;
    executedCountRef.current = 0;

    // 如果 interval 为 0，立即执行一次
    if (interval === 0) {
      checkPosition();
      return;
    }

    // 立即执行一次
    checkPosition();

    // 如果还需要执行更多次，启动定时器
    if (executedCountRef.current < count) {
      intervalIdRef.current = setInterval(() => {
        checkPosition();
      }, interval);
    }
  }, [interval, count, checkPosition]);

  // 组件卸载时清理定时器
  useLayoutEffect(() => {
    return () => {
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, []);

  return startDetection;
};
