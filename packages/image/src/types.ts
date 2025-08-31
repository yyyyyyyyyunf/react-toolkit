import type React from "react";

/**
 * 图片预加载配置
 */
export interface ImagePreloadOptions {
	/** 是否启用预加载 */
	preload?: boolean;
	/** 预加载优先级 */
	priority?: "high" | "low" | "auto";
	/** 图片类型 */
	type?:
		| "image"
		| "image/webp"
		| "image/avif"
		| "image/jpeg"
		| "image/png"
		| "image/gif"
		| "image/svg+xml";
	/** 是否在 SSR 时预加载 */
	ssr?: boolean;
	/** 图片尺寸信息 */
	sizes?: string;
	/** 媒体查询 */
	media?: string;
}

/**
 * 图片 URL 转换函数
 */
export type ImageTransform = (src: string) => string;

export interface ContentImageProps
	extends Omit<React.ComponentProps<"img">, "ref"> {
	src: string;
	lazyload?: boolean;
	/** 预加载配置 */
	preload?: ImagePreloadOptions;
	/** 图片 URL 转换函数 */
	transform?: ImageTransform;
}

export interface BackgroundImageProps {
	src: string;
	style: React.CSSProperties;
	className?: string;
	children: React.ReactNode;
	/** 预加载配置 */
	preload?: ImagePreloadOptions;
	/** 图片 URL 转换函数 */
	transform?: ImageTransform;
}

export type ImageLoaderProps =
	| ({
			type: "content";
	  } & ContentImageProps)
	| ({
			type: "background";
	  } & BackgroundImageProps);
