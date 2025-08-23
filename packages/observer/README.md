# @fly4react/observer

[![npm version](https://img.shields.io/npm/v/@fly4react/observer.svg)](https://www.npmjs.com/package/@fly4react/observer)
[![npm downloads](https://img.shields.io/npm/dm/@fly4react/observer.svg)](https://www.npmjs.com/package/@fly4react/observer)
[![bundle size](https://img.shields.io/bundlephobia/min/@fly4react/observer.svg)](https://bundlephobia.com/result?p=@fly4react/observer)

## 功能特性

- 🎯 **精确的位置跟踪**：实时监控元素在视口中的位置变化
- ⚡ **性能优化**：内置节流机制，避免频繁更新
- 🔄 **滚动方向检测**：智能识别滚动方向变化
- 🎨 **动画触发器**：支持基于位置的动画触发
- 📱 **响应式支持**：适配各种屏幕尺寸和设备
- 🚀 **懒加载优化**：高效的图片和内容懒加载
- 🎭 **视口检测**：精确的元素可见性检测
- 🏗️ **贴顶检测**：检测元素是否达到指定位置
- 🌐 **浏览器兼容性**：自动降级支持旧版浏览器

## 浏览器兼容性

| 浏览器 | 版本要求 | 支持状态 |
|--------|----------|----------|
| Chrome | 51+ | ✅ 原生支持 |
| Firefox | 55+ | ✅ 原生支持 |
| Safari | 12.1+ | ✅ 原生支持 |
| Edge | 79+ | ✅ 原生支持 |
| IE | 11 | ✅ 降级支持 |
| 旧版浏览器 | - | ✅ 降级支持 |

### 降级策略

对于不支持 `IntersectionObserver` 的浏览器（如 IE 11），库会自动降级到使用 `scroll` 事件 + `getBoundingClientRect()` 的方案：

- **原生支持**：使用 `IntersectionObserver` API，性能最佳
- **降级支持**：使用 `scroll` 事件监听，提供相同的 API 接口
- **功能一致性**：无论使用哪种方案，都提供相同的功能和 API

## 安装

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

#### useIsCeiling

```tsx
import { useIsCeiling } from '@fly4react/observer';
import { useRef } from 'react';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  
  // 检测是否贴顶（默认）
  const isCeiling = useIsCeiling(ref);
  
  // 检测是否达到距离顶部 100px 的位置
  const isAtPosition = useIsCeiling(ref, 100);
  
  // 检测是否超出视口顶部 50px
  const isOverTop = useIsCeiling(ref, -50);

  return (
    <div>
      <div 
        ref={ref} 
        style={{ 
          height: '200px', 
          background: isCeiling ? 'green' : 'lightblue',
          position: 'sticky',
          top: 0
        }}
      >
        {isCeiling ? '已贴顶' : '未贴顶'}
      </div>
      <div style={{ height: '1000px' }}>
        <p>贴顶状态: {isCeiling ? '是' : '否'}</p>
        <p>距离顶部100px状态: {isAtPosition ? '已达到' : '未达到'}</p>
        <p>超出顶部50px状态: {isOverTop ? '已超出' : '未超出'}</p>
      </div>
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

#### useIsCeiling

```tsx
function useIsCeiling(
  ref: RefObject<HTMLElement | null>,
  position?: number
): boolean
```

**参数说明：**
- `position`: 位置阈值（像素），默认为 0
  - `position = 0`：元素顶部到达视口顶部时触发
  - `position > 0`：元素顶部到达距离视口顶部 position 像素时触发
  - `position < 0`：元素顶部超出视口顶部 |position| 像素时触发

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
