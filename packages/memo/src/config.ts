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
const componentIgnoreProps: Map<string, string[]> = new Map();

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
 * 注册组件特定的忽略属性
 *
 * @param componentName 组件名称
 * @param prop 要忽略的属性名称
 */
export const registerComponentIgnoreProp = (componentName: string, prop: string) => {
  if (!componentIgnoreProps.has(componentName)) {
    componentIgnoreProps.set(componentName, []);
  }
  const props = componentIgnoreProps.get(componentName);
  if (props && props.indexOf(prop) === -1) {
    props.push(prop);
  }
};

/**
 * 获取当前的要忽略的属性列表
 */
export const getIgnoreProps = (): readonly string[] => {
  return [...ignoreProps];
};

/**
 * 获取指定组件的忽略属性列表
 *
 * @param componentName 组件名称
 * @returns 该组件要忽略的属性列表
 */
export const getComponentIgnoreProps = (componentName: string): readonly string[] => {
  return [...(componentIgnoreProps.get(componentName) || [])];
};
