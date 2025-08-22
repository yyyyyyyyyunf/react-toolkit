# 开发环境设置

## 项目概述

这是一个标准的 React + TypeScript + Vite 项目，用于展示 `@fly4react/observer` 库的各种使用场景。

## 技术栈

- **React 19** - 用户界面库
- **TypeScript** - 类型安全
- **Vite** - 构建工具和开发服务器
- **pnpm** - 包管理器
- **@fly4react/observer** - Intersection Observer 工具库
- **@fly4react/memo** - 记忆化组件工具

## 开发环境要求

- **Node.js**: 18.0.0 或更高版本
- **pnpm**: 8.0.0 或更高版本
- **现代浏览器**: 支持 Intersection Observer API

## 快速开始

### 1. 安装依赖
```bash
pnpm install
```

### 2. 启动开发服务器
```bash
pnpm dev
```

### 3. 访问应用
打开浏览器访问 http://localhost:3000

## 项目结构

```
examples/
├── src/
│   ├── components/          # 组件示例
│   │   ├── Navigation.tsx   # 导航组件
│   │   └── *.tsx           # IntersectionLoad 组件示例
│   │
│   ├── hooks/              # Hook 示例
│   │   └── *.tsx           # 各种 Hook 使用示例
│   │
│   ├── pages/              # 页面示例
│   │   └── *.tsx           # 完整页面示例
│   │
│   ├── utils/              # 工具函数
│   │   └── routes.ts       # 路由配置
│   │
│   ├── App.tsx             # 主应用组件
│   ├── main.tsx            # 应用入口
│   └── style.css           # 全局样式
│
├── index.html              # HTML 模板
├── package.json            # 项目配置
├── vite.config.ts          # Vite 配置
├── tsconfig.json           # TypeScript 配置
└── tsconfig.node.json      # Node.js TypeScript 配置
```

## 开发命令

```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview

# 代码检查
pnpm run lint

# 自动修复代码问题
pnpm run lint:fix

# 格式化代码
pnpm run format
```

## 添加新示例

### 1. 创建示例文件
在相应的目录中创建新的示例文件：

```tsx
// src/pages/your-example.tsx
import React from 'react'

export default function YourExample() {
  return (
    <div>
      <h1>你的示例标题</h1>
      {/* 你的示例内容 */}
    </div>
  )
}
```

### 2. 添加路由配置
在 `src/utils/routes.ts` 中添加路由：

```tsx
const YourExample = lazy(() => import('../pages/your-example'))

export const routes = [
  // ... 现有路由
  {
    path: '/your-example',
    name: '你的示例',
    component: YourExample,
    description: '示例描述'
  }
]
```

### 3. 重启开发服务器
```bash
pnpm dev
```

## 包依赖说明

### 工作区依赖
项目使用 pnpm 工作区，直接从 monorepo 中引用包：

```json
{
  "dependencies": {
    "@fly4react/observer": "workspace:*",
    "@fly4react/memo": "workspace:*"
  }
}
```

这意味着：
- 示例项目直接使用 monorepo 中的包
- 不需要发布到 npm 就能使用最新代码
- 支持热重载和实时更新

## 故障排除

### 依赖问题
```bash
# 清理并重新安装
rm -rf node_modules
pnpm install
```

### 类型错误
```bash
# 检查 TypeScript 配置
pnpm run lint
```

### 端口被占用
Vite 会自动使用下一个可用端口，或者可以手动指定：
```bash
pnpm dev --port 3001
```

### 导入错误
确保：
- 包名正确：`@fly4react/observer` 和 `@fly4react/memo`
- TypeScript 配置正确
- 工作区设置正确

## 构建和部署

### 构建生产版本
```bash
pnpm build
```

构建产物位于 `dist/` 目录。

### 预览构建结果
```bash
pnpm preview
```

### 部署到静态服务器
构建后的 `dist/` 目录可以部署到任何静态文件服务器。

## 开发最佳实践

1. **使用 TypeScript** - 充分利用类型安全
2. **遵循组件结构** - 按功能分类组织文件
3. **添加注释** - 为复杂逻辑添加说明
4. **响应式设计** - 确保示例在移动端也能正常工作
5. **性能优化** - 合理使用懒加载和代码分割
