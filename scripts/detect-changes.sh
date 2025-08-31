#!/bin/bash

# 检测代码变化的脚本
# 用法: ./scripts/detect-changes.sh <base-branch>
# 例如: ./scripts/detect-changes.sh main

set -e

BASE_BRANCH=${1:-main}
CURRENT_BRANCH=$(git branch --show-current)

echo "🔍 检测代码变化..."
echo "基础分支: $BASE_BRANCH"
echo "当前分支: $CURRENT_BRANCH"

# 检测 packages/observer 的变化（排除 package.json 版本变化）
OBSERVER_CHANGES=$(git diff --name-only $BASE_BRANCH...$CURRENT_BRANCH | grep -E "^packages/observer/" | grep -v "package.json" | wc -l)

# 检测 packages/memo 的变化（排除 package.json 版本变化）
MEMO_CHANGES=$(git diff --name-only $BASE_BRANCH...$CURRENT_BRANCH | grep -E "^packages/memo/" | grep -v "package.json" | wc -l)

# 检测 packages/image 的变化（排除 package.json 版本变化）
IMAGE_CHANGES=$(git diff --name-only $BASE_BRANCH...$CURRENT_BRANCH | grep -E "^packages/image/" | grep -v "package.json" | wc -l)

# 检测根目录配置文件的变化（排除 package.json 版本变化）
ROOT_CHANGES=$(git diff --name-only $BASE_BRANCH...$CURRENT_BRANCH | grep -E "^(package\.json|pnpm-workspace\.yaml|tsconfig\.json|biome\.config\.ts)" | grep -v "package.json" | wc -l)

echo ""
echo "📊 变化统计:"
echo "  packages/observer: $OBSERVER_CHANGES 个文件变化"
echo "  packages/memo: $MEMO_CHANGES 个文件变化"
echo "  packages/image: $IMAGE_CHANGES 个文件变化"
echo "  根目录配置: $ROOT_CHANGES 个文件变化"

# 设置输出变量
if [ $OBSERVER_CHANGES -gt 0 ]; then
    if [ -n "${GITHUB_OUTPUT:-}" ]; then
        echo "OBSERVER_CHANGED=true" >> "$GITHUB_OUTPUT"
    fi
    echo "✅ @fly4react/observer 需要更新版本"
else
    if [ -n "${GITHUB_OUTPUT:-}" ]; then
        echo "OBSERVER_CHANGED=false" >> "$GITHUB_OUTPUT"
    fi
    echo "❌ @fly4react/observer 无需更新版本"
fi

if [ $MEMO_CHANGES -gt 0 ]; then
    if [ -n "${GITHUB_OUTPUT:-}" ]; then
        echo "MEMO_CHANGED=true" >> "$GITHUB_OUTPUT"
    fi
    echo "✅ @fly4react/memo 需要更新版本"
else
    if [ -n "${GITHUB_OUTPUT:-}" ]; then
        echo "MEMO_CHANGED=false" >> "$GITHUB_OUTPUT"
    fi
    echo "❌ @fly4react/memo 无需更新版本"
fi

if [ $IMAGE_CHANGES -gt 0 ]; then
    if [ -n "${GITHUB_OUTPUT:-}" ]; then
        echo "IMAGE_CHANGED=true" >> "$GITHUB_OUTPUT"
    fi
    echo "✅ @fly4react/image 需要更新版本"
else
    if [ -n "${GITHUB_OUTPUT:-}" ]; then
        echo "IMAGE_CHANGED=false" >> "$GITHUB_OUTPUT"
    fi
    echo "❌ @fly4react/image 无需更新版本"
fi

# 如果有任何变化，根目录也需要更新
if [ $OBSERVER_CHANGES -gt 0 ] || [ $MEMO_CHANGES -gt 0 ] || [ $IMAGE_CHANGES -gt 0 ] || [ $ROOT_CHANGES -gt 0 ]; then
    if [ -n "${GITHUB_OUTPUT:-}" ]; then
        echo "ROOT_CHANGED=true" >> "$GITHUB_OUTPUT"
    fi
    echo "✅ 根目录需要更新版本"
else
    if [ -n "${GITHUB_OUTPUT:-}" ]; then
        echo "ROOT_CHANGED=false" >> "$GITHUB_OUTPUT"
    fi
    echo "❌ 根目录无需更新版本"
fi

# 为了调试，输出当前的环境变量
echo "🔍 调试信息:"
echo "  GITHUB_OUTPUT: ${GITHUB_OUTPUT:-'未设置'}"
echo "  GITHUB_ACTIONS: ${GITHUB_ACTIONS:-'未设置'}"

echo ""
echo "🎯 发布策略:"
if [ $OBSERVER_CHANGES -gt 0 ] && [ $MEMO_CHANGES -gt 0 ] && [ $IMAGE_CHANGES -gt 0 ]; then
    echo "  📦 发布三个包的新版本"
elif [ $OBSERVER_CHANGES -gt 0 ] && [ $MEMO_CHANGES -gt 0 ]; then
    echo "  📦 发布 @fly4react/observer 和 @fly4react/memo"
elif [ $OBSERVER_CHANGES -gt 0 ] && [ $IMAGE_CHANGES -gt 0 ]; then
    echo "  📦 发布 @fly4react/observer 和 @fly4react/image"
elif [ $MEMO_CHANGES -gt 0 ] && [ $IMAGE_CHANGES -gt 0 ]; then
    echo "  📦 发布 @fly4react/memo 和 @fly4react/image"
elif [ $OBSERVER_CHANGES -gt 0 ]; then
    echo "  📦 只发布 @fly4react/observer"
elif [ $MEMO_CHANGES -gt 0 ]; then
    echo "  📦 只发布 @fly4react/memo"
elif [ $IMAGE_CHANGES -gt 0 ]; then
    echo "  📦 只发布 @fly4react/image"
elif [ $ROOT_CHANGES -gt 0 ]; then
    echo "  📦 只发布根目录版本更新"
else
    echo "  📦 无需发布任何包"
fi
