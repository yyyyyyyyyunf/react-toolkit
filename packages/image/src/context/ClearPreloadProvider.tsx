import type React from 'react';
import { createContext, type ReactNode } from 'react';
import type { PreloadQueueContext } from '../types';

export const ClearPreloadContext = createContext<PreloadQueueContext['clearImages'] | null>(null);

/**
 * 清空预加载队列的 Provider
 */
export interface ClearPreloadProviderProps {
  children: ReactNode;
  clearImages?: PreloadQueueContext['clearImages'];
}

export const ClearPreloadProvider: React.FC<ClearPreloadProviderProps> = ({
  children,
  clearImages,
}) => {
  return (
    <ClearPreloadContext.Provider value={clearImages || null}>
      {children}
    </ClearPreloadContext.Provider>
  );
};
