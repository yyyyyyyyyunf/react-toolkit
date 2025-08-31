import React, { useMemo } from "react";
import createMemoComponent from "@fly4react/memo";
import type { BackgroundImageProps } from "../types";
import { useImagePreload } from "../hooks/useImagePreload";

const BackgroundImage = React.forwardRef<HTMLDivElement, BackgroundImageProps>(
	({ src, style, className, children, preload, transform }, ref) => {
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

		const styles = useMemo(
			() => ({
				...style,
				backgroundImage: `url(${transformedSrc})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}),
			[transformedSrc, style],
		);
		return (
			<div ref={ref} className={className} style={styles}>
				{children}
			</div>
		);
	}
);

BackgroundImage.displayName = "BackgroundImage";

export default createMemoComponent(BackgroundImage);
