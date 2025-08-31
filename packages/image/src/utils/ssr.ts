import { generatePreloadHTML, clearPreloadQueue, getPreloadQueue, type PreloadOptions } from './preload';

/**
 * SSR 图片预加载工具
 */

/**
 * 生成预加载 HTML 标签
 * 在服务端渲染时调用，生成 <link rel="preload"> 标签
 * 
 * @returns 预加载 HTML 字符串
 * 
 * @example
 * ```tsx
 * // 在服务端
 * const preloadHTML = generateImagePreloadHTML();
 * 
 * // 在 HTML 模板中插入
 * <head>
 *   {preloadHTML}
 * </head>
 * ```
 */
export const generateImagePreloadHTML = (): string => {
	return generatePreloadHTML();
};

/**
 * 获取当前预加载队列
 * 用于调试或自定义处理
 * 
 * @returns 预加载选项数组
 */
export const getImagePreloadQueue = () => {
	return getPreloadQueue();
};

/**
 * 清空预加载队列
 * 在每次请求开始时调用，避免队列累积
 * 
 * @example
 * ```tsx
 * // 在每次 SSR 请求开始时
 * clearImagePreloadQueue();
 * ```
 */
export const clearImagePreloadQueue = (): void => {
	clearPreloadQueue();
};

/**
 * 创建预加载管理器
 * 用于管理多个页面的预加载状态
 */
export class ImagePreloadManager {
	private queue: Map<string, PreloadOptions[]> = new Map();

	/**
	 * 为指定页面添加预加载图片
	 */
	addToPage(pageId: string, preloadOptions: PreloadOptions[]): void {
		if (!this.queue.has(pageId)) {
			this.queue.set(pageId, []);
		}
		this.queue.get(pageId)?.push(...preloadOptions);
	}

	/**
	 * 获取指定页面的预加载 HTML
	 */
	getPagePreloadHTML(pageId: string): string {
		const pageQueue = this.queue.get(pageId) || [];
		if (pageQueue.length === 0) {
			return '';
		}

		const links = pageQueue.map((options) => {
			const { src, type = 'image', priority = 'auto', sizes, media } = options;
			
			let link = `<link rel="preload" as="${type}" href="${src}"`;
			
			if (priority !== 'auto') {
				link += ` importance="${priority}"`;
			}
			
			if (sizes) {
				link += ` sizes="${sizes}"`;
			}
			
			if (media) {
				link += ` media="${media}"`;
			}
			
			link += '>';
			return link;
		});

		return links.join('\n');
	}

	/**
	 * 清空指定页面的预加载队列
	 */
	clearPage(pageId: string): void {
		this.queue.delete(pageId);
	}

	/**
	 * 清空所有页面的预加载队列
	 */
	clearAll(): void {
		this.queue.clear();
	}
}

/**
 * 全局预加载管理器实例
 */
export const imagePreloadManager = new ImagePreloadManager();
