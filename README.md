# React Toolkit

[![CI](https://github.com/yyyyyyyyyunf/react-toolkit/workflows/CI/badge.svg)](https://github.com/yyyyyyyyyunf/react-toolkit/actions)
[![License](https://img.shields.io/npm/l/@fly4react/observer.svg)](https://github.com/yyyyyyyyyunf/react-toolkit/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-16.8-61dafb.svg)](https://reactjs.org/)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/yyyyyyyyyunf/react-toolkit)

### 📦 包信息

| 包名 | 版本 | 下载量 | 大小 |
|------|------|--------|------|
| [@fly4react/observer](https://www.npmjs.com/package/@fly4react/observer) | [![npm version](https://img.shields.io/npm/v/@fly4react/observer.svg?label=version)](https://www.npmjs.com/package/@fly4react/observer) | [![npm downloads](https://img.shields.io/npm/dm/@fly4react/observer.svg?label=downloads)](https://www.npmjs.com/package/@fly4react/observer) | [![npm bundle size](https://img.shields.io/bundlephobia/minzip/@fly4react/observer.svg?label=size)](https://bundlephobia.com/package/@fly4react/observer) |
| [@fly4react/memo](https://www.npmjs.com/package/@fly4react/memo) | [![npm version](https://img.shields.io/npm/v/@fly4react/memo.svg?label=version)](https://www.npmjs.com/package/@fly4react/memo) | [![npm downloads](https://img.shields.io/npm/dm/@fly4react/memo.svg?label=downloads)](https://www.npmjs.com/package/@fly4react/memo) | [![npm bundle size](https://img.shields.io/bundlephobia/minzip/@fly4react/memo.svg?label=size)](https://bundlephobia.com/package/@fly4react/memo) |
| [@fly4react/image](https://www.npmjs.com/package/@fly4react/image) | [![npm version](https://img.shields.io/npm/v/@fly4react/image.svg?label=version)](https://www.npmjs.com/package/@fly4react/image) | [![npm downloads](https://img.shields.io/npm/dm/@fly4react/image.svg?label=downloads)](https://www.npmjs.com/package/@fly4react/image) | [![npm bundle size](https://img.shields.io/bundlephobia/minzip/@fly4react/image.svg?label=size)](https://bundlephobia.com/package/@fly4react/image) |

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
- 🔄 **自动降级**: 为不支持 IntersectionObserver 的浏览器提供 polyfill

## 📊 性能对比

| 特性 | @fly4react/observer | react-intersection-observer | react-use-intersection-observer | react-visibility-sensor |
|------|-------------------|---------------------------|--------------------------------|------------------------|
| 包大小 | ![bundle size](https://img.shields.io/bundlephobia/minzip/@fly4react/observer) | ![bundle size](https://img.shields.io/bundlephobia/minzip/react-intersection-observer) | ![bundle size](https://img.shields.io/bundlephobia/minzip/react-use-intersection-observer) | ![bundle size](https://img.shields.io/bundlephobia/minzip/react-visibility-sensor) |
| 依赖 | 1 个依赖 | 1 个依赖 | 1 个依赖 | 零依赖 |
| 位置跟踪 | ✅ | ❌ | ❌ | ❌ |
| 滚动方向检测 | ✅ | ❌ | ❌ | ❌ |
| 一次性可见性 | ✅ | ❌ | ❌ | ❌ |
| 自定义根元素 | ✅ | ✅ | ✅ | ✅ |
| TypeScript | ✅ | ✅ | ✅ | ❌ |
| SSR 支持 | ✅ | ✅ | ✅ | ❌ |
| 浏览器兼容性 | ✅ (IE 11+) | ❌ | ❌ | ✅ (IE 9+) |
| 性能优化 | ✅ 智能位置同步策略 | ❌ | ❌ | ⚠️ 可配置节流 |
| 内存管理 | ✅ 自动清理 | ❌ | ❌ | ❌ 需要手动清理 |
| 节流控制 | ✅ 内置节流 | ❌ | ❌ | ⚠️ 需手动配置 |
| 降级策略 | ✅ 自动降级 | ❌ | ❌ | ✅ 基于scroll事件 |
| 智能计算 | ✅ 避免重复计算 | ❌ | ❌ | ❌ 无智能策略 |

## 📦 包含的包

### `@fly4react/observer`
一个基于 Intersection Observer API 的现代 React 工具库，提供懒加载、可见性检测、位置跟踪和滚动方向检测功能。支持 IE 11+ 等旧版浏览器，自动降级处理。

**特性:**
- 🔍 元素可见性检测 (`useInViewport`)
- 📍 精确位置跟踪 (`useElementPosition`, `useElementPositionRef`)
- 🎯 一次性可见性检测 (`useOneOffVisibility`)
- 📊 交叉比例监控 (`useIntersectionRatio`)
- 📐 边界矩形获取 (`useBoundingClientRect`)
- 🎮 滚动方向检测 (`useScrollDirection`)
- 📌 元素条件检测 (`useElementDetector`)
- 🖼️ 懒加载组件 (`IntersectionLoad`)
- 🧠 智能位置同步策略 (结合 Intersection Observer 和 scroll 事件)
- 🌐 浏览器兼容性 (IE 11+)
- 🔄 自动降级策略
- 🧠 智能记忆化支持 (依赖 @fly4react/memo)

```bash
# 使用 npm
npm install @fly4react/observer intersection-observer

# 使用 yarn
yarn add @fly4react/observer intersection-observer

# 使用 pnpm
pnpm add @fly4react/observer intersection-observer
```

#### 浏览器兼容性

| 浏览器 | 版本要求 | 支持状态 |
|--------|----------|----------|
| Chrome | 51+ | ✅ 原生支持 |
| Firefox | 55+ | ✅ 原生支持 |
| Safari | 12.1+ | ✅ 原生支持 |
| Edge | 79+ | ✅ 原生支持 |
| IE | 11 | ✅ 降级支持 |
| 旧版浏览器 | - | ✅ 降级支持 |

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

### `@fly4react/image`
一个现代化的图片优化和懒加载工具库，提供 SSR 预加载、图片转换和智能懒加载功能。

**特性:**
- 🖼️ 智能图片懒加载 (`ImageLoader`)
- ⚡ SSR 预加载支持 (`ImagePreloadConsumer`)
- 🔄 图片 URL 转换 (`transform` 属性)
- 📱 响应式图片支持 (`sizes` 属性)
- 🎯 预加载优先级控制 (`priority` 属性)
- 🔗 ForwardRef 支持
- 🌐 完全 SSR 兼容
- 🧠 智能记忆化 (依赖 @fly4react/memo)
- 🎨 内容图片和背景图片支持

```bash
npm install @fly4react/image @fly4react/observer @fly4react/memo
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
- **企业应用**: 支持 IE 11+ 的企业级应用
- **兼容性要求**: 需要支持旧版浏览器的项目
- **性能敏感**: 需要高性能和内存优化的项目

### 与 react-visibility-sensor 的对比优势

| 方面 | @fly4react/observer | react-visibility-sensor |
|------|-------------------|------------------------|
| **性能** | 基于原生 IntersectionObserver API，性能优异 | 基于标准 polyfill，性能良好 |
| **内存管理** | 自动清理观察器，无内存泄漏 | 需要手动清理，容易内存泄漏 |
| **功能丰富度** | 提供位置跟踪、滚动方向检测等高级功能 | 只提供基本的可见性检测 |
| **TypeScript** | 完整的 TypeScript 支持 | 无 TypeScript 支持 |
| **SSR 支持** | 完全支持服务端渲染 | 不支持 SSR |
| **现代化** | 基于现代 Web API，面向未来 | 基于传统事件监听，技术栈较老 |
| **维护性** | 活跃维护，持续更新 | 维护较少，更新频率低 |
| **配置复杂度** | 简单易用，开箱即用 | 需要手动配置节流等参数 |
| **API 设计** | 现代化 hooks API | 基于 render props 模式 |
| **依赖管理** | 1个 peerDependency，避免冲突 | 零依赖，但功能有限 |

### Memo 包适用场景
- **列表渲染**: 大型列表的性能优化
- **复杂组件**: 减少不必要的重新渲染
- **数据展示**: 数据密集型组件的优化
- **表单组件**: 表单字段的性能优化
- **图表组件**: 数据可视化组件的优化

### Image 包适用场景
- **电商网站**: 商品图片的懒加载和优化
- **新闻媒体**: 文章图片的按需加载
- **社交媒体**: 用户头像和内容图片优化
- **企业官网**: 产品展示图片的智能加载
- **博客平台**: 文章配图的性能优化
- **图片画廊**: 大量图片的高效展示
- **移动应用**: 移动端图片加载优化
- **SSR 应用**: 服务端渲染的图片预加载

## 🚀 快速开始

### Observer 包使用示例

```tsx
import { useInViewport, useElementPosition, useElementDetector } from '@fly4react/observer';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  
  // 检测元素是否在视口中
  const isInViewport = useInViewport(ref);
  
  // 检测元素是否贴顶
  const isCeiling = useElementDetector(ref);
  
  // 获取元素的精确位置
  const position = useElementPosition(ref, {
    step: 0.1,
    throttle: 16
  });

  return (
    <div ref={ref} style={{ 
      background: isCeiling ? 'green' : 'blue',
      position: 'sticky',
      top: 0
    }}>
      <div>可见状态: {isInViewport ? '可见' : '不可见'}</div>
      <div>贴顶状态: {isCeiling ? '已贴顶' : '未贴顶'}</div>
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

### Image 包使用示例

```tsx
import { ImageLoader, ImagePreloadConsumer } from '@fly4react/image';

function MyComponent() {
  // 自定义图片转换函数
  const toWebP = (src: string) => src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  return (
    <div>
      {/* 在 SSR 时渲染预加载链接 */}
      <ImagePreloadConsumer />
      
      {/* 内容图片 */}
      <ImageLoader
        type="content"
        src="https://example.com/image.jpg"
        alt="示例图片"
        transform={toWebP}
        preload={{ priority: 'high', ssr: true }}
        style={{ width: '100%', height: 'auto' }}
      />
      
      {/* 背景图片 */}
      <ImageLoader
        type="background"
        src="https://example.com/background.jpg"
        style={{
          width: '100%',
          height: '200px',
          backgroundSize: 'cover'
        }}
      >
        <div>背景图片内容</div>
      </ImageLoader>
    </div>
  );
}
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
│   ├── memo/             # @fly4react/memo
│   │   ├── src/
│   │   │   ├── index.ts   # createMemoComponent
│   │   │   └── memoHelper.ts
│   │   ├── package.json
│   │   └── rslib.config.ts
│   └── image/            # @fly4react/image
│       ├── src/
│       │   ├── components/ # ImageLoader, ImagePreloadConsumer
│       │   ├── hooks/      # useImagePreload
│       │   ├── utils/      # 预加载工具函数
│       │   └── types.ts    # 类型定义
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
- [Image 包文档](./packages/image/README.md)
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
A: 库会自动使用标准的 intersection-observer polyfill，确保在所有环境下都能正常工作。

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
- [@fly4react/observer](https://www.npmjs.com/package/@fly4react/observer) - 基于 Intersection Observer API 的现代 React 工具库
- [@fly4react/memo](https://www.npmjs.com/package/@fly4react/memo) - 高级的 React 记忆化组件工具
- [@fly4react/image](https://www.npmjs.com/package/@fly4react/image) - 现代化的图片优化和懒加载工具库
- [React Toolkit](https://github.com/yyyyyyyyyunf/react-toolkit) - React 工具集合，包含 observer、memo 和 image 等工具库

## 📄 许可证

本项目采用 [MIT 许可证](./LICENSE)。

```bash
MIT License

Copyright (c) 2024 yyyyyyyyunf

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
