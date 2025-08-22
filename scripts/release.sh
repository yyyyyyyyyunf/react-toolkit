#!/bin/bash

# 发布脚本
# 用法: 
#   ./scripts/release.sh <version> [--beta]  # 发布指定版本
#   ./scripts/release.sh --beta               # 发布 beta 版本
# 例如: 
#   ./scripts/release.sh 1.0.0               # 发布正式版本 1.0.0
#   ./scripts/release.sh 1.0.0 --beta        # 发布 beta 版本 1.0.0-beta.20241201120000
#   ./scripts/release.sh --beta               # 发布当前版本的 beta

set -e

VERSION=$1
BETA_FLAG=$2

# 检查参数
if [ "$1" = "--beta" ]; then
    BETA_FLAG="--beta"
    VERSION=""
elif [ "$2" = "--beta" ]; then
    BETA_FLAG="--beta"
fi

if [ -z "$VERSION" ] && [ "$BETA_FLAG" != "--beta" ]; then
    echo "请提供版本号或使用 --beta 标志"
    echo "用法:"
    echo "  ./scripts/release.sh <version>        # 发布正式版本"
    echo "  ./scripts/release.sh <version> --beta # 发布 beta 版本"
    echo "  ./scripts/release.sh --beta           # 发布当前版本的 beta"
    echo ""
    echo "例如:"
    echo "  ./scripts/release.sh 1.0.0"
    echo "  ./scripts/release.sh 1.0.0 --beta"
    echo "  ./scripts/release.sh --beta"
    exit 1
fi

# 验证版本号格式（如果不是 beta）
if [ -n "$VERSION" ] && [ "$BETA_FLAG" != "--beta" ]; then
    if ! [[ $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        echo "错误: 版本号格式不正确，请使用语义化版本号 (例如: 1.0.0)"
        exit 1
    fi
fi

# 确定版本和分支策略
if [ "$BETA_FLAG" = "--beta" ]; then
    if [ -n "$VERSION" ]; then
        # 指定版本的 beta
        BASE_VERSION=$VERSION
        TIMESTAMP=$(date +%Y%m%d%H%M%S)
        FULL_VERSION="${BASE_VERSION}-beta.${TIMESTAMP}"
        BRANCH_NAME="dev/beta-${BASE_VERSION}"
        echo "🚀 开始发布 beta 版本 $FULL_VERSION (基于 $BASE_VERSION)"
    else
        # 当前版本的 beta
        BASE_VERSION=$(node -p "require('./package.json').version")
        TIMESTAMP=$(date +%Y%m%d%H%M%S)
        FULL_VERSION="${BASE_VERSION}-beta.${TIMESTAMP}"
        BRANCH_NAME="dev/beta-$(date +%Y%m%d)"
        echo "🚀 开始发布 beta 版本 $FULL_VERSION (基于当前版本 $BASE_VERSION)"
    fi
else
    # 正式版本
    FULL_VERSION=$VERSION
    BRANCH_NAME="release"
    echo "🚀 开始发布正式版本 $FULL_VERSION"
fi

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ 有未提交的更改，请先提交或暂存更改"
    git status
    exit 1
fi

# 检查当前分支
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "develop" ]; then
    echo "⚠️  警告: 当前不在 main 或 develop 分支"
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

# 创建发布分支
echo "🌿 创建发布分支 $BRANCH_NAME..."
git checkout -b "$BRANCH_NAME"

# 提交更改
echo "📝 提交更改..."
git add .
git commit -m "chore: prepare for $([ "$BETA_FLAG" = "--beta" ] && echo "beta " || echo "")release $FULL_VERSION"

# 推送分支
echo "📤 推送分支到远程仓库..."
git push -u origin "$BRANCH_NAME"

echo "✅ 发布流程完成！"
echo "📋 接下来 GitHub Actions 将自动发布包到 npm"
echo "🔗 查看发布状态: https://github.com/yyyyyyyyyunf/react-toolkit/actions"
echo ""
echo "📦 发布信息:"
echo "  版本: $FULL_VERSION"
echo "  分支: $BRANCH_NAME"
echo "  类型: $([ "$BETA_FLAG" = "--beta" ] && echo "Beta" || echo "正式版本")"
echo ""
if [ "$BETA_FLAG" = "--beta" ]; then
    echo "⚠️  Beta 版本安装命令:"
    echo "   npm install @react-toolkit/observer@beta"
    echo "   npm install @react-toolkit/memo@beta"
else
    echo "📦 正式版本安装命令:"
    echo "   npm install @react-toolkit/observer@latest"
    echo "   npm install @react-toolkit/memo@latest"
fi
