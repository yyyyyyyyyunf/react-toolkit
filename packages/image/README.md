# @fly4react/image

Image optimization and lazy loading utilities for React applications with SSR support.

## Installation

```bash
npm install @fly4react/image
# or
yarn add @fly4react/image
# or
pnpm add @fly4react/image
```

## Features

- 🖼️ **Image lazy loading** - Load images only when they enter the viewport
- 🚀 **Performance optimization** - Reduce initial page load time
- 📱 **Responsive images** - Support for different screen sizes
- 🎯 **Intersection Observer** - Modern browser API for efficient detection
- 🔧 **TypeScript support** - Full type safety
- 🌐 **SSR Support** - Server-side rendering with preload optimization
- ⚡ **Image Preloading** - Preload critical images for better performance

## Usage

### Basic Image Loading

```tsx
import { ImageLoader } from '@fly4react/image';

function MyComponent() {
  return (
    <div>
      {/* Content Image */}
      <ImageLoader 
        type="content"
        src="https://example.com/image.jpg" 
        alt="My image"
        lazyload={true}
      />
      
      {/* Background Image */}
      <ImageLoader 
        type="background"
        src="https://example.com/background.jpg"
        style={{ width: '100%', height: '200px' }}
      >
        <h1>Content over background</h1>
      </ImageLoader>
    </div>
  );
}
```

### Image Preloading with SSR

```tsx
import { 
  ImageLoader, 
  useImagePreload, 
  ImagePreloadConsumer 
} from '@fly4react/image';

function MyComponent() {
  // 在服务端将图片添加到预加载队列
  useImagePreload({
    src: 'https://example.com/critical-image.jpg',
    priority: 'high',
    type: 'image/jpeg',
  });

  return (
    <ImageLoader 
      type="content"
      src="https://example.com/critical-image.jpg"
      preload={{
        priority: 'high',
        type: 'image/jpeg',
        ssr: true,
      }}
      alt="Critical image"
    />
  );
}
```

### Image URL Transformation

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
        alt="WebP image"
      />
      
      {/* 添加尺寸参数 */}
      <ImageLoader 
        type="background"
        src="https://example.com/background.png"
        transform={addSize(800, 600)}
        style={{ width: '100%', height: '200px' }}
      >
        <h1>Resized Background</h1>
      </ImageLoader>
      
      {/* 组合转换 */}
      <ImageLoader 
        type="content"
        src="https://example.com/image.jpg"
        transform={(src) => addSize(800)(toWebP(src))}
        alt="Transformed image"
      />
    </div>
  );
}
```

// 在应用根组件中渲染预加载链接
function App() {
  return (
    <html>
      <head>
        <title>My App</title>
        {/* 在 head 中渲染预加载链接 */}
        <ImagePreloadConsumer />
      </head>
      <body>
        <MyComponent />
      </body>
    </html>
  );
}
```

### Flexible Preload Rendering

```tsx
import { ImagePreloadConsumer } from '@fly4react/image';

// 方式 1: 在 head 中渲染
function HeadPreload() {
  return (
    <head>
      <title>My App</title>
      <ImagePreloadConsumer />
    </head>
  );
}

// 方式 2: 在 body 中渲染
function BodyPreload() {
  return (
    <body>
      <ImagePreloadConsumer />
      <div id="app">...</div>
    </body>
  );
}

// 方式 3: 在任意位置渲染
function CustomPreload() {
  return (
    <div>
      <ImagePreloadConsumer />
      <main>...</main>
    </div>
  );
}

// 方式 4: 条件渲染
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

### Next.js Integration

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

### Express.js Integration

```tsx
import express from 'express';
import { clearImagePreloadQueue } from '@fly4react/image';

const app = express();

app.get('/', (req, res) => {
  // 清空之前的预加载队列
  clearImagePreloadQueue();
  
  // 渲染 React 组件
  const html = renderToString(<App />);
  
  // 返回完整的 HTML
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>My App</title>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `);
});
```

## API

### ImageLoader

A component that renders different image types based on the `type` prop.

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
  alt="My image"
/>
```

### ImageLoader

A component that renders different image types based on the `type` prop.

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
  alt="My image"
/>
```

### ImagePreloadConsumer

A component that renders preload `<link>` tags in SSR environment.

```tsx
<ImagePreloadConsumer 
  ssr={boolean}          // 是否在 SSR 时渲染
/>
```

### useImagePreload

A hook for adding images to preload queue in SSR.

```tsx
const { isAdded } = useImagePreload({
  src: string,                    // 图片 URL
  type?: string,                  // 图片类型
  priority?: 'high' | 'low' | 'auto', // 预加载优先级
  ssr?: boolean,                  // 是否在 SSR 时预加载
  sizes?: string,                 // 图片尺寸信息
  media?: string,                 // 媒体查询
});
```

### Preload Configuration

```tsx
interface ImagePreloadOptions {
  preload?: boolean;              // 是否启用预加载
  priority?: 'high' | 'low' | 'auto'; // 预加载优先级
  type?: string;                  // 图片类型
  ssr?: boolean;                  // 是否在 SSR 时预加载
  sizes?: string;                 // 图片尺寸信息
  media?: string;                 // 媒体查询
}
```



### SSR Utilities

```tsx
import { 
  generateImagePreloadHTML,    // 生成预加载 HTML
  clearImagePreloadQueue,      // 清空预加载队列
  getImagePreloadQueue,        // 获取预加载队列
  imagePreloadManager,         // 预加载管理器
} from '@fly4react/image';
```

## License

MIT
