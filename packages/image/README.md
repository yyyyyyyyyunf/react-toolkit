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
- 🔄 **Compatibility Modes** - Support for ESM/CJS mixed environments
- 📦 **Cross-module Sharing** - Share preload data across different module formats

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
  // Add images to preload queue on server side
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

### Compatibility Modes for ESM/CJS Mixed Environments

When using `@fly4react/image` in mixed module environments (ESM + CJS), you can configure compatibility modes to ensure preload data is shared correctly across different module formats.

```tsx
import { ImageLoader, ImagePreloadConsumer } from '@fly4react/image';

function MyComponent() {
  return (
    <div>
      {/* Modern mode (default) - for pure ESM environments */}
      <ImageLoader 
        type="content"
        src="https://example.com/image1.jpg"
        preload={{
          ssr: true,
          compatibilityMode: "modern", // Use module-level queue for better performance
        }}
        alt="Modern mode image"
      />
      
      {/* Legacy mode - for ESM/CJS mixed environments */}
      <ImageLoader 
        type="content"
        src="https://example.com/image2.jpg"
        preload={{
          ssr: true,
          compatibilityMode: "legacy", // Use global queue for cross-module data sharing
        }}
        alt="Legacy mode image"
      />
    </div>
  );
}

// Configure compatibility mode in the root component
function App() {
  return (
    <html>
      <head>
        <title>My App</title>
        {/* Use legacy mode to ensure cross-module data sharing */}
        <ImagePreloadConsumer compatibilityMode="legacy" />
      </head>
      <body>
        <MyComponent />
      </body>
    </html>
  );
}
```

#### Compatibility Mode Details

- **`modern`** (default): Uses module-level queue, better performance for pure ESM environments
- **`legacy`**: Uses global queue, supports data sharing across ESM and CJS modules

```tsx
// In component library (ESM format)
import { ImageLoader } from '@fly4react/image';

export function MyImageComponent() {
  return (
    <ImageLoader 
      type="content"
      src="https://example.com/image.jpg"
      preload={{
        ssr: true,
        compatibilityMode: "legacy", // Ensure data sharing with CJS app
      }}
      alt="Shared image"
    />
  );
}

// In main application (CJS format)
const { ImagePreloadConsumer } = require('@fly4react/image');

function App() {
  return (
    <div>
      {/* Use legacy mode to ensure data sharing with ESM component library */}
      <ImagePreloadConsumer compatibilityMode="legacy" />
      <MyImageComponent />
    </div>
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

### useImagePreload

A hook for adding images to preload queue in SSR.

```tsx
const { isAdded } = useImagePreload({
  src: string,                    // Image URL
  type?: string,                  // Image type
  priority?: 'high' | 'low' | 'auto', // Preload priority
  ssr?: boolean,                  // Whether to preload in SSR
  sizes?: string,                 // Image size information
  media?: string,                 // Media query
  compatibilityMode?: 'modern' | 'legacy', // Compatibility mode, defaults to "modern"
});
```

### Preload Configuration

```tsx
interface ImagePreloadOptions {
  preload?: boolean;              // Whether to enable preloading
  priority?: 'high' | 'low' | 'auto'; // Preload priority
  type?: string;                  // Image type
  ssr?: boolean;                  // Whether to preload in SSR
  sizes?: string;                 // Image size information
  media?: string;                 // Media query
  compatibilityMode?: 'modern' | 'legacy'; // Compatibility mode, defaults to "modern"
}
```



### SSR Utilities

```tsx
import { 
  generateImagePreloadHTML,    // Generate preload HTML
  clearImagePreloadQueue,      // Clear preload queue
  getImagePreloadQueue,        // Get preload queue
  imagePreloadManager,         // Preload manager
} from '@fly4react/image';

// Compatibility mode related utility functions
import { 
  getPreloadQueueByMode,       // Get preload queue by compatibility mode
  addToPreloadQueue,          // Add image to preload queue
  isImageInPreloadQueue,      // Check if image is in preload queue
} from '@fly4react/image';

// Usage examples
const modernQueue = getPreloadQueueByMode('modern');    // Get module-level queue
const legacyQueue = getPreloadQueueByMode('legacy');    // Get global queue

// Add image to specified mode queue
addToPreloadQueue({
  src: 'https://example.com/image.jpg',
  ssr: true,
  compatibilityMode: 'legacy', // Use legacy mode
});

// Check if image is in specified mode queue
const isInQueue = isImageInPreloadQueue('https://example.com/image.jpg', 'legacy');
```

## Compatibility Modes

The `@fly4react/image` package supports two compatibility modes to handle different module environments:

### Modern Mode (Default)

- **Use case**: Pure ESM environments
- **Performance**: Better performance with module-level queue
- **Data isolation**: Each module has its own preload queue
- **Recommended for**: New projects using pure ESM

```tsx
// Modern mode usage (default)
<ImageLoader 
  type="content"
  src="https://example.com/image.jpg"
  preload={{ ssr: true }} // compatibilityMode defaults to "modern"
/>
```

### Legacy Mode

- **Use case**: Mixed ESM/CJS environments
- **Performance**: Slightly lower due to global object access
- **Data sharing**: Preload data is shared across all modules
- **Recommended for**: Projects mixing ESM and CJS modules

```tsx
// Legacy mode usage
<ImageLoader 
  type="content"
  src="https://example.com/image.jpg"
  preload={{ 
    ssr: true, 
    compatibilityMode: "legacy" 
  }}
/>
```

### When to Use Each Mode

| Scenario | Recommended Mode | Reason |
|----------|------------------|---------|
| Pure ESM project | `modern` | Better performance, cleaner architecture |
| ESM component library + CJS app | `legacy` | Ensures data sharing across module formats |
| CJS project | `legacy` | Global queue works better in CJS environment |
| Mixed module formats | `legacy` | Prevents data isolation issues |

### Migration Guide

If you're upgrading from an older version and experiencing preload data sharing issues:

1. **Identify the issue**: Check if your app mixes ESM and CJS modules
2. **Switch to legacy mode**: Add `compatibilityMode: "legacy"` to your preload configurations
3. **Test thoroughly**: Ensure preload data is shared correctly across modules
4. **Consider refactoring**: For long-term maintainability, consider migrating to pure ESM

```tsx
// Before (potential data sharing issues)
<ImagePreloadConsumer />

// After (explicit legacy mode)
<ImagePreloadConsumer compatibilityMode="legacy" />
```

## License

MIT
