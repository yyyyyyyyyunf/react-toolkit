import { useContext } from 'react';
import { GetPreloadImagesContext } from '../context/GetPreloadImagesProvider';

/**
 * 获取队列中所有图片的 Hook
 */
export const useGetPreloadImages = () => {
  const getImages = useContext(GetPreloadImagesContext);
  if (!getImages) {
    throw new Error(
      'useGetPreloadImages must be used within GetPreloadImagesProvider and getImages method must be provided'
    );
  }
  return getImages;
};
