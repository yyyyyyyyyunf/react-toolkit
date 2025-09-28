import type React from "react";
import { createContext, type ReactNode } from "react";
import type { PreloadQueueContext } from "../types";

export const GetPreloadImagesContext = createContext<
	PreloadQueueContext["getImages"] | null
>(null);

/**
 * 获取预加载图片的 Provider
 */
export interface GetPreloadImagesProviderProps {
	children: ReactNode;
	getImages?: PreloadQueueContext["getImages"];
}

export const GetPreloadImagesProvider: React.FC<
	GetPreloadImagesProviderProps
> = ({ children, getImages }) => {
	return (
		<GetPreloadImagesContext.Provider value={getImages || null}>
			{children}
		</GetPreloadImagesContext.Provider>
	);
};
