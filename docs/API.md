# API 文档

## @fly4react/observer

### Hooks

#### useInViewport

检测元素是否在视口中可见。

```tsx
import { useInViewport } from '@fly4react/observer';

const isInViewport = useInViewport(ref, options);
```

**参数:**
- `ref`: React ref 对象
- `options`: 配置选项
  - `threshold`: 阈值 (number | number[] | 'any' | 'top' | 'right' | 'bottom' | 'left')
  - `root`: 根元素
  - `rootMargin`: 根元素边距
  - `skipWhenOffscreen`: 是否跳过离屏元素

**返回值:**
- `boolean`: 元素是否可见

#### useElementPosition

获取元素的精确位置信息。

```tsx
import { useElementPosition } from '@fly4react/observer';

const position = useElementPosition(ref, options);
```

**参数:**
- `ref`: React ref 对象
- `options`: 配置选项
  - `step`: 步长值 (0-1)
  - `threshold`: 阈值 (number | number[])
  - `throttle`: 节流时间 (ms)
  - `root`: 根元素
  - `skipWhenOffscreen`: 是否跳过离屏元素
  - `forceCalibrate`: 是否强制启用校准机制
  - `calibrateInterval`: 校准间隔时间 (ms)

**返回值:**
- `ElementPosition | null`: 位置信息对象

#### useOneOffVisibility

一次性可见性检测，适用于动画触发。

```tsx
import { useOneOffVisibility } from '@fly4react/observer';

const { isVisible, hasTriggered } = useOneOffVisibility(ref, options);
```

**返回值:**
- `isVisible`: 当前是否可见
- `hasTriggered`: 是否已经触发过

#### useScrollDirection

检测滚动方向。

```tsx
import { useScrollDirection } from '@fly4react/observer';

const { scrollDirection, isScrolling } = useScrollDirection(ref, options);
```

**返回值:**
- `scrollDirection`: 滚动方向 ('up' | 'down' | 'left' | 'right' | 'none')
- `isScrolling`: 是否正在滚动

### 组件

#### IntersectionLoad

懒加载组件。

```tsx
import { IntersectionLoad } from '@fly4react/observer';

<IntersectionLoad
  threshold={0.5}
  placeholder={<div>Loading...</div>}
  onChange={(isVisible) => console.log(isVisible)}
>
  <img src="image.jpg" alt="Lazy loaded image" />
</IntersectionLoad>
```

**Props:**
- `children`: 要懒加载的内容
- `placeholder`: 占位符组件
- `threshold`: 触发阈值
- `offset`: 偏移量
- `root`: 根元素
- `onChange`: 可见性变化回调

## @fly4react/memo

### createMemoComponent

创建记忆化组件。

```tsx
import { createMemoComponent } from '@fly4react/memo';

const MyComponent = createMemoComponent<Props>(
  (props) => <div>{props.content}</div>,
  {
    debug: true,
    ignoreProps: ['onClick'],
    customCompare: (prevProps, nextProps) => {
      return prevProps.id === nextProps.id;
    }
  }
);
```

**参数:**
- `Component`: React 组件
- `options`: 配置选项
  - `debug`: 是否启用调试模式
  - `ignoreProps`: 忽略的属性数组
  - `customCompare`: 自定义比较函数

### 配置函数

#### registerDebugComponent

注册需要调试的组件。

```tsx
import { registerDebugComponent } from '@fly4react/memo';

registerDebugComponent('MyComponent');
```

#### registerIgnoreProp

注册需要忽略的属性。

```tsx
import { registerIgnoreProp } from '@fly4react/memo';

registerIgnoreProp('onClick');
```

## 类型定义

### ElementPosition

```tsx
interface ElementPosition {
  boundingClientRect: DOMRect;
  intersectionRatio: number;
  isIntersecting: boolean;
  time: number;
  relativeRect?: DOMRect;
  scrollX: number;
  scrollY: number;
}
```

**字段说明：**
- `boundingClientRect`: 元素的边界矩形信息
- `intersectionRatio`: 元素与视口的交叉比例 (0-1)
- `isIntersecting`: 元素是否与视口相交
- `time`: 位置信息的时间戳
- `relativeRect`: 相对于根元素的位置信息（可选）
- `scrollX`: 记录位置信息时的水平滚动位置
- `scrollY`: 记录位置信息时的垂直滚动位置

### MemoOptions

```tsx
interface MemoOptions {
  debug?: boolean;
  ignoreProps?: string[];
  customCompare?: (prevProps: any, nextProps: any) => boolean;
}
```

## 浏览器支持

- Chrome 51+
- Firefox 55+
- Safari 12.1+
- Edge 15+

## 🧠 智能位置同步策略

我们的库采用了先进的智能位置同步策略，结合 Intersection Observer 和 scroll 事件，实现最佳性能：

### 策略说明
- **元素部分可见时**：依赖 Intersection Observer 自动触发，避免复杂计算
- **元素完全可见/不可见时**：使用 scroll 事件进行精确位置计算
- **定期校准**：使用 Intersection Observer 定期校准位置，确保数据准确性
- **节流控制**：scroll 事件使用节流机制，避免过度计算

### 配置选项
- **`forceCalibrate`**: 是否强制启用校准机制
- **`calibrateInterval`**: 校准间隔时间（毫秒）
- **`throttle`**: scroll 事件节流时间（毫秒）

### 性能优势
- 减少不必要的计算，提升性能
- 确保位置信息的实时性和准确性
- 避免 Intersection Observer 的延迟更新问题
- 智能判断何时需要复杂计算

## 性能优化建议

1. 使用 `throttle` 选项控制更新频率
2. 启用 `skipWhenOffscreen` 跳过离屏元素
3. 合理设置 `threshold` 值
4. 使用 `useOneOffVisibility` 进行一次性检测
5. 合理使用 `createMemoComponent` 避免不必要的重新渲染
6. 启用 `forceCalibrate` 和设置合适的 `calibrateInterval` 确保位置准确性
