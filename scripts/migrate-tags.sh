#!/bin/bash

# 迁移脚本：将现有的全局标签迁移到包名前缀标签
# 使用方法: ./scripts/migrate-tags.sh

echo "🔄 开始迁移标签到包名前缀格式..."

# 检查是否在 git 仓库中
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ 错误：当前目录不是 git 仓库"
    exit 1
fi

# 获取所有现有的版本标签
echo "📋 获取现有标签..."
EXISTING_TAGS=$(git tag --sort=-version:refname | grep '^v[0-9]' | head -20)

if [ -z "$EXISTING_TAGS" ]; then
    echo "ℹ️  没有找到现有的版本标签"
    exit 0
fi

echo "📦 找到以下现有标签："
echo "$EXISTING_TAGS"
echo ""

# 为每个包创建对应的前缀标签
echo "🏷️  创建包名前缀标签..."

for tag in $EXISTING_TAGS; do
    # 移除 'v' 前缀
    version=${tag#v}
    
    echo "处理标签: $tag -> 版本: $version"
    
    # 检查 observer 包版本
    if [ -f "packages/observer/package.json" ]; then
        observer_version=$(node -p "require('./packages/observer/package.json').version")
        if [ "$version" = "$observer_version" ]; then
            if ! git tag "observer-v$version" >/dev/null 2>&1; then
                echo "  ✅ 创建标签: observer-v$version"
            else
                echo "  ℹ️  标签 observer-v$version 已存在"
            fi
        fi
    fi
    
    # 检查 memo 包版本
    if [ -f "packages/memo/package.json" ]; then
        memo_version=$(node -p "require('./packages/memo/package.json').version")
        if [ "$version" = "$memo_version" ]; then
            if ! git tag "memo-v$version" >/dev/null 2>&1; then
                echo "  ✅ 创建标签: memo-v$version"
            else
                echo "  ℹ️  标签 memo-v$version 已存在"
            fi
        fi
    fi
    
    # 检查 image 包版本
    if [ -f "packages/image/package.json" ]; then
        image_version=$(node -p "require('./packages/image/package.json').version")
        if [ "$version" = "$image_version" ]; then
            if ! git tag "image-v$version" >/dev/null 2>&1; then
                echo "  ✅ 创建标签: image-v$version"
            else
                echo "  ℹ️  标签 image-v$version 已存在"
            fi
        fi
    fi
done

echo ""
echo "🎯 标签迁移完成！"
echo ""
echo "📋 新的标签格式："
echo "  - observer-v* 用于 @fly4react/observer 发布"
echo "  - memo-v*    用于 @fly4react/memo 发布"
echo "  - image-v*   用于 @fly4react/image 发布"
echo ""
echo "⚠️  注意："
echo "  1. 旧的全局标签 (v*) 仍然保留"
echo "  2. 新的包名前缀标签已创建"
echo "  3. 后续发布将使用新的标签格式"
echo ""
echo "🚀 下一步："
echo "  1. 推送新标签: git push origin --tags"
echo "  2. 测试新的发布流程"
echo "  3. 考虑删除旧的全局标签（可选）"
