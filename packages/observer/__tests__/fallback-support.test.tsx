import { renderHook } from '@testing-library/react-hooks';
import { useRef } from 'react';
import { useElementPosition } from '../src/hooks/useElementPosition';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('Fallback Support', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      delete (window as any).IntersectionObserver;
    }
  });

  it('should work when IntersectionObserver is not supported', () => {
    // Remove IntersectionObserver to simulate unsupported browser
    delete (window as any).IntersectionObserver;
    
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      return useElementPosition(ref, { throttle: 16 });
    });

    expect(result.current).toBeNull();
  });

  it('should provide consistent API regardless of browser support', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      return useElementPosition(ref, { 
        step: 0.1,
        throttle: 16,
        skipWhenOffscreen: true 
      });
    });

    // The API should be consistent - always returns null initially
    expect(result.current).toBeNull();
  });
});
