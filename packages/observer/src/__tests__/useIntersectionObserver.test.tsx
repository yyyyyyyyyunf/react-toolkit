import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn()
const mockObserve = vi.fn()
const mockUnobserve = vi.fn()
const mockDisconnect = vi.fn()

beforeEach(() => {
  mockIntersectionObserver.mockClear()
  mockObserve.mockClear()
  mockUnobserve.mockClear()
  mockDisconnect.mockClear()

  // Mock IntersectionObserver
  global.IntersectionObserver = vi.fn().mockImplementation((callback) => {
    mockIntersectionObserver(callback)
    return {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    }
  })
})

describe('useIntersectionObserver', () => {
  it('should create IntersectionObserver with default options', () => {
    const callback = vi.fn()
    renderHook(() => useIntersectionObserver(callback))

    expect(mockIntersectionObserver).toHaveBeenCalledWith(callback)
    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      callback,
      expect.objectContaining({
        root: null,
        rootMargin: '0px',
        threshold: 0,
      })
    )
  })

  it('should create IntersectionObserver with custom options', () => {
    const callback = vi.fn()
    const options = {
      root: document.body,
      rootMargin: '10px',
      threshold: [0, 0.5, 1],
    }

    renderHook(() => useIntersectionObserver(callback, options))

    expect(global.IntersectionObserver).toHaveBeenCalledWith(callback, options)
  })

  it('should return observer instance', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useIntersectionObserver(callback))

    expect(result.current).toEqual({
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    })
  })

  it('should disconnect observer on unmount', () => {
    const callback = vi.fn()
    const { unmount } = renderHook(() => useIntersectionObserver(callback))

    unmount()

    expect(mockDisconnect).toHaveBeenCalled()
  })

  it('should recreate observer when callback changes', () => {
    const callback1 = vi.fn()
    const callback2 = vi.fn()

    const { rerender } = renderHook(
      ({ callback }) => useIntersectionObserver(callback),
      { initialProps: { callback: callback1 } }
    )

    expect(mockIntersectionObserver).toHaveBeenCalledTimes(1)
    expect(mockDisconnect).toHaveBeenCalledTimes(0)

    rerender({ callback: callback2 })

    expect(mockDisconnect).toHaveBeenCalledTimes(1)
    expect(mockIntersectionObserver).toHaveBeenCalledTimes(2)
  })

  it('should recreate observer when options change', () => {
    const callback = vi.fn()
    const options1 = { threshold: 0 }
    const options2 = { threshold: 0.5 }

    const { rerender } = renderHook(
      ({ options }) => useIntersectionObserver(callback, options),
      { initialProps: { options: options1 } }
    )

    expect(mockIntersectionObserver).toHaveBeenCalledTimes(1)
    expect(mockDisconnect).toHaveBeenCalledTimes(0)

    rerender({ options: options2 })

    expect(mockDisconnect).toHaveBeenCalledTimes(1)
    expect(mockIntersectionObserver).toHaveBeenCalledTimes(2)
  })
})
