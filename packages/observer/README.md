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

#### 数值阈值

```tsx
import { IntersectionLoad } from '@fly4react/observer';

function App() {
  return (
    <div>
      <IntersectionLoad 
        height={200}
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
        height={200}
        placeholder={<div>Loading...</div>}
        threshold="any"
      >
        <img src="image1.jpg" alt="Image 1" />
      </IntersectionLoad>

      {/* 顶部可见时触发 */}
      <IntersectionLoad 
        height={200}
        placeholder={<div>Loading...</div>}
        threshold="top"
      >
        <img src="image2.jpg" alt="Image 2" />
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
        height={200}
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
        height={200}
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
            height={200}
            placeholder={<div>Loading...</div>}
            threshold="any"
            root={containerRef}
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
import { useIntersectionObserver, ObserverCallbackParamType } from '@fly4react/observer';
import { useRef } from 'react';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  
  const [entry] = useIntersectionObserver(ref, {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  });

  return (
    <div ref={ref} style={{ height: '200px', background: 'lightblue' }}>
      {entry?.isIntersecting ? '可见' : '不可见'}
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
  const scrollDirection = useScrollDirection(ref);

  return (
    <div ref={ref} style={{ height: '200px', background: 'lightblue' }}>
      滚动方向: {scrollDirection}
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
          <p>位置: ({position.x.toFixed(2)}, {position.y.toFixed(2)})</p>
          <p>尺寸: {position.width.toFixed(2)} × {position.height.toFixed(2)}</p>
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
| `height` | `number \| string` | - | 占位符高度 |
| `placeholder` | `ReactNode` | - | 占位符内容 |
| `threshold` | `number \| ThresholdType` | `0` | 触发阈值 |
| `offset` | `number` | `300` | 偏移量 |
| `active` | `boolean` | `true` | 是否激活监听 |
| `onChange` | `(isVisible: boolean) => void` | - | 可见性变化回调 |
| `root` | `RefObject<Element>` | - | 自定义根容器 |

#### ThresholdType

```tsx
type ThresholdType = 'any' | 'top' | 'bottom' | 'center';
```

### Hooks

#### useIntersectionObserver

```tsx
function useIntersectionObserver(
  ref: RefObject<Element>,
  options?: IntersectionObserverInit
): [IntersectionObserverEntry | undefined, () => void]
```

#### useOneOffVisibility

```tsx
function useOneOffVisibility(
  ref: RefObject<Element>,
  options?: IntersectionObserverInit
): boolean
```

#### useScrollDirection

```tsx
function useScrollDirection(
  ref: RefObject<Element>,
  options?: UseScrollDirectionOptions
): ScrollDirection | undefined
```

#### useElementPosition

```tsx
function useElementPosition(
  ref: RefObject<Element>,
  options?: ElementPositionOptions
): ElementPosition | undefined
```

#### useBoundingClientRect

```tsx
function useBoundingClientRect(
  ref: RefObject<Element>,
  options?: ElementPositionOptions
): DOMRect | null
```

#### useIntersectionRatio

```tsx
function useIntersectionRatio(
  ref: RefObject<Element>,
  options?: ElementPositionOptions
): number | undefined
```

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
