import '@testing-library/jest-dom'

// Extend global types for TypeScript
declare global {
  var IntersectionObserver: typeof IntersectionObserver
  var ResizeObserver: typeof ResizeObserver
}

// Mock IntersectionObserver
;(global as any).IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock ResizeObserver
;(global as any).ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}
