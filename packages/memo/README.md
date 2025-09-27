# @fly4react/memo

[![npm version](https://img.shields.io/npm/v/@fly4react/memo.svg?label=@fly4react/memo)](https://www.npmjs.com/package/@fly4react/memo)
[![npm downloads](https://img.shields.io/npm/dm/@fly4react/memo.svg?label=@fly4react/memo%20downloads)](https://www.npmjs.com/package/@fly4react/memo)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@fly4react/memo.svg?label=@fly4react/memo%20size)](https://bundlephobia.com/package/@fly4react/memo)

一个高级的 React 记忆化组件工具，提供灵活的 props 比较策略。

## ✨ 特性

- 🚀 **高性能**: 基于 React.memo 的优化
- 🎯 **灵活比较**: 支持自定义比较函数
- 🔍 **选择性比较**: 只比较指定的属性
- 🐛 **调试友好**: 内置调试日志功能
- ⚙️ **动态配置**: 支持运行时动态配置调试和忽略属性
- 📦 **TypeScript**: 完整的类型支持

## 📦 安装

```bash
npm install @fly4react/memo
# 或
yarn add @fly4react/memo
# 或
pnpm add @fly4react/memo
```

## 🚀 使用

### 基本用法

```tsx
import { createMemoComponent } from '@fly4react/memo';

const MyComponent = createMemoComponent(({ name, age }) => (
  <div>{name}: {age}</div>
));
```

### 自定义比较函数

```tsx
const MyComponent = createMemoComponent(
  ({ data }) => <div>{data}</div>,
  {
    compare: (prev, next) => prev.data.id === next.data.id
  }
);
```

### 选择性属性比较

```tsx
const MyComponent = createMemoComponent(
  ({ name, age, timestamp }) => <div>{name}: {age}</div>,
  {
    propKeys: ['name', 'age'] // 只比较 name 和 age，忽略 timestamp
  }
);
```

## ⚙️ 配置管理

### 使用配置管理函数

```tsx
import { 
  registerDebugComponent, 
  registerIgnoreProp,
  registerComponentIgnoreProp 
} from '@fly4react/memo';

// 注册调试组件
registerDebugComponent('MyComponent');
registerDebugComponent('UserCard');

// 全局忽略属性 - 所有组件都忽略
registerIgnoreProp('onClick');
registerIgnoreProp('style');
registerIgnoreProp('className');

// 组件特定忽略属性 - 只忽略特定组件的特定属性
registerComponentIgnoreProp('UserCard', 'lastLogin');
registerComponentIgnoreProp('ProductCard', 'description');
registerComponentIgnoreProp('ProductCard', 'image');
```





## 📖 API

### `createMemoComponent<P>(Component, options?)`

创建一个记忆化的 React 组件。

#### 参数

- `Component`: React 组件
- `options`: 可选的配置选项
  - `compare`: 自定义比较函数
  - `propKeys`: 要比较的属性键数组

#### 返回值

记忆化的 React 组件

### 配置管理函数

#### `registerDebugComponent(component: string)`
注册调试组件

#### `registerIgnoreProp(prop: string)`
注册全局忽略属性

#### `registerComponentIgnoreProp(componentName: string, prop: string)`
注册组件特定的忽略属性

#### `getDebugComponents()`
获取当前调试组件列表

#### `getIgnoreProps()`
获取当前全局忽略属性列表

#### `getComponentIgnoreProps(componentName: string)`
获取指定组件的忽略属性列表



## 🔧 配置

### 调试模式

当组件名称包含调试列表中的任何字符串时，会在控制台输出 props 变化的调试日志。

```tsx
import { registerDebugComponent } from '@fly4react/memo';

// 启用特定组件的调试日志
registerDebugComponent('MyComponent');
registerDebugComponent('UserCard');
```

### 忽略属性

#### 全局忽略属性

在比较 props 时，这些属性会被自动忽略，不会触发重新渲染。

```tsx
import { registerIgnoreProp } from '@fly4react/memo';

// 添加要忽略的属性 - 所有组件都忽略
registerIgnoreProp('onClick');
registerIgnoreProp('style');
registerIgnoreProp('className');
```

#### 组件特定忽略属性

为特定组件忽略特定属性，其他组件仍会比较这些属性。

```tsx
import { registerComponentIgnoreProp } from '@fly4react/memo';

// 只有 UserCard 组件忽略 lastLogin 属性
registerComponentIgnoreProp('UserCard', 'lastLogin');

// 只有 ProductCard 组件忽略 description 和 image 属性
registerComponentIgnoreProp('ProductCard', 'description');
registerComponentIgnoreProp('ProductCard', 'image');
```

**优先级：** 全局忽略 > 组件特定忽略

## 📄 许可证

MIT
