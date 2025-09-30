import { useContext } from 'react';
import { AddToPreloadContext } from '../context/AddToPreloadProvider';

/**
 * 获取添加图片到队列的函数的 Hook
 */
export const useAddToPreloadQueue = () => {
  const addImage = useContext(AddToPreloadContext);
  if (!addImage) {
    throw new Error('useAddToPreloadQueue must be used within AddToPreloadProvider');
  }
  return addImage;
};
