import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { createMemoComponent } from '../core/createMemoComponent'
import type { MemoOptions } from '../types'

// Mock console.log for debug tests
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('createMemoComponent', () => {
  beforeEach(() => {
    consoleSpy.mockClear()
  })

  it('should create a memoized component', () => {
    const TestComponent = createMemoComponent<{ name: string }>(({ name }) => (
      <div>Hello {name}</div>
    ))

    render(<TestComponent name="World" />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('should prevent re-renders when props are the same', () => {
    const renderSpy = vi.fn()
    
    const TestComponent = createMemoComponent<{ name: string }>(({ name }) => {
      renderSpy()
      return <div>Hello {name}</div>
    })

    const { rerender } = render(<TestComponent name="World" />)
    expect(renderSpy).toHaveBeenCalledTimes(1)

    // Re-render with same props
    rerender(<TestComponent name="World" />)
    expect(renderSpy).toHaveBeenCalledTimes(1) // Should not re-render
  })

  it('should re-render when props change', () => {
    const renderSpy = vi.fn()
    
    const TestComponent = createMemoComponent<{ name: string }>(({ name }) => {
      renderSpy()
      return <div>Hello {name}</div>
    })

    const { rerender } = render(<TestComponent name="World" />)
    expect(renderSpy).toHaveBeenCalledTimes(1)

    // Re-render with different props
    rerender(<TestComponent name="React" />)
    expect(renderSpy).toHaveBeenCalledTimes(2) // Should re-render
  })

  it('should use custom comparison function when provided', () => {
    const customCompare = vi.fn((prev: any, next: any) => prev.id === next.id)
    
    const options: MemoOptions<{ id: number; name: string }> = {
      compare: customCompare
    }

    const TestComponent = createMemoComponent<{ id: number; name: string }>(
      ({ id, name }) => <div>{id}: {name}</div>,
      options
    )

    const { rerender } = render(<TestComponent id={1} name="First" />)
    
    // Re-render with same id but different name
    rerender(<TestComponent id={1} name="Updated" />)
    
    expect(customCompare).toHaveBeenCalled()
    // Should not re-render because custom compare returns true for same id
    expect(screen.getByText('1: First')).toBeInTheDocument()
  })

          it('should auto-generate display name when not provided', () => {
      function NamedComponent({ name }: { name: string }) {
        return <div>Hello {name}</div>
      }

      const TestComponent = createMemoComponent(NamedComponent)
      expect(TestComponent.displayName).toBe('Memo-(NamedComponent)')
    })

    it('should handle anonymous components', () => {
      const TestComponent = createMemoComponent<{ name: string }>(({ name }) => (
        <div>Hello {name}</div>
      ))

      expect(TestComponent.displayName).toBe('Memo-()')
    })

      it('should only compare specified props', () => {
      const renderSpy = vi.fn()
      
      const options: MemoOptions<{ id: number; timestamp: number }> = {
        propKeys: ['id'] // 只比较 id，忽略 timestamp
      }

      const TestComponent = createMemoComponent<{ id: number; timestamp: number }>(
        ({ id, timestamp }) => {
          renderSpy()
          return <div>{id} - {timestamp}</div>
        },
        options
      )

      const { rerender } = render(<TestComponent id={1} timestamp={1000} />)
      expect(renderSpy).toHaveBeenCalledTimes(1)

      // Re-render with same id but different timestamp (should be ignored)
      rerender(<TestComponent id={1} timestamp={2000} />)
      expect(renderSpy).toHaveBeenCalledTimes(1) // Should not re-render
    })
})
