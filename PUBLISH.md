# 发布指南

## 📦 Monorepo 发布

这个项目是一个 monorepo，包含多个包：

- `@react-toolkit/observer`
- `@react-toolkit/memo`

## 🚀 发布步骤

### 1. 准备工作

```bash
# 确保所有代码已提交
git add .
git commit -m "feat: prepare for release"

# 构建所有包
pnpm build

# 检查构建结果
pnpm check
```

### 2. 发布单个包

#### 发布 memo 包
```bash
cd packages/memo
npm publish --access public
```

#### 发布 observer 包
```bash
cd packages/observer
npm publish --access public
```

### 3. 批量发布

```bash
# 发布所有包
pnpm -r publish --access public
```

## 📋 发布前检查清单

### 通用检查
- [ ] 所有测试通过
- [ ] 代码已格式化 (`pnpm format`)
- [ ] 代码检查通过 (`pnpm check`)
- [ ] 构建成功 (`pnpm build`)
- [ ] 版本号已更新
- [ ] CHANGELOG.md 已更新
- [ ] README.md 已更新

### 包特定检查

#### @react-toolkit/memo
- [ ] 功能测试通过
- [ ] TypeScript 类型正确
- [ ] 导出正确

#### @react-toolkit/observer
- [ ] 所有 hooks 功能正常
- [ ] 组件功能正常
- [ ] 示例代码正常
- [ ] 依赖关系正确

## 🔄 版本管理

### 更新版本号

```bash
# 更新所有包版本
pnpm -r version patch  # 或 minor, major

# 或者单独更新
cd packages/memo && npm version patch
cd packages/observer && npm version patch
```

### 同步版本

```bash
# 同步所有包版本
pnpm -r version 1.0.0
```

## 🧪 测试发布

### 1. 使用 npm pack 测试

```bash
# 测试 memo 包
cd packages/memo
npm pack --dry-run

# 测试 observer 包
cd packages/observer
npm pack --dry-run
```

### 2. 本地安装测试

```bash
# 在本地项目中测试
npm install /path/to/packages/memo
npm install /path/to/packages/observer
```

## 🚨 发布后检查

### 1. 验证发布

```bash
# 检查包是否成功发布
npm view @react-toolkit/memo
npm view @react-toolkit/observer
```

### 2. 安装测试

```bash
# 创建测试项目
mkdir test-install
cd test-install
npm init -y

# 安装并测试
npm install @react-toolkit/memo @react-toolkit/observer
node -e "console.log(require('@react-toolkit/memo'))"
node -e "console.log(require('@react-toolkit/observer'))"
```

## 🔧 故障排除

### 发布失败

1. **权限问题**: 确保有发布权限
2. **包名冲突**: 检查包名是否已被占用
3. **版本冲突**: 确保版本号唯一
4. **构建失败**: 检查构建错误

### 回滚发布

```bash
# 取消发布（24小时内）
npm unpublish @react-toolkit/memo@1.0.0
npm unpublish @react-toolkit/observer@1.0.0
```

## 📝 发布日志

记录每次发布的重要信息：

- 版本号
- 发布时间
- 主要变更
- 已知问题
- 后续计划
