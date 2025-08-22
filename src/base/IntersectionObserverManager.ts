import type {
	ObserverCallbackParamType,
	ObserverCallbackType,
	ObserverOptions,
} from "../types";
import {
	calculateScrollDirection,
	isSupportIntersectionObserver,
	uniqueId,
} from "../utils";

/**
 * Intersection Observer 管理器
 *
 * 负责管理 Intersection Observer 实例，提供统一的观察和取消观察接口。
 * 支持滚动方向检测、位置跟踪和性能优化。
 *
 * 主要功能：
 * - 复用 Intersection Observer 实例，避免重复创建
 * - 跟踪元素位置变化，计算滚动方向
 * - 提供统一的回调接口，支持扩展的 entry 对象
 * - 自动清理资源，防止内存泄漏
 */
class IntersectionObserverManager {
	/** 存储不同配置的 Intersection Observer 实例 */
	private observers: Map<string, IntersectionObserver>;
	/** 存储每个元素的回调函数 */
	private callbacks: Map<string, ObserverCallbackType>;
	/** 存储每个元素的前一次位置信息，用于计算滚动方向 */
	private previousRects: Map<string, DOMRect>;
	/** 默认配置选项 */
	private defaultOptions: ObserverOptions;

	/**
	 * 创建 Intersection Observer 管理器
	 * @param options 默认配置选项
	 */
	constructor(options: ObserverOptions = {}) {
		this.observers = new Map<string, IntersectionObserver>();
		this.callbacks = new Map<string, ObserverCallbackType>();
		this.previousRects = new Map<string, DOMRect>();
		this.defaultOptions = {
			rootMargin: "200px 0px",
			threshold: 0,
			...options,
		};
	}

	/**
	 * 根据配置选项生成唯一的观察器键
	 * @param options 配置选项
	 * @returns 唯一的键值
	 */
	private getObserverKey(options: ObserverOptions): string {
		return JSON.stringify(options);
	}

	/**
	 * 获取或创建 Intersection Observer 实例
	 * @param options 配置选项
	 * @returns Intersection Observer 实例
	 */
	private getObserver(
		options: ObserverOptions,
	): IntersectionObserver | undefined {
		const key = this.getObserverKey(options);
		if (!this.observers.has(key)) {
			const mergedOptions = {
				...this.defaultOptions,
				...options,
			} satisfies IntersectionObserverInit;
			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					const elementUniqueId =
						entry.target.getAttribute("data-intersection-unique-id") ||
						"intersection_element_void";
					const callback = this.callbacks.get(elementUniqueId);

					if (callback && typeof callback === "function") {
						// 计算滚动方向
						const previousRect = this.previousRects.get(elementUniqueId);
						const currentRect = entry.boundingClientRect;
						const scrollDirection = previousRect
							? calculateScrollDirection(currentRect, previousRect)
							: "none";

						// 创建扩展的 entry 对象
						const extendedEntry: ObserverCallbackParamType = {
							...entry,
							scrollDirection,
							previousRect,
						};

						// 更新前一次位置
						this.previousRects.set(elementUniqueId, currentRect);

						callback(extendedEntry);
					}

					if (options.once && entry.isIntersecting) {
						this.unobserve(entry.target, options);
					}
				});
			}, mergedOptions);

			this.observers.set(key, observer);
		}
		return this.observers.get(key);
	}

	/**
	 * 开始观察目标元素
	 * @param target 要观察的目标元素
	 * @param callback 回调函数，接收扩展的 entry 对象
	 * @param options 配置选项
	 * @returns 取消观察的函数，用于清理
	 */
	observe(
		target: Element | null | undefined,
		callback: ObserverCallbackType,
		options: ObserverOptions = {},
	) {
		if (!target) return;

		if (!isSupportIntersectionObserver()) {
			return () => {};
		}

		const elementUniqueId =
			target.getAttribute("data-intersection-unique-id") ||
			uniqueId("intersection_element");
		target.setAttribute("data-intersection-unique-id", elementUniqueId);
		this.callbacks.set(elementUniqueId, callback);
		const observer = this.getObserver(options);
		if (observer) {
			observer.observe(target);
		}
		return () => {
			this.unobserve(target, options);
		};
	}

	/**
	 * 停止观察目标元素
	 * @param target 要停止观察的目标元素
	 * @param options 配置选项
	 */
	unobserve(target: Element, options: ObserverOptions = {}): void {
		if (!target) return;

		const key = this.getObserverKey(options);
		const observer = this.observers.get(key);
		if (observer) {
			observer.unobserve(target);
			const elementUniqueId =
				target.getAttribute("data-intersection-unique-id") ||
				"intersection_element_void";
			this.callbacks.delete(elementUniqueId);
			this.previousRects.delete(elementUniqueId); // 清理位置跟踪数据
			target.removeAttribute("data-intersection-unique-id");
		}
	}

	/**
	 * 断开所有观察器连接
	 * 清理所有资源，包括观察器、回调和位置数据
	 */
	disconnect(): void {
		this.observers.forEach((observer) => {
			observer.disconnect();
		});
		this.observers.clear();
		this.callbacks.clear();
		this.previousRects.clear(); // 清理位置跟踪数据
	}
}

/**
 * 全局的 Intersection Observer 管理器实例
 * 用于在整个应用中复用观察器实例，提高性能
 */
export const lazyloadManager = new IntersectionObserverManager();
