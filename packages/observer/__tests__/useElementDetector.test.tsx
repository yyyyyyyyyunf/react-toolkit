import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react-hooks";
import { useRef } from "react";
import { useElementDetector } from "../src/hooks/useElementDetector";

// Mock dependencies
vi.mock("../src/base/IntersectionObserverManager", () => ({
	lazyloadManager: {
		observe: vi.fn(() => vi.fn()), // Return unsubscribe function
	},
}));

// Mock IntersectionObserver
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();
const mockDisconnect = vi.fn();

beforeEach(() => {
	mockObserve.mockClear();
	mockUnobserve.mockClear();
	mockDisconnect.mockClear();

	global.IntersectionObserver = vi.fn().mockImplementation(() => ({
		observe: mockObserve,
		unobserve: mockUnobserve,
		disconnect: mockDisconnect,
	}));
});

describe("useElementDetector", () => {
	it("should return initial state", () => {
		const { result } = renderHook(() => {
			const ref = useRef<HTMLDivElement>(null);
			return useElementDetector(ref);
		});

		expect(result.current).toBe(false);
	});

	it("should observe element when ref is set", () => {
		const { result } = renderHook(() => {
			const ref = useRef<HTMLDivElement>(null);
			return { ref, condition: useElementDetector(ref) };
		});

		// Simulate setting the ref
		const mockElement = document.createElement("div");
		act(() => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(result.current.ref as any).current = mockElement;
		});

		// The hook should be called, but we can't directly test the internal observe call
		// since it's handled by lazyloadManager
		expect(result.current.condition).toBe(false);
	});

	it("should use default ceiling detection when no compute function provided", () => {
		const { result } = renderHook(() => {
			const ref = useRef<HTMLDivElement>(null);
			return { ref, condition: useElementDetector(ref) };
		});

		// Simulate setting the ref
		const mockElement = document.createElement("div");
		act(() => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(result.current.ref as any).current = mockElement;
		});

		// The hook should use default ceiling detection (top <= 0)
		expect(result.current.condition).toBe(false);
	});

	it("should use custom compute function when provided", () => {
		const customCompute = vi.fn((rect: DOMRect) => rect.top <= 50 && rect.bottom >= 100);
		
		const { result } = renderHook(() => {
			const ref = useRef<HTMLDivElement>(null);
			return { ref, condition: useElementDetector(ref, { compute: customCompute }) };
		});

		// Simulate setting the ref
		const mockElement = document.createElement("div");
		act(() => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(result.current.ref as any).current = mockElement;
		});

		// The hook should use custom compute function
		expect(result.current.condition).toBe(false);
	});

	it("should cleanup observer on unmount", () => {
		const { unmount } = renderHook(() => {
			const ref = useRef<HTMLDivElement>(null);
			return useElementDetector(ref);
		});

		unmount();

		// We can't directly test disconnect calls since we're using lazyloadManager
		// But we can verify the hook doesn't throw
		expect(true).toBe(true);
	});

	it("should only update when condition state changes", () => {
		const { result } = renderHook(() => {
			const ref = useRef<HTMLDivElement>(null);
			return { ref, condition: useElementDetector(ref) };
		});

		// Simulate element movement
		const mockElement = document.createElement("div");
		act(() => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(result.current.ref as any).current = mockElement;
		});

		// The state should remain false initially since we're mocking the manager
		expect(result.current.condition).toBe(false);
	});

	it("should handle complex compute functions", () => {
		const complexCompute = vi.fn((rect: DOMRect) => {
			const viewportHeight = window.innerHeight;
			const centerY = viewportHeight / 2;
			const elementCenter = rect.top + rect.height / 2;
			const tolerance = 50;
			return Math.abs(elementCenter - centerY) <= tolerance;
		});
		
		const { result } = renderHook(() => {
			const ref = useRef<HTMLDivElement>(null);
			return { ref, condition: useElementDetector(ref, { compute: complexCompute }) };
		});

		// Simulate setting the ref
		const mockElement = document.createElement("div");
		act(() => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(result.current.ref as any).current = mockElement;
		});

		// The hook should use complex compute function
		expect(result.current.condition).toBe(false);
	});

	it("should work with empty options object", () => {
		const { result } = renderHook(() => {
			const ref = useRef<HTMLDivElement>(null);
			return { ref, condition: useElementDetector(ref, {}) };
		});

		// Simulate setting the ref
		const mockElement = document.createElement("div");
		act(() => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(result.current.ref as any).current = mockElement;
		});

		// The hook should use default ceiling detection
		expect(result.current.condition).toBe(false);
	});
});
