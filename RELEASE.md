# 发布指南

## 🚀 自动发布

当代码推送到 `release` 分支时，GitHub Actions 会自动：

1. 检测代码变化
2. 自动升级版本号
3. 发布到 npm

## 📦 包管理器

本项目使用 **pnpm** 作为包管理器：

- **工作空间**: 使用 pnpm workspace 管理多包项目
- **依赖管理**: 所有依赖通过 pnpm 安装和管理
- **构建命令**: 使用 `pnpm check` 和 `pnpm build` 进行代码检查和构建
- **发布**: 最终发布到 npm 仓库（npm 是包注册表，pnpm 是包管理器）

## 🎯 手动发布

你可以通过 GitHub Actions 手动触发发布，支持更灵活的控制。

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

### 使用场景

#### 1. 发布特定包
```
Package: memo
Version type: patch
Force publish: false
```
只发布 @fly4react/memo 包，版本号 +0.0.1

#### 2. 发布新功能版本
```
Package: all
Version type: minor
Force publish: false
```
发布所有包，版本号 +0.1.0（适用于新功能）

#### 3. 发布重大更新
```
Package: all
Version type: major
Force publish: false
```
发布所有包，版本号 +1.0.0（适用于破坏性更新）

#### 4. 强制重新发布
```
Package: memo
Version type: patch
Force publish: true
```
强制发布 @fly4react/memo 包，即使没有代码变化

### 版本号规则

- **patch**: 修复 bug，向后兼容
  - 1.0.0 → 1.0.1
- **minor**: 新功能，向后兼容
  - 1.0.0 → 1.1.0
- **major**: 破坏性更新
  - 1.0.0 → 2.0.0

### 注意事项

1. **权限要求**: 需要仓库的写入权限
2. **npm 发布**: 需要配置 NPM_TOKEN 环境变量（用于发布到 npm 仓库）
3. **版本冲突**: 如果版本号已存在，发布会失败
4. **回滚**: 发布后无法回滚，请谨慎操作
5. **包管理器**: 项目使用 pnpm 作为包管理器

### 发布流程

1. **代码检查**: 运行 lint 和类型检查 (`pnpm check`)
2. **构建**: 构建所有包 (`pnpm build`)
3. **版本管理**: 根据选择升级版本号
4. **发布**: 发布到 npm 仓库
5. **标签**: 创建 Git 标签
6. **合并**: 自动合并到 main 分支

### 故障排除

#### 发布失败
- 检查 npm 发布权限
- 确认版本号唯一性
- 查看 Actions 日志

#### 版本号错误
- 检查 package.json 格式
- 确认版本号语义化
- 验证版本号递增

#### 权限问题
- 确认仓库权限
- 检查 NPM_TOKEN 配置
- 验证 GitHub Actions 权限
