import createMemoComponent from '@fly4react/memo';
import React, { useMemo } from 'react';
import { useImagePreload } from '../hooks/useImagePreload';
import type { BackgroundImageProps } from '../types';

const BackgroundImage = React.forwardRef<HTMLDivElement, BackgroundImageProps>(
  ({ src, style, className, children, preloadConfig, transform, ...rest }, ref) => {
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

    const styles = useMemo(
      () => ({
        ...style,
        backgroundImage: `url(${transformedSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }),
      [transformedSrc, style]
    );
    return (
      <div ref={ref} className={className} style={styles} {...rest}>
        {children}
      </div>
    );
  }
);

BackgroundImage.displayName = 'BackgroundImage';

export default createMemoComponent(BackgroundImage);
