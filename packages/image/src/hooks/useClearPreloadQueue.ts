import { useContext } from 'react';
import { ClearPreloadContext } from '../context/ClearPreloadProvider';

/**
 * 获取清空队列的函数的 Hook
 */
export const useClearPreloadQueue = () => {
  const clearImages = useContext(ClearPreloadContext);
  if (!clearImages) {
    throw new Error(
      'useClearPreloadQueue must be used within ClearPreloadProvider and clearImages method must be provided'
    );
  }
  return clearImages;
};
