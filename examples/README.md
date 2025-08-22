# React Intersection Tool 示例集合

这个目录包含了 `react-intersection-tool` 库的完整示例集合，展示了各种使用场景和最佳实践。

## 📁 文件结构

```
examples/
├── README.md                           # 本文件
├── index.tsx                          # 示例索引和分类
│
├── intersection-load-basic.tsx         # IntersectionLoad 基础使用
├── intersection-load-images.tsx        # 图片懒加载示例
├── intersection-load-advanced.tsx      # 高级懒加载（自定义容器等）
│
├── use-intersection-observer-basic.tsx # useIntersectionObserver 基础用法
├── use-one-off-visibility.tsx         # useOneOffVisibility 一次性检测
│
├── use-element-position.tsx           # useElementPosition 位置跟踪
├── use-bounding-rect-and-ratio.tsx    # useBoundingClientRect & useIntersectionRatio
│
├── scroll-direction-example.tsx       # 滚动方向检测（已存在）
├── use-scroll-direction-example.tsx   # useScrollDirection Hook（已存在）
│
├── infinite-scroll.tsx                # 无限滚动列表
├── animation-triggers.tsx             # 动画触发器
└── parallax-scroll.tsx               # 视差滚动效果
```

## 🎯 示例分类

### 1. 组件示例 (IntersectionLoad)

#### 📦 基础懒加载 (`intersection-load-basic.tsx`)
- **功能**: 展示 IntersectionLoad 组件的基本使用
- **特点**: 简单的懒加载实现，包含占位符和阈值配置
- **适用场景**: 内容块懒加载、简单的延迟渲染

```tsx
<IntersectionLoad
  height={300}
  placeholder={<div>Loading...</div>}
  threshold={0.1}
  offset={100}
>
  <YourContent />
</IntersectionLoad>
```

#### 🖼️ 图片懒加载 (`intersection-load-images.tsx`)
- **功能**: 使用 IntersectionLoad 实现图片懒加载
- **特点**: 加载状态追踪、错误处理、加载计数
- **适用场景**: 图片画廊、商品列表、博客文章

#### 🔧 高级懒加载 (`intersection-load-advanced.tsx`)
- **功能**: 展示高级功能和配置选项
- **特点**: 自定义容器、动态控制、可见性日志
- **适用场景**: 复杂的懒加载需求、调试和监控

### 2. 基础 Hook 示例

#### 👁️ useIntersectionObserver (`use-intersection-observer-basic.tsx`)
- **功能**: 最底层的观察器 Hook
- **特点**: 完整的观察数据、滚动方向信息、详细状态显示
- **适用场景**: 需要完整控制的场景、自定义逻辑实现

#### ⏱️ useOneOffVisibility (`use-one-off-visibility.tsx`)
- **功能**: 一次性可见性检测
- **特点**: 多个触发器、不同阈值配置、动画演示
- **适用场景**: 动画触发、统计埋点、一次性加载

### 3. 位置跟踪示例

#### 📍 useElementPosition (`use-element-position.tsx`)
- **功能**: 实时位置跟踪
- **特点**: 高频更新、自定义容器、详细位置信息
- **适用场景**: 滚动动画、位置监控、数据可视化

#### 📏 边界矩形 & 交叉比例 (`use-bounding-rect-and-ratio.tsx`)
- **功能**: 专门的边界和比例检测
- **特点**: 坐标显示、可见性进度条、精确测量
- **适用场景**: 精确定位、进度指示、布局分析

### 4. 滚动方向检测

#### 🧭 基础滚动方向 (`scroll-direction-example.tsx`)
- **功能**: 使用 useIntersectionObserver 检测滚动方向
- **适用场景**: 简单的方向检测、与其他功能结合

#### 🎯 useScrollDirection (`use-scroll-direction-example.tsx`)
- **功能**: 专门的滚动方向 Hook
- **特点**: 滚动状态、节流控制、方向指示
- **适用场景**: 滚动交互、导航控制、用户行为分析

### 5. 实际应用场景

#### 📜 无限滚动 (`infinite-scroll.tsx`)
- **功能**: 无限滚动列表实现
- **特点**: 自动加载、加载状态、数据管理
- **适用场景**: 社交媒体、商品列表、搜索结果

#### 🎬 动画触发器 (`animation-triggers.tsx`)
- **功能**: 基于可见性的动画触发
- **特点**: 多种动画效果、进度控制、计数动画
- **适用场景**: 页面动画、数据展示、用户体验增强

#### 🌊 视差滚动 (`parallax-scroll.tsx`)
- **功能**: 复杂的视差滚动效果
- **特点**: 多层视差、实时计算、流畅动画
- **适用场景**: 品牌页面、产品展示、创意网站

## 🚀 快速开始

### 1. 基础使用

```tsx
import React, { useRef } from 'react';
import { useOneOffVisibility } from 'react-intersection-tool';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOneOffVisibility(ref);

  return (
    <div ref={ref}>
      {isVisible ? '✅ 已可见!' : '⏳ 等待可见...'}
    </div>
  );
}
```

### 2. 高级配置

```tsx
import { useElementPosition } from 'react-intersection-tool';

const position = useElementPosition(ref, {
  step: 0.1,           // 每 10% 触发一次
  throttle: 16,        // 60fps 更新
  offset: 50,          // 提前 50px 触发
  skipWhenOffscreen: true  // 性能优化
});
```

## ⚙️ 配置参数说明

### 通用参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `step` | `number` | - | 步长(0-1)，自动生成 threshold 数组 |
| `threshold` | `number[]` | - | 手动指定阈值数组 |
| `offset` | `number` | 组件相关 | 偏移量(像素) |
| `root` | `Element` | `null` | 自定义根元素 |
| `throttle` | `number` | Hook相关 | 节流时间(毫秒) |

### 默认值建议

- **懒加载场景**: `offset = 200-500px`，提前加载
- **动画场景**: `throttle = 16ms`，流畅动画
- **普通监控**: `throttle = 100ms`，节省性能
- **精确跟踪**: `step = 0.05-0.1`，高精度
- **性能优先**: `step = 0.25-0.5`，低频触发

## 📊 性能优化建议

### 1. 合理配置参数
```tsx
// ✅ 好的配置
const config = {
  step: 0.25,              // 适中的精度
  throttle: 33,            // 30fps，平衡性能和体验
  skipWhenOffscreen: true  // 避免不必要的计算
};

// ❌ 可能有性能问题的配置
const badConfig = {
  step: 0.01,              // 过于频繁的触发
  throttle: 1,             // 过高的更新频率
  skipWhenOffscreen: false // 持续计算离屏元素
};
```

### 2. 优化回调函数
```tsx
// ✅ 使用 useCallback 避免重复创建
const callback = useCallback((entry) => {
  // 轻量级操作
  setIsVisible(entry.isIntersecting);
}, []);

// ❌ 避免在回调中执行重型操作
const badCallback = (entry) => {
  // 重型 DOM 操作
  document.querySelectorAll('.heavy-selector').forEach(/* ... */);
};
```

### 3. 批量处理更新
```tsx
// ✅ 批量状态更新
const [state, setState] = useState({
  isVisible: false,
  ratio: 0,
  position: null
});

useIntersectionObserver(ref, (entry) => {
  setState({
    isVisible: entry.isIntersecting,
    ratio: entry.intersectionRatio,
    position: entry.boundingClientRect
  });
});
```

## 🔍 调试技巧

### 1. 开启详细日志
```tsx
useIntersectionObserver(ref, (entry) => {
  console.log('观察数据:', {
    isIntersecting: entry.isIntersecting,
    intersectionRatio: entry.intersectionRatio,
    scrollDirection: entry.scrollDirection,
    boundingClientRect: entry.boundingClientRect
  });
});
```

### 2. 可视化调试
```tsx
// 显示实时数据的调试面板
const DebugPanel = ({ position }) => (
  <div style={{ 
    position: 'fixed', 
    top: 0, 
    right: 0, 
    background: 'rgba(0,0,0,0.8)',
    color: 'white',
    padding: '10px',
    fontFamily: 'monospace',
    fontSize: '12px'
  }}>
    {position && (
      <>
        <div>可见比例: {(position.intersectionRatio * 100).toFixed(1)}%</div>
        <div>位置: ({position.boundingClientRect.left.toFixed(0)}, {position.boundingClientRect.top.toFixed(0)})</div>
        <div>尺寸: {position.boundingClientRect.width.toFixed(0)} × {position.boundingClientRect.height.toFixed(0)}</div>
      </>
    )}
  </div>
);
```

## 🤝 贡献示例

如果你有好的使用案例，欢迎提交示例：

1. 创建新的示例文件
2. 添加详细的注释说明
3. 在 `index.tsx` 中注册示例
4. 更新 README 文档

### 示例模板

```tsx
import React, { useRef } from 'react';
import { /* 导入需要的 Hook */ } from '../src';

/**
 * [示例名称] 示例
 * 展示 [具体功能描述]
 */
export function YourExampleName() {
  const ref = useRef<HTMLDivElement>(null);
  
  // 使用 Hook
  const result = useYourHook(ref, {
    // 配置参数
  });

  return (
    <div style={{ padding: '20px' }}>
      <h2>[示例标题]</h2>
      
      {/* 示例内容 */}
      <div ref={ref}>
        {/* 你的组件内容 */}
      </div>
    </div>
  );
}
```

## 📚 相关文档

- [API 文档](../README.md)
- [类型定义](../src/types.ts)
- [开发指南](../DEVELOPMENT.md)

## 🆘 常见问题

### Q: 为什么我的 Hook 没有触发？
A: 检查以下几点：
- ref 是否正确绑定到 DOM 元素
- 元素是否有高度和宽度
- threshold 配置是否合理
- 是否在组件挂载后才开始观察

### Q: 如何提高性能？
A: 
- 增大 throttle 值
- 增大 step 值
- 启用 skipWhenOffscreen
- 避免在回调中执行重型操作

### Q: 如何调试观察器不工作的问题？
A:
- 使用 console.log 输出 entry 数据
- 检查元素是否在视口内
- 确认 root 元素配置正确
- 查看浏览器开发者工具的网络面板
