import type React from 'react';

/**
 * createMemoComponent 函数的选项接口
 */
export interface MemoOptions<P> {
  /**
   * 可选的自定义比较函数
   */
  compare?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean;
  /**
   * 可选的要比较的属性键数组（如果指定，将只比较这些属性）
   */
  propKeys?: Array<keyof P>;
}

/**
 * 记忆化组件的类型
 */
export type MemoizedComponent<P> = React.MemoExoticComponent<
  React.ComponentType<P> | React.ForwardRefExoticComponent<P>
>;
