import type {
	ObserverCallbackParamType,
	ObserverCallbackType,
	ObserverOptions,
	SerializableObserverOptions,
} from "../types";
import {
	calculateScrollDirection,
	createIntersectionObserver,
	uniqueId,
} from "../utils";

/**
 * Intersection Observer 管理器
 *
 * 负责管理 Intersection Observer 实例，提供统一的观察和取消观察接口。
 * 支持滚动方向检测、位置跟踪和性能优化。
 * 使用标准的 intersection-observer polyfill 支持所有浏览器。
 *
 * 主要功能：
 * - 复用 Intersection Observer 实例，避免重复创建
 * - 跟踪元素位置变化，计算滚动方向
 * - 提供统一的回调接口，支持扩展的 entry 对象
 * - 自动清理资源，防止内存泄漏
 * - 使用标准的 intersection-observer polyfill 支持所有浏览器
 */
class IntersectionObserverManager {
	/** 存储不同配置的 Intersection Observer 实例 */
	private observers: Map<string, IntersectionObserver>;
	/** 存储每个元素的回调函数 */
	private callbacks: Map<string, Map<string, Set<ObserverCallbackType>>>;
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
		this.callbacks = new Map<string, Map<string, Set<ObserverCallbackType>>>();
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
		// 创建一个安全的选项对象，只包含可序列化的属性
		const safeOptions: SerializableObserverOptions = {
			rootMargin: options.rootMargin,
			threshold: options.threshold,
			once: options.once,
		};

		// 如果 root 存在，使用其唯一标识符
		if (options.root) {
			if (options.root instanceof Element) {
				// 为 root 元素设置唯一标识符
				const rootId = options.root.getAttribute("data-intersection-root-id");
				if (!rootId) {
					const uniqueRootId = uniqueId(`root_${Date.now()}`);
					options.root.setAttribute("data-intersection-root-id", uniqueRootId);
					safeOptions.rootId = uniqueRootId;
				} else {
					safeOptions.rootId = rootId;
				}
			} else {
				safeOptions.rootId = "document";
			}
		}

		return JSON.stringify(safeOptions);
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

			const observer = createIntersectionObserver((entries) => {
				for (const entry of entries) {
					const elementUniqueId =
						entry.target.getAttribute("data-intersection-unique-id") ||
						"intersection_element_void";
					const observerCallbacks = this.callbacks.get(key);
					const callbackSet = observerCallbacks?.get(elementUniqueId);

					if (callbackSet && callbackSet.size > 0) {
						for (const callback of callbackSet) {
							if (typeof callback === "function") {
								// 计算滚动方向
								const previousRect = this.previousRects.get(elementUniqueId);
								const currentRect = entry.boundingClientRect;
								const scrollDirection = previousRect
									? calculateScrollDirection(currentRect, previousRect)
									: "none";

								// 创建扩展的 entry 对象
								const extendedEntry: ObserverCallbackParamType = {
									// 手动复制 IntersectionObserverEntry 的属性
									target: entry.target,
									rootBounds: entry.rootBounds,
									boundingClientRect: entry.boundingClientRect,
									intersectionRect: entry.intersectionRect,
									intersectionRatio: entry.intersectionRatio,
									isIntersecting: entry.isIntersecting,
									time: entry.time,
									// 添加扩展属性
									scrollDirection,
									previousRect,
								};

								// 更新前一次位置
								this.previousRects.set(elementUniqueId, currentRect);

								// 获取或创建该 observer 配置下的回调映射
								if (!this.callbacks.has(key)) {
									this.callbacks.set(key, new Map());
								}
								const observerCallbacks = this.callbacks.get(key);
								if (!observerCallbacks?.size) continue;

								// 获取或创建该元素的回调集合
								if (!observerCallbacks.has(elementUniqueId)) {
									observerCallbacks.set(elementUniqueId, new Set());
								}
								observerCallbacks.get(elementUniqueId)?.add(callback);

								callback(extendedEntry);

								if (mergedOptions.once && entry.isIntersecting) {
									this.unobserve(entry.target, mergedOptions);
								}
							}
						}
					}
				}
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

		const elementUniqueId =
			target.getAttribute("data-intersection-unique-id") ||
			uniqueId("intersection_element");
		target.setAttribute("data-intersection-unique-id", elementUniqueId);

		const key = this.getObserverKey(options);
		// 获取或创建该 observer 配置下的回调映射
		if (!this.callbacks.has(key)) {
			this.callbacks.set(key, new Map());
		}
		const observerCallbacks = this.callbacks.get(key);
		if (!observerCallbacks) return;

		// 获取或创建该元素的回调集合
		if (!observerCallbacks.has(elementUniqueId)) {
			observerCallbacks.set(elementUniqueId, new Set());
		}
		observerCallbacks.get(elementUniqueId)?.add(callback);

		const observer = this.getObserver(options);
		if (observer) {
			observer.observe(target);
		}
		return () => {
			this.unobserve(target, options, callback);
		};
	}

	/**
	 * 停止观察目标元素
	 * @param target 要停止观察的目标元素
	 * @param options 配置选项
	 */
	unobserve(
		target: Element,
		options: ObserverOptions = {},
		callback?: ObserverCallbackType,
	): void {
		if (!target) return;

		const elementUniqueId =
			target.getAttribute("data-intersection-unique-id") ||
			"intersection_element_void";

		const key = this.getObserverKey(options);
		const observerCallbacks = this.callbacks.get(key);
		const callbackSet = observerCallbacks?.get(elementUniqueId);

		if (callbackSet) {
			if (callback) {
				// 移除特定的回调函数
				callbackSet.delete(callback);

				// 如果该 observer 配置下没有回调了，停止观察
				if (callbackSet.size === 0) {
					const observer = this.observers.get(key);
					if (observer) {
						observer.unobserve(target);
					}
					observerCallbacks?.delete(elementUniqueId);
				}
			} else {
				// 移除该 observer 配置下的所有回调
				const observer = this.observers.get(key);
				if (observer) {
					observer.unobserve(target);
				}
				observerCallbacks?.delete(elementUniqueId);
			}
		}

		// 检查该元素是否还有其他 observer 配置在观察
		let hasAnyCallbacks = false;
		for (const [_, callbacks] of this.callbacks) {
			if (
				callbacks.has(elementUniqueId) &&
				callbacks.get(elementUniqueId)?.size
			) {
				hasAnyCallbacks = true;
				break;
			}
		}

		// 只有当元素完全没有回调时才清理数据和移除属性
		if (!hasAnyCallbacks) {
			this.previousRects.delete(elementUniqueId);
			target.removeAttribute("data-intersection-unique-id");
		}
	}

	/**
	 * 断开所有观察器连接
	 * 清理所有资源，包括观察器、回调和位置数据
	 */
	disconnect(): void {
		for (const observer of this.observers.values()) {
			observer.disconnect();
		}
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
