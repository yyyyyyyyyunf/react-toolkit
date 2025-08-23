import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { createMemoComponent } from '../src/core/createMemoComponent'
import { MemoOptions } from '../src/types'

// Mock console.log for debug tests
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('createMemoComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render component correctly', () => {
    const TestComponent = createMemoComponent<{ name: string }>(
      ({ name }) => <div>Hello {name}</div>
    )

    render(<TestComponent name="World" />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('should not re-render when props are the same', () => {
    const renderSpy = vi.fn()
    const TestComponent = createMemoComponent<{ name: string }>(
      ({ name }) => {
        renderSpy()
        return <div>Hello {name}</div>
      }
    )

    const { rerender } = render(<TestComponent name="World" />)
    expect(renderSpy).toHaveBeenCalledTimes(1)

    rerender(<TestComponent name="World" />)
    expect(renderSpy).toHaveBeenCalledTimes(1) // Should not re-render
  })

  it('should re-render when props change', () => {
    const renderSpy = vi.fn()
    const TestComponent = createMemoComponent<{ name: string }>(
      ({ name }) => {
        renderSpy()
        return <div>Hello {name}</div>
      }
    )

    const { rerender } = render(<TestComponent name="World" />)
    expect(renderSpy).toHaveBeenCalledTimes(1)

    rerender(<TestComponent name="React" />)
    expect(renderSpy).toHaveBeenCalledTimes(2) // Should re-render
  })

  it('should set display name correctly', () => {
    const TestComponent = createMemoComponent<{ name: string }>(
      ({ name }) => <div>Hello {name}</div>
    )
    expect(TestComponent.displayName).toBe('Memo-()') // 匿名组件的默认 displayName
  })

  it('should auto-generate display name when not provided', () => {
    function NamedComponent({ name }: { name: string }) {
      return <div>Hello {name}</div>
    }
    const TestComponent = createMemoComponent(NamedComponent)
    expect(TestComponent.displayName).toBe('Memo-(NamedComponent)') // Updated expectation
  })

  it('should handle anonymous components', () => {
    const TestComponent = createMemoComponent<{ name: string }>(({ name }) => (
      <div>Hello {name}</div>
    ))
    expect(TestComponent.displayName).toBe('Memo-()') // Updated expectation
  })

  it('should only compare specified props', () => { // Renamed test
    const renderSpy = vi.fn()
    const options: MemoOptions<{ id: number; timestamp: number }> = {
      propKeys: ['id'] // Changed from ignoreProps to propKeys
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
    rerender(<TestComponent id={1} timestamp={2000} />)
    expect(renderSpy).toHaveBeenCalledTimes(1) // Should not re-render
  })

  it('should use custom compare function', () => {
    const renderSpy = vi.fn()
    const customCompare = vi.fn((prev: { id: number; name: string }, next: { id: number; name: string }) => prev.id === next.id);
    
    const TestComponent = createMemoComponent<{ id: number; name: string }>(
      ({ id, name }) => {
        renderSpy()
        return <div>{id} - {name}</div>
      },
      { compare: customCompare }
    )

    const { rerender } = render(<TestComponent id={1} name="Alice" />)
    expect(renderSpy).toHaveBeenCalledTimes(1)

    rerender(<TestComponent id={1} name="Bob" />)
    expect(renderSpy).toHaveBeenCalledTimes(1) // Should not re-render due to custom compare
    expect(customCompare).toHaveBeenCalled()
  })
})
