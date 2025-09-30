import type React from 'react';
import { useGetPreloadImages } from '../hooks/useGetPreloadImages';
import type { PreloadOptions } from '../types';

/**
 * 图片预加载消费者组件
 * 使用用户提供的队列实现
 */
export interface ImagePreloadConsumerProps {
  /** 是否在服务端渲染时显示预加载链接 */
  ssr?: boolean;
}

export const ImagePreloadConsumer: React.FC<ImagePreloadConsumerProps> = ({ ssr = true }) => {
  const getImages = useGetPreloadImages();

  if (!ssr) {
    return null;
  }

  const images = getImages();

  if (images.length === 0) {
    return null;
  }

  const links = images.map((options: PreloadOptions) => {
    const { src, type = 'image', priority = 'auto', sizes, media } = options;

    let link = `<link rel="preload" as="${type}" href="${src}"`;

    if (priority !== 'auto') {
      link += ` importance="${priority}"`;
    }

    if (sizes) {
      link += ` sizes="${sizes}"`;
    }

    if (media) {
      link += ` media="${media}"`;
    }

    link += '>';
    return link;
  });

  return (
    <>
      {links.map((link, index) => {
        // biome-ignore lint/security/noDangerouslySetInnerHtml: 这是预加载链接，内容是安全的
        // biome-ignore lint/suspicious/noArrayIndexKey: 预加载链接的顺序是固定的
        return <div key={index} dangerouslySetInnerHTML={{ __html: link }} />;
      })}
    </>
  );
};

export default ImagePreloadConsumer;
