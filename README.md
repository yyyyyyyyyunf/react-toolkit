# React Toolkit

[![CI](https://github.com/yyyyyyyyyunf/react-toolkit/workflows/CI/badge.svg)](https://github.com/yyyyyyyyyunf/react-toolkit/actions)
[![License](https://img.shields.io/npm/l/@fly4react/observer.svg)](https://github.com/yyyyyyyyyunf/react-toolkit/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-16.8-61dafb.svg)](https://reactjs.org/)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/yyyyyyyyyunf/react-toolkit)

> 📖 **中文文档**: [查看中文版本](README.zh.md)

### 📦 Package Information

| Package | Version | Downloads | Size |
|---------|---------|-----------|------|
| [@fly4react/observer](https://www.npmjs.com/package/@fly4react/observer) | [![npm version](https://img.shields.io/npm/v/@fly4react/observer.svg?label=version)](https://www.npmjs.com/package/@fly4react/observer) | [![npm downloads](https://img.shields.io/npm/dm/@fly4react/observer.svg?label=downloads)](https://www.npmjs.com/package/@fly4react/observer) | [![npm bundle size](https://img.shields.io/bundlephobia/minzip/@fly4react/observer.svg?label=size)](https://bundlephobia.com/package/@fly4react/observer) |
| [@fly4react/memo](https://www.npmjs.com/package/@fly4react/memo) | [![npm version](https://img.shields.io/npm/v/@fly4react/memo.svg?label=version)](https://www.npmjs.com/package/@fly4react/memo) | [![npm downloads](https://img.shields.io/npm/dm/@fly4react/memo.svg?label=downloads)](https://www.npmjs.com/package/@fly4react/memo) | [![npm bundle size](https://img.shields.io/bundlephobia/minzip/@fly4react/memo.svg?label=size)](https://bundlephobia.com/package/@fly4react/memo) |
| [@fly4react/image](https://www.npmjs.com/package/@fly4react/image) | [![npm version](https://img.shields.io/npm/v/@fly4react/image.svg?label=version)](https://www.npmjs.com/package/@fly4react/image) | [![npm downloads](https://img.shields.io/npm/dm/@fly4react/image.svg?label=downloads)](https://www.npmjs.com/package/@fly4react/image) | [![npm bundle size](https://img.shields.io/bundlephobia/minzip/@fly4react/image.svg?label=size)](https://bundlephobia.com/package/@fly4react/image) |
| [@fly4react/feature-detector](https://www.npmjs.com/package/@fly4react/feature-detector) | [![npm version](https://img.shields.io/npm/v/@fly4react/feature-detector.svg?label=version)](https://www.npmjs.com/package/@fly4react/feature-detector) | [![npm downloads](https://img.shields.io/npm/dm/@fly4react/feature-detector.svg?label=downloads)](https://www.npmjs.com/package/@fly4react/feature-detector) | [![npm bundle size](https://img.shields.io/bundlephobia/minzip/@fly4react/feature-detector.svg?label=size)](https://bundlephobia.com/package/@fly4react/feature-detector) |

This is a React Toolkit monorepo containing multiple high-performance React utility libraries.

## ✨ Features

- 🚀 **High Performance**: Optimized for performance with minimal bundle size
- 🎯 **TypeScript Support**: Full TypeScript support with comprehensive type definitions
- 📱 **Modern React**: Built for React 16.8+ with hooks support
- 🔧 **Developer Experience**: Excellent developer experience with comprehensive documentation
- 🌐 **Browser Compatibility**: Wide browser compatibility with automatic fallbacks
- 📦 **Modular Design**: Independent packages for different use cases
- 🧪 **Well Tested**: Comprehensive test coverage
- 📚 **Rich Documentation**: Detailed documentation with examples

## 📦 Packages

### @fly4react/observer

Advanced intersection observer and element position tracking utilities.

**Key Features:**
- Precise position tracking
- Performance optimization
- Smart position sync
- Scroll direction detection
- Animation triggers
- Viewport detection

[📖 Documentation](packages/observer/README.md) | [中文文档](packages/observer/README.zh.md)

### @fly4react/memo

Advanced React memoization component tool with flexible props comparison strategies.

**Key Features:**
- High performance memoization
- Flexible comparison strategies
- Easy configuration
- Lightweight bundle
- TypeScript support

[📖 Documentation](packages/memo/README.md) | [中文文档](packages/memo/README.zh.md)

### @fly4react/image

Image optimization and lazy loading utilities with SSR support.

**Key Features:**
- Image lazy loading
- Performance optimization
- Responsive images
- SSR support
- Image preloading
- Context-based architecture

[📖 Documentation](packages/image/README.md) | [中文文档](packages/image/README.zh.md)

### @fly4react/feature-detector

Pure JavaScript browser feature detection library with comprehensive browser support and intelligent caching.

**Key Features:**
- Pure JavaScript (no React dependencies)
- Comprehensive browser support
- Smart caching system
- WebView environment support
- Runtime feature detection
- Highly configurable

[📖 Documentation](packages/feature-detector/README.md) | [中文文档](packages/feature-detector/README.zh.md)

## 🚀 Quick Start

### Installation

```bash
# Install all packages
npm install @fly4react/observer @fly4react/memo @fly4react/image @fly4react/feature-detector

# Or install individually
npm install @fly4react/observer
npm install @fly4react/memo
npm install @fly4react/image
npm install @fly4react/feature-detector
```

### Basic Usage

```tsx
import { useIntersectionObserver } from '@fly4react/observer';
import createMemoComponent from '@fly4react/memo';
import { ImageLoader, PreloadQueueProvider } from '@fly4react/image';
import { createFeatureDetector } from '@fly4react/feature-detector';
import { useRef, useState } from 'react';

// Intersection Observer
function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useIntersectionObserver(
    ref,
    (entry) => {
      setIsVisible(entry.isIntersecting);
    },
    { threshold: 0.1 }
  );

  return <div ref={ref}>{isVisible ? 'Visible!' : 'Not visible'}</div>;
}

// Memoization
const MemoComponent = createMemoComponent(({ data }) => {
  return <div>{data.value}</div>;
});

// Image Loading
function App() {
  return (
    <PreloadQueueProvider value={new MyPreloadQueue()}>
      <ImageLoader 
        type="content"
        src="https://example.com/image.jpg"
        preloadConfig={{
          preload: true,
          priority: 'high',
          ssr: true,
        }}
        alt="My image"
      />
    </PreloadQueueProvider>
  );
}

// Feature Detection
function FeatureAwareComponent() {
  const detector = createFeatureDetector();
  const webpSupported = detector.check('webp');
  const cssGridSupported = detector.check('css-grid');
  
  return (
    <div>
      {webpSupported && <img src="image.webp" alt="WebP image" />}
      {cssGridSupported && <div className="grid-layout">Grid content</div>}
    </div>
  );
}
```

## 🛠️ Development

### Prerequisites

- Node.js 16+
- pnpm (recommended) or npm/yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/yyyyyyyyyunf/react-toolkit.git
cd react-toolkit

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Run examples
pnpm dev
```

### Scripts

```bash
# Build all packages
pnpm build

# Run tests
pnpm test

# Run linting
pnpm lint

# Run examples
pnpm dev

# Release packages
pnpm release
```

## 📚 Documentation

Each package has comprehensive documentation:

- [@fly4react/observer Documentation](packages/observer/README.md)
- [@fly4react/memo Documentation](packages/memo/README.md)
- [@fly4react/image Documentation](packages/image/README.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run tests and linting
6. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Intersection Observer API
- All contributors and users

## 📞 Support

- 📖 [Documentation](packages/observer/README.md)
- 🐛 [Issues](https://github.com/yyyyyyyyyunf/react-toolkit/issues)
- 💬 [Discussions](https://github.com/yyyyyyyyyunf/react-toolkit/discussions)
