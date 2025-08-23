/**
 * Memo 配置管理器
 *
 * 提供动态更新 debugComponentList 和 ignorePropsList 的机制
 * 这是一个全局配置，用于调试 createMemoComponent
 */

/**
 * 当前配置状态
 */
const debugComponents: string[] = [];
const ignoreProps: string[] = [];

/**
 * 注册调试组件
 *
 * @param component 要调试的组件名称
 */
export const registerDebugComponent = (component: string) => {
	if (debugComponents.indexOf(component) === -1) {
		debugComponents.push(component);
	}
};

/**
 * 注册忽略属性
 *
 * @param prop 要忽略的属性名称
 */
export const registerIgnoreProp = (prop: string) => {
	if (ignoreProps.indexOf(prop) === -1) {
		ignoreProps.push(prop);
	}
};

/**
 * 获取当前的调试组件列表
 */
export const getDebugComponents = (): readonly string[] => {
	return [...debugComponents];
};

/**
 * 获取当前的要忽略的属性列表
 */
export const getIgnoreProps = (): readonly string[] => {
	return [...ignoreProps];
};
