import type React from "react";
import { createContext, type ReactNode } from "react";
import type { PreloadQueueContext } from "../types";

export const AddToPreloadContext = createContext<
	PreloadQueueContext["addImage"] | null
>(null);

/**
 * 添加图片到预加载队列的 Provider
 */
export interface AddToPreloadProviderProps {
	children: ReactNode;
	addImage: PreloadQueueContext["addImage"];
}

export const AddToPreloadProvider: React.FC<AddToPreloadProviderProps> = ({
	children,
	addImage,
}) => {
	return (
		<AddToPreloadContext.Provider value={addImage}>
			{children}
		</AddToPreloadContext.Provider>
	);
};
