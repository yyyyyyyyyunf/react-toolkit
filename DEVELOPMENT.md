# 开发指南

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
# 格式化代码
pnpm format

# 检查代码格式（不修改）
pnpm format:check

# 运行 lint 检查
pnpm lint

# 自动修复 lint 问题
pnpm lint:fix

# 运行完整的代码检查（格式化 + lint）
pnpm check

# 自动修复所有问题
pnpm check:fix
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
2. **格式化**：运行 `pnpm format` 确保代码格式正确
3. **检查**：运行 `pnpm check` 确保没有 lint 错误
4. **提交**：提交代码前确保所有检查都通过

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
