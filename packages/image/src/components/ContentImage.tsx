import createMemoComponent from '@fly4react/memo';
import IntersectionLoad from '@fly4react/observer';
import React from 'react';
import { useImagePreload } from '../hooks/useImagePreload';
import type { ContentImageProps } from '../types';

const ContentImage = React.forwardRef<HTMLImageElement, ContentImageProps>(
  ({ src, lazyload, preloadConfig, transform, ...rest }, ref) => {
    // 转换图片 URL
    const transformedSrc = transform ? transform(src) : src;

    // 使用新的预加载 Hook
    if (preloadConfig?.preload) {
      useImagePreload({
        src: transformedSrc,
        priority: preloadConfig.priority || 'auto',
        type: preloadConfig.type || 'image',
        ssr: preloadConfig.ssr ?? true,
        sizes: preloadConfig.sizes,
        media: preloadConfig.media,
      });
    }

    if (lazyload) {
      return (
        <IntersectionLoad>
          <img ref={ref} src={transformedSrc} {...rest} />
        </IntersectionLoad>
      );
    }
    return <img ref={ref} src={transformedSrc} {...rest} loading="eager" />;
  }
);

ContentImage.displayName = 'ContentImage';

export default createMemoComponent(ContentImage);
