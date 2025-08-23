# React Toolkit

[![CI](https://github.com/yyyyyyyyyunf/react-toolkit/workflows/CI/badge.svg)](https://github.com/yyyyyyyyyunf/react-toolkit/actions)
[![npm version](https://img.shields.io/npm/v/@fly4react/observer.svg)](https://www.npmjs.com/package/@fly4react/observer)
[![npm downloads](https://img.shields.io/npm/dm/@fly4react/observer.svg)](https://www.npmjs.com/package/@fly4react/observer)
[![npm version](https://img.shields.io/npm/v/@fly4react/memo.svg)](https://www.npmjs.com/package/@fly4react/memo)
[![npm downloads](https://img.shields.io/npm/dm/@fly4react/memo.svg)](https://www.npmjs.com/package/@fly4react/memo)
[![License](https://img.shields.io/npm/l/@fly4react/observer.svg)](https://github.com/yyyyyyyyyunf/react-toolkit/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-16.8+-61dafb.svg)](https://reactjs.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/min/@fly4react/observer)](https://bundlephobia.com/package/@fly4react/observer)
[![Bundle Size](https://img.shields.io/bundlephobia/min/@fly4react/memo)](https://bundlephobia.com/package/@fly4react/memo)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/yyyyyyyyyunf/react-toolkit)

这是一个 React Toolkit 的 monorepo，包含多个高性能的 React 工具库。

## ✨ 特性

- 🚀 **高性能**: 基于原生 Intersection Observer API，零依赖
- 🎯 **类型安全**: 完整的 TypeScript 支持
- 🔧 **灵活配置**: 支持多种配置选项和自定义策略
- 📦 **轻量级**: 极小的包体积，不影响应用性能
- 🧪 **测试覆盖**: 完整的单元测试覆盖
- 📚 **详细文档**: 丰富的示例和文档
- 🌐 **浏览器兼容**: 支持现代浏览器，自动降级处理
- ⚡ **SSR 友好**: 完全支持服务端渲染

## 📊 性能对比

| 特性 | @fly4react/observer | react-intersection-observer | react-use-intersection-observer |
|------|-------------------|---------------------------|--------------------------------|
| 包大小 | ~2.2kB (gzipped) | ~3.1kB (gzipped) | ~2.8kB (gzipped) |
| 依赖 | 零依赖 | 1 个依赖 | 1 个依赖 |
| 位置跟踪 | ✅ | ❌ | ❌ |
| 滚动方向检测 | ✅ | ❌ | ❌ |
| 一次性可见性 | ✅ | ❌ | ❌ |
| 自定义根元素 | ✅ | ✅ | ✅ |
| TypeScript | ✅ | ✅ | ✅ |
| SSR 支持 | ✅ | ✅ | ✅ |

## 📦 包含的包

### `@fly4react/observer`
一个基于 Intersection Observer API 的现代 React 工具库，提供懒加载、可见性检测、位置跟踪和滚动方向检测功能。

**特性:**
- 🔍 元素可见性检测 (`useInViewport`)
- 📍 精确位置跟踪 (`useElementPosition`)
- 🎯 一次性可见性检测 (`useOneOffVisibility`)
- 📊 交叉比例监控 (`useIntersectionRatio`)
- 📐 边界矩形获取 (`useBoundingClientRect`)
- 🎮 滚动方向检测 (`useScrollDirection`)
- 🖼️ 懒加载组件 (`IntersectionLoad`)

```bash
npm install @fly4react/observer
```

### `@fly4react/memo`
一个高级的 React 记忆化组件工具，提供灵活的 props 比较策略。

**特性:**
- 🧠 智能 props 比较
- 🎛️ 可配置的调试模式
- 🚫 灵活的忽略策略
- ⚡ 高性能记忆化
- 🔧 全局配置管理

```bash
npm install @fly4react/memo
```

## 🎯 使用场景

### Observer 包适用场景
- **懒加载**: 图片、组件、内容的按需加载
- **无限滚动**: 社交媒体、电商列表的无限加载
- **视差滚动**: 创建动态的视差效果
- **动画触发**: 元素进入视口时触发动画
- **性能监控**: 跟踪用户浏览行为
- **广告展示**: 广告可见性统计
- **表单验证**: 实时表单验证反馈

### Memo 包适用场景
- **列表渲染**: 大型列表的性能优化
- **复杂组件**: 减少不必要的重新渲染
- **数据展示**: 数据密集型组件的优化
- **表单组件**: 表单字段的性能优化
- **图表组件**: 数据可视化组件的优化

## 🚀 快速开始

### Observer 包使用示例

```tsx
import { useInViewport, useElementPosition } from '@fly4react/observer';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  
  // 检测元素是否在视口中
  const isInViewport = useInViewport(ref);
  
  // 获取元素的精确位置
  const position = useElementPosition(ref, {
    step: 0.1,
    throttle: 16
  });

  return (
    <div ref={ref}>
      {isInViewport ? '元素可见' : '元素不可见'}
    </div>
  );
}
```

### Memo 包使用示例

```tsx
import { createMemoComponent } from '@fly4react/memo';

const MyMemoComponent = createMemoComponent<{ name: string; count: number }>(
  ({ name, count }) => (
    <div>
      Hello {name}, count: {count}
    </div>
  ),
  {
    debug: true,
    ignoreProps: ['count']
  }
);
```

## 🚀 开发

### 安装依赖
```bash
pnpm install
```

### 构建所有包
```bash
pnpm build
```

### 开发模式
```bash
pnpm dev
```

### 代码检查
```bash
pnpm check
```

### 格式化代码
```bash
pnpm format
```

## 📁 项目结构

```
react-intersection-tool/
├── packages/
│   ├── observer/          # @fly4react/observer
│   │   ├── src/
│   │   ├── package.json
│   │   └── rslib.config.ts
│   └── memo/             # @fly4react/memo
│       ├── src/
│       │   ├── index.ts   # createMemoComponent
│       │   └── memoHelper.ts
│       ├── package.json
│       └── rslib.config.ts
├── examples/             # 示例代码
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

## 🔗 相关链接

- [Observer 包文档](./packages/observer/README.md)
- [Memo 包文档](./packages/memo/README.md)
- [示例代码](./examples/)
- [性能对比](./benchmark/)
- [在线演示](https://yyyyyyyyyunf.github.io/react-toolkit/)
- [更新日志](./CHANGELOG.md)
- [API 文档](./docs/API.md)

## 🤝 贡献

我们欢迎所有形式的贡献！

1. Fork 这个仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

### 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/yyyyyyyyyunf/react-toolkit.git
cd react-toolkit

# 安装依赖
pnpm install

# 运行测试
pnpm test

# 启动开发服务器
pnpm dev
```

## ❓ 常见问题

### Q: 这个库与其他类似库有什么区别？
A: 我们的库专注于 Intersection Observer API 的完整封装，提供更丰富的功能（位置跟踪、滚动方向检测等），同时保持零依赖和极小的包体积。

### Q: 支持哪些浏览器？
A: 支持所有支持 Intersection Observer API 的现代浏览器（Chrome 51+, Firefox 55+, Safari 12.1+, Edge 15+）。

### Q: 如何处理不支持 Intersection Observer 的浏览器？
A: 库会自动降级到基于 scroll 事件的实现，确保在所有环境下都能正常工作。

### Q: 性能如何？
A: 基于原生 API，性能优异。支持节流控制和智能观察器复用，避免不必要的计算。

### Q: 如何调试组件重新渲染？
A: 使用 `@fly4react/memo` 的调试模式，可以轻松追踪 props 变化和组件重新渲染。

### Q: 支持 SSR 吗？
A: 是的，完全支持服务端渲染，所有 hooks 都会在服务端安全地返回默认值。

## 🌟 社区

### 支持我们
如果这个项目对你有帮助，请给我们一个 ⭐️ Star！

### 反馈和建议
- 🐛 [报告 Bug](https://github.com/yyyyyyyyyunf/react-toolkit/issues)
- 💡 [功能建议](https://github.com/yyyyyyyyyunf/react-toolkit/issues)
- 📖 [文档改进](https://github.com/yyyyyyyyyunf/react-toolkit/issues)

### 相关项目
- [React Query](https://tanstack.com/query) - 数据获取和缓存
- [React Hook Form](https://react-hook-form.com/) - 表单处理
- [Framer Motion](https://www.framer.com/motion/) - 动画库

## 📄 许可证
