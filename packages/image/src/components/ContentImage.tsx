
import React from "react";
import createMemoComponent from "@fly4react/memo";
import type { ContentImageProps } from "../types";
import { IntersectionLoad } from "@fly4react/observer";
import { useImagePreload } from "../hooks/useImagePreload";

const ContentImage = React.forwardRef<HTMLImageElement, ContentImageProps>(
	({ src, lazyload, preload, transform, ...rest }, ref) => {
		// 转换图片 URL
		const transformedSrc = transform ? transform(src) : src;

		// 使用预加载 Hook
		useImagePreload({
			src: transformedSrc,
			priority: preload?.priority || 'auto',
			type: preload?.type || 'image',
			ssr: preload?.ssr ?? true,
			sizes: preload?.sizes,
			media: preload?.media,
		});

		if (lazyload) {
			return (
				<IntersectionLoad>
					<img ref={ref} src={transformedSrc} {...rest} />
				</IntersectionLoad>
			);
		}
		return <img ref={ref} src={transformedSrc} {...rest} />;
	}
);

ContentImage.displayName = "ContentImage";

export default createMemoComponent(ContentImage);
