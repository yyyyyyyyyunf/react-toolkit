import { type PreloadOptions, addToPreloadQueue } from '../utils/preload';

/**
 * 图片预加载 Hook
 * 在服务端将图片添加到预加载队列
 */
export function useImagePreload(options: PreloadOptions) {
	const { src, type = 'image', priority = 'auto', ssr = true, sizes, media } = options;

	// 在服务端立即执行，不依赖 useEffect
	if (typeof window === 'undefined' && ssr) {
		addToPreloadQueue({ src, type, priority, ssr, sizes, media });
	}

	return {
		isAdded: typeof window === 'undefined' && ssr,
	};
}

/**
 * 批量添加图片到预加载队列的 Hook
 * 在 SSR 环境下立即执行，不依赖 useEffect
 */
export const useImagesPreload = (options: PreloadOptions[]): { isAdded: boolean } => {
	// 在服务端立即执行，不依赖 useEffect
	if (typeof window === 'undefined') {
		for (const option of options) {
			if (option.ssr !== false) {
				addToPreloadQueue(option);
			}
		}
	}

	return {
		isAdded: typeof window === 'undefined'
	};
};
