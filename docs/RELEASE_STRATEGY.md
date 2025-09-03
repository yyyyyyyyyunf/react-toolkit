# 发布策略和标签管理

## 概述

为了避免包版本冲突和标签重复的问题，我们采用了**包名前缀标签**的策略。每个包都有自己独立的版本管理和标签系统。

## 标签格式

### 新的标签格式
- `observer-v*` - 用于 @fly4react/observer 包发布
- `memo-v*` - 用于 @fly4react/memo 包发布  
- `image-v*` - 用于 @fly4react/image 包发布

### 示例
```
observer-v1.6.0
memo-v1.1.0
image-v1.4.0
```

## 发布流程

### 1. 手动发布单个包
```bash
# 在 GitHub Actions 中手动触发
# 选择包: observer/memo/image
# 选择版本类型: patch/minor/major
```

### 2. 自动发布所有包
```bash
# 推送标签触发自动发布
git tag observer-v1.6.1
git push origin observer-v1.6.1
```

## 版本管理

### 独立版本
每个包维护自己的版本号，互不影响：

```json
// packages/observer/package.json
{
  "version": "1.6.0"
}

// packages/memo/package.json  
{
  "version": "1.1.0"
}

// packages/image/package.json
{
  "version": "1.4.0"
}
```

### 版本递增规则
- **patch**: 修复 bug 或小改动 (1.0.0 → 1.0.1)
- **minor**: 新功能，向后兼容 (1.0.0 → 1.1.0)  
- **major**: 破坏性变更 (1.0.0 → 2.0.0)

## 迁移现有标签

### 自动迁移
运行迁移脚本创建包名前缀标签：

```bash
./scripts/migrate-tags.sh
```

### 手动迁移
```bash
# 为现有版本创建前缀标签
git tag observer-v1.6.0 v1.6.0
git tag memo-v1.1.0 v1.1.0
git tag image-v1.4.0 v1.4.0

# 推送新标签
git push origin --tags
```

## 优势

### 1. 避免冲突
- 不同包可以使用相同版本号
- 标签不会重复
- 发布流程更稳定

### 2. 独立管理
- 每个包独立发布
- 版本号独立递增
- 依赖关系更清晰

### 3. 向后兼容
- 旧的全局标签保留
- 渐进式迁移
- 不影响现有流程

## 注意事项

### 1. 标签命名
- 标签格式必须严格遵循 `包名-v版本号`
- 版本号格式：`主版本.次版本.修订版本`
- 不支持预发布版本标签

### 2. 发布顺序
- 建议按依赖关系发布：memo → observer → image
- 确保依赖包先发布
- 检查版本兼容性

### 3. 回滚策略
- 删除错误标签：`git tag -d 标签名`
- 远程删除：`git push origin :refs/tags/标签名`
- 重新发布：递增版本号重新发布

## 故障排除

### 常见问题

#### 1. 标签已存在
```bash
# 检查标签是否存在
git tag -l "observer-v*"

# 删除重复标签
git tag -d observer-v1.6.0
```

#### 2. 发布失败
```bash
# 检查包版本
cat packages/observer/package.json | grep version

# 检查 npm 状态
npm view @fly4react/observer version
```

#### 3. 版本不匹配
```bash
# 同步所有包版本
pnpm version patch --recursive

# 检查版本一致性
pnpm run check-versions
```

## 最佳实践

### 1. 发布前检查
- 运行测试：`pnpm test:run`
- 检查构建：`pnpm build`
- 验证版本：检查 package.json

### 2. 发布后验证
- 检查 npm 包状态
- 验证 GitHub Release
- 测试安装和使用

### 3. 文档更新
- 更新 CHANGELOG
- 更新 README
- 更新示例代码

## 相关文件

- `.github/workflows/publish.yml` - 发布工作流
- `.github/packages.yml` - 包配置信息
- `scripts/migrate-tags.sh` - 标签迁移脚本
- `docs/RELEASE_STRATEGY.md` - 本文档
