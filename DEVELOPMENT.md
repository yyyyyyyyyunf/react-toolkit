# 开发指南

## 项目结构

这是一个 monorepo，包含以下包：

- `@fly4react/observer` - Intersection Observer 工具库
- `@fly4react/memo` - React 记忆化组件工具

## 代码格式化

本项目使用 [Biome](https://biomejs.dev/) 进行代码格式化和 linting。

### 配置文件

项目使用 TypeScript 格式的配置文件 `biome.config.ts`，提供以下优势：

- **类型安全**：TypeScript 类型检查和自动完成
- **注释支持**：可以添加详细的配置说明
- **动态配置**：支持条件逻辑和函数
- **更好的 IDE 支持**：智能提示和错误检查

### 可用的脚本

```bash
# 构建所有包
pnpm build

# 开发模式（监听文件变化）
pnpm dev

# 格式化所有包的代码
pnpm format

# 检查代码格式（不修改）
pnpm format:check

# 运行所有包的 lint 检查
pnpm lint

# 自动修复所有包的 lint 问题
pnpm lint:fix

# 运行完整的代码检查（格式化 + lint）
pnpm check

# 自动修复所有问题
pnpm check:fix

# 清理所有包的构建产物
pnpm clean
```

### 编辑器集成

#### VS Code

1. 安装 Biome 扩展：`biomejs.biome`
2. 在设置中启用自动格式化：
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "biomejs.biome"
   }
   ```

#### 其他编辑器

Biome 支持多种编辑器，请参考 [官方文档](https://biomejs.dev/guides/getting-started/)。

## 开发流程

1. **编写代码**：按照项目的编码规范编写代码
2. **构建**：运行 `pnpm build` 确保所有包构建成功
3. **格式化**：运行 `pnpm format` 确保代码格式正确
4. **检查**：运行 `pnpm check` 确保没有 lint 错误
5. **提交**：提交代码前确保所有检查都通过

## 包开发

### 开发单个包

```bash
# 进入特定包目录
cd packages/observer
# 或
cd packages/memo

# 开发模式
pnpm dev

# 构建
pnpm build

# 检查
pnpm check
```

### 添加新包

1. 在 `packages/` 目录下创建新包目录
2. 创建 `package.json`、`tsconfig.json`、`rslib.config.ts`
3. 在根目录的 `package.json` 中添加相应的脚本
4. 更新 `pnpm-workspace.yaml`（如果需要）

## 配置说明

Biome 配置文件 `biome.config.ts` 包含以下设置：

- **格式化**：使用空格缩进，宽度为 2，行宽 100
- **引号**：使用单引号
- **分号**：始终使用分号
- **尾随逗号**：ES5 风格
- **Lint 规则**：启用推荐规则和自定义规则

## 常见问题

### 导入排序问题

Biome 会自动整理导入语句的顺序：
1. 类型导入 (`import type`)
2. React 导入
3. 第三方库导入
4. 本地模块导入

### 依赖数组问题

React hooks 的依赖数组必须包含所有使用的外部变量。Biome 会检查并提醒缺失的依赖。

### 类型安全

项目使用 TypeScript，Biome 会检查类型安全问题，如 `any` 类型的使用。
