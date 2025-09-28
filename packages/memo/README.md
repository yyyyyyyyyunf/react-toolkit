# @fly4react/memo

[![npm version](https://img.shields.io/npm/v/@fly4react/memo.svg?label=@fly4react/memo)](https://www.npmjs.com/package/@fly4react/memo)
[![npm downloads](https://img.shields.io/npm/dm/@fly4react/memo.svg?label=@fly4react/memo%20downloads)](https://www.npmjs.com/package/@fly4react/memo)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@fly4react/memo.svg?label=@fly4react/memo%20size)](https://bundlephobia.com/package/@fly4react/memo)

An advanced React memoization component tool that provides flexible props comparison strategies.

> 📖 **中文文档**: [查看中文版本](README.zh.md)

## ✨ Features

- 🚀 **High Performance**: Optimized memoization with intelligent comparison strategies
- 🎯 **Flexible Comparison**: Support for custom comparison functions and strategies
- 🔧 **Easy Configuration**: Simple configuration for different use cases
- 📦 **Lightweight**: Minimal bundle size impact
- 🛡️ **TypeScript Support**: Full type safety and IntelliSense
- 🎨 **Multiple Strategies**: Support for various memoization strategies
- 🔄 **Smart Updates**: Intelligent re-render detection
- 📱 **React 18 Compatible**: Full support for React 18 features

## Installation

```bash
npm install @fly4react/memo
# or
yarn add @fly4react/memo
# or
pnpm add @fly4react/memo
```

## Quick Start

```tsx
import createMemoComponent from '@fly4react/memo';

// Create a memoized component
const MyComponent = createMemoComponent(({ name, age }) => {
  return <div>{name} is {age} years old</div>;
});

// Use with custom comparison
const OptimizedComponent = createMemoComponent(
  ({ data }) => <div>{data.value}</div>,
  {
    comparison: 'shallow', // or 'deep', 'custom'
    customCompare: (prevProps, nextProps) => {
      return prevProps.data.id === nextProps.data.id;
    }
  }
);
```

## API Reference

### createMemoComponent

Creates a memoized React component with configurable comparison strategies.

```tsx
const MemoComponent = createMemoComponent(Component, options);
```

**Parameters:**
- `Component`: React component to memoize
- `options`: Configuration options (optional)

**Options:**
- `comparison`: Comparison strategy ('shallow' | 'deep' | 'custom')
- `customCompare`: Custom comparison function
- `displayName`: Component display name

### Comparison Strategies

#### Shallow Comparison
```tsx
const ShallowComponent = createMemoComponent(Component, {
  comparison: 'shallow'
});
```

#### Deep Comparison
```tsx
const DeepComponent = createMemoComponent(Component, {
  comparison: 'deep'
});
```

#### Custom Comparison
```tsx
const CustomComponent = createMemoComponent(Component, {
  comparison: 'custom',
  customCompare: (prevProps, nextProps) => {
    // Custom comparison logic
    return prevProps.id === nextProps.id;
  }
});
```

## Examples

### Basic Usage

```tsx
import createMemoComponent from '@fly4react/memo';

const UserCard = createMemoComponent(({ user, onEdit }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onEdit(user.id)}>Edit</button>
    </div>
  );
});
```

### Performance Optimization

```tsx
const ExpensiveComponent = createMemoComponent(
  ({ data, filters }) => {
    // Expensive computation
    const filteredData = data.filter(item => 
      filters.every(filter => filter(item))
    );
    
    return (
      <div>
        {filteredData.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    );
  },
  {
    comparison: 'deep',
    customCompare: (prevProps, nextProps) => {
      // Only re-render if data or filters actually changed
      return (
        prevProps.data === nextProps.data &&
        prevProps.filters === nextProps.filters
      );
    }
  }
);
```

### Configuration Examples

```tsx
// Shallow comparison for simple props
const SimpleComponent = createMemoComponent(Component, {
  comparison: 'shallow'
});

// Deep comparison for complex objects
const ComplexComponent = createMemoComponent(Component, {
  comparison: 'deep'
});

// Custom comparison for specific logic
const CustomComponent = createMemoComponent(Component, {
  comparison: 'custom',
  customCompare: (prevProps, nextProps) => {
    return prevProps.id === nextProps.id && 
           prevProps.timestamp === nextProps.timestamp;
  }
});
```

## Best Practices

1. **Use shallow comparison for simple props**
2. **Use deep comparison for complex objects**
3. **Use custom comparison for specific optimization needs**
4. **Avoid unnecessary re-renders with proper comparison strategies**
5. **Test performance impact in your specific use cases**

## License

MIT
