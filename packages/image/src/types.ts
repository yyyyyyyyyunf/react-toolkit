import type React from 'react';

/**
 * 预加载选项
 */
export interface PreloadOptions {
  /** 图片 URL */
  src: string;
  /** 图片类型，默认为 'image' */
  type?:
    | 'image'
    | 'image/webp'
    | 'image/avif'
    | 'image/jpeg'
    | 'image/png'
    | 'image/gif'
    | 'image/svg+xml';
  /** 是否在 SSR 时预加载 */
  ssr?: boolean;
  /** 预加载优先级 */
  priority?: 'high' | 'low' | 'auto';
  /** 图片尺寸信息 */
  sizes?: string;
  /** 媒体查询 */
  media?: string;
}

/**
 * 预加载队列上下文接口
 * 用户需要实现这个接口来提供自己的队列实现
 */
export interface PreloadQueueContext {
  /** 添加图片到队列 */
  addImage: (options: PreloadOptions) => void;
  /** 获取队列中的所有图片（可选） */
  getImages?: () => PreloadOptions[];
  /** 清空队列（可选） */
  clearImages?: () => void;
}

/**
 * 图片预加载配置
 */
export interface PreloadConfig {
  /** 是否启用预加载 */
  preload?: boolean;
  /** 预加载优先级 */
  priority?: 'high' | 'low' | 'auto';
  /** 图片类型 */
  type?:
    | 'image'
    | 'image/webp'
    | 'image/avif'
    | 'image/jpeg'
    | 'image/png'
    | 'image/gif'
    | 'image/svg+xml';
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

export interface ContentImageProps extends Omit<React.ComponentProps<'img'>, 'ref' | 'loading'> {
  src: string;
  lazyload?: boolean;
  /** 预加载配置 */
  preloadConfig?: PreloadConfig;
  /** 图片 URL 转换函数 */
  transform?: ImageTransform;
}

export interface BackgroundImageProps {
  src: string;
  style: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  /** 预加载配置 */
  preloadConfig?: PreloadConfig;
  /** 图片 URL 转换函数 */
  transform?: ImageTransform;
}

export type ImageLoaderProps =
  | ({
      type: 'content';
    } & ContentImageProps)
  | ({
      type: 'background';
    } & BackgroundImageProps);
