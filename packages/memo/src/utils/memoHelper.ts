import { getDebugComponents, getIgnoreProps } from "../config";

/**
 * 调试日志函数
 *
 * 用于输出组件 props 变化的调试信息。
 * 只有当组件名称在 debugComponentList 中时才会输出日志。
 *
 * @param displayName 组件显示名称
 * @param args 要输出的参数
 *
 * @example
 * ```tsx
 * debugLog("MyComponent", "propName", oldValue, newValue);
 * // 输出: [MyComponent] propName oldValue newValue
 * ```
 */
export const debugLog = (displayName: string, ...args: unknown[]) => {
	const currentDebugComponents = getDebugComponents();
	if (currentDebugComponents.some((item) => displayName.indexOf(item) !== -1)) {
		console.log(`[${displayName}]`, ...args);
	}
};

/**
 * 检查属性是否应该被忽略
 *
 * @param propName 属性名称
 * @returns 是否应该忽略该属性
 */
export const shouldIgnoreProp = (propName: string): boolean => {
	const currentIgnoreProps = getIgnoreProps();
	return currentIgnoreProps.indexOf(propName) !== -1;
};
