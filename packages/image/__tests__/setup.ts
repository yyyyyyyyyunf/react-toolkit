import "@testing-library/jest-dom";

// Mock IntersectionObserver
Object.defineProperty(global, 'IntersectionObserver', {
	value: class IntersectionObserver {
		disconnect() {}
		observe() {}
		unobserve() {}
	},
	writable: true
});

// Mock ResizeObserver
Object.defineProperty(global, 'ResizeObserver', {
	value: class ResizeObserver {
		disconnect() {}
		observe() {}
		unobserve() {}
	},
	writable: true
});
