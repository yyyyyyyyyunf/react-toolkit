# 模块格式支持说明

`react-intersection-tool` 同时支持 ESM (ES Modules) 和 CommonJS 两种模块格式，确保在不同环境下都能正常使用。

## 支持的模块格式

### ESM (ES Modules)
- **文件扩展名**: `.js`
- **导入方式**: `import` 语句
- **适用环境**: 现代浏览器、Node.js 12+、打包工具

### CommonJS
- **文件扩展名**: `.cjs`
- **导入方式**: `require()` 函数
- **适用环境**: Node.js、旧版打包工具

## 使用方式

### ESM 导入（推荐）

```tsx
// 完整导入
import { 
  IntersectionLoad, 
  useElementPosition, 
  useOneOffVisibility 
} from 'react-intersection-tool';

// 按需导入
import { IntersectionLoad } from 'react-intersection-tool';
import { useElementPosition } from 'react-intersection-tool';
```

### CommonJS 导入

```jsx
// 完整导入
const { 
  IntersectionLoad, 
  useElementPosition, 
  useOneOffVisibility 
} = require('react-intersection-tool');

// 按需导入
const { IntersectionLoad } = require('react-intersection-tool');
const { useElementPosition } = require('react-intersection-tool');
```

### TypeScript 使用

```tsx
// TypeScript 会自动选择正确的模块格式
import type { 
  ObserverCallbackParamType, 
  ScrollDirection 
} from 'react-intersection-tool';

import { useIntersectionObserver } from 'react-intersection-tool';
```

## 包配置说明

### package.json 配置

```json
{
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",    // ESM 入口
      "require": "./dist/index.cjs"   // CommonJS 入口
    }
  },
  "main": "./dist/index.cjs",         // CommonJS 默认入口
  "module": "./dist/index.js",        // ESM 入口
  "types": "./dist/index.d.ts"        // TypeScript 类型定义
}
```

### 模块解析优先级

1. **ESM 环境**: 优先使用 `import` 字段 (`./dist/index.js`)
2. **CommonJS 环境**: 使用 `main` 字段 (`./dist/index.cjs`)
3. **TypeScript**: 使用 `types` 字段 (`./dist/index.d.ts`)

## 不同环境的使用

### 现代浏览器（ESM）

```html
<script type="module">
  import { IntersectionLoad } from 'https://unpkg.com/react-intersection-tool@1.0.0/dist/index.js';
  
  // 使用组件
  const app = document.getElementById('app');
  // ...
</script>
```

### Node.js 环境

```js
// ESM 模式 (package.json 中 "type": "module")
import { useElementPosition } from 'react-intersection-tool';

// CommonJS 模式
const { useElementPosition } = require('react-intersection-tool');
```

### 打包工具

#### Webpack
```js
// webpack.config.js
module.exports = {
  resolve: {
    mainFields: ['module', 'main'], // 优先使用 ESM
  },
};
```

#### Rollup
```js
// rollup.config.js
export default {
  external: ['react', 'react-dom'],
  output: {
    format: 'esm', // 或 'cjs'
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

### 文件大小对比
- **ESM**: ~17.4KB (gzipped: ~5.8KB)
- **CommonJS**: ~40.5KB (包含 webpack 运行时)

## 最佳实践

### 1. 优先使用 ESM
```tsx
// ✅ 推荐
import { IntersectionLoad } from 'react-intersection-tool';

// ❌ 不推荐（除非必要）
const { IntersectionLoad } = require('react-intersection-tool');
```

### 2. 按需导入
```tsx
// ✅ 推荐 - 只导入需要的功能
import { useElementPosition } from 'react-intersection-tool';

// ❌ 不推荐 - 导入所有功能
import * as ReactIntersectionTool from 'react-intersection-tool';
```

### 3. TypeScript 类型导入
```tsx
// ✅ 推荐 - 分离类型导入
import type { ObserverCallbackParamType } from 'react-intersection-tool';
import { useIntersectionObserver } from 'react-intersection-tool';
```

## 故障排除

### 模块找不到错误
```bash
# 检查是否正确安装
npm ls react-intersection-tool

# 清除缓存重新安装
npm cache clean --force
npm install react-intersection-tool
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
import { IntersectionLoad } from 'react-intersection-tool/dist/index.js';
```

## 性能考虑

1. **ESM 更小**: ESM 格式文件更小，加载更快
2. **Tree Shaking**: ESM 支持更好的 tree shaking
3. **缓存友好**: 按需导入有利于缓存优化

## 兼容性

- **Node.js**: 12+ (ESM), 8+ (CommonJS)
- **浏览器**: 支持 ES modules 的现代浏览器
- **打包工具**: Webpack 4+, Rollup, Vite, Parcel
- **TypeScript**: 4.5+
