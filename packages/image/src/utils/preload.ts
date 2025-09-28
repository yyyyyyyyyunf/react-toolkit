/**
 * 图片预加载工具
 * 支持 SSR 和客户端的图片预加载功能
 */

import type { CompatibilityMode } from "../types";

/**
 * 全局对象类型扩展
 */
declare global {
	interface Window {
		__fly4react_image_preload_queue__?: PreloadOptions[];
	}
	
	namespace NodeJS {
		interface Global {
			__fly4react_image_preload_queue__?: PreloadOptions[];
		}
	}
	
	interface GlobalThis {
		__fly4react_image_preload_queue__?: PreloadOptions[];
	}
}

export interface PreloadOptions {
	/** 图片 URL */
	src: string;
	/** 图片类型，默认为 'image' */
	type?:
		| "image"
		| "image/webp"
		| "image/avif"
		| "image/jpeg"
		| "image/png"
		| "image/gif"
		| "image/svg+xml";
	/** 是否在 SSR 时预加载 */
	ssr?: boolean;
	/** 预加载优先级 */
	priority?: "high" | "low" | "auto";
	/** 图片尺寸信息 */
	sizes?: string;
	/** 媒体查询 */
	media?: string;
	/** 兼容模式：modern 使用模块级队列，legacy 使用全局队列 */
	compatibilityMode?: CompatibilityMode;
}

/**
 * 检测是否在服务端环境
 */
export const isServer = typeof window === "undefined";

/**
 * 检测是否在浏览器环境
 */
export const isBrowser = typeof window !== "undefined";

/**
 * 模块级预加载队列（modern 模式）
 * 用于纯 ESM 环境，性能更好
 */
let preloadQueue: PreloadOptions[] = [];

/**
 * 获取全局预加载队列（legacy 模式）
 * 用于跨模块格式的数据共享
 */
const getGlobalPreloadQueue = (): PreloadOptions[] => {
	// 在浏览器环境中使用 window 对象
	if (typeof window !== "undefined") {
		if (!window.__fly4react_image_preload_queue__) {
			window.__fly4react_image_preload_queue__ = [];
		}
		return window.__fly4react_image_preload_queue__;
	}
	
	// 在 Node.js 环境中使用 global 对象
	if (typeof global !== "undefined") {
		if (!(global as any).__fly4react_image_preload_queue__) {
			(global as any).__fly4react_image_preload_queue__ = [];
		}
		return (global as any).__fly4react_image_preload_queue__;
	}
	
	// 降级到 globalThis
	if (!(globalThis as any).__fly4react_image_preload_queue__) {
		(globalThis as any).__fly4react_image_preload_queue__ = [];
	}
	return (globalThis as any).__fly4react_image_preload_queue__;
};

/**
 * 根据兼容模式获取预加载队列
 */
export const getPreloadQueueByMode = (compatibilityMode: CompatibilityMode = "modern"): PreloadOptions[] => {
	if (compatibilityMode === "legacy") {
		return getGlobalPreloadQueue();
	}
	return preloadQueue;
};

/**
 * 获取预加载队列
 */
export const getPreloadQueue = (compatibilityMode: CompatibilityMode = "modern"): PreloadOptions[] => {
	const preloadQueue = getPreloadQueueByMode(compatibilityMode);
	return [...preloadQueue];
};

/**
 * 清空预加载队列
 */
export const clearPreloadQueue = (compatibilityMode: CompatibilityMode = "modern"): void => {
	const preloadQueue = getPreloadQueueByMode(compatibilityMode);
	preloadQueue.length = 0;
};

/**
 * 检查图片是否已经在预加载队列中
 */
export const isImageInPreloadQueue = (src: string, compatibilityMode: CompatibilityMode = "modern"): boolean => {
	const preloadQueue = getPreloadQueueByMode(compatibilityMode);
	return preloadQueue.some((item) => item.src === src);
};

/**
 * 添加图片到预加载队列
 */
export const addToPreloadQueue = (options: PreloadOptions): void => {
	if (isServer && options.ssr !== false) {
		const compatibilityMode = options.compatibilityMode || "modern";
		const preloadQueue = getPreloadQueueByMode(compatibilityMode);
		// 检查是否已经添加过相同的图片
		if (!isImageInPreloadQueue(options.src, compatibilityMode)) {
			preloadQueue.push(options);
		}
	}
};

/**
 * 生成 SSR 预加载 HTML
 */
export const generatePreloadHTML = (compatibilityMode: CompatibilityMode = "modern"): string => {
	const preloadQueue = getPreloadQueueByMode(compatibilityMode);
	if (preloadQueue.length === 0) {
		return "";
	}

	const links = preloadQueue.map((options) => {
		const { src, type = "image", priority = "auto", sizes, media } = options;

		let link = `<link rel="preload" as="${type}" href="${src}"`;

		if (priority !== "auto") {
			link += ` importance="${priority}"`;
		}

		if (sizes) {
			link += ` sizes="${sizes}"`;
		}

		if (media) {
			link += ` media="${media}"`;
		}

		link += ">";
		return link;
	});

	return links.join("\n");
};

/**
 * 批量添加图片到预加载队列
 */
export const addImagesToPreloadQueue = (options: PreloadOptions[]): void => {
	if (isServer) {
		for (const option of options) {
			if (option.ssr !== false) {
				addToPreloadQueue(option);
			}
		}
	}
};
