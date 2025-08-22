import React from "react";
import { debugLog, ignorePropsList } from "./memoHelper";

/**
 * 记忆化组件的配置选项
 *
 * 用于自定义 React.memo 的比较逻辑，提供更精细的性能优化控制。
 *
 * @template P 组件 props 的类型
 */
interface MemoOptions<P> {
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

/**
 * 创建记忆化组件
 *
 * 基于 React.memo 的高级封装，提供更灵活的 props 比较策略。
 * 支持自定义比较函数、选择性属性比较和调试日志。
 *
 * 特性：
 * - 支持自定义比较函数
 * - 支持选择性属性比较
 * - 内置调试日志功能
 * - 自动忽略常见的非关键属性
 *
 * @template P 组件 props 的类型
 * @param Component 要记忆化的组件
 * @param options 记忆化配置选项
 * @returns 记忆化的组件
 *
 * @example
 * ```tsx
 * // 基本用法
 * const MyComponent = createMemoComponent(({ name, age }) => (
 *   <div>{name}: {age}</div>
 * ));
 *
 * // 自定义比较函数
 * const MyComponent = createMemoComponent(
 *   ({ data }) => <div>{data}</div>,
 *   {
 *     compare: (prev, next) => prev.data.id === next.data.id
 *   }
 * );
 *
 * // 选择性属性比较
 * const MyComponent = createMemoComponent(
 *   ({ name, age, timestamp }) => <div>{name}: {age}</div>,
 *   {
 *     propKeys: ['name', 'age'] // 只比较 name 和 age，忽略 timestamp
 *   }
 * );
 * ```
 */
function createMemoComponent<P extends object>(
	Component: React.ComponentType<P>,
	options?: MemoOptions<P>,
): React.MemoExoticComponent<React.ComponentType<P>> {
	// 如果提供了自定义比较函数，则使用它
	if (options?.compare) {
		return React.memo(Component, options.compare);
	}

	const displayName = Component.displayName || Component.name;

	/**
	 * 默认比较函数，处理 propKeys 或默认比较所有键
	 * 自动忽略常见的非关键属性（如 children、style 等）
	 */
	const defaultCompare = (
		prevProps: Readonly<P>,
		nextProps: Readonly<P>,
	): boolean => {
		// 如果提供了 propKeys，则只比较这些键
		if (options?.propKeys) {
			for (const key of options.propKeys) {
				if (prevProps[key] !== nextProps[key]) {
					debugLog(displayName, key, prevProps[key], nextProps[key]);
					return false;
				}
			}
			return true;
		} else {
			// 否则比较所有键，但忽略某些常见属性
			const keys = Object.keys(prevProps).filter(
				(key) => ignorePropsList.indexOf(key) === -1,
			) as Array<keyof P>;

			for (const key of keys) {
				if (prevProps[key] !== nextProps[key]) {
					debugLog(displayName, key, prevProps[key], nextProps[key]);
					return false;
				}
			}
			return true;
		}
	};

	/**
	 * 自定义比较函数，包含调试日志
	 * 用于开发时追踪 props 变化
	 */
	const cusCompare = (prevProps: Readonly<P>, nextProps: Readonly<P>) => {
		debugLog(
			displayName,
			"prevProps vs nextProps",
			`${displayName}`,
			prevProps === nextProps,
		);
		const result = defaultCompare(prevProps, nextProps);
		debugLog(displayName, "result", `${displayName}`, result);
		return result;
	};

	// 使用我们的默认比较函数
	const memoized = React.memo(Component, cusCompare);

	// 设置显示名称，便于调试
	memoized.displayName = `Memo-(${displayName})`;

	return memoized;
}

/**
 * 默认导出的记忆化组件创建函数
 * 提供便捷的导入方式
 */
export default createMemoComponent;
