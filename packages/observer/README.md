# @fly4react/observer

[![npm version](https://img.shields.io/npm/v/@fly4react/observer.svg)](https://www.npmjs.com/package/@fly4react/observer)
[![npm downloads](https://img.shields.io/npm/dm/@fly4react/observer.svg)](https://www.npmjs.com/package/@fly4react/observer)
[![bundle size](https://img.shields.io/bundlephobia/min/@fly4react/observer.svg)](https://bundlephobia.com/result?p=@fly4react/observer)

## 功能特性

- 🎯 **精确的位置跟踪**：实时监控元素在视口中的位置变化
- ⚡ **性能优化**：内置节流机制，避免频繁更新
- 🧠 **智能位置同步**：结合 Intersection Observer 和 scroll 事件的智能策略
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

对于不支持 `IntersectionObserver` 的浏览器（如 IE 11），库会自动使用谷歌提供的标准 `intersection-observer` polyfill：

- **原生支持**：使用 `IntersectionObserver` API，性能最佳
- **降级支持**：使用标准的 `intersection-observer` polyfill，提供完整的 API 兼容性
- **功能一致性**：无论使用哪种方案，都提供相同的功能和 API
- **可靠性**：使用经过充分测试的官方 polyfill，确保稳定性和兼容性

## 安装

```bash
# 使用 npm
npm install @fly4react/observer intersection-observer

# 使用 yarn
yarn add @fly4react/observer intersection-observer

# 使用 pnpm
pnpm add @fly4react/observer intersection-observer
```

> **注意**：`intersection-observer` 是 peer dependency，需要单独安装以确保在不支持 IntersectionObserver 的浏览器中正常工作。如果项目中已经安装了其他使用该 polyfill 的库（如 ahooks），则无需重复安装。

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

#### useElementPositionRef

```tsx
import { useElementPositionRef } from '@fly4react/observer';
import { useRef } from 'react';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const positionRef = useElementPositionRef(ref, {
    step: 0.1, // 每 10% 触发一次
    throttle: 16 // 60fps
  });

  // 事件处理函数示例：获取实时位置信息
  const handleClick = () => {
    if (positionRef.current) {
      console.log('元素位置:', positionRef.current.boundingClientRect);
      console.log('交叉比例:', positionRef.current.intersectionRatio);
      console.log('是否相交:', positionRef.current.isIntersecting);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>获取位置信息</button>
      <div ref={ref} style={{ height: '100px', background: 'lightblue' }}>
        Tracked Element
      </div>
    </div>
  );
}
```

> **注意**：`useElementPositionRef` 与 `useElementPosition` 功能相同，但使用 `useRef` 存储位置信息，不会触发组件重新渲染。适用于需要实时获取元素位置但不想影响渲染性能的场景。

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



#### useElementDetector

```tsx
import { useElementDetector } from '@fly4react/observer';
import { useRef } from 'react';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  
  // 默认贴顶检测
  const isCeiling = useElementDetector(ref);
  
  // 自定义条件检测，使用细致的 threshold 配置
  const isCustom = useElementDetector(ref, {
    compute: (rect) => rect.top <= 50 && rect.bottom >= 100,
    step: 0.1, // 每 10% 触发一次
    throttle: 16, // 60fps
    skipWhenOffscreen: true
  });
  
  // 使用自定义 threshold 数组
  const isInCenter = useElementDetector(ref, {
    compute: (rect) => {
      const viewportHeight = window.innerHeight;
      const centerY = viewportHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const tolerance = 50;
      return Math.abs(elementCenter - centerY) <= tolerance;
    },
    threshold: [0, 0.25, 0.5, 0.75, 1], // 自定义阈值
    throttle: 32 // 30fps
  });

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
        <p>自定义条件状态: {isCustom ? '满足' : '不满足'}</p>
        <p>中心区域状态: {isInCenter ? '在中心' : '不在中心'}</p>
      </div>
    </div>
  );
}
```

> **注意**：`useElementDetector` 是一个灵活的通用检测器，支持自定义计算逻辑和细致的 threshold 配置。默认检测元素是否贴顶（top ≤ 0），支持 step、threshold、throttle、skipWhenOffscreen、offset 等配置选项。

#### useIsMounted

```tsx
import { useIsMounted } from '@fly4react/observer';
import { useRef } from 'react';

function MyComponent() {
  const isMountedRef = useIsMounted();
  
  const handleAsyncOperation = async () => {
    const result = await someAsyncOperation();
    
    // 检查组件是否仍然挂载，避免在已卸载的组件上设置状态
    if (isMountedRef.current) {
      setData(result);
    }
  };

  return (
    <div>
      <button onClick={handleAsyncOperation}>
        执行异步操作
      </button>
    </div>
  );
}
```

> **注意**：`useIsMounted` 是一个通用的组件挂载状态管理 Hook，用于防止在组件卸载后执行异步操作。返回一个 ref，其 current 值表示组件是否仍然挂载。

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

#### useElementDetector

```tsx
function useElementDetector(
  ref: RefObject<HTMLElement | null>,
  options?: UseElementDetectorOptions
): boolean
```

**参数说明：**
- `options.compute`: 自定义计算函数，接受 boundingClientRect 参数，返回 boolean
  - 不传参数时，默认检测元素是否贴顶（top ≤ 0）
  - 传入自定义函数时，使用自定义逻辑进行检测
- `options.step`: 步长值（0-1之间），用于自动生成 threshold 数组
- `options.threshold`: 手动指定的 threshold 数组
- `options.throttle`: 节流时间（毫秒），控制更新频率
- `options.skipWhenOffscreen`: 元素完全不可见时跳过更新
- `options.offset`: 偏移量（像素）

#### useIsMounted

```tsx
function useIsMounted(): RefObject<boolean>
```

**返回值说明：**
- 返回一个 ref，其 current 值表示组件是否仍然挂载
- 用于防止在组件卸载后执行异步操作

## ⚡ 重要行为说明

### 智能位置同步策略

库采用了先进的智能位置同步策略，结合 Intersection Observer 和 scroll 事件，实现最佳性能：

**策略说明：**
- **元素部分可见时**：依赖 Intersection Observer 自动触发，避免复杂计算
- **元素完全可见/不可见时**：使用 scroll 事件进行精确位置计算
- **定期校准**：使用 Intersection Observer 定期校准位置，确保数据准确性
- **节流控制**：scroll 事件使用节流机制，避免过度计算

**性能优势：**
- 减少不必要的计算，提升性能
- 确保位置信息的实时性和准确性
- 避免 Intersection Observer 的延迟更新问题
- 智能判断何时需要复杂计算

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
