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
	extends Omit<React.ComponentProps<"img">, "ref" | "loading"> {
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

/**
 * 图片预加载消费者组件
 * 在 SSR 环境下渲染预加载的 <link> 标签
 * 用户可以选择在 head 或 body 中渲染
 */
export interface ImagePreloadConsumerProps {
	/** 是否在服务端渲染时显示预加载链接 */
	ssr?: boolean;
}
