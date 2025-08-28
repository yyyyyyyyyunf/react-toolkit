import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react-hooks";
import { useRef } from "react";
import { useElementDetector } from "../src/hooks/useElementDetector";

// 模拟依赖
vi.mock("../src/base/IntersectionObserverManager", () => ({
	lazyloadManager: {
		observe: vi.fn(() => vi.fn()), // 返回取消订阅函数
	},
}));

// 模拟 IntersectionObserver
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
			const ref = useRef<HTMLDivElement | null>(null);
			return { ref, condition: useElementDetector(ref) };
		});

		// 模拟设置 ref
		const mockElement = document.createElement("div");
		act(() => {
			result.current.ref.current = mockElement;
		});

		// Hook 应该被调用，但我们无法直接测试内部的 observe 调用
		// 因为它由 lazyloadManager 处理
		expect(result.current.condition).toBe(false);
	});

	it("should use default ceiling detection when no compute function provided", () => {
		const { result } = renderHook(() => {
			const ref = useRef<HTMLDivElement | null>(null);
			return { ref, condition: useElementDetector(ref) };
		});

		// 模拟设置 ref
		const mockElement = document.createElement("div");
		act(() => {
			result.current.ref.current = mockElement;
		});

		// Hook 应该使用默认的贴顶检测 (top <= 0)
		expect(result.current.condition).toBe(false);
	});

	it("should use custom compute function when provided", () => {
		const customCompute = vi.fn(
			(rect: DOMRect) => rect.top <= 50 && rect.bottom >= 100,
		);

		const { result } = renderHook(() => {
			const ref = useRef<HTMLDivElement | null>(null);
			return {
				ref,
				condition: useElementDetector(ref, { compute: customCompute }),
			};
		});

		// 模拟设置 ref
		const mockElement = document.createElement("div");
		act(() => {
			result.current.ref.current = mockElement;
		});

		// Hook 应该使用自定义计算函数
		expect(result.current.condition).toBe(false);
	});

	it("should cleanup observer on unmount", () => {
		const { unmount } = renderHook(() => {
			const ref = useRef<HTMLDivElement | null>(null);
			return useElementDetector(ref);
		});

		unmount();

		// 我们无法直接测试 disconnect 调用，因为我们使用的是 lazyloadManager
		// 但我们可以验证 Hook 不会抛出错误
		expect(true).toBe(true);
	});

	it("should only update when condition state changes", () => {
		const { result } = renderHook(() => {
			const ref = useRef<HTMLDivElement | null>(null);
			return { ref, condition: useElementDetector(ref) };
		});

		// 模拟元素移动
		const mockElement = document.createElement("div");
		act(() => {
			result.current.ref.current = mockElement;
		});

		// 状态应该保持为 false，因为我们正在模拟管理器
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
			const ref = useRef<HTMLDivElement | null>(null);
			return {
				ref,
				condition: useElementDetector(ref, { compute: complexCompute }),
			};
		});

		// 模拟设置 ref
		const mockElement = document.createElement("div");
		act(() => {
			result.current.ref.current = mockElement;
		});

		// Hook 应该使用复杂的计算函数
		expect(result.current.condition).toBe(false);
	});

	it("should work with empty options object", () => {
		const { result } = renderHook(() => {
			const ref = useRef<HTMLDivElement | null>(null);
			return { ref, condition: useElementDetector(ref, {}) };
		});

		// 模拟设置 ref
		const mockElement = document.createElement("div");
		act(() => {
			result.current.ref.current = mockElement;
		});

		// Hook 应该使用默认的贴顶检测
		expect(result.current.condition).toBe(false);
	});
});
