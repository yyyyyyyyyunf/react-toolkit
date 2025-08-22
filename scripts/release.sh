#!/bin/bash

# 发布脚本
# 用法: ./scripts/release.sh <version>
# 例如: ./scripts/release.sh 1.0.0

set -e

VERSION=$1

if [ -z "$VERSION" ]; then
    echo "请提供版本号"
    echo "用法: ./scripts/release.sh <version>"
    echo "例如: ./scripts/release.sh 1.0.0"
    exit 1
fi

# 验证版本号格式
if ! [[ $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "错误: 版本号格式不正确，请使用语义化版本号 (例如: 1.0.0)"
    exit 1
fi

echo "🚀 开始发布版本 $VERSION"

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ 有未提交的更改，请先提交或暂存更改"
    git status
    exit 1
fi

# 检查当前分支
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  警告: 当前不在 main 分支，建议在 main 分支上发布"
    read -p "是否继续? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 运行测试和构建
echo "📦 运行测试和构建..."
pnpm check
pnpm build

# 创建版本标签
echo "🏷️  创建版本标签 v$VERSION..."
git tag -a "v$VERSION" -m "Release version $VERSION"

# 推送标签
echo "📤 推送标签到远程仓库..."
git push origin "v$VERSION"

echo "✅ 发布流程完成！"
echo "📋 接下来 GitHub Actions 将自动发布包到 npm"
echo "🔗 查看发布状态: https://github.com/yyyyyyyyyunf/react-toolkit/actions"
