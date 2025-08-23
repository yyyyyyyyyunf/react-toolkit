# @fly4react/observer

一个基于 Intersection Observer API 的现代 React 工具库，提供懒加载、可见性检测、位置跟踪和滚动方向检测功能。

## ✨ 功能特性

- 🚀 基于 Intersection Observer API，性能优异
- 🎯 支持数值和语义化的阈值设置
- 🔧 简洁的配置选项
- 📦 轻量级，无额外依赖
- 🎨 支持自定义占位符
- 🔄 支持方向性可见性检测
- 📊 支持可见性变化回调
- 📍 支持滚动过程中的位置跟踪
- 🎯 支持基于自定义容器的可见性检测
- 🧭 支持滚动方向检测
- 🎯 提供专门的 useScrollDirection Hook
- ⚡ 智能初始状态：元素一开始就在视口中时立即触发回调
- 🛡️ 自动内存泄漏防护：组件卸载时自动清理
- 🔄 类型安全的互斥选项：once 和 active 不能同时使用

## 📦 安装

```bash
npm install @fly4react/observer
# 或
yarn add @fly4react/observer
# 或
pnpm add @fly4react/observer
```

## 🚀 使用方法

### IntersectionLoad 组件

#### 基础使用

```tsx
import { IntersectionLoad } from '@fly4react/observer';

function App() {
  return (
    <div>
      <IntersectionLoad 
        style={{ height: 200 }}
        placeholder={<div>Loading...</div>}
        threshold={0.5} // 50% 可见时触发
        offset={100}
      >
        <img src="large-image.jpg" alt="Large Image" />
      </IntersectionLoad>
    </div>
  );
}
```

#### 语义化阈值

```tsx
import { IntersectionLoad } from '@fly4react/observer';

function App() {
  return (
    <div>
      {/* 任何部分可见时触发 */}
      <IntersectionLoad 
        style={{ height: 200 }}
        placeholder={<div>Loading...</div>}
        threshold="any"
      >
        <img src="image1.jpg" alt="Image 1" />
      </IntersectionLoad>

      {/* 顶部可见时触发 */}
      <IntersectionLoad 
        style={{ height: 200 }}
        placeholder={<div>Loading...</div>}
        threshold="top"
      >
        <img src="image2.jpg" alt="Image 2" />
      </IntersectionLoad>
    </div>
  );
}
```

#### 一次性触发

```tsx
import { IntersectionLoad } from '@fly4react/observer';

function App() {
  return (
    <div>
      <IntersectionLoad 
        style={{ height: 200 }}
        placeholder={<div>Loading...</div>}
        threshold="any"
        once={true} // 只触发一次
        onChange={(isVisible) => {
          if (isVisible) {
            console.log('元素可见，只会触发一次');
          }
        }}
      >
        <img src="image.jpg" alt="Image" />
      </IntersectionLoad>
    </div>
  );
}
```

#### 动态控制监听

```tsx
import { IntersectionLoad } from '@fly4react/observer';
import { useState } from 'react';

function App() {
  const [isActive, setIsActive] = useState(true);

  return (
    <div>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Disable' : 'Enable'} Lazy Loading
      </button>
      
      <IntersectionLoad 
        style={{ height: 200 }}
        placeholder={<div>Loading...</div>}
        threshold="any"
        active={isActive}
      >
        <img src="image.jpg" alt="Image" />
      </IntersectionLoad>
    </div>
  );
}
```

#### 使用 onChange 回调

```tsx
import { IntersectionLoad } from '@fly4react/observer';
import { useState } from 'react';

function App() {
  const [visibilityCount, setVisibilityCount] = useState(0);

  return (
    <div>
      <p>可见性变化次数: {visibilityCount}</p>
      
      <IntersectionLoad 
        style={{ height: 200 }}
        placeholder={<div>Loading...</div>}
        threshold="any"
        onChange={(isVisible) => {
          if (isVisible) {
            setVisibilityCount(prev => prev + 1);
          }
        }}
      >
        <img src="image.jpg" alt="Image" />
      </IntersectionLoad>
    </div>
  );
}
```

#### 自定义根容器

```tsx
import { IntersectionLoad } from '@fly4react/observer';
import { useRef } from 'react';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div 
        ref={containerRef} 
        style={{ height: '400px', overflow: 'auto', border: '1px solid #ccc' }}
      >
        <div style={{ height: '800px' }}>
          <IntersectionLoad 
            style={{ height: 200 }}
            placeholder={<div>Loading...</div>}
            threshold="any"
            root={containerRef.current}
          >
            <img src="image.jpg" alt="Image" />
          </IntersectionLoad>
        </div>
      </div>
    </div>
  );
}
```

### Hooks

#### useIntersectionObserver

```tsx
import { useIntersectionObserver } from '@fly4react/observer';
import { useRef, useState } from 'react';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useIntersectionObserver(
    ref,
    (entry) => {
      setIsVisible(entry.isIntersecting);
      console.log('滚动方向:', entry.scrollDirection);
      console.log('交叉比例:', entry.intersectionRatio);
    },
    {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    }
  );

  return (
    <div ref={ref} style={{ height: '200px', background: 'lightblue' }}>
      {isVisible ? '可见' : '不可见'}
    </div>
  );
}
```

#### useOneOffVisibility

```tsx
import { useOneOffVisibility } from '@fly4react/observer';
import { useRef } from 'react';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOneOffVisibility(ref);

  return (
    <div ref={ref} style={{ height: '200px', background: 'lightblue' }}>
      {isVisible ? '已可见' : '未可见'}
    </div>
  );
}
```

#### useScrollDirection

```tsx
import { useScrollDirection } from '@fly4react/observer';
import { useRef } from 'react';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollDirection, isScrolling } = useScrollDirection(ref, {
    step: 0.1,
    throttle: 100
  });

  return (
    <div ref={ref} style={{ height: '200px', background: 'lightblue' }}>
      <div>滚动方向: {scrollDirection}</div>
      <div>是否滚动中: {isScrolling ? '是' : '否'}</div>
    </div>
  );
}
```

#### useElementPosition

```tsx
import { useElementPosition } from '@fly4react/observer';
import { useRef } from 'react';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const position = useElementPosition(ref, {
    step: 0.1, // 每 10% 触发一次
    throttle: 16 // 60fps
  });

  return (
    <div>
      <div ref={ref} style={{ height: '100px', background: 'lightblue' }}>
        Tracked Element
      </div>
      {position && (
        <div>
          <p>交叉比例: {(position.intersectionRatio * 100).toFixed(1)}%</p>
          <p>是否相交: {position.isIntersecting ? '是' : '否'}</p>
          <p>位置: ({position.boundingClientRect.x.toFixed(2)}, {position.boundingClientRect.y.toFixed(2)})</p>
          <p>尺寸: {position.boundingClientRect.width.toFixed(2)} × {position.boundingClientRect.height.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
```

#### useBoundingClientRect

```tsx
import { useBoundingClientRect } from '@fly4react/observer';
import { useRef } from 'react';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const boundingRect = useBoundingClientRect(ref, {
    step: 0.1, // 每 10% 触发一次
    throttle: 16 // 60fps
  });

  return (
    <div>
      <div ref={ref} style={{ height: '100px', background: 'lightblue' }}>
        Tracked Element
      </div>
      {boundingRect && (
        <div>
          <p>元素位置: ({boundingRect.x.toFixed(2)}, {boundingRect.y.toFixed(2)})</p>
          <p>元素尺寸: {boundingRect.width.toFixed(2)} × {boundingRect.height.toFixed(2)}</p>
          <p>元素边界: 左{boundingRect.left.toFixed(2)}, 上{boundingRect.top.toFixed(2)}, 右{boundingRect.right.toFixed(2)}, 下{boundingRect.bottom.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
```

#### useIntersectionRatio

```tsx
import { useIntersectionRatio } from '@fly4react/observer';
import { useRef } from 'react';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const ratio = useIntersectionRatio(ref, {
    step: 0.1, // 每 10% 触发一次
    throttle: 16 // 60fps
  });

  return (
    <div>
      <div ref={ref} style={{ height: '100px', background: 'lightblue' }}>
        Tracked Element
      </div>
      <p>交叉比例: {ratio !== undefined ? `${(ratio * 100).toFixed(1)}%` : '未计算'}</p>
    </div>
  );
}
```

## 📖 API 文档

### IntersectionLoad 组件

#### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `children` | `ReactNode` | - | 要懒加载的内容 |
| `placeholder` | `ReactNode` | - | 占位符内容 |
| `threshold` | `number \| ThresholdType` | `0.1` | 触发阈值 |
| `offset` | `number` | `300` | 偏移量（像素） |
| `style` | `CSSProperties` | - | 容器样式 |
| `onChange` | `(isVisible: boolean) => void` | - | 可见性变化回调 |
| `root` | `Element \| null` | `null` | 自定义根容器 |
| `once` | `boolean` | - | 是否只触发一次（与 active 互斥） |
| `active` | `boolean` | - | 是否激活监听（与 once 互斥） |

**注意**：`once` 和 `active` 属性不能同时使用。如果都不传，默认为持续监听模式。

#### ThresholdType

```tsx
type ThresholdType = 'any' | 'top' | 'bottom' | 'center';
```

### Hooks

#### useIntersectionObserver

```tsx
function useIntersectionObserver(
  ref: RefObject<HTMLElement | null>,
  callback: (entry: ObserverCallbackParamType) => void,
  options: ObserverOptions
): void
```

#### useOneOffVisibility

```tsx
function useOneOffVisibility(
  ref: RefObject<HTMLElement | null>,
  options?: OneOffVisibilityOptions
): boolean
```

#### useScrollDirection

```tsx
function useScrollDirection(
  ref: RefObject<HTMLElement | null>,
  options?: UseScrollDirectionOptions
): { scrollDirection: ScrollDirection; isScrolling: boolean }
```

#### useInViewport

```tsx
function useInViewport(
  ref: RefObject<HTMLElement | null>,
  options?: ViewportElementPositionOptions
): boolean
```

#### useElementPosition

```tsx
function useElementPosition(
  ref: RefObject<HTMLElement | null>,
  options?: ElementPositionOptions
): ElementPosition | null
```

#### useBoundingClientRect

```tsx
function useBoundingClientRect(
  ref: RefObject<HTMLElement | null>,
  options?: ElementPositionOptions
): DOMRect | null
```

#### useIntersectionRatio

```tsx
function useIntersectionRatio(
  ref: RefObject<HTMLElement | null>,
  options?: ElementPositionOptions
): number | undefined
```

## ⚡ 重要行为说明

### 初始 Viewport 状态

当组件一开始就在视口中时，所有基于 Intersection Observer 的 hooks 和组件会**立即触发回调**，而不需要等待滚动事件。这是 Intersection Observer API 的标准行为。

```tsx
// 如果这个元素一开始就在视口中
const position = useElementPosition(ref);
// position 会立即有值，而不是 null

const isVisible = useInViewport(ref);
// isVisible 会立即为 true

const hasBeenVisible = useOneOffVisibility(ref);
// hasBeenVisible 会立即为 true
```

这个特性对以下场景特别有用：
- 首屏内容的初始状态检测
- 页面加载时的性能优化
- 避免不必要的等待和重新渲染

### 内存泄漏防护

所有 hooks 都内置了组件挂载状态跟踪，在组件卸载后自动停止状态更新，防止内存泄漏。

## 🔧 配置选项

### ElementPositionOptions

```tsx
interface ElementPositionOptions {
  threshold?: number[];
  step?: number;
  throttle?: number;
  skipWhenOffscreen?: boolean;
  root?: RefObject<Element>;
  relativeToRoot?: boolean;
}
```

### UseScrollDirectionOptions

```tsx
interface UseScrollDirectionOptions {
  threshold?: number[];
  step?: number;
  throttle?: number;
}
```

## 🎯 与 react-visibility-sensor 的对比

| 功能 | react-visibility-sensor | @fly4react/observer |
|------|------------------------|------------------------|
| 部分可见性检测 | ✅ | ✅ |
| 数值阈值 | ✅ | ✅ |
| 语义化阈值 | ❌ | ✅ |
| 自定义根容器 | ❌ | ✅ |
| 位置跟踪 | ❌ | ✅ |
| 滚动方向检测 | ❌ | ✅ |
| TypeScript 支持 | ❌ | ✅ |
| 现代 API | ❌ | ✅ |
| 性能优化 | ❌ | ✅ |

## 📄 许可证

MIT
