import '@testing-library/jest-dom/vitest';

// Extend global types for TypeScript
declare global {
  var IntersectionObserver: typeof IntersectionObserver;
  var ResizeObserver: typeof ResizeObserver;
}

// Mock IntersectionObserver
;(global as any).IntersectionObserver = class IntersectionObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock ResizeObserver
;(global as any).ResizeObserver = class ResizeObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
}
