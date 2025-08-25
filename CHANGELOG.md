# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 包版本

- `@fly4react/observer` - Intersection Observer 工具库
- `@fly4react/memo` - React 记忆化组件工具

## [1.0.0] - 2025-08-23

### @fly4react/observer

#### Added

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

### @fly4react/memo

#### Added

#### Core Features
- **createMemoComponent**: 高级 React.memo 封装，提供灵活的 props 比较策略
- **自定义比较函数**: 支持传入自定义的比较函数
- **选择性属性比较**: 只比较指定的属性，忽略其他属性
- **调试友好**: 内置调试日志功能，便于开发调试
- **类型安全**: 完整的 TypeScript 类型支持

#### 高级特性
- **智能比较**: 自动忽略常见的非关键属性（如 children、style 等）
- **调试模式**: 可配置的调试日志，追踪特定组件的 props 变化
- **性能优化**: 基于 React.memo 的高性能记忆化
- **灵活配置**: 支持多种比较策略和配置选项

### Technical Details
- Built with TypeScript 5.9+
- React 16.9+ compatibility
- Modern ES modules support
- Zero external runtime dependencies
- Comprehensive type definitions

### Breaking Changes
None - this is the initial release.

### Migration Guide
Not applicable - this is the initial release.

## Future Releases

### [1.2.6] - 2025-08-25

### @fly4react/observer

#### Changed
- **重构 polyfill 实现**: 移除自定义 polyfill，改用谷歌官方的 `intersection-observer` polyfill
- **依赖管理优化**: 将 `intersection-observer` 作为 peerDependency，避免与现有项目冲突
- **类型声明优化**: 清理不需要的自定义类型声明，减少包体积约 1KB
- **文档更新**: 更新所有文档中的安装说明，提供 npm、yarn、pnpm 三种安装方式

#### Removed
- **自定义 polyfill**: 删除 `IntersectionObserverPolyfill` 和 `FallbackPositionTracker` 实现
- **自定义类型**: 删除 `FallbackIntersectionEntry` 类型声明
- **throttle 选项**: 从 `ObserverOptions` 中移除 `throttle` 选项（标准 polyfill 不支持）

#### Technical Improvements
- **更可靠的 polyfill**: 使用经过充分测试的官方 polyfill
- **更好的兼容性**: 标准 polyfill 支持更多浏览器和边缘情况
- **更小的维护负担**: 不需要维护自己的 polyfill 实现
- **更好的性能**: 官方 polyfill 经过优化，性能更好
- **API 一致性**: 与标准 IntersectionObserver API 完全一致

#### Breaking Changes
- `intersection-observer` 现在是 peerDependency，需要单独安装
- `ObserverOptions` 中不再支持 `throttle` 选项

#### Migration Guide
1. 安装 `intersection-observer` 作为 peerDependency：
   ```bash
   npm install @fly4react/observer intersection-observer
   ```

2. 如果之前使用了 `throttle` 选项，请移除该选项（标准 polyfill 不支持）

## [Unreleased]
- Virtual scrolling support
- More animation integration examples
- Performance analytics tools
- Additional semantic threshold values
- More memo optimization strategies
