/**
 * 降级策略：位置跟踪器
 *
 * 使用 scroll 事件 + getBoundingClientRect 实现位置跟踪
 * 作为 IntersectionObserver 的降级方案
 */

import type { FallbackIntersectionEntry } from "../../types";

/**
 * 降级位置跟踪器
 * 使用 scroll 事件监听元素位置变化
 */
export class FallbackPositionTracker {
	private callback: (entry: FallbackIntersectionEntry) => void;
	private element: Element | null = null;
	private isObserving = false;
	private throttleTime = 16;
	private lastCheck = 0;
	private scrollHandler: (() => void) | null = null;
	private resizeHandler: (() => void) | null = null;

	constructor(
		callback: (entry: FallbackIntersectionEntry) => void,
		throttle = 16,
	) {
		this.callback = callback;
		this.throttleTime = throttle;
	}

	observe(element: Element): void {
		this.element = element;
		if (!this.isObserving) {
			this.startObserving();
		}
	}

	unobserve(): void {
		this.stopObserving();
		this.element = null;
	}

	private startObserving(): void {
		if (!this.element) return;

		this.isObserving = true;

		// 创建节流的检查函数
		const throttledCheck = () => {
			const now = Date.now();
			if (now - this.lastCheck < this.throttleTime) return;

			this.lastCheck = now;
			this.checkPosition();
		};

		// 绑定事件监听器
		this.scrollHandler = throttledCheck;
		this.resizeHandler = throttledCheck;

		window.addEventListener("scroll", this.scrollHandler, { passive: true });
		window.addEventListener("resize", this.resizeHandler, { passive: true });

		// 立即检查一次
		this.checkPosition();
	}

	private stopObserving(): void {
		this.isObserving = false;

		if (this.scrollHandler) {
			window.removeEventListener("scroll", this.scrollHandler);
			this.scrollHandler = null;
		}

		if (this.resizeHandler) {
			window.removeEventListener("resize", this.resizeHandler);
			this.resizeHandler = null;
		}
	}

	private checkPosition(): void {
		if (!this.element || !this.isObserving) return;

		const rect = this.element.getBoundingClientRect();
		const viewportHeight = window.innerHeight;
		const viewportWidth = window.innerWidth;

		// 计算交叉区域
		const intersectionRect = {
			top: Math.max(0, rect.top),
			left: Math.max(0, rect.left),
			bottom: Math.min(viewportHeight, rect.bottom),
			right: Math.min(viewportWidth, rect.right),
			width: 0,
			height: 0,
		};

		intersectionRect.width = Math.max(
			0,
			intersectionRect.right - intersectionRect.left,
		);
		intersectionRect.height = Math.max(
			0,
			intersectionRect.bottom - intersectionRect.top,
		);

		const intersectionArea = intersectionRect.width * intersectionRect.height;
		const elementArea = rect.width * rect.height;
		const intersectionRatio =
			elementArea > 0 ? intersectionArea / elementArea : 0;

		const entry = {
			boundingClientRect: rect,
			intersectionRect: intersectionRect as DOMRectReadOnly,
			intersectionRatio,
			isIntersecting: intersectionRatio > 0,
			rootBounds: {
				top: 0,
				left: 0,
				bottom: viewportHeight,
				right: viewportWidth,
				width: viewportWidth,
				height: viewportHeight,
			} as DOMRectReadOnly,
			target: this.element,
			time: Date.now(),
		};

		this.callback(entry);
	}
}
