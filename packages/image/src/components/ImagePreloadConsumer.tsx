import type React from "react";
import { type PreloadOptions, getPreloadQueue } from "../utils/preload";

/**
 * 图片预加载消费者组件
 * 在 SSR 环境下渲染预加载的 <link> 标签
 * 用户可以选择在 head 或 body 中渲染
 */
interface ImagePreloadConsumerProps {
	/** 是否在服务端渲染时显示预加载链接 */
	ssr?: boolean;
}

const ImagePreloadConsumer: React.FC<ImagePreloadConsumerProps> = ({
	ssr = false,
}) => {
	// 只在服务端渲染时生成预加载 HTML
	if (typeof window !== "undefined" || !ssr) {
		return null;
	}

	const preloadQueue = getPreloadQueue();

	if (preloadQueue.length === 0) {
		return null;
	}

	return (
		<>
			{preloadQueue.map((options: PreloadOptions) => {
				const {
					src,
					type = "image",
					priority = "auto",
					sizes,
					media,
				} = options;

				return (
					<link
						key={`preload-${src}-${type}-${priority}`}
						rel="preload"
						as={type}
						href={src}
						{...(priority !== "auto" && { importance: priority })}
						{...(sizes && { sizes })}
						{...(media && { media })}
					/>
				);
			})}
		</>
	);
};

export default ImagePreloadConsumer;
