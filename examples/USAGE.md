# 使用说明

## 🚀 快速启动

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## 📱 访问应用

启动成功后，在浏览器中访问：
- **本地地址**: http://localhost:3000
- **网络地址**: http://your-ip:3000

## 🎯 功能说明

### 导航系统
- 左侧导航栏显示所有可用的示例
- 点击示例名称可以切换不同的示例页面
- 当前选中的示例会高亮显示

### 示例分类
1. **动画触发器** - 展示如何基于可见性触发动画
2. **无限滚动** - 实现无限滚动列表
3. **视差滚动** - 复杂的视差滚动效果
4. **滚动方向检测** - 检测页面滚动方向

### 响应式设计
- 支持桌面端和移动端
- 移动端会自动调整布局
- 导航栏在移动端变为水平滚动

## 🛠️ 开发模式

### 热重载
- 修改代码后会自动刷新页面
- 支持 TypeScript 类型检查
- 实时显示编译错误

### 调试工具
- 浏览器开发者工具
- React DevTools
- 控制台日志输出

## 📝 添加新示例

1. 在 `src/pages/` 目录创建新的示例文件
2. 在 `src/utils/routes.ts` 中添加路由配置
3. 重启开发服务器查看效果

### 示例文件模板
```tsx
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

## 🔧 故障排除

### 端口被占用
如果 3000 端口被占用，Vite 会自动使用下一个可用端口。

### 依赖问题
```bash
# 清理并重新安装
rm -rf node_modules
pnpm install
```

### 类型错误
```bash
# 检查代码问题
pnpm run lint

# 自动修复大部分问题
pnpm run lint:fix

# 格式化代码
pnpm run format
```

## 📚 相关文档

- [项目 README](./README.md)
- [开发设置](./dev-setup.md)
- [API 文档](../README.md)
