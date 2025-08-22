# React Toolkit Monorepo

这是一个 React Toolkit 生态系统的 monorepo，包含多个高性能的 React 工具库。

## 📦 包含的包

### `@react-toolkit/observer`
一个基于 Intersection Observer API 的现代 React 工具库，提供懒加载、可见性检测、位置跟踪和滚动方向检测功能。

```bash
npm install @react-toolkit/observer
```

### `@react-toolkit/memo`
一个高级的 React 记忆化组件工具，提供灵活的 props 比较策略。

```bash
npm install @react-toolkit/memo
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
│   ├── observer/          # @react-toolkit/observer
│   │   ├── src/
│   │   ├── package.json
│   │   └── rslib.config.ts
│   └── memo/             # @react-toolkit/memo
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

## 📄 许可证
