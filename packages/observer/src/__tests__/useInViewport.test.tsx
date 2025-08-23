import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRef } from 'react'
import { useInViewport } from '../hooks/useInViewport'

// Mock IntersectionObserver
const mockObserve = vi.fn()
const mockUnobserve = vi.fn()
const mockDisconnect = vi.fn()

beforeEach(() => {
  mockObserve.mockClear()
  mockUnobserve.mockClear()
  mockDisconnect.mockClear()

  global.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
    observe: mockObserve,
    unobserve: mockUnobserve,
    disconnect: mockDisconnect,
    // Store callback for manual triggering
    callback,
  }))
})

describe('useInViewport', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      return useInViewport(ref)
    })

    expect(result.current.isInViewport).toBe(false)
    expect(result.current.entry).toBeNull()
  })

  it('should observe element when ref is set', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      return { ref, viewport: useInViewport(ref) }
    })

    // Simulate setting the ref
    const mockElement = document.createElement('div')
    act(() => {
      result.current.ref.current = mockElement
    })

    expect(mockObserve).toHaveBeenCalledWith(mockElement)
  })

  it('should update state when intersection changes', () => {
    let intersectionCallback: ((entries: IntersectionObserverEntry[]) => void) | null = null

    global.IntersectionObserver = vi.fn().mockImplementation((callback) => {
      intersectionCallback = callback
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: mockDisconnect,
      }
    })

    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      return { ref, viewport: useInViewport(ref) }
    })

    // Simulate element entering viewport
    const mockEntry = {
      isIntersecting: true,
      target: result.current.ref.current,
      intersectionRatio: 0.5,
    } as IntersectionObserverEntry

    act(() => {
      if (intersectionCallback) {
        intersectionCallback([mockEntry])
      }
    })

    expect(result.current.viewport.isInViewport).toBe(true)
    expect(result.current.viewport.entry).toEqual(mockEntry)
  })

  it('should use custom threshold', () => {
    const options = { threshold: 0.5 }

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      return useInViewport(ref, options)
    })

    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({ threshold: 0.5 })
    )
  })

  it('should cleanup observer on unmount', () => {
    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      return useInViewport(ref)
    })

    unmount()

    expect(mockDisconnect).toHaveBeenCalled()
  })

  it('should handle multiple threshold values', () => {
    const options = { threshold: [0, 0.25, 0.5, 0.75, 1] }

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      return useInViewport(ref, options)
    })

    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({ threshold: [0, 0.25, 0.5, 0.75, 1] })
    )
  })
})
