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

## @fly4react/image

### Components

#### ImageLoader

图片加载器组件，支持懒加载和预加载。

```tsx
import { ImageLoader } from '@fly4react/image';

<ImageLoader
  type="content" // 或 "background"
  src="https://example.com/image.jpg"
  alt="My image"
  preloadConfig={{
    preload: true,
    priority: 'high',
    ssr: true,
  }}
/>
```

**Props:**
- `type`: 图片类型，`'content'` 或 `'background'`
- `src`: 图片源地址
- `alt`: 图片替代文本
- `preloadConfig`: 预加载配置（可选）
  - `preload`: 是否预加载
  - `priority`: 优先级，`'high'` | `'low'` | `'auto'`
  - `ssr`: 是否在服务端渲染时预加载

#### BackgroundImage

背景图片组件。

```tsx
import { BackgroundImage } from '@fly4react/image';

<BackgroundImage
  src="https://example.com/bg.jpg"
  preloadConfig={{
    preload: true,
    priority: 'low',
  }}
  style={{ width: '100%', height: '200px' }}
/>
```

#### ContentImage

内容图片组件。

```tsx
import { ContentImage } from '@fly4react/image';

<ContentImage
  src="https://example.com/content.jpg"
  alt="Content image"
  preloadConfig={{
    preload: true,
    priority: 'high',
  }}
/>
```

#### ImagePreloadConsumer

预加载链接生成器组件。

```tsx
import { ImagePreloadConsumer } from '@fly4react/image';

<ImagePreloadConsumer />
```

### Context Providers

#### PreloadQueueProvider

预加载队列提供者，用于管理图片预加载。

```tsx
import { PreloadQueueProvider } from '@fly4react/image';

function App() {
  const preloadQueue = new MyPreloadQueue();
  
  return (
    <PreloadQueueProvider value={preloadQueue}>
      {/* 你的应用组件 */}
    </PreloadQueueProvider>
  );
}
```

#### AddToPreloadProvider

添加图片到预加载队列的提供者。

```tsx
import { AddToPreloadProvider } from '@fly4react/image';

<AddToPreloadProvider addImage={addImageFunction}>
  {/* 你的组件 */}
</AddToPreloadProvider>
```

#### GetPreloadImagesProvider

获取预加载图片的提供者。

```tsx
import { GetPreloadImagesProvider } from '@fly4react/image';

<GetPreloadImagesProvider getImages={getImagesFunction}>
  {/* 你的组件 */}
</GetPreloadImagesProvider>
```

#### ClearPreloadProvider

清空预加载队列的提供者。

```tsx
import { ClearPreloadProvider } from '@fly4react/image';

<ClearPreloadProvider clearImages={clearImagesFunction}>
  {/* 你的组件 */}
</ClearPreloadProvider>
```

### Hooks

#### useAddToPreloadQueue

添加图片到预加载队列的 Hook。

```tsx
import { useAddToPreloadQueue } from '@fly4react/image';

function MyComponent() {
  const addToPreloadQueue = useAddToPreloadQueue();
  
  const handlePreload = () => {
    addToPreloadQueue({
      src: 'https://example.com/image.jpg',
      type: 'image',
      ssr: true,
      priority: 'high',
    });
  };
  
  return <button onClick={handlePreload}>Preload Image</button>;
}
```

#### useGetPreloadImages

获取预加载图片列表的 Hook。

```tsx
import { useGetPreloadImages } from '@fly4react/image';

function PreloadStatus() {
  const getPreloadImages = useGetPreloadImages();
  
  const images = getPreloadImages?.() || [];
  
  return <div>Preloaded {images.length} images</div>;
}
```

#### useClearPreloadQueue

清空预加载队列的 Hook。

```tsx
import { useClearPreloadQueue } from '@fly4react/image';

function ClearButton() {
  const clearPreloadQueue = useClearPreloadQueue();
  
  const handleClear = () => {
    clearPreloadQueue?.();
  };
  
  return <button onClick={handleClear}>Clear Queue</button>;
}
```

#### useImagePreload

预加载单个图片的 Hook。

```tsx
import { useImagePreload } from '@fly4react/image';

function MyComponent() {
  useImagePreload({
    src: 'https://example.com/image.jpg',
    type: 'image',
    ssr: true,
    priority: 'high',
  });
  
  return <div>Component with preloaded image</div>;
}
```

#### useImagesPreload

预加载多个图片的 Hook。

```tsx
import { useImagesPreload } from '@fly4react/image';

function MyComponent() {
  useImagesPreload([
    {
      src: 'https://example.com/image1.jpg',
      type: 'image',
      ssr: true,
      priority: 'high',
    },
    {
      src: 'https://example.com/image2.jpg',
      type: 'image',
      ssr: true,
      priority: 'low',
    },
  ]);
  
  return <div>Component with preloaded images</div>;
}
```

### Types

#### PreloadConfig

预加载配置类型。

```tsx
interface PreloadConfig {
  preload: boolean;
  priority?: 'high' | 'low' | 'auto';
  ssr?: boolean;
  sizes?: string;
  media?: string;
}
```

#### PreloadQueueContext

预加载队列上下文类型。

```tsx
interface PreloadQueueContext {
  addImage: (options: PreloadOptions) => void;
  getImages?: () => PreloadOptions[];
  clearImages?: () => void;
}
```

### 最佳实践

1. 使用 `PreloadQueueProvider` 包装应用以启用预加载功能
2. 合理设置图片优先级，重要图片使用 `high` 优先级
3. 在服务端渲染时启用 `ssr: true` 选项
4. 使用 `ImagePreloadConsumer` 生成预加载链接
5. 根据实际需求选择合适的预加载策略

## @fly4react/feature-detector

### 核心类

#### FeatureDetector

特性检测器的主要类。

```typescript
class FeatureDetector {
  constructor(config: FeatureConfigMap, detectorConfig: FeatureDetectorOptions)
  
  // 检测单个特性
  check(feature: string): boolean
  
  // 检测多个特性
  detect(features: string[]): DetectionResult[]
  
  // 注册新特性
  registerFeature(name: string, config: FeatureConfig): void
  
  // 移除特性
  removeFeature(name: string): void
  
  // 清除缓存
  clearCache(): void
  
  // 获取检测器状态
  getStatus(): DetectorInfo
}
```

#### createFeatureDetector

创建检测器实例的工厂函数。

```typescript
function createFeatureDetector(
  config?: FeatureConfigMap,
  detectorConfig?: FeatureDetectorOptions
): FeatureDetector
```

### 类型定义

#### FeatureConfig

单个特性的配置。

```typescript
interface FeatureConfig {
  /** 浏览器版本要求 */
  browsers: BrowserSupport;
  /** 运行时测试函数 */
  runtimeTest?: () => boolean;
}
```

#### BrowserSupport

浏览器版本要求。

```typescript
interface BrowserSupport {
  chrome?: string;
  firefox?: string;
  safari?: string;
  edge?: string;
  opera?: string;
  samsung?: string;
  safariWebview?: string;
  chromeWebview?: string;
  [key: string]: string | undefined;
}
```

#### DetectionResult

特性检测结果。

```typescript
interface DetectionResult {
  feature: string;
  supported: boolean;
  confidence: 'high' | 'medium' | 'low';
  method: 'runtime' | 'ua' | 'fallback';
  browserInfo?: BrowserInfo;
}
```

#### BrowserInfo

浏览器信息。

```typescript
interface BrowserInfo {
  name: BrowserName;
  version: string;
  isWebView: boolean;
  webkitVersion?: string;
  userAgent: string;
}
```

### 内置特性

库预配置了常见 Web 特性的支持：

- **WebP** - 图像格式支持
- **AVIF** - 下一代图像格式支持
- **CSS Grid** - CSS Grid 布局支持
- **CSS Flexbox** - CSS Flexbox 支持
- **CSS Custom Properties** - CSS 变量支持
- **Intersection Observer** - Intersection Observer API 支持
- **Resize Observer** - Resize Observer API 支持
- **Web Animations** - Web Animations API 支持
- **Service Workers** - Service Worker API 支持
- **WebGL** - WebGL 支持
- **WebGL2** - WebGL 2.0 支持
- **WebRTC** - WebRTC 支持
- **WebAssembly** - WebAssembly 支持
- **Aspect Ratio** - CSS aspect-ratio 属性支持

### 使用示例

#### 基础用法

```typescript
import { createFeatureDetector } from '@fly4react/feature-detector';

// 创建检测器
const detector = createFeatureDetector();

// 检测单个特性
const webpSupported = detector.check('webp');
console.log('WebP 支持:', webpSupported);

// 检测多个特性
const results = detector.detect(['webp', 'css-grid', 'webgl']);
console.log('检测结果:', results);
```

#### 自定义配置

```typescript
import { createFeatureDetector } from '@fly4react/feature-detector';

// 自定义特性配置
const customFeatures = {
  'my-feature': {
    browsers: {
      chrome: '90',
      firefox: '88',
      safari: '14'
    },
    runtimeTest: () => {
      return 'myFeature' in window;
    }
  }
};

// 自定义检测器配置
const detectorConfig = {
  useCache: true,
  enableRuntimeTest: true,
  browserPatterns: [
    {
      name: 'myCustomBrowser',
      pattern: /mybrowser\/([\d.]+)/i,
      versionIndex: 1
    }
  ]
};

const detector = createFeatureDetector(customFeatures, detectorConfig);
```

#### React 集成

```tsx
import { createFeatureDetector } from '@fly4react/feature-detector';
import { useEffect, useState } from 'react';

function FeatureAwareComponent() {
  const [features, setFeatures] = useState({});
  
  useEffect(() => {
    const detector = createFeatureDetector();
    const results = detector.detect(['webp', 'css-grid', 'webgl']);
    
    const featureMap = results.reduce((acc, result) => {
      acc[result.feature] = result.supported;
      return acc;
    }, {});
    
    setFeatures(featureMap);
  }, []);
  
  return (
    <div>
      {features.webp && <img src="image.webp" alt="WebP 图像" />}
      {features['css-grid'] && <div className="grid-layout">网格内容</div>}
    </div>
  );
}
```

### 最佳实践

1. 使用 `createFeatureDetector()` 创建检测器实例
2. 利用智能缓存机制避免重复检测
3. 结合运行时检测和 User Agent 分析
4. 为 WebView 环境配置特殊处理
5. 根据检测结果实现渐进增强
