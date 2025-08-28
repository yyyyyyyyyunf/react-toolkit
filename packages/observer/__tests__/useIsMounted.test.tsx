import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react-hooks";
import { useIsMounted } from "../src/hooks/useIsMounted";

describe("useIsMounted", () => {
	it("should return true initially", () => {
		const { result } = renderHook(() => useIsMounted());

		expect(result.current.current).toBe(true);
	});

	it("should return false after unmount", () => {
		const { result, unmount } = renderHook(() => useIsMounted());

		expect(result.current.current).toBe(true);

		act(() => {
			unmount();
		});

		expect(result.current.current).toBe(false);
	});

	it("should maintain ref identity across re-renders", () => {
		const { result, rerender } = renderHook(() => useIsMounted());

		const firstRef = result.current;

		rerender();

		expect(result.current).toBe(firstRef);
		expect(result.current.current).toBe(true);
	});

	it("should work with async operations", async () => {
		const { result, unmount } = renderHook(() => useIsMounted());

		// Simulate async operation
		const asyncOperation = async () => {
			await new Promise((resolve) => setTimeout(resolve, 10));
			return result.current.current;
		};

		// Start async operation
		const promise = asyncOperation();

		// Unmount before operation completes
		act(() => {
			unmount();
		});

		const isMounted = await promise;
		expect(isMounted).toBe(false);
	});
});
