import { renderHook } from "@testing-library/react-hooks";
import { useRef } from "react";
import { useElementPosition } from "../src/hooks/useElementPosition";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("Fallback Support", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		// 清理
		if (typeof window !== "undefined" && "IntersectionObserver" in window) {
			(window as unknown as Record<string, unknown>).IntersectionObserver =
				undefined;
		}
	});

	it("should work when IntersectionObserver is not supported", () => {
		// 移除 IntersectionObserver 以模拟不支持的浏览器
		(window as unknown as Record<string, unknown>).IntersectionObserver =
			undefined;

		const { result } = renderHook(() => {
			const ref = useRef<HTMLDivElement | null>(null);
			return useElementPosition(ref, { throttle: 16 });
		});

		expect(result.current).toBeNull();
	});

	it("should provide consistent API regardless of browser support", () => {
		const { result } = renderHook(() => {
			const ref = useRef<HTMLDivElement | null>(null);
			return useElementPosition(ref, {
				step: 0.1,
				throttle: 16,
				skipWhenOffscreen: true,
			});
		});

		// API 应该保持一致 - 始终返回 null 作为初始值
		expect(result.current).toBeNull();
	});
});
