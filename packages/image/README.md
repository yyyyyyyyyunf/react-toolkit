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
- 🔄 **Context-based Architecture** - Flexible preload queue management
- 📦 **Custom Queue Implementation** - Provide your own preload queue logic

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

### Image Preloading with Context-based Architecture

```tsx
import { 
  ImageLoader, 
  PreloadQueueProvider,
  ImagePreloadConsumer,
  BackgroundImage,
  ContentImage
} from '@fly4react/image';

// Custom preload queue implementation
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
        alt="Critical image"
      />
      
      {/* Or use individual components */}
      <ContentImage
        src="https://example.com/content.jpg"
        preloadConfig={{
          preload: true,
          priority: 'auto',
          ssr: true,
        }}
        alt="Content image"
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
        <h1>Background content</h1>
      </BackgroundImage>
      
      {/* Render preload links */}
      <ImagePreloadConsumer />
    </PreloadQueueProvider>
  );
}
```

### Advanced Context Configuration

The new Context-based architecture allows you to provide custom preload queue implementations for different scenarios:

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

// Memory-based queue (default)
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

// Request-scoped queue for SSR
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

// Custom queue with persistence
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

// Usage with different queue types
function App() {
  // Memory queue (default)
  const memoryQueue = new MemoryQueue();
  
  // Request-scoped queue for SSR
  const requestQueue = new RequestQueue(req.id);
  
  // Persistent queue
  const persistentQueue = new PersistentQueue(localStorage);

  return (
    <PreloadQueueProvider preloadQueue={memoryQueue}>
      <MyComponent />
    </PreloadQueueProvider>
  );
}
```

### Image URL Transformation

```tsx
import { ImageLoader } from '@fly4react/image';

function MyComponent() {
  // Custom transformation functions - implement according to your CDN provider
  const toWebP = (src: string) => src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const addSize = (width: number, height?: number) => (src: string) => 
    `${src}?w=${width}${height ? `&h=${height}` : ''}`;
  
  return (
    <div>
      {/* Convert to WebP format */}
      <ImageLoader 
        type="content"
        src="https://example.com/image.jpg"
        transform={toWebP}
        alt="WebP image"
      />
      
      {/* Add size parameters */}
      <ImageLoader 
        type="background"
        src="https://example.com/background.png"
        transform={addSize(800, 600)}
        style={{ width: '100%', height: '200px' }}
      >
        <h1>Resized Background</h1>
      </ImageLoader>
      
      {/* Combined transformations */}
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

// Render preload links in the root component
function App() {
  return (
    <html>
      <head>
        <title>My App</title>
        {/* Render preload links in head */}
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

// Method 1: Render in head
function HeadPreload() {
  return (
    <head>
      <title>My App</title>
      <ImagePreloadConsumer />
    </head>
  );
}

// Method 2: Render in body
function BodyPreload() {
  return (
    <body>
      <ImagePreloadConsumer />
      <div id="app">...</div>
    </body>
  );
}

// Method 3: Render anywhere
function CustomPreload() {
  return (
    <div>
      <ImagePreloadConsumer />
      <main>...</main>
    </div>
  );
}

// Method 4: Conditional rendering
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
          {/* Render preload links in head */}
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
  // Clear previous preload queue
  clearImagePreloadQueue();
  
  // Render React components
  const html = renderToString(<App />);
  
  // Return complete HTML
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
  type="content" | "background"  // Image type
  {...props}                     // Props for corresponding type
/>

// Using forwardRef
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
  type="content" | "background"  // Image type
  {...props}                     // Props for corresponding type
/>

// Using forwardRef
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
  ssr={boolean}                    // Whether to render in SSR
  compatibilityMode="modern" | "legacy"  // Compatibility mode, defaults to "modern"
/>
```

### Context Providers

#### PreloadQueueProvider

The main provider that combines all preload functionality.

```tsx
<PreloadQueueProvider preloadQueue={yourQueue}>
  {children}
</PreloadQueueProvider>
```

#### Individual Providers

For performance optimization, you can use individual providers:

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

Hook to add images to the preload queue.

```tsx
const addToPreloadQueue = useAddToPreloadQueue();

// Add image to queue
addToPreloadQueue({
  src: 'https://example.com/image.jpg',
  priority: 'high',
  type: 'image/jpeg',
  ssr: true,
});
```

#### useGetPreloadImages

Hook to get images from the preload queue.

```tsx
const getPreloadImages = useGetPreloadImages();

// Get all images in queue
const images = getPreloadImages();
```

#### useClearPreloadQueue

Hook to clear the preload queue.

```tsx
const clearPreloadQueue = useClearPreloadQueue();

// Clear all images from queue
clearPreloadQueue();
```

### Preload Configuration

```tsx
interface PreloadConfig {
  preload?: boolean;              // Whether to enable preloading
  priority?: 'high' | 'low' | 'auto'; // Preload priority
  type?: string;                  // Image type
  ssr?: boolean;                  // Whether to preload in SSR
  sizes?: string;                 // Image size information
  media?: string;                 // Media query
}
```



### Individual Components

#### BackgroundImage

A component for background images with preload support.

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
  <h1>Content over background</h1>
</BackgroundImage>
```

#### ContentImage

A component for content images with preload and lazy loading support.

```tsx
<ContentImage
  src="https://example.com/content.jpg"
  preloadConfig={{
    preload: true,
    priority: 'auto',
    ssr: true,
  }}
  lazyload={true}
  alt="Content image"
/>
```

## Migration from v1.x

If you're upgrading from v1.x, here are the key changes:

### Breaking Changes

1. **Removed compatibility modes**: The `compatibilityMode` prop is no longer supported
2. **New Context architecture**: Preload functionality now requires Context providers
3. **Renamed props**: `preload` prop is now `preloadConfig`
4. **New type names**: `ImagePreloadOptions` is now `PreloadConfig`

### Migration Steps

1. **Wrap your app with PreloadQueueProvider**:
```tsx
// Before
<MyApp />

// After
<PreloadQueueProvider preloadQueue={new MyPreloadQueue()}>
  <MyApp />
</PreloadQueueProvider>
```

2. **Update prop names**:
```tsx
// Before
<ImageLoader 
  preload={{
    priority: 'high',
    ssr: true,
  }}
/>

// After
<ImageLoader 
  preloadConfig={{
    preload: true,
    priority: 'high',
    ssr: true,
  }}
/>
```

3. **Update ImagePreloadConsumer**:
```tsx
// Before
<ImagePreloadConsumer compatibilityMode="legacy" />

// After
<ImagePreloadConsumer />
```

## License

MIT
