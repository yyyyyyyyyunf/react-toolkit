# @fly4react/feature-detector

A pure JavaScript library for browser feature detection with comprehensive browser support and intelligent caching.

## Features

- 🚀 **Pure JavaScript** - No React dependencies, works in any JavaScript environment
- 🌐 **Comprehensive Browser Support** - Supports all major browsers including WebView environments
- 🧠 **Smart Caching** - Intelligent caching system for optimal performance
- 🔧 **Highly Configurable** - Customizable browser patterns and feature configurations
- 📱 **WebView Support** - Special handling for iOS Safari WebView and Android Chrome WebView
- 🎯 **Runtime Detection** - Real-time feature detection with fallback to User Agent analysis
- 📊 **Detailed Results** - Rich detection results with confidence levels and detection methods

## Installation

```bash
npm install @fly4react/feature-detector
# or
yarn add @fly4react/feature-detector
# or
pnpm add @fly4react/feature-detector
```

## Quick Start

### Basic Usage

```typescript
import { createFeatureDetector } from '@fly4react/feature-detector';

// Create a detector with default configurations
const detector = createFeatureDetector();

// Detect a single feature
const webpSupported = detector.check('webp');
console.log('WebP support:', webpSupported); // true/false

// Detect multiple features
const results = detector.detect(['webp', 'avif', 'css-grid']);
console.log('Detection results:', results);
```

### Advanced Configuration

```typescript
import { createFeatureDetector } from '@fly4react/feature-detector';

// Custom browser patterns
const customBrowserPatterns = [
  {
    name: 'myCustomBrowser',
    pattern: /mybrowser\/([\d.]+)/i,
    versionIndex: 1
  }
];

// Custom feature configurations
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

const detector = createFeatureDetector(customFeatures, {
  browserPatterns: customBrowserPatterns,
  useCache: true,
  enableRuntimeTest: true
});
```

## API Reference

### Core Classes

#### `FeatureDetector`

The main class for feature detection.

```typescript
class FeatureDetector {
  constructor(config: FeatureConfigMap, detectorConfig: FeatureDetectorOptions)
  
  // Detect single feature
  check(feature: string): boolean
  
  // Detect multiple features
  detect(features: string[]): DetectionResult[]
  
  // Register new feature
  registerFeature(name: string, config: FeatureConfig): void
  
  // Remove feature
  removeFeature(name: string): void
  
  // Clear cache
  clearCache(): void
  
  // Get detector info
  getStatus(): DetectorInfo
}
```

#### `createFeatureDetector`

Factory function to create a detector instance.

```typescript
function createFeatureDetector(
  config?: FeatureConfigMap,
  detectorConfig?: FeatureDetectorOptions
): FeatureDetector
```

### Types

#### `FeatureConfig`

Configuration for a single feature.

```typescript
interface FeatureConfig {
  /** Browser version requirements */
  browsers: BrowserSupport;
  /** Runtime test function */
  runtimeTest?: () => boolean;
}
```

#### `BrowserSupport`

Browser version requirements.

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

#### `DetectionResult`

Result of feature detection.

```typescript
interface DetectionResult {
  feature: string;
  supported: boolean;
  confidence: 'high' | 'medium' | 'low';
  method: 'runtime' | 'ua' | 'fallback';
  browserInfo?: BrowserInfo;
}
```

## Browser Support

### Desktop Browsers

- **Chrome** - Full support with version detection
- **Firefox** - Full support with version detection  
- **Safari** - Full support with version detection
- **Edge** - Full support with version detection
- **Opera** - Full support with version detection
- **Samsung Internet** - Full support with version detection

### Mobile & WebView

- **iOS Safari** - Full support with WebKit version mapping
- **Android Chrome** - Full support with version detection
- **iOS WebView** - Special handling for WebKit version detection
- **Android WebView** - Special handling for Chrome WebView detection

## Built-in Features

The library comes with pre-configured support for common web features:

- **WebP** - Image format support
- **AVIF** - Next-gen image format support
- **CSS Grid** - CSS Grid Layout support
- **CSS Flexbox** - CSS Flexbox support
- **CSS Custom Properties** - CSS Variables support
- **Intersection Observer** - Intersection Observer API support
- **Resize Observer** - Resize Observer API support
- **Web Animations** - Web Animations API support
- **Service Workers** - Service Worker API support
- **WebGL** - WebGL support
- **WebGL2** - WebGL 2.0 support
- **WebRTC** - WebRTC support
- **WebAssembly** - WebAssembly support
- **Aspect Ratio** - CSS aspect-ratio property support

## Examples

### Feature Detection in React

```typescript
import { createFeatureDetector } from '@fly4react/feature-detector';
import { useEffect, useState } from 'react';

function MyComponent() {
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
      {features.webp && <img src="image.webp" alt="WebP image" />}
      {features['css-grid'] && <div className="grid-layout">Grid content</div>}
    </div>
  );
}
```

### Progressive Enhancement

```typescript
import { createFeatureDetector } from '@fly4react/feature-detector';

const detector = createFeatureDetector();

// Check for modern features
const hasWebP = detector.check('webp');
const hasCSSGrid = detector.check('css-grid');
const hasWebGL = detector.check('webgl');

// Apply progressive enhancement
if (hasWebP) {
  // Use WebP images
  document.body.classList.add('webp-supported');
}

if (hasCSSGrid) {
  // Use CSS Grid layouts
  document.body.classList.add('grid-supported');
}

if (hasWebGL) {
  // Enable WebGL features
  document.body.classList.add('webgl-supported');
}
```

### Custom Feature Detection

```typescript
import { createFeatureDetector } from '@fly4react/feature-detector';

// Define custom feature
const customFeatures = {
  'my-awesome-feature': {
    browsers: {
      chrome: '90',
      firefox: '88',
      safari: '14'
    },
    runtimeTest: () => {
      // Custom runtime detection logic
      return 'myAwesomeFeature' in window && 
             typeof window.myAwesomeFeature === 'function';
    }
  }
};

const detector = createFeatureDetector(customFeatures);
const isSupported = detector.check('my-awesome-feature');
```

## Performance

The library is optimized for performance with:

- **Intelligent Caching** - Results are cached to avoid repeated detection
- **Lazy Loading** - Features are only detected when requested
- **Minimal Overhead** - Lightweight implementation with minimal bundle size
- **Smart Fallbacks** - Graceful degradation when runtime detection fails

## Browser Compatibility

- **Modern Browsers** - Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Legacy Browsers** - Internet Explorer 11+ (with polyfills)
- **Mobile Browsers** - iOS Safari 12+, Android Chrome 60+
- **WebView Environments** - iOS WKWebView, Android WebView

## Contributing

Contributions are welcome! Please read our [Contributing Guide](../../CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](../../LICENSE) file for details.

## Changelog

See [CHANGELOG.md](../../CHANGELOG.md) for a list of changes.

## Support

- 📖 [Documentation](../../docs/)
- 🐛 [Issue Tracker](../../issues)
- 💬 [Discussions](../../discussions)
