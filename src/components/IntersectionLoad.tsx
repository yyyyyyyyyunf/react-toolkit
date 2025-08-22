import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { lazyloadManager } from "../base/IntersectionObserverManager";
import type { ObserverCallbackParamType } from "../types";
import { checkVisibility, isSupportIntersectionObserver } from "../utils";
import createMemoComponent from "../utils/memo";

interface LazyLoadProps {
	children: React.ReactNode;
	placeholder?: React.ReactNode;
	threshold?: number | "any" | "top" | "right" | "bottom" | "left";
	offset?: number;
	height: number;
	lazy?: boolean;
	style?: React.CSSProperties;
	active?: boolean;
	onChange?: (isVisible: boolean) => void;
	root?: Element | null; // 根元素，默认为 viewport
}

const IntersectionLoad = ({
	children,
	placeholder,
	threshold = 0.1,
	offset = 300,
	height,
	lazy = true,
	style,
	active = true,
	onChange,
	root = null,
}: LazyLoadProps) => {
	const [isVisible, setIsVisible] = useState(!lazy);
	const containerRef = useRef<HTMLDivElement>(null);

	// 计算实际的 threshold 值
	const finalThreshold = useMemo(() => {
		if (typeof threshold === "number") {
			return threshold;
		}
		// 语义化值转换为数值
		switch (threshold) {
			case "any":
				return 0.01; // 任何部分可见
			case "top":
			case "right":
			case "bottom":
			case "left":
				return 0.01; // 方向性检测也需要很小的阈值
			default:
				return 0.1;
		}
	}, [threshold]);

	useEffect(() => {
		if (!lazy || !active) {
			return;
		}
		const unsubscribe = lazyloadManager.observe(
			containerRef.current,
			(entry: ObserverCallbackParamType) => {
				const visible = checkVisibility(entry, threshold);
				if (visible) {
					setIsVisible(true);
				}
				// 调用 onChange 回调
				onChange?.(visible);
			},
			{
				threshold: finalThreshold,
				rootMargin: `${offset}px`,
				root,
				once: true,
			},
		);

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, [offset, finalThreshold, lazy, active, onChange, root, threshold]);

	const containerStyle = useMemo(() => {
		return {
			height,
			...style,
		};
	}, [style, height]);

	if (!lazy) {
		return <>{children}</>;
	}

	if (!isSupportIntersectionObserver()) {
		return <>{children}</>;
	}

	return (
		<div ref={containerRef} style={containerStyle}>
			{isVisible ? children : placeholder}
		</div>
	);
};

export default createMemoComponent(IntersectionLoad);
