import type React from "react";
import { type PreloadOptions, getPreloadQueue } from "../utils/preload";
import type { ImagePreloadConsumerProps } from "../types";

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
