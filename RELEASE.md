# 发布指南

本文档介绍如何使用 GitHub Actions 自动发布 `@react-toolkit` 包到 npm。

## 🚀 自动发布流程

### 发布策略

我们支持两种发布策略：

1. **正式版本发布** (`release` 分支)
   - 发布到 `latest` 标签
   - 使用 `package.json` 中的版本号
   - 适合稳定版本发布

2. **Beta 版本发布** (`dev/*` 分支)
   - 发布到 `beta` 标签
   - 版本号格式：`{base-version}-beta.{timestamp}`
   - 适合测试版本发布

### 前置条件

1. **npm 账号设置**
   - 确保你有 npm 账号
   - 在 GitHub 仓库设置中添加 `NPM_TOKEN` secret
   - 获取 npm token: https://www.npmjs.com/settings/tokens

2. **GitHub Secrets 配置**
   - 进入 GitHub 仓库设置 → Secrets and variables → Actions
   - 添加 `NPM_TOKEN` secret，值为你的 npm access token

### 发布步骤

#### 方法 1: 使用发布脚本（推荐）

```bash
# 发布正式版本
./scripts/release.sh 1.0.0

# 发布指定版本的 beta
./scripts/release.sh 1.0.0 --beta

# 发布当前版本的 beta
./scripts/release.sh --beta
```

#### 方法 2: 手动创建分支

```bash
# 发布正式版本
git checkout -b release
git push origin release

# 发布 beta 版本
git checkout -b dev/beta-1.0.0
git push origin dev/beta-1.0.0
```

#### 方法 3: 标签触发（传统方式）

```bash
# 创建版本标签
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

#### 方法 4: GitHub Actions 手动触发

1. 进入 GitHub 仓库的 Actions 页面
2. 选择 "Publish Packages" 工作流
3. 点击 "Run workflow"
4. 选择分支并运行

## 📦 发布内容

### 正式版本发布

当推送代码到 `release` 分支时，GitHub Actions 会自动：

1. ✅ 运行代码检查 (`pnpm check`)
2. ✅ 构建所有包 (`pnpm build`)
3. ✅ 发布 `@react-toolkit/observer@latest` 到 npm
4. ✅ 发布 `@react-toolkit/memo@latest` 到 npm
5. ✅ 创建 GitHub Release

### Beta 版本发布

当推送代码到 `dev/*` 分支时，GitHub Actions 会自动：

1. ✅ 运行代码检查 (`pnpm check`)
2. ✅ 构建所有包 (`pnpm build`)
3. ✅ 发布 `@react-toolkit/observer@beta` 到 npm
4. ✅ 发布 `@react-toolkit/memo@beta` 到 npm
5. ✅ 创建带时间戳的版本号
6. ✅ 创建 GitHub Release (标记为 prerelease)

## 🔍 发布状态

- **查看 Actions**: https://github.com/yyyyyyyyyunf/react-toolkit/actions
- **查看 Releases**: https://github.com/yyyyyyyyyunf/react-toolkit/releases
- **npm 包页面**:
  - https://www.npmjs.com/package/@react-toolkit/observer
  - https://www.npmjs.com/package/@react-toolkit/memo

## 📋 版本管理

### 语义化版本

- `MAJOR.MINOR.PATCH`
- 例如: `1.0.0`, `1.1.0`, `2.0.0`

### Beta 版本格式

- `{base-version}-beta.{timestamp}`
- 例如: `1.0.0-beta.20241201120000`

### 版本类型

- **补丁版本** (`1.0.0` → `1.0.1`): Bug 修复
- **次要版本** (`1.0.0` → `1.1.0`): 新功能，向后兼容
- **主要版本** (`1.0.0` → `2.0.0`): 破坏性更改
- **Beta 版本**: 测试版本，用于验证功能

## 🛠️ 故障排除

### 常见问题

1. **NPM_TOKEN 错误**
   - 检查 GitHub Secrets 中的 `NPM_TOKEN` 是否正确
   - 确保 npm token 有发布权限

2. **版本冲突**
   - 确保版本号在 npm 上不存在
   - 检查本地和远程标签是否一致

3. **构建失败**
   - 检查 TypeScript 类型错误
   - 确保所有依赖正确安装

4. **分支权限问题**
   - 确保有权限推送到 `release` 或 `dev/*` 分支
   - 检查分支保护规则设置

### 手动发布（备用方案）

如果自动发布失败，可以手动发布：

```bash
# 进入包目录
cd packages/observer
npm publish --access public --tag latest  # 正式版本
npm publish --access public --tag beta    # beta 版本

cd ../memo
npm publish --access public --tag latest  # 正式版本
npm publish --access public --tag beta    # beta 版本
```

## 📝 发布检查清单

发布前请确认：

- [ ] 代码已通过所有测试
- [ ] 类型检查通过 (`pnpm check`)
- [ ] 构建成功 (`pnpm build`)
- [ ] 更新了 CHANGELOG.md
- [ ] 版本号正确
- [ ] 在正确的分支上 (main/develop)
- [ ] 没有未提交的更改

## 🔗 相关链接

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [npm 发布指南](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [语义化版本](https://semver.org/)
