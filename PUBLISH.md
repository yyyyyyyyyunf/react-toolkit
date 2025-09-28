# 发布指南

## 📦 Monorepo 发布

这个项目是一个 monorepo，使用 **pnpm workspace** 管理多个包：

- `@fly4react/observer`
- `@fly4react/memo`
- `@fly4react/image`

## 🚀 发布方式

### 自动发布（推荐）

项目使用 GitHub Actions 进行自动发布，支持以下触发方式：

1. **推送到 release 分支**: 自动检测变化并发布
2. **手动触发**: 通过 GitHub Actions 手动选择发布包和版本类型
3. **标签触发**: 使用 Git 标签指定版本

### 手动发布（备用方案）

如果自动发布失败，可以使用以下手动方式：

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

#### @fly4react/memo
- [ ] 功能测试通过
- [ ] TypeScript 类型正确
- [ ] 导出正确

#### @fly4react/observer
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
cd packages/memo && pnpm version patch
cd packages/observer && pnpm version patch
```

### 同步版本

```bash
# 同步所有包版本
pnpm -r version 1.0.0
```

## 🧪 测试发布

### 1. 使用 pnpm pack 测试

```bash
# 测试 memo 包
cd packages/memo
pnpm pack --dry-run

# 测试 observer 包
cd packages/observer
pnpm pack --dry-run
```

### 2. 本地安装测试

```bash
# 在本地项目中测试
pnpm install /path/to/packages/memo
pnpm install /path/to/packages/observer
```

## 🚨 发布后检查

### 1. 验证发布

```bash
# 检查包是否成功发布
pnpm view @fly4react/memo
pnpm view @fly4react/observer
```

### 2. 安装测试

```bash
# 创建测试项目
mkdir test-install
cd test-install
pnpm init

# 安装并测试
pnpm add @fly4react/memo @fly4react/observer
node -e "console.log(require('@fly4react/memo'))"
node -e "console.log(require('@fly4react/observer'))"
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
pnpm unpublish @fly4react/memo@1.0.0
pnpm unpublish @fly4react/observer@1.0.0
```

## 📝 发布日志

记录每次发布的重要信息：

- 版本号
- 发布时间
- 主要变更
- 已知问题
- 后续计划

## 🎯 GitHub Actions 手动发布

### 手动发布步骤

1. 进入 GitHub 仓库
2. 点击 **Actions** 标签页
3. 选择 **Publish Packages** 工作流
4. 点击 **Run workflow** 按钮
5. 配置发布参数：
   - **Package**: 选择要发布的包
     - `all`: 发布所有包（默认）
     - `memo`: 只发布 @fly4react/memo
     - `observer`: 只发布 @fly4react/observer
   - **Version type**: 版本升级类型
     - `patch`: 补丁版本 (1.0.0 → 1.0.1)
     - `minor`: 次要版本 (1.0.0 → 1.1.0)
     - `major`: 主要版本 (1.0.0 → 2.0.0)
   - **Force publish**: 强制发布
     - `false`: 只在检测到变化时发布（默认）
     - `true`: 强制发布，即使没有检测到变化

### 使用场景示例

#### 发布 memo 包的新功能
```
Package: memo
Version type: minor
Force publish: false
```

#### 发布 observer 包的 bug 修复
```
Package: observer
Version type: patch
Force publish: false
```

#### 强制重新发布所有包
```
Package: all
Version type: patch
Force publish: true
```

## 📦 包管理器说明

本项目使用 **pnpm** 作为包管理器：

- **工作空间**: 使用 pnpm workspace 管理多包项目
- **依赖管理**: 所有依赖通过 pnpm 安装和管理
- **构建命令**: 使用 `pnpm check` 和 `pnpm build` 进行代码检查和构建
- **发布**: 最终发布到 npm 仓库（npm 是包注册表，pnpm 是包管理器）

## 🔗 相关链接

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [npm 发布指南](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [pnpm 工作空间](https://pnpm.io/workspaces)
- [语义化版本](https://semver.org/)
