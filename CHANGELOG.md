# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 包版本

- `@fly4react/observer` - Intersection Observer 工具库
- `@fly4react/memo` - React 记忆化组件工具
- `@fly4react/image` - 图片优化和懒加载工具库
- `@fly4react/feature-detector` - 浏览器特性检测库

## [1.8.0] - 2025-01-28

### @fly4react/image

#### Added

- **Compatibility Modes**: 新增兼容模式支持 ESM/CJS 混用场景
  - `modern` 模式：使用模块级队列，适合纯 ESM 环境，性能更好
  - `legacy` 模式：使用全局队列，支持跨模块格式数据共享
- **Cross-module Data Sharing**: 支持在不同模块格式之间共享预加载数据
- **Enhanced Type Safety**: 改进的类型定义和全局对象类型扩展
- **Comprehensive Testing**: 添加兼容模式测试用例

#### Changed

- **API Enhancement**: 所有预加载相关 API 现在支持 `compatibilityMode` 参数
- **Documentation**: 更新文档，添加兼容模式使用指南和迁移指南
- **Performance**: 优化全局队列访问性能

#### Fixed

- **Module Resolution**: 修复 ESM 和 CJS 混用环境下的数据共享问题
- **Type Definitions**: 修复全局对象类型定义问题

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

## [1.2.6] - 2025-08-25

### @fly4react/observer

#### Changed
- **重构 polyfill 实现**: 移除自定义 polyfill，改用谷歌官方的 `intersection-observer` polyfill
- **依赖管理优化**: 将 `intersection-observer` 作为 peerDependency，避免与现有项目冲突
- **类型声明优化**: 清理不需要的自定义类型声明，减少包体积约 1KB

#### Documentation
- **安装说明更新**: 添加 npm、yarn、pnpm 三种包管理器的安装命令
- **依赖说明**: 明确说明 `intersection-observer` 作为 peerDependency 的安装要求
- **性能指标更新**: 使用动态 Bundlephobia 徽章显示实时包大小
- **FAQ 更新**: 更新关于 polyfill 处理的常见问题解答

### Breaking Changes
- **依赖变更**: `intersection-observer` 现在是 peerDependency，用户需要手动安装
- **类型变更**: 移除了 `throttle` 选项和 `FallbackIntersectionEntry` 类型

### Migration Guide
1. **安装 intersection-observer**: 
   ```bash
   npm install intersection-observer
   # 或
   yarn add intersection-observer
   # 或
   pnpm add intersection-observer
   ```
2. **移除 throttle 配置**: 如果之前使用了 `throttle` 选项，需要移除该配置
3. **更新类型引用**: 如果使用了 `FallbackIntersectionEntry` 类型，需要移除相关代码

## [1.3.4] - 2025-08-25

### @fly4react/observer

#### Added
- **useElementPositionRef**: 新增 Ref 版本的元素位置跟踪 Hook
  - 使用 `useRef` 存储位置信息，不会触发组件重新渲染
  - 适用于需要实时获取元素位置但不想影响渲染性能的场景
  - 支持所有 `useElementPosition` 的功能和配置选项
    - 提供完整的 TypeScript 类型支持和测试覆盖
  - **文档更新**: 更新所有文档中的安装说明，提供 npm、yarn、pnpm 三种安装方式



## [1.4.0] - 2025-08-25

### @fly4react/observer

#### Added
- **useElementDetector**: 新增通用元素检测器 Hook，支持细致的 threshold 配置
  - 完全移除 `position` 参数，简化 API 设计
  - 支持可选的 `compute` 函数，实现自定义检测逻辑
  - 默认检测元素是否贴顶（top ≤ 0）
  - 提供完整的 TypeScript 类型支持和测试覆盖
  - 包含详细的文档和示例

#### Changed
- **API 简化**: 
  - 移除复杂的类型定义，直接使用内联类型
  - 简化参数结构，只保留 `compute` 选项
  - 更清晰的命名和文档说明

#### Removed
- **useIsCeiling**: 移除原有的 useIsCeiling Hook，由 useElementDetector 替代
- **相关文件**: 删除 useIsCeiling 相关的测试文件、示例文件和文档

### Breaking Changes
- **useIsCeiling 移除**: 原有的 useIsCeiling Hook 已被移除，请使用 useElementDetector 替代
- **API 变更**: useElementDetector 不再支持 position 参数，支持 compute 函数和细致的 threshold 配置

## [1.4.1] - 2025-08-25

### @fly4react/observer

#### Added
- **useIsMounted**: 新增组件挂载状态管理 Hook
  - 提供统一的组件挂载状态跟踪
  - 防止在组件卸载后执行异步操作
  - 减少重复代码，提高代码复用性
  - 完整的 TypeScript 类型支持和测试覆盖

#### Changed
- **代码重构**: 
  - 将多个 Hook 中的 `isMountedRef` 逻辑抽取为 `useIsMounted` Hook
  - 更新 `useElementDetector`、`useElementPosition`、`useElementPositionRef`、`useInViewport`、`useOneOffVisibility` 使用新的 Hook
  - 减少重复代码，提高维护性

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

## [1.8.0] - 2025-09-13

### @fly4react/observer

#### Added
- **🧠 智能位置同步策略**: 实现结合 Intersection Observer 和 scroll 事件的智能策略
  - 元素部分可见时依赖 Intersection Observer 自动触发，避免复杂计算
  - 元素完全可见/不可见时使用 scroll 事件进行精确位置计算
  - 定期校准机制确保位置信息的准确性
  - 智能判断何时需要复杂计算，提升性能
- **⚡ 性能优化**: 
  - 优化 `useIntersectionRatio` 直接使用 Intersection Observer，避免不必要的复杂计算
  - 提取 `calculateFinalThreshold` 通用工具函数，统一所有 Hook 的 threshold 计算逻辑
  - 优化 `useLayoutEffect` 依赖数组，移除不必要的依赖
- **🔧 配置选项增强**:
  - 新增 `forceCalibrate` 选项：强制启用校准机制
  - 新增 `calibrateInterval` 选项：校准间隔时间配置
  - 支持 `number` 类型的 `threshold` 参数，符合 Intersection Observer API 规范
- **📝 类型系统完善**:
  - 修复类型定义，使 `threshold` 支持 `number | number[]` 类型
  - 限制智能位置同步选项，只有特定 Hook 支持 `forceCalibrate` 和 `calibrateInterval`
  - 使用正确的 `Options` 类型，避免 inline 类型定义

#### Changed
- **代码重构**: 
  - 重构 `calculateFinalThreshold` 函数，将解构步骤移到函数内部，简化各 Hook 代码
  - 统一代码风格，修复 `useIntersectionRatio` 中 `observerOptions` 和 `finalThreshold` 的定义位置
  - 统一所有 Hook 的代码结构和风格
- **Hook 优化**:
  - `useElementPositionRef`、`useElementPosition`、`useElementDetector` 采用智能位置同步策略
  - `useIntersectionRatio` 重新实现，直接使用 Intersection Observer 而不是 `useElementPosition`
  - 所有 Hook 的 `useLayoutEffect` 依赖数组优化

#### Fixed
- **Bug 修复**:
  - 修复 scroll 事件处理中的 `scrollTimeoutRef` 清理问题
  - 修复 pnpm workspace 依赖同步问题
  - 修复类型定义不一致问题
  - 修复 lint 错误和代码格式问题

#### Technical Improvements
- **代码质量**: 
  - 移除所有调试 `console.log` 语句
  - 统一代码格式和风格
  - 优化依赖数组，提升性能
- **测试覆盖**: 更新所有测试文件，确保新功能正常工作
- **文档更新**: 更新所有文档，反映最新的设计和技术细节

### Breaking Changes
None - 所有更改都是向后兼容的。

### Migration Guide
1. **新配置选项**: 可以可选地使用新的 `forceCalibrate` 和 `calibrateInterval` 选项来启用智能位置同步策略
2. **threshold 类型**: `threshold` 参数现在支持 `number` 类型，可以传入单个数字而不必是数组
3. **性能优化**: 现有代码会自动受益于性能优化，无需修改

## [Unreleased]
- Virtual scrolling support
- More animation integration examples
- Performance analytics tools
- Additional semantic threshold values
- More memo optimization strategies

## [1.8.1] - 2025-01-XX

### Examples

#### Added
- **🎨 MultiHookExample 重新设计**: 全新的多 Hook 示例界面
  - 现代化 UI 设计：渐变背景、毛玻璃效果、卡片式布局
  - 交互式控制面板：可以单独启用/禁用每个 Hook 进行测试
  - 增强的日志系统：分类日志、过滤功能、更好的视觉呈现
  - 性能统计功能：实时显示每个 Hook 的执行次数
  - 实时状态指示器：使用图标和颜色编码的状态显示
  - 响应式设计：支持桌面端和移动端的自适应布局

#### Changed
- **代码优化**: 
  - 使用 `useMemo` 优化 Hook 选项配置，避免不必要的重新创建
  - 改进状态管理，使用更清晰的类型定义
  - 优化性能统计和日志记录逻辑

#### Technical Improvements
- **用户体验**: 
  - 添加动画效果和过渡效果
  - 改进颜色编码和视觉反馈
  - 优化移动端体验
- **代码质量**: 
  - 移除调试代码
  - 统一代码风格
  - 改进类型安全

### Documentation
- **示例文档更新**: 更新 README.md 和 USAGE.md，添加新的多 Hook 示例说明
- **功能说明**: 详细说明新示例的功能特性和使用方法
