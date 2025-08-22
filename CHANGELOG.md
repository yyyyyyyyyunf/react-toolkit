# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-19

### Added

#### Core Components
- **IntersectionLoad**: 懒加载组件，支持占位符、自定义阈值和偏移量
- **数值和语义化阈值**: 支持数字阈值（如 0.5）和语义化阈值（如 'any', 'top', 'bottom'）
- **自定义根元素**: 支持基于特定容器的可见性检测
- **动态控制**: 通过 `active` 属性控制观察器的启用/禁用
- **可见性回调**: 通过 `onChange` 属性获取可见性变化通知

#### Hooks
- **useIntersectionObserver**: 底层 Intersection Observer Hook，提供完整的观察数据
- **useOneOffVisibility**: 一次性可见性检测，适用于动画触发和统计埋点
- **useElementPosition**: 实时位置跟踪，支持高频更新和自定义容器
- **useScrollDirection**: 滚动方向检测，提供滚动状态和方向信息
- **useBoundingClientRect**: 专门的边界矩形检测
- **useIntersectionRatio**: 专门的交叉比例检测

#### 高级特性
- **滚动方向检测**: 自动计算和提供滚动方向信息（up, down, left, right, none）
- **位置跟踪**: 实时跟踪元素在视口中的位置变化
- **性能优化**: 
  - 节流控制（throttle）避免过频更新
  - skipWhenOffscreen 选项跳过离屏元素更新
  - 智能的观察器复用机制
- **类型安全**: 完整的 TypeScript 类型定义和类型安全保证
- **灵活配置**: 
  - step 和 threshold 两种配置方式，支持互斥类型检查
  - 自定义偏移量和根元素
  - 相对位置计算支持

#### 开发体验
- **完整示例**: 12+ 个实用示例展示各种使用场景
- **详细文档**: 中文文档和 JSDoc 注释
- **代码质量**: Biome 代码格式化和规范检查
- **开发工具**: 调试信息和性能监控支持

### Technical Details
- Built with TypeScript 5.9+
- React 16.9+ compatibility
- Modern ES modules support
- Zero external runtime dependencies
- Comprehensive type definitions
- Performance optimized with intelligent observer reuse

### Breaking Changes
None - this is the initial release.

### Migration Guide
Not applicable - this is the initial release.

## Future Releases

### [Unreleased]
- Virtual scrolling support
- More animation integration examples
- Performance analytics tools
- Additional semantic threshold values
