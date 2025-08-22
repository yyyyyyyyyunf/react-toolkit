/**
 * 需要调试的组件名称列表
 *
 * 当组件名称包含此列表中的任何字符串时，将输出调试日志。
 * 用于开发时追踪特定组件的 props 变化。
 *
 * @example
 * ```tsx
 * // 如果组件名称包含 "IntersectionLoad"，将输出调试日志
 * const IntersectionLoad = createMemoComponent(MyComponent);
 * ```
 */
export const debugComponentList = [] as const;

/**
 * 要忽略的属性列表
 *
 * 在比较 props 时，这些属性将被自动忽略。
 * 通常包含一些频繁变化但不影响组件渲染的属性。
 *
 * @example
 * ```tsx
 * // children 和 style 属性将被忽略
 * const MyComponent = createMemoComponent(Component);
 * ```
 */
export const ignorePropsList: string[] = [];

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
	if (debugComponentList.some((item) => displayName.indexOf(item) !== -1)) {
		console.log(`[${displayName}]`, ...args);
	}
};
