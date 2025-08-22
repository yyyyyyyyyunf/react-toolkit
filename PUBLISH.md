# 发布检查清单

## 发布前准备

### ✅ 代码质量检查
- [x] 运行 `pnpm check` 确保代码规范
- [x] 运行 `pnpm build` 确保构建成功
- [x] 检查 TypeScript 类型定义完整性
- [x] 确保所有示例可以正常运行

### ✅ 文档完整性
- [x] README.md 内容完整且准确
- [x] 所有 API 都有 JSDoc 注释
- [x] 示例文档齐全（examples/ 目录）
- [x] CHANGELOG.md 记录了所有变更

### ✅ 包配置检查
- [x] package.json 配置正确
  - [x] 包名、版本、描述
  - [x] 关键词和标签
  - [x] 许可证信息
  - [x] 仓库和主页链接
  - [x] 正确的 exports 和 types 配置
  - [x] files 字段包含必要文件
- [x] LICENSE 文件存在
- [x] .npmignore 配置正确

### ✅ 构建产物检查
- [x] dist/ 目录包含完整的 JS 和 TypeScript 声明文件
- [x] 包大小合理（当前 ~17.4KB）
- [x] ES modules 格式正确
- [x] 所有导出都可以正常访问

## 发布流程

### 1. 最终检查
```bash
# 清理并重新构建
rm -rf dist/
pnpm install
pnpm check
pnpm build

# 检查包内容
npm pack --dry-run
```

### 2. 版本管理
```bash
# 确保版本号正确（当前 1.0.0）
# 如需更新版本
npm version patch|minor|major
```

### 3. 发布到 npm
```bash
# 发布到 npm
npm publish

# 或者先发布到测试版本
npm publish --tag beta
```

### 4. 发布后验证
```bash
# 测试安装
npm install react-intersection-tool

# 验证导入
node -e "console.log(require('react-intersection-tool'))"
```

### 5. 标记 Git 版本
```bash
git tag v1.0.0
git push origin v1.0.0
```

## 发布后任务

- [ ] 更新 GitHub Release 说明
- [ ] 分享到相关社区
- [ ] 收集用户反馈
- [ ] 规划下一个版本

## 回滚计划

如果发布后发现问题：

```bash
# 撤销发布（24小时内）
npm unpublish react-intersection-tool@1.0.0

# 或者发布修复版本
npm version patch
npm publish
```

## 注意事项

1. **确保 Git 仓库是最新的**
2. **确保已经推送到 GitHub**
3. **确保 npm 账户有发布权限**
4. **首次发布建议使用 `npm publish --dry-run` 预览**
5. **确保网络稳定，避免发布中断**
