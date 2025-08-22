import type React from "react";

/**
 * 记忆化组件的类型
 *
 * @template P 组件 props 的类型
 */
export type MemoizedComponent<P> = React.MemoExoticComponent<
	React.ComponentType<P>
>;

/**
 * 记忆化组件的配置选项
 *
 * 用于自定义 React.memo 的比较逻辑，提供更精细的性能优化控制。
 *
 * @template P 组件 props 的类型
 */
export interface MemoOptions<P> {
	/**
	 * 可选的自定义比较函数
	 * 如果提供，将使用此函数进行 props 比较
	 */
	compare?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean;
	/**
	 * 可选的要比较的属性键数组
	 * 如果指定，将只比较这些属性，忽略其他属性
	 */
	propKeys?: Array<keyof P>;
}
