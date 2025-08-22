# React Intersection Tool

一个基于 Intersection Observer API 的 React 工具库，提供懒加载和可见性检测功能。

## 功能特性

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

## 安装

```bash
npm install react-intersection-tool
# 或
yarn add react-intersection-tool
# 或
pnpm add react-intersection-tool
```

## 使用方法

### IntersectionLoad 组件

#### 数值阈值

```tsx
import { IntersectionLoad } from 'react-intersection-tool';

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
import { IntersectionLoad } from 'react-intersection-tool';

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
import { IntersectionLoad } from 'react-intersection-tool';
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
import { IntersectionLoad } from 'react-intersection-tool';
import { useState } from 'react';

function App() {
  const [visibilityCount, setVisibilityCount] = useState(0);

  return (
    <div>
      <p>Element became visible {visibilityCount} times</p>
      
      <IntersectionLoad 
        height={200}
        placeholder={<div>Loading...</div>}
        threshold="any"
        onChange={(isVisible) => {
          if (isVisible) {
            setVisibilityCount(prev => prev + 1);
            console.log('Element is now visible!');
          }
        }}
      >
        <img src="image.jpg" alt="Image" />
      </IntersectionLoad>
    </div>
  );
}
```

#### 基于自定义容器的懒加载

```tsx
import { IntersectionLoad } from 'react-intersection-tool';
import { useRef } from 'react';

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      {/* 可滚动的容器 */}
      <div 
        ref={scrollContainerRef}
        style={{ 
          height: '400px', 
          overflow: 'auto', 
          border: '1px solid #ccc' 
        }}
      >
        <div style={{ height: '1000px' }}>
          {/* 基于容器而不是 viewport 的懒加载 */}
          <IntersectionLoad 
            height={200}
            placeholder={<div>Loading...</div>}
            root={scrollContainerRef.current}
            offset={100}
          >
            <img src="large-image.jpg" alt="Large Image" />
          </IntersectionLoad>
        </div>
      </div>
    </div>
  );
}
```

### useIntersectionObserver Hook

```tsx
import { useIntersectionObserver, ObserverCallbackParamType } from 'react-intersection-tool';
import { useRef } from 'react';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  
  useIntersectionObserver(ref, (entry: ObserverCallbackParamType) => {
    console.log('Element is visible:', entry.isIntersecting);
  }, {
    threshold: 0.5
  });

  return <div ref={ref}>This element will be observed</div>;
}
```

### useOneOffVisibility Hook

```tsx
import { useOneOffVisibility } from 'react-intersection-tool';
import { useRef } from 'react';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOneOffVisibility(ref, {
    threshold: 0.1
  });

  return (
    <div ref={ref}>
      {isVisible ? 'Element is visible!' : 'Element is not visible yet'}
    </div>
  );
}
```

### useScrollDirection Hook（滚动方向检测）

```tsx
import { useScrollDirection } from 'react-intersection-tool';
import { useRef } from 'react';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollDirection, isScrolling } = useScrollDirection(ref, {
    step: 0.25, // 每 25% 触发一次，自动生成 [0, 0.25, 0.5, 0.75, 1]
    throttle: 150, // 150ms 节流，避免过于频繁的更新
  });

  return (
    <div>
      <p>当前滚动方向: {scrollDirection}</p>
      <p>正在滚动: {isScrolling ? '是' : '否'}</p>
      <div ref={ref}>观察元素</div>
    </div>
  );
}
```

#### useScrollDirection 选项说明

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `step` | `number` | - | 步长（0-1之间），用于自动生成 threshold 数组 |
| `threshold` | `number[]` | - | 手动指定 threshold 数组（与 step 互斥） |
| `offset` | `number` | `0` | 偏移量（像素） |
| `root` | `Element` | - | 自定义根元素 |
| `throttle` | `number` | `100` | 节流时间（毫秒），避免过于频繁的状态更新 |

#### 返回值说明

```tsx
interface UseScrollDirectionReturn {
  scrollDirection: ScrollDirection; // 当前滚动方向
  isScrolling: boolean; // 是否正在滚动
}
```

#### step 和 threshold 优先级

- **类型安全**：TypeScript 确保 `step` 和 `threshold` 不能同时设置
- **`threshold` 优先**：如果同时设置了 `threshold` 和 `step`，使用 `threshold`（运行时警告）
- **`step` 自动生成**：根据步长自动生成均匀分布的阈值数组
- **默认值**：如果都不设置，使用默认的密集阈值数组 `[0, 0.25, 0.5, 0.75, 1]`

#### 类型安全示例

```tsx
// ✅ 正确：只使用 step
const { scrollDirection } = useScrollDirection(ref, {
  step: 0.25
});

// ✅ 正确：只使用 threshold
const { scrollDirection } = useScrollDirection(ref, {
  threshold: [0, 0.5, 1]
});

// ✅ 正确：都不使用（使用默认值）
const { scrollDirection } = useScrollDirection(ref, {
  throttle: 200
});

// ❌ 错误：TypeScript 会报错
const { scrollDirection } = useScrollDirection(ref, {
  step: 0.25,
  threshold: [0, 0.5, 1] // 类型错误！
});
```
```

### useElementPosition Hook（滚动位置跟踪）

```tsx
import { useElementPosition } from 'react-intersection-tool';
import { useRef } from 'react';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const position = useElementPosition(ref, {
    step: 0.1, // 每 10% 触发一次，自动生成 [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    offset: 100, // 偏移量 100px
    throttle: 16, // 60fps 更新频率
    skipWhenOffscreen: true // 元素完全不可见时跳过更新（性能优化）
  });

  return (
    <div>
      <div ref={ref} style={{ height: '200px', background: 'lightblue' }}>
        Tracked Element
      </div>
      {position && (
        <div>
          <p>Top: {position.boundingClientRect.top.toFixed(2)}px</p>
          <p>Left: {position.boundingClientRect.left.toFixed(2)}px</p>
          <p>Intersection Ratio: {(position.intersectionRatio * 100).toFixed(1)}%</p>
          <p>Is Intersecting: {position.isIntersecting ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
}
```
```

#### 基于自定义容器的位置跟踪

```tsx
import { useElementPosition } from 'react-intersection-tool';
import { useRef } from 'react';

function App() {
  const elementRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const position = useElementPosition(elementRef, {
    root: containerRef.current, // 基于自定义容器，自动提供相对位置
    step: 0.25, // 每 25% 触发一次，自动生成 [0, 0.25, 0.5, 0.75, 1]
    offset: 50
  });

  return (
    <div>
      {/* 可滚动的容器 */}
      <div 
        ref={containerRef}
        style={{ 
          height: '300px', 
          overflow: 'auto', 
          border: '1px solid #ccc' 
        }}
      >
        <div style={{ height: '800px' }}>
          {/* 被跟踪的元素 */}
          <div 
            ref={elementRef} 
            style={{ 
              height: '100px', 
              background: 'lightblue',
              margin: '200px 0'
            }}
          >
            Tracked Element
          </div>
        </div>
      </div>
      
      {/* 显示位置信息 */}
      {position && (
        <div>
          <p>Relative to viewport:</p>
          <p>Top: {position.boundingClientRect.top.toFixed(2)}px</p>
          <p>Visible: {(position.intersectionRatio * 100).toFixed(1)}%</p>
          
          {position.relativeRect && (
            <>
              <p>Relative to container:</p>
              <p>Top: {position.relativeRect.top.toFixed(2)}px</p>
              <p>Left: {position.relativeRect.left.toFixed(2)}px</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

  return (
    <div>
      <div ref={ref} style={{ height: '200px', background: 'lightblue' }}>
        Tracked Element
      </div>
      {position && (
        <div>
          <p>Top: {position.boundingClientRect.top.toFixed(2)}px</p>
          <p>Left: {position.boundingClientRect.left.toFixed(2)}px</p>
          <p>Intersection Ratio: {(position.intersectionRatio * 100).toFixed(1)}%</p>
          <p>Is Intersecting: {position.isIntersecting ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
}
```



### useElementPosition 选项说明

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `step` | `number` | - | 步长（0-1之间），用于自动生成 threshold 数组 |
| `threshold` | `number[]` | - | 手动指定 threshold 数组（与 step 互斥） |
| `offset` | `number` | `0` | 偏移量（像素），位置跟踪场景建议 0-50px |
| `root` | `Element` | - | 自定义根元素，设置后自动提供相对位置信息 |
| `throttle` | `number` | `16` | 节流时间（毫秒），默认 60fps |
| `skipWhenOffscreen` | `boolean` | `true` | 元素完全不可见时跳过更新，提升性能 |

### 性能优化建议

1. **使用 `skipWhenOffscreen: true`**：当元素完全不在视口内时，不会触发状态更新
2. **调整 `throttle` 值**：根据需求调整更新频率
   - `16ms`：60fps，适合动画
   - `33ms`：30fps，适合一般跟踪
   - `100ms`：10fps，适合低频更新
3. **合理设置 `step` 或 `threshold`**：根据精度需求选择触发频率
   - `step: 0.1`：每 10% 触发一次（默认）
   - `step: 0.25`：每 25% 触发一次
   - `step: 0.5`：每 50% 触发一次
   - `threshold: [0, 0.5, 1]`：手动指定精确的阈值

### step 和 threshold 优先级

- **类型安全**：TypeScript 确保 `step` 和 `threshold` 不能 同时设置
- **`threshold` 优先**：如果同时设置了 `threshold` 和 `step`，使用 `threshold`（运行时警告）
- **`step` 自动生成**：根据步长自动生成均匀分布的阈值数组
- **默认值**：如果都不设置，使用默认的密集阈值数组

### 类型安全示例

```tsx
// ✅ 正确：只使用 step
const position1 = useElementPosition(ref, {
  step: 0.1
});

// ✅ 正确：只使用 threshold
const position2 = useElementPosition(ref, {
  threshold: [0, 0.5, 1]
});

// ✅ 正确：都不使用（使用默认值）
const position3 = useElementPosition(ref, {
  offset: 100
});

// ❌ 错误：TypeScript 会报错
const position4 = useElementPosition(ref, {
  step: 0.1,
  threshold: [0, 0.5, 1] // 类型错误！
});
```

### API 命名说明

- **`offset`**：用于高级 API（如 `IntersectionLoad`、`useElementPosition`），接受数字类型（像素）
- **`rootMargin`**：用于底层 API（如 `useIntersectionObserver`），遵循 Intersection Observer 标准，接受字符串类型

### 位置坐标系统说明

当使用自定义 `root` 时，位置信息的坐标系统如下：

- **`boundingClientRect`**：始终基于 viewport 的坐标系统
- **`intersectionRatio`**：基于 root 元素计算的可见比例
- **`isIntersecting`**：基于 root 元素判断是否可见
- **`relativeRect`**：当设置了自定义 `root` 时，自动提供相对于 root 的坐标系统

### 类型安全

库使用 TypeScript 联合类型确保类型安全：

```tsx
// 基于 viewport（默认）
const position = useElementPosition(ref, {
  offset: 100
  // relativeToRoot 不能设置为 true
});

// 基于自定义 root
const position = useElementPosition(ref, {
  root: containerRef.current,
  relativeToRoot: true // 可选，默认为 true
});
```

### 默认值说明

不同 API 的默认 `offset` 值基于其使用场景：

- **`IntersectionLoad`**：`offset = 300px`
  - 懒加载场景，需要提前开始加载
  - 避免用户看到加载过程，提升用户体验
  - 给网络请求预留足够时间

- **`useElementPosition`**：`offset = 0px`
  - 位置跟踪场景，需要精确的位置信息
  - 不需要提前触发，实时跟踪即可

## 滚动方向检测

库支持检测滚动方向，通过比较元素位置的变化来判断用户滚动的方向。

### 基本用法

```tsx
import { useIntersectionObserver, ScrollDirection, ObserverCallbackParamType } from 'react-intersection-tool';

function ScrollDirectionExample() {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('none');
  const targetRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver(targetRef, (entry: ObserverCallbackParamType) => {
    // 获取滚动方向
    if (entry.scrollDirection && entry.scrollDirection !== 'none') {
      setScrollDirection(entry.scrollDirection);
      console.log('滚动方向:', entry.scrollDirection);
    }
  }, {
    threshold: [0, 0.25, 0.5, 0.75, 1], // 使用多个阈值获得更频繁的更新
  });

  return (
    <div>
      <p>当前滚动方向: {scrollDirection}</p>
      <div ref={targetRef}>目标元素</div>
    </div>
  );
}
```

### 滚动方向类型

```tsx
type ScrollDirection = 'up' | 'down' | 'left' | 'right' | 'none';
```

- **`'up'`**：向下滚动（元素向上移动）
- **`'down'`**：向上滚动（元素向下移动）
- **`'left'`**：向右滚动（元素向左移动）
- **`'right'`**：向左滚动（元素向右移动）
- **`'none'`**：无滚动或滚动距离小于阈值

### 高级用法

```tsx
import { useIntersectionObserver, calculateScrollDirection, ObserverCallbackParamType } from 'react-intersection-tool';

function AdvancedScrollExample() {
  const targetRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver(targetRef, (entry: ObserverCallbackParamType) => {
    // 可以访问前一次的位置信息
    if (entry.previousRect) {
      const direction = calculateScrollDirection(entry.boundingClientRect, entry.previousRect);
      console.log('手动计算的滚动方向:', direction);
    }
    
    // 也可以直接使用计算好的方向
    console.log('自动计算的滚动方向:', entry.scrollDirection);
  });

  return <div ref={targetRef}>目标元素</div>;
}
```

### 注意事项

1. **阈值设置**：为了获得准确的滚动方向，建议使用多个阈值值
2. **性能考虑**：滚动方向检测会增加少量计算开销
3. **首次调用**：第一次回调时 `scrollDirection` 为 `'none'`，因为没有前一次位置信息
4. **微小移动**：移动距离小于 1px 时会被忽略，避免抖动

## API 参考

### IntersectionLoad Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `children` | `React.ReactNode` | - | 要懒加载的内容 |
| `placeholder` | `React.ReactNode` | - | 占位符内容 |
| `threshold` | `number \| 'any' \| 'top' \| 'right' \| 'bottom' \| 'left'` | `0.1` | 触发阈值 |
| `offset` | `number` | `300` | 偏移量（像素），懒加载场景建议 200-500px |
| `root` | `Element \| null` | `null` | 根元素，默认为 viewport |
| `height` | `number` | - | 容器高度（必需） |
| `lazy` | `boolean` | `true` | 是否启用懒加载 |
| `style` | `React.CSSProperties` | - | 容器样式 |
| `active` | `boolean` | `true` | 是否激活观察器，设为 false 时禁用监听 |
| `onChange` | `(isVisible: boolean) => void` | - | 可见性变化时的回调函数 |

### Threshold 值说明

#### 数值类型
- `0.1`：10% 可见时触发（默认）
- `0.5`：50% 可见时触发
- `1.0`：完全可见时触发

#### 语义化类型
- `'any'`：任何部分可见时触发（相当于 `0.01`）
- `'top'`：元素顶部可见时触发
- `'right'`：元素右侧可见时触发
- `'bottom'`：元素底部可见时触发
- `'left'`：元素左侧可见时触发

#### 数组类型（用于位置跟踪）
- `[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]`：密集跟踪，适合滚动位置监控
- `[0, 0.25, 0.5, 0.75, 1]`：中等密度跟踪
- `[0, 0.5, 1]`：稀疏跟踪，性能更好

### ObserverOptions

```tsx
interface ObserverOptions extends IntersectionObserverInit {
  once?: boolean;
}
```

## 与 react-visibility-sensor 的对比

| 功能 | react-visibility-sensor | react-intersection-tool |
|------|------------------------|------------------------|
| 部分可见性检测 | ✅ | ✅ |
| 方向性检测 | ✅ | ✅ |
| 懒加载组件 | ❌ | ✅ |
| 基于 Intersection Observer | ❌ | ✅ |
| TypeScript 支持 | 部分 | ✅ |
| 包大小 | 较大 | 轻量 |
| API 简洁性 | ❌ | ✅ |

## 浏览器支持

支持所有支持 Intersection Observer API 的现代浏览器。对于不支持的环境，组件会自动降级为直接渲染内容。

## 其他 Hook

### useBoundingClientRect Hook（边界矩形）

专门用于获取元素的边界矩形信息，基于 `useElementPosition` 的简化版本。

```tsx
import { useBoundingClientRect } from 'react-intersection-tool';
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

**返回值**：`DOMRect | null` - 元素的边界矩形信息，初始为 null

### useIntersectionRatio Hook（交叉比例）

专门用于获取元素与根元素的交叉比例，基于 `useElementPosition` 的简化版本。

```tsx
import { useIntersectionRatio } from 'react-intersection-tool';
import { useRef } from 'react';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const intersectionRatio = useIntersectionRatio(ref, {
    step: 0.1, // 每 10% 触发一次
    throttle: 16 // 60fps
  });

  return (
    <div>
      <div ref={ref} style={{ height: '100px', background: 'lightblue' }}>
        Tracked Element
      </div>
      {intersectionRatio !== undefined && (
        <div>
          <p>可见比例: {(intersectionRatio * 100).toFixed(1)}%</p>
          {intersectionRatio > 0.5 && <p>元素超过一半可见</p>}
          {intersectionRatio === 1 && <p>元素完全可见</p>}
        </div>
      )}
    </div>
  );
}
```

**返回值**：`number | undefined` - 元素的交叉比例（0-1），初始为 undefined

## 许可证

MIT
