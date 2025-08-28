import { useEffect, useRef } from "react";

/**
 * 组件挂载状态 Hook
 *
 * 跟踪组件的挂载状态，用于防止在组件卸载后执行异步操作。
 * 返回一个 ref，其 current 值表示组件是否仍然挂载。
 *
 * @returns 包含挂载状态的 ref，true 表示已挂载，false 表示已卸载
 *
 * @example
 * ```tsx
 * const isMountedRef = useIsMounted();
 *
 * const handleAsyncOperation = async () => {
 *   const result = await someAsyncOperation();
 *   
 *   // 检查组件是否仍然挂载，避免在已卸载的组件上设置状态
 *   if (isMountedRef.current) {
 *     setData(result);
 *   }
 * };
 * ```
 */
export const useIsMounted = () => {
	const isMountedRef = useRef(true);

	useEffect(() => {
		return () => {
			isMountedRef.current = false;
		};
	}, []);

	return isMountedRef;
};
