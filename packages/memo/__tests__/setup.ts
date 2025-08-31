import "@testing-library/jest-dom";

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
	disconnect() {}
	observe() {}
	unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
	disconnect() {}
	observe() {}
	unobserve() {}
};
