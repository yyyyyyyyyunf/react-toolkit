# Git Hooks 配置说明

本项目配置了 Git hooks 来自动化代码质量检查，确保提交的代码符合项目规范。

## 配置的 Hooks

### 1. pre-commit Hook
**触发时机**: 执行 `git commit` 时
**功能**: 
- 自动格式化代码（Biome format）
- 自动修复 lint 问题（Biome lint）
- 将修复后的文件重新添加到暂存区

**配置**: 使用 `lint-staged` 只处理暂存区的文件，提高性能

### 2. commit-msg Hook
**触发时机**: 提交信息写入后
**功能**: 
- 检查提交信息格式是否符合规范
- 支持 Conventional Commits 格式

**格式要求**:
```
type(scope): description
```

**支持的类型**:
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动
- `perf`: 性能优化
- `ci`: CI 配置变更
- `build`: 构建系统变更
- `revert`: 回滚提交

**示例**:
```bash
git commit -m "feat: add new intersection observer hook"
git commit -m "fix(types): correct type definitions"
git commit -m "docs: update README with new examples"
```

### 3. pre-push Hook
**触发时机**: 执行 `git push` 时
**功能**:
- 运行完整的代码检查 (`npm run check`)
- 确保构建成功 (`npm run build`)
- 防止有问题的代码被推送到远程仓库

## 安装和配置

### 自动安装
项目已配置 `prepare` 脚本，在 `npm install` 时会自动安装 hooks：

```bash
npm install
```

### 手动安装
```bash
npx husky install
```

### 跳过 Hooks（紧急情况）
```bash
# 跳过 pre-commit hook
git commit -m "message" --no-verify

# 跳过 pre-push hook
git push --no-verify
```

## 配置详情

### lint-staged 配置
```json
{
  "lint-staged": {
    "src/**/*.{ts,tsx}": [
      "biome format --write",
      "biome lint --write", 
      "git add"
    ]
  }
}
```

**说明**:
- 只处理 `src/` 目录下的 `.ts` 和 `.tsx` 文件
- 按顺序执行：格式化 → lint 修复 → 重新暂存
- 只处理暂存区的文件，提高性能

### Hook 文件位置
- `.husky/pre-commit` - 提交前检查
- `.husky/commit-msg` - 提交信息检查  
- `.husky/pre-push` - 推送前检查

## 工作流程

### 正常提交流程
```bash
# 1. 修改代码
git add .

# 2. 提交（自动触发格式化、lint 修复）
git commit -m "feat: add new feature"

# 3. 推送（自动触发完整检查）
git push
```

### 如果检查失败
1. **pre-commit 失败**: 代码格式或 lint 问题，会自动修复并重新暂存
2. **commit-msg 失败**: 提交信息格式不正确，需要重新提交
3. **pre-push 失败**: 代码检查或构建失败，需要修复后重新推送

## 故障排除

### Hook 不生效
```bash
# 检查 hooks 是否正确安装
ls -la .git/hooks/

# 重新安装 hooks
npx husky install
```

### 权限问题
```bash
# 确保 hook 文件有执行权限
chmod +x .husky/*
```

### 跳过特定检查
```bash
# 跳过所有 hooks
git commit -m "message" --no-verify
git push --no-verify
```

## 最佳实践

1. **提交前检查**: 确保代码能通过 `npm run check`
2. **小批量提交**: 每次提交只包含相关的变更
3. **清晰的提交信息**: 使用规范的提交信息格式
4. **定期推送**: 避免积累太多未推送的提交

## 自定义配置

### 修改 lint-staged 规则
编辑 `package.json` 中的 `lint-staged` 配置：

```json
{
  "lint-staged": {
    "src/**/*.{ts,tsx}": [
      "biome format --write",
      "biome lint --write",
      "git add"
    ],
    "*.md": [
      "prettier --write",
      "git add"
    ]
  }
}
```

### 添加新的 Hook
```bash
# 创建新的 hook
npx husky add .husky/pre-rebase "npm run test"
```

### 禁用特定 Hook
```bash
# 重命名 hook 文件来禁用它
mv .husky/pre-push .husky/pre-push.disabled
```
