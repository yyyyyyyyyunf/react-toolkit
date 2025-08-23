import createMemoComponent from "@fly4react/memo";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { lazyloadManager } from "../base/IntersectionObserverManager";
import type {
	IntersectionLoadProps,
	ObserverCallbackParamType,
} from "../types";
import { checkVisibility, isSupportIntersectionObserver } from "../utils";

const IntersectionLoad = (props: IntersectionLoadProps) => {
	const {
		children,
		placeholder,
		threshold = 0.1,
		offset = 300,
		style,
		onChange,
		root = null,
	} = props;

	const [isVisible, setIsVisible] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	// 根据传入的属性确定实际的行为
	const actualOnce = useMemo(() => {
		// 如果明确传入了 once，使用传入的值
		if ("once" in props && props.once !== undefined) {
			return props.once;
		}
		// 如果明确传入了 active，once 为 false（持续监听）
		if ("active" in props && props.active !== undefined) {
			return false;
		}
		// 默认情况：once 为 false，active 为 true
		return false;
	}, [props]);

	const actualActive = useMemo(() => {
		// 如果明确传入了 active，使用传入的值
		if ("active" in props && props.active !== undefined) {
			return props.active;
		}
		// 如果明确传入了 once，active 为 true（启用监听）
		if ("once" in props && props.once !== undefined) {
			return true;
		}
		// 默认情况：once 为 false，active 为 true
		return true;
	}, [props]);

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

	// 使用 useCallback 稳定 onChange 回调，避免依赖问题
	const stableOnChange = useCallback(
		(isVisible: boolean) => {
			onChange?.(isVisible);
		},
		[onChange],
	);

	useEffect(() => {
		if (!actualActive) {
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
				stableOnChange(visible);
			},
			{
				threshold: finalThreshold,
				rootMargin: `${offset}px`,
				root: root || undefined,
				once: actualOnce,
			},
		);

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, [
		offset,
		finalThreshold,
		actualActive,
		actualOnce,
		stableOnChange,
		root,
		threshold,
	]);

	const containerStyle = useMemo(() => {
		return {
			...style,
		};
	}, [style]);

	if (!isSupportIntersectionObserver()) {
		return <>{children}</>;
	}

	return (
		<div ref={containerRef} style={containerStyle}>
			{isVisible ? children : placeholder}
		</div>
	);
};

const MemoizedIntersectionLoad: React.MemoExoticComponent<
	React.ComponentType<IntersectionLoadProps>
> = createMemoComponent(IntersectionLoad);
export default MemoizedIntersectionLoad;
