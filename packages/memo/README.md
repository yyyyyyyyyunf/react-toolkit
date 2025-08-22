# @react-toolkit/memo

一个高级的 React 记忆化组件工具，提供灵活的 props 比较策略。

## ✨ 特性

- 🚀 **高性能**: 基于 React.memo 的优化
- 🎯 **灵活比较**: 支持自定义比较函数
- 🔍 **选择性比较**: 只比较指定的属性
- 🐛 **调试友好**: 内置调试日志功能
- 📦 **TypeScript**: 完整的类型支持

## 📦 安装

```bash
npm install @react-toolkit/memo
# 或
yarn add @react-toolkit/memo
# 或
pnpm add @react-toolkit/memo
```

## 🚀 使用

### 基本用法

```tsx
import { createMemoComponent } from '@react-toolkit/memo';

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

## 🔧 配置

### 调试模式

```tsx
import { debugComponentList } from '@react-toolkit/memo';

// 启用特定组件的调试日志
debugComponentList.push('MyComponent');
```

### 忽略属性

```tsx
import { ignorePropsList } from '@react-toolkit/memo';

// 添加要忽略的属性
ignorePropsList.push('onClick');
```

## 📄 许可证

MIT
