# @fly4react/observer Examples

这是一个标准的 React 项目，展示了 `@fly4react/observer` 库的各种使用场景。

## 📁 项目结构

```
examples/
├── src/
│   ├── components/          # 组件示例
│   │   ├── Navigation.tsx   # 导航组件
│   │   ├── intersection-load-basic.tsx
│   │   ├── intersection-load-advanced.tsx
│   │   └── intersection-load-images.tsx
│   │
│   ├── hooks/              # Hook 示例
│   │   ├── use-intersection-observer-basic.tsx
│   │   ├── use-one-off-visibility.tsx
│   │   ├── use-in-viewport-example.tsx
│   │   ├── use-element-position.tsx
│   │   ├── use-bounding-rect-and-ratio.tsx
│   │   └── use-scroll-direction-example.tsx
│   │
│   ├── pages/              # 页面示例
│   │   ├── animation-triggers.tsx
│   │   ├── infinite-scroll.tsx
│   │   ├── parallax-scroll.tsx
│   │   └── scroll-direction-example.tsx
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

## 🚀 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

访问 http://localhost:3000 查看示例。

### 其他命令
```bash
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

## 🎯 示例分类

### 组件示例 (components/)
- **IntersectionLoad 基础用法** - 简单的懒加载实现
- **IntersectionLoad 图片懒加载** - 图片画廊懒加载
- **IntersectionLoad 高级用法** - 自定义容器和动态控制

### Hook 示例 (hooks/)
- **useIntersectionObserver** - 最底层的观察器 Hook
- **useOneOffVisibility** - 一次性可见性检测
- **useInViewport** - 简化的视口可见性检测
- **useElementPosition** - 实时位置跟踪
- **useBoundingRectAndRatio** - 边界矩形和交叉比例
- **useScrollDirection** - 滚动方向检测

### 页面示例 (pages/)
- **动画触发器** - 基于可见性触发动画
- **无限滚动** - 无限滚动列表实现
- **视差滚动** - 复杂的视差滚动效果
- **滚动方向检测** - 滚动方向检测演示

## 🛠️ 技术栈

- **React 19** - 用户界面库
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **@fly4react/observer** - Intersection Observer 工具库
- **@fly4react/memo** - 记忆化组件工具

## 📝 开发说明

1. **添加新示例**：
   - 在相应目录创建新的示例文件
   - 在 `src/utils/routes.ts` 中添加路由配置
   - 更新导航组件

2. **样式规范**：
   - 使用 CSS 模块或全局样式
   - 遵循响应式设计原则
   - 保持与现有示例的一致性

3. **代码质量**：
   - 使用 TypeScript 严格模式
   - 遵循 React 最佳实践
   - 添加适当的注释和文档

## 🔧 故障排除

### 导入错误
确保 `@fly4react/observer` 和 `@fly4react/memo` 包已正确安装：
```bash
pnpm install
```

### 类型错误
检查 TypeScript 配置和类型定义：
```bash
pnpm run lint
```

### 构建错误
清理并重新安装依赖：
```bash
rm -rf node_modules
pnpm install
```
