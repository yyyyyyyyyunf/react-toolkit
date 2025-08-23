/**
 * IntersectionObserver Polyfill 实现
 *
 * 为不支持 IntersectionObserver 的浏览器提供 polyfill 实现
 */

import type { ObserverOptions } from "../../types";

/**
 * IntersectionObserver Polyfill 类
 * 模拟原生 IntersectionObserver 的行为
 */
export class IntersectionObserverPolyfill
	implements Partial<IntersectionObserver>
{
	private callback: IntersectionObserverCallback;
	private elements: Set<Element> = new Set();
	private isObserving = false;
	private throttleTime = 16; // 60fps
	private lastCheck = 0;

	// 实现 IntersectionObserver 接口的必需属性
	readonly root: Element | Document | null = null;
	readonly rootMargin: string = "0px";
	readonly thresholds: ReadonlyArray<number> = [0];

	constructor(
		callback: IntersectionObserverCallback,
		options?: ObserverOptions,
	) {
		this.callback = callback;
		this.throttleTime = options?.throttle || 16;
	}

	observe(element: Element): void {
		this.elements.add(element);
		if (!this.isObserving) {
			this.startObserving();
		}
	}

	unobserve(element: Element): void {
		this.elements.delete(element);
		if (this.elements.size === 0) {
			this.stopObserving();
		}
	}

	disconnect(): void {
		this.elements.clear();
		this.stopObserving();
	}

	// 实现 IntersectionObserver 接口的必需方法
	takeRecords(): IntersectionObserverEntry[] {
		return [];
	}

	private startObserving(): void {
		this.isObserving = true;
		this.checkIntersection();
	}

	private stopObserving(): void {
		this.isObserving = false;
	}

	private checkIntersection(): void {
		if (!this.isObserving) return;

		const now = Date.now();
		if (now - this.lastCheck < this.throttleTime) {
			requestAnimationFrame(() => this.checkIntersection());
			return;
		}

		this.lastCheck = now;
		const entries: IntersectionObserverEntry[] = [];

		for (const element of this.elements) {
			const rect = element.getBoundingClientRect();
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

			const entry: IntersectionObserverEntry = {
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
				target: element,
				time: now,
			};

			entries.push(entry);
		}

		if (entries.length > 0) {
			this.callback(entries, this as unknown as IntersectionObserver);
		}

		requestAnimationFrame(() => this.checkIntersection());
	}
}
