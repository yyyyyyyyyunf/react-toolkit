# 模块格式支持说明

`@fly4react/observer`、`@fly4react/memo` 和 `@fly4react/image` 都支持 ESM (ES Modules) 格式，确保在现代环境下都能正常使用。

> 📖 **English Documentation**: [View English Version](README.md)

## 支持的模块格式

### ESM (ES Modules) - 主要支持
- **文件扩展名**: `.js`
- **导入方式**: `import` 语句
- **适用环境**: 现代浏览器、Node.js 12+、所有现代打包工具
- **优势**: 更好的 Tree Shaking、更小的包体积、更好的开发体验

## 使用方式

### ESM 导入（推荐）

#### @fly4react/observer

```tsx
// 完整导入
import { 
  IntersectionLoad, 
  useElementPosition, 
  useOneOffVisibility 
} from '@fly4react/observer';

// 按需导入
import { IntersectionLoad } from '@fly4react/observer';
import { useElementPosition } from '@fly4react/observer';
```

#### @fly4react/memo

```tsx
// 完整导入
import { 
  createMemoComponent,
  debugComponentList,
  ignorePropsList 
} from '@fly4react/memo';

// 按需导入
import { createMemoComponent } from '@fly4react/memo';
```

#### @fly4react/image

```tsx
// 完整导入
import { 
  ImageLoader,
  BackgroundImage,
  ContentImage,
  PreloadQueueProvider,
  ImagePreloadConsumer,
  useAddToPreloadQueue,
  useGetPreloadImages,
  useClearPreloadQueue
} from '@fly4react/image';

// 按需导入
import { ImageLoader, PreloadQueueProvider } from '@fly4react/image';
import { BackgroundImage, ContentImage } from '@fly4react/image';
```

## 实际使用示例

### 基础使用

```tsx
// @fly4react/observer - 元素可见性检测
import { useIntersectionObserver } from '@fly4react/observer';
import { useRef, useState } from 'react';

function LazyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useIntersectionObserver(
    ref,
    (entry) => {
      setIsVisible(entry.isIntersecting);
    },
    {
      threshold: 0.1,
      once: true
    }
  );

  return (
    <div ref={ref}>
      {isVisible ? 'Content loaded!' : 'Loading...'}
    </div>
  );
}

// @fly4react/memo - 组件记忆化
import createMemoComponent from '@fly4react/memo';

const MemoComponent = createMemoComponent(({ data }) => {
  return <div>{data.value}</div>;
});

// @fly4react/image - 图片加载和预加载
import { ImageLoader, PreloadQueueProvider } from '@fly4react/image';

function App() {
  return (
    <PreloadQueueProvider value={new MyPreloadQueue()}>
      <ImageLoader 
        type="content"
        src="https://example.com/image.jpg"
        preloadConfig={{
          preload: true,
          priority: 'high',
          ssr: true,
        }}
        alt="My image"
      />
    </PreloadQueueProvider>
  );
}
```

### TypeScript 使用

#### @fly4react/observer

```tsx
// TypeScript 会自动选择正确的模块格式
import type { 
  ObserverCallbackParamType, 
  ScrollDirection 
} from '@fly4react/observer';

import { useIntersectionObserver } from '@fly4react/observer';
```

#### @fly4react/memo

```tsx
// TypeScript 会自动选择正确的模块格式
import type { 
  MemoOptions 
} from '@fly4react/memo';

import { createMemoComponent } from '@fly4react/memo';
```

#### @fly4react/image

```tsx
// TypeScript 会自动选择正确的模块格式
import type { 
  PreloadConfig,
  BackgroundImageProps,
  ContentImageProps,
  PreloadQueueContext
} from '@fly4react/image';

import { 
  ImageLoader, 
  PreloadQueueProvider,
  BackgroundImage,
  ContentImage 
} from '@fly4react/image';
```

## 包配置说明

### package.json 配置

```json
{
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"     // ESM 入口
    }
  },
  "module": "./dist/index.js",        // ESM 入口
  "types": "./dist/index.d.ts"        // TypeScript 类型定义
}
```

### 模块解析优先级

1. **ESM 环境**: 使用 `import` 字段 (`./dist/index.js`)
2. **TypeScript**: 使用 `types` 字段 (`./dist/index.d.ts`)
3. **向后兼容**: 使用 `module` 字段作为 ESM 入口

## 不同环境的使用

### 现代浏览器（ESM）

```html
<script type="module">
  import { IntersectionLoad } from 'https://unpkg.com/@fly4react/observer@1.0.0/dist/index.js';
  
  // 使用组件
  const app = document.getElementById('app');
  // ...
</script>
```

### Node.js 环境

```js
// ESM 模式 (package.json 中 "type": "module")
import { useElementPosition } from '@fly4react/observer';
import { ImageLoader, PreloadQueueProvider } from '@fly4react/image';
import createMemoComponent from '@fly4react/memo';
```

### 打包工具

#### Webpack
```js
// webpack.config.js
module.exports = {
  resolve: {
    mainFields: ['module'], // 优先使用 ESM
  },
};
```

#### Rollup
```js
// rollup.config.js
export default {
  external: ['react', 'react-dom'],
  output: {
    format: 'esm', // 使用 ESM 格式
  },
};
```

#### Vite
```js
// vite.config.js
export default {
  build: {
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
};
```

## 构建产物

### 文件结构
```
dist/
├── index.js          # ESM 格式
├── index.cjs         # CommonJS 格式
├── index.d.ts        # TypeScript 类型定义
├── components/
│   ├── IntersectionLoad.js
│   └── IntersectionLoad.cjs
├── hooks/
│   ├── useElementPosition.js
│   └── useElementPosition.cjs
└── ...
```

### 文件大小
- **ESM**: ~17.4KB (gzipped: ~5.8KB)
- **优势**: 更小的包体积，更好的 Tree Shaking 支持

## 最佳实践

### 1. 使用 ESM 导入
```tsx
// ✅ 推荐
import { IntersectionLoad } from '@fly4react/observer';
import { ImageLoader, PreloadQueueProvider } from '@fly4react/image';
import createMemoComponent from '@fly4react/memo';
```

### 2. 按需导入
```tsx
// ✅ 推荐 - 只导入需要的功能
import { useElementPosition } from '@fly4react/observer';

// ❌ 不推荐 - 导入所有功能
import * as ReactIntersectionTool from '@fly4react/observer';
```

### 3. TypeScript 类型导入
```tsx
// ✅ 推荐 - 分离类型导入
import type { ObserverCallbackParamType } from '@fly4react/observer';
import { useIntersectionObserver } from '@fly4react/observer';
```

## 故障排除

### 模块找不到错误
```bash
# 检查是否正确安装
npm ls @fly4react/observer

# 清除缓存重新安装
npm cache clean --force
npm install @fly4react/observer
```

### 类型错误
```bash
# 确保 TypeScript 版本支持
npm install typescript@^4.5.0

# 检查 tsconfig.json 配置
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  }
}
```

### 打包工具兼容性
```js
// 如果遇到模块解析问题，可以显式指定入口
import { IntersectionLoad } from '@fly4react/observer/dist/index.js';
```

## 性能考虑

1. **ESM 更小**: ESM 格式文件更小，加载更快
2. **Tree Shaking**: ESM 支持更好的 tree shaking
3. **缓存友好**: 按需导入有利于缓存优化

## 兼容性

- **Node.js**: 12+ (ESM)
- **浏览器**: 支持 ES modules 的现代浏览器
- **打包工具**: Webpack 4+, Rollup, Vite, Parcel
- **TypeScript**: 4.5+
