import React from "react";
import type { ImageLoaderProps } from "../types";
import BackgroundImage from "./BackgroundImage";
import ContentImage from "./ContentImage";

const ImageLoader = React.forwardRef<
	HTMLImageElement | HTMLDivElement,
	ImageLoaderProps
>((props, ref) => {
	if (props.type === "content") {
		const { type, children, ...rest } = props;
		return <ContentImage ref={ref as React.Ref<HTMLImageElement>} {...rest} />;
	}
	if (props.type === "background") {
		const { type, ...rest } = props;
		return <BackgroundImage ref={ref as React.Ref<HTMLDivElement>} {...rest} />;
	}
	return null;
});

ImageLoader.displayName = "ImageLoader";

export default React.memo(ImageLoader);
