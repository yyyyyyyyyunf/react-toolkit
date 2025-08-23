import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import IntersectionLoad from '../components/IntersectionLoad'

// Mock IntersectionObserver
const mockObserve = vi.fn()
const mockUnobserve = vi.fn()
const mockDisconnect = vi.fn()

beforeEach(() => {
  mockObserve.mockClear()
  mockUnobserve.mockClear()
  mockDisconnect.mockClear()

  // Mock IntersectionObserver
  ;(global as any).IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: mockObserve,
    unobserve: mockUnobserve,
    disconnect: mockDisconnect,
  }))
})

describe('IntersectionLoad', () => {
  it('should render loading placeholder initially', () => {
    render(
      <IntersectionLoad>
        <div>Loaded Content</div>
      </IntersectionLoad>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.queryByText('Loaded Content')).not.toBeInTheDocument()
  })

  it('should render custom loading placeholder', () => {
    render(
      <IntersectionLoad placeholder={<div>Custom Loading</div>}>
        <div>Loaded Content</div>
      </IntersectionLoad>
    )

    expect(screen.getByText('Custom Loading')).toBeInTheDocument()
    expect(screen.queryByText('Loaded Content')).not.toBeInTheDocument()
  })

  it('should render children when IntersectionObserver is not supported', () => {
    // Mock isSupportIntersectionObserver to return false
    vi.doMock('../utils', () => ({
      isSupportIntersectionObserver: () => false,
      checkVisibility: vi.fn(),
    }))

    render(
      <IntersectionLoad>
        <div>Loaded Content</div>
      </IntersectionLoad>
    )

    expect(screen.getByText('Loaded Content')).toBeInTheDocument()
  })

  it('should accept style prop', () => {
    const customStyle = { backgroundColor: 'red' }
    
    render(
      <IntersectionLoad style={customStyle}>
        <div>Loaded Content</div>
      </IntersectionLoad>
    )

    const container = screen.getByText('Loading...').parentElement
    expect(container).toHaveStyle('background-color: red')
  })

  it('should handle once prop', () => {
    render(
      <IntersectionLoad once={true}>
        <div>Loaded Content</div>
      </IntersectionLoad>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should handle active prop', () => {
    render(
      <IntersectionLoad active={false}>
        <div>Loaded Content</div>
      </IntersectionLoad>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
