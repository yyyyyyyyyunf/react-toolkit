/**
 * 图片预加载工具
 * 支持 SSR 和客户端的图片预加载功能
 */

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
 * 全局预加载队列
 * 用于在 SSR 时收集需要预加载的图片
 */
let preloadQueue: PreloadOptions[] = [];

/**
 * 获取预加载队列
 */
export const getPreloadQueue = (): PreloadOptions[] => {
	return [...preloadQueue];
};

/**
 * 清空预加载队列
 */
export const clearPreloadQueue = (): void => {
	preloadQueue = [];
};

/**
 * 检查图片是否已经在预加载队列中
 */
export const isImageInPreloadQueue = (src: string): boolean => {
	return preloadQueue.some((item) => item.src === src);
};

/**
 * 添加图片到预加载队列
 */
export const addToPreloadQueue = (options: PreloadOptions): void => {
	if (isServer && options.ssr !== false) {
		// 检查是否已经添加过相同的图片
		if (!isImageInPreloadQueue(options.src)) {
			preloadQueue.push(options);
		}
	}
};

/**
 * 生成 SSR 预加载 HTML
 */
export const generatePreloadHTML = (): string => {
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
