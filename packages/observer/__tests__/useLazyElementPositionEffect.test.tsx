import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import { useRef } from 'react';
import { useLazyElementPositionEffect } from '../src/hooks/useLazyElementPositionEffect';

// 模拟依赖
vi.mock('../src/hooks/useLazyElementPositionRef', () => ({
  useLazyElementPositionRef: vi.fn(() => {
    let callCount = 0;
    // 模拟位置变化：第一次返回 position1，第二次返回 position2（不同引用），第三次返回 position1（相同引用）
    const position1 = {
      boundingClientRect: { top: 100, left: 100, right: 200, bottom: 200, width: 100, height: 100 },
      intersectionRatio: 1,
      isIntersecting: true,
      scrollX: 0,
      scrollY: 0,
      time: Date.now(),
    };
    const position2 = {
      boundingClientRect: { top: 200, left: 200, right: 300, bottom: 300, width: 100, height: 100 },
      intersectionRatio: 1,
      isIntersecting: true,
      scrollX: 0,
      scrollY: 0,
      time: Date.now(),
    };
    const positions = [position1, position2, position1]; // 第三次返回 position1（相同引用）
    return () => {
      const position = positions[callCount % positions.length];
      callCount++;
      return position;
    };
  }),
}));

// 模拟 IntersectionObserver
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();
const mockDisconnect = vi.fn();

beforeEach(() => {
  mockObserve.mockClear();
  mockUnobserve.mockClear();
  mockDisconnect.mockClear();
  vi.useFakeTimers();

  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: mockObserve,
    unobserve: mockUnobserve,
    disconnect: mockDisconnect,
  }));

  // 模拟 window 对象
  Object.defineProperty(window, 'scrollX', {
    writable: true,
    value: 0,
  });
  Object.defineProperty(window, 'scrollY', {
    writable: true,
    value: 0,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    value: 1000,
  });
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    value: 1000,
  });
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useLazyElementPositionEffect', () => {
  it('should return a function', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      const callback = vi.fn();
      return useLazyElementPositionEffect(ref, {
        callback,
        interval: 100,
        count: 1,
      });
    });

    expect(typeof result.current).toBe('function');
  });

  it('should call callback immediately when interval is 0', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      return useLazyElementPositionEffect(ref, {
        callback,
        interval: 0,
        count: 1,
      });
    });

    act(() => {
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should call callback when position changes', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      return useLazyElementPositionEffect(ref, {
        callback,
        interval: 100,
        count: 3,
      });
    });

    act(() => {
      result.current();
    });

    // 立即执行一次
    expect(callback).toHaveBeenCalledTimes(1);

    // 等待定时器触发
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // 位置变化了，应该再次调用
    expect(callback).toHaveBeenCalledTimes(2);

    act(() => {
      vi.advanceTimersByTime(100);
    });

    // 位置又变化了，应该再次调用
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('should not call callback when position does not change', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      return useLazyElementPositionEffect(ref, {
        callback,
        interval: 100,
        count: 5,
      });
    });

    act(() => {
      result.current();
    });

    // 立即执行一次
    expect(callback).toHaveBeenCalledTimes(1);

    // 等待定时器触发多次
    act(() => {
      vi.advanceTimersByTime(100);
    });
    // 位置变化了
    expect(callback).toHaveBeenCalledTimes(2);

    act(() => {
      vi.advanceTimersByTime(100);
    });
    // 位置又变化了
    expect(callback).toHaveBeenCalledTimes(3);

    act(() => {
      vi.advanceTimersByTime(100);
    });
    // 位置相同，不应该调用
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('should stop after count executions', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      return useLazyElementPositionEffect(ref, {
        callback,
        interval: 100,
        count: 2,
      });
    });

    act(() => {
      result.current();
    });

    // 立即执行一次
    expect(callback).toHaveBeenCalledTimes(1);

    // 等待定时器触发
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // 应该已经执行了 2 次，停止
    expect(callback).toHaveBeenCalledTimes(2);

    // 再等待，不应该再调用
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should cleanup interval on unmount', () => {
    const callback = vi.fn();
    const { result, unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      return useLazyElementPositionEffect(ref, {
        callback,
        interval: 100,
        count: 10,
      });
    });

    act(() => {
      result.current();
    });

    // 卸载组件
    unmount();

    // 等待定时器触发，不应该调用
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // 只应该调用一次（立即执行的那次）
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should reset state when startDetection is called again', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      return useLazyElementPositionEffect(ref, {
        callback,
        interval: 100,
        count: 2,
      });
    });

    // 第一次调用
    act(() => {
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(callback).toHaveBeenCalledTimes(2);
    // 此时已达到 count=2，状态已自动重置，定时器已停止

    // 再次调用，应该可以开始新的检测（因为之前的任务已完成）
    act(() => {
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(3);

    act(() => {
      vi.advanceTimersByTime(100);
    });

    // 注意：由于 mock 的 callCount 是全局的，第二次调用后定时器触发时
    // callCount=3，返回 position1（和上次相同），所以位置没有变化，不会调用回调
    // 这是符合设计的行为：只有当位置发生变化时才调用回调
    // 这里我们验证的是：任务完成后可以开始新的检测，即使位置相同也不会重复调用
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('should not start new detection if one is already running', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      return useLazyElementPositionEffect(ref, {
        callback,
        interval: 100,
        count: 3,
      });
    });

    // 第一次调用
    act(() => {
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(1);

    // 在任务还在运行时，再次调用应该直接返回，不执行
    act(() => {
      result.current();
    });

    // 回调次数不应该增加
    expect(callback).toHaveBeenCalledTimes(1);

    // 等待定时器触发
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // 应该只有第一次调用的定时器在运行
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should handle default values', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(null);
      return useLazyElementPositionEffect(ref, {
        callback,
        // interval 默认 0
        // count 默认 1
      });
    });

    act(() => {
      result.current();
    });

    // 应该立即执行一次
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
