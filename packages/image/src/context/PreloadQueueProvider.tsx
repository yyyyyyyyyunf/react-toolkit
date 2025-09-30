import type React from 'react';
import type { ReactNode } from 'react';
import type { PreloadQueueContext } from '../types';
import { AddToPreloadProvider } from './AddToPreloadProvider';
import { GetPreloadImagesProvider } from './GetPreloadImagesProvider';
import { ClearPreloadProvider } from './ClearPreloadProvider';

/**
 * 完整的预加载队列提供者组件
 * 组合了三个独立的 Provider
 */
export interface PreloadQueueProviderProps {
  children: ReactNode;
  value: PreloadQueueContext;
}

export const PreloadQueueProvider: React.FC<PreloadQueueProviderProps> = ({ children, value }) => {
  return (
    <AddToPreloadProvider addImage={value.addImage}>
      <GetPreloadImagesProvider getImages={value.getImages}>
        <ClearPreloadProvider clearImages={value.clearImages}>{children}</ClearPreloadProvider>
      </GetPreloadImagesProvider>
    </AddToPreloadProvider>
  );
};
