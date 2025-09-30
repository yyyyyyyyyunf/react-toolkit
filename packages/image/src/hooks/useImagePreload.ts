import { useCallback } from 'react';
import { useAddToPreloadQueue } from './useAddToPreloadQueue';
import type { PreloadOptions } from '../types';

/**
 * 图片预加载 Hook
 * 使用用户提供的队列实现
 */
export const useImagePreload = (options: PreloadOptions) => {
  const addToPreloadQueue = useAddToPreloadQueue();

  const addImage = useCallback(
    (options: PreloadOptions) => {
      if (options.ssr !== false) {
        addToPreloadQueue(options);
      }
    },
    [addToPreloadQueue]
  );

  // 立即添加图片到队列
  addImage(options);

  return {
    isAdded: true, // 总是返回 true，因为立即添加
  };
};

/**
 * 批量图片预加载 Hook
 * 使用用户提供的队列实现
 */
export const useImagesPreload = (options: PreloadOptions[]) => {
  const addToPreloadQueue = useAddToPreloadQueue();

  const addImages = useCallback(
    (options: PreloadOptions[]) => {
      for (const option of options) {
        if (option.ssr !== false) {
          addToPreloadQueue(option);
        }
      }
    },
    [addToPreloadQueue]
  );

  // 立即添加所有图片到队列
  addImages(options);

  return {
    isAdded: true, // 总是返回 true，因为立即添加
  };
};
