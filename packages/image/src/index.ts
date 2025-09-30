import ImageLoader from './components/ImageLoader';
import BackgroundImage from './components/BackgroundImage';
import ContentImage from './components/ContentImage';

// 导出所有 hooks 和组件
export * from './types';

// 导出新的 Context 方案
export { PreloadQueueProvider } from './context/PreloadQueueProvider';
export { AddToPreloadProvider } from './context/AddToPreloadProvider';
export { GetPreloadImagesProvider } from './context/GetPreloadImagesProvider';
export { ClearPreloadProvider } from './context/ClearPreloadProvider';

// 导出 Hooks
export { useAddToPreloadQueue } from './hooks/useAddToPreloadQueue';
export { useGetPreloadImages } from './hooks/useGetPreloadImages';
export { useClearPreloadQueue } from './hooks/useClearPreloadQueue';
export * from './hooks/useImagePreload';

// 导出组件
export { ImagePreloadConsumer } from './components/ImagePreloadConsumer';
export { BackgroundImage };
export { ContentImage };

// 导出组件
export { ImageLoader };
export default ImageLoader;
