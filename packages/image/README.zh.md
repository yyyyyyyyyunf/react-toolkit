# @fly4react/image

为 React 应用程序提供图片优化和懒加载工具，支持 SSR。

> 📖 **English Documentation**: [View English Version](README.md)

## 安装

```bash
npm install @fly4react/image
# 或
yarn add @fly4react/image
# 或
pnpm add @fly4react/image
```

## 特性

- 🖼️ **图片懒加载** - 仅在图片进入视口时加载
- 🚀 **性能优化** - 减少初始页面加载时间
- 📱 **响应式图片** - 支持不同屏幕尺寸
- 🎯 **Intersection Observer** - 现代浏览器 API 高效检测
- 🔧 **TypeScript 支持** - 完整的类型安全
- 🌐 **SSR 支持** - 服务端渲染与预加载优化
- ⚡ **图片预加载** - 预加载关键图片提升性能
- 🔄 **基于 Context 的架构** - 灵活的预加载队列管理
- 📦 **自定义队列实现** - 提供你自己的预加载队列逻辑

## 使用方法

### 基础图片加载

```tsx
import { ImageLoader } from '@fly4react/image';

function MyComponent() {
  return (
    <div>
      {/* 内容图片 */}
      <ImageLoader 
        type="content"
        src="https://example.com/image.jpg" 
        alt="我的图片"
        lazyload={true}
      />
      
      {/* 背景图片 */}
      <ImageLoader 
        type="background"
        src="https://example.com/background.jpg"
        style={{ width: '100%', height: '200px' }}
      >
        <h1>背景上的内容</h1>
      </ImageLoader>
    </div>
  );
}
```

### 基于 Context 架构的图片预加载

```tsx
import { 
  ImageLoader, 
  PreloadQueueProvider,
  ImagePreloadConsumer,
  BackgroundImage,
  ContentImage
} from '@fly4react/image';

// 自定义预加载队列实现
class MyPreloadQueue {
  private images = [];

  addImage(options) {
    this.images.push(options);
  }

  getImages() {
    return this.images;
  }

  clearImages() {
    this.images.length = 0;
  }
}

function MyComponent() {
  return (
    <PreloadQueueProvider preloadQueue={new MyPreloadQueue()}>
      <ImageLoader 
        type="content"
        src="https://example.com/critical-image.jpg"
        preloadConfig={{
          preload: true,
          priority: 'high',
          type: 'image/jpeg',
          ssr: true,
        }}
        alt="关键图片"
      />
      
      {/* 或使用独立组件 */}
      <ContentImage
        src="https://example.com/content.jpg"
        preloadConfig={{
          preload: true,
          priority: 'auto',
          ssr: true,
        }}
        alt="内容图片"
      />
      
      <BackgroundImage
        src="https://example.com/background.jpg"
        preloadConfig={{
          preload: true,
          priority: 'low',
          ssr: true,
        }}
        style={{ width: '100%', height: '200px' }}
      >
        <h1>背景内容</h1>
      </BackgroundImage>
      
      {/* 渲染预加载链接 */}
      <ImagePreloadConsumer />
    </PreloadQueueProvider>
  );
}
```

### 高级 Context 配置

新的基于 Context 的架构允许你为不同场景提供自定义预加载队列实现：

```tsx
import { 
  PreloadQueueProvider,
  AddToPreloadProvider,
  GetPreloadImagesProvider,
  ClearPreloadProvider,
  useAddToPreloadQueue,
  useGetPreloadImages,
  useClearPreloadQueue
} from '@fly4react/image';

// 基于内存的队列（默认）
class MemoryQueue {
  private images = [];

  addImage(options) {
    this.images.push(options);
  }

  getImages() {
    return [...this.images];
  }

  clearImages() {
    this.images.length = 0;
  }
}

// 请求作用域队列（用于 SSR）
class RequestQueue {
  constructor(requestId) {
    this.requestId = requestId;
    this.images = [];
  }

  addImage(options) {
    this.images.push({ ...options, requestId: this.requestId });
  }

  getImages() {
    return this.images.filter(img => img.requestId === this.requestId);
  }

  clearImages() {
    this.images = this.images.filter(img => img.requestId !== this.requestId);
  }
}

// 带持久化的自定义队列
class PersistentQueue {
  constructor(storage) {
    this.storage = storage;
  }

  addImage(options) {
    const images = this.storage.getItem('preloadImages') || [];
    images.push(options);
    this.storage.setItem('preloadImages', images);
  }

  getImages() {
    return JSON.parse(this.storage.getItem('preloadImages') || '[]');
  }

  clearImages() {
    this.storage.removeItem('preloadImages');
  }
}

// 使用不同队列类型
function App() {
  // 内存队列（默认）
  const memoryQueue = new MemoryQueue();
  
  // 请求作用域队列（用于 SSR）
  const requestQueue = new RequestQueue(req.id);
  
  // 持久化队列
  const persistentQueue = new PersistentQueue(localStorage);

  return (
    <PreloadQueueProvider preloadQueue={memoryQueue}>
      <MyComponent />
    </PreloadQueueProvider>
  );
}
```

### 图片 URL 转换

```tsx
import { ImageLoader } from '@fly4react/image';

function MyComponent() {
  // 自定义转换函数 - 根据你的 CDN 提供商实现
  const toWebP = (src: string) => src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const addSize = (width: number, height?: number) => (src: string) => 
    `${src}?w=${width}${height ? `&h=${height}` : ''}`;
  
  return (
    <div>
      {/* 转换为 WebP 格式 */}
      <ImageLoader 
        type="content"
        src="https://example.com/image.jpg"
        transform={toWebP}
        alt="WebP 图片"
      />
      
      {/* 添加尺寸参数 */}
      <ImageLoader 
        type="background"
        src="https://example.com/background.png"
        transform={addSize(800, 600)}
        style={{ width: '100%', height: '200px' }}
      >
        <h1>调整尺寸的背景</h1>
      </ImageLoader>
      
      {/* 组合转换 */}
      <ImageLoader 
        type="content"
        src="https://example.com/image.jpg"
        transform={(src) => addSize(800)(toWebP(src))}
        alt="转换后的图片"
      />
    </div>
  );
}
```

### 灵活的预加载渲染

```tsx
import { ImagePreloadConsumer } from '@fly4react/image';

// 方法 1: 在 head 中渲染
function HeadPreload() {
  return (
    <head>
      <title>我的应用</title>
      <ImagePreloadConsumer />
    </head>
  );
}

// 方法 2: 在 body 中渲染
function BodyPreload() {
  return (
    <body>
      <ImagePreloadConsumer />
      <div id="app">...</div>
    </body>
  );
}

// 方法 3: 在任何地方渲染
function CustomPreload() {
  return (
    <div>
      <ImagePreloadConsumer />
      <main>...</main>
    </div>
  );
}

// 方法 4: 条件渲染
function ConditionalPreload() {
  return (
    <div>
      {process.env.NODE_ENV === 'production' && (
        <ImagePreloadConsumer />
      )}
      <main>...</main>
    </div>
  );
}
```

### Next.js 集成

```tsx
// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ImagePreloadConsumer } from '@fly4react/image';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* 在 head 中渲染预加载链接 */}
          <ImagePreloadConsumer />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

## API

### ImageLoader

根据 `type` 属性渲染不同类型图片的组件。

```tsx
<ImageLoader 
  type="content" | "background"  // 图片类型
  {...props}                     // 对应类型的属性
/>

// 使用 forwardRef
const imageRef = useRef<HTMLImageElement | HTMLDivElement>(null);

<ImageLoader 
  ref={imageRef}
  type="content"
  src="https://example.com/image.jpg"
  alt="我的图片"
/>
```

### ImagePreloadConsumer

在 SSR 环境中渲染预加载 `<link>` 标签的组件。

```tsx
<ImagePreloadConsumer 
  ssr={boolean}                    // 是否在 SSR 中渲染
/>
```

### Context Providers

#### PreloadQueueProvider

组合所有预加载功能的主提供者。

```tsx
<PreloadQueueProvider preloadQueue={yourQueue}>
  {children}
</PreloadQueueProvider>
```

#### 独立提供者

为了性能优化，你可以使用独立的提供者：

```tsx
<AddToPreloadProvider addImage={addImageFunction}>
  <GetPreloadImagesProvider getImages={getImagesFunction}>
    <ClearPreloadProvider clearImages={clearImagesFunction}>
      {children}
    </ClearPreloadProvider>
  </GetPreloadImagesProvider>
</AddToPreloadProvider>
```

### Hooks

#### useAddToPreloadQueue

用于向预加载队列添加图片的 Hook。

```tsx
const addToPreloadQueue = useAddToPreloadQueue();

// 向队列添加图片
addToPreloadQueue({
  src: 'https://example.com/image.jpg',
  priority: 'high',
  type: 'image/jpeg',
  ssr: true,
});
```

#### useGetPreloadImages

用于从预加载队列获取图片的 Hook。

```tsx
const getPreloadImages = useGetPreloadImages();

// 获取队列中的所有图片
const images = getPreloadImages();
```

#### useClearPreloadQueue

用于清空预加载队列的 Hook。

```tsx
const clearPreloadQueue = useClearPreloadQueue();

// 清空队列中的所有图片
clearPreloadQueue();
```

### 预加载配置

```tsx
interface PreloadConfig {
  preload?: boolean;              // 是否启用预加载
  priority?: 'high' | 'low' | 'auto'; // 预加载优先级
  type?: string;                  // 图片类型
  ssr?: boolean;                  // 是否在 SSR 中预加载
  sizes?: string;                 // 图片尺寸信息
  media?: string;                 // 媒体查询
}
```

### 独立组件

#### BackgroundImage

支持预加载的背景图片组件。

```tsx
<BackgroundImage
  src="https://example.com/background.jpg"
  preloadConfig={{
    preload: true,
    priority: 'low',
    ssr: true,
  }}
  style={{ width: '100%', height: '200px' }}
>
  <h1>背景上的内容</h1>
</BackgroundImage>
```

#### ContentImage

支持预加载和懒加载的内容图片组件。

```tsx
<ContentImage
  src="https://example.com/content.jpg"
  preloadConfig={{
    preload: true,
    priority: 'auto',
    ssr: true,
  }}
  lazyload={true}
  alt="内容图片"
/>
```

## 从 v1.x 迁移

如果你正在从 v1.x 升级，以下是主要变更：

### 破坏性变更

1. **移除了兼容模式**：不再支持 `compatibilityMode` 属性
2. **新的 Context 架构**：预加载功能现在需要 Context 提供者
3. **重命名属性**：`preload` 属性现在是 `preloadConfig`
4. **新的类型名称**：`ImagePreloadOptions` 现在是 `PreloadConfig`

### 迁移步骤

1. **用 PreloadQueueProvider 包装你的应用**：
```tsx
// 之前
<MyApp />

// 之后
<PreloadQueueProvider preloadQueue={new MyPreloadQueue()}>
  <MyApp />
</PreloadQueueProvider>
```

2. **更新属性名称**：
```tsx
// 之前
<ImageLoader 
  preload={{
    priority: 'high',
    ssr: true,
  }}
/>

// 之后
<ImageLoader 
  preloadConfig={{
    preload: true,
    priority: 'high',
    ssr: true,
  }}
/>
```

3. **更新 ImagePreloadConsumer**：
```tsx
// 之前
<ImagePreloadConsumer compatibilityMode="legacy" />

// 之后
<ImagePreloadConsumer />
```

## 许可证

MIT
