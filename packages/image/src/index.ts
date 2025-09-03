import ImageLoader from "./components/ImageLoader";
import ImagePreloadConsumer from "./components/ImagePreloadConsumer";

// 导出所有 hooks 和组件
export * from "./types";
export * from "./hooks/useImagePreload";
export * from "./utils/preload";
export * from "./utils/ssr";

// 导出组件
export { ImageLoader, ImagePreloadConsumer };
export default ImageLoader;
