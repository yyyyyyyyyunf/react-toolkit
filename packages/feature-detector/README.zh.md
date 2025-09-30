# @fly4react/feature-detector

一个纯 JavaScript 浏览器特性检测库，具有全面的浏览器支持和智能缓存功能。

## 特性

- 🚀 **纯 JavaScript** - 无 React 依赖，可在任何 JavaScript 环境中使用
- 🌐 **全面浏览器支持** - 支持所有主流浏览器，包括 WebView 环境
- 🧠 **智能缓存** - 智能缓存系统，提供最佳性能
- 🔧 **高度可配置** - 可自定义浏览器模式和特性配置
- 📱 **WebView 支持** - 特别处理 iOS Safari WebView 和 Android Chrome WebView
- 🎯 **运行时检测** - 实时特性检测，支持 User Agent 分析回退
- 📊 **详细结果** - 丰富的检测结果，包含置信度和检测方法

## 安装

```bash
npm install @fly4react/feature-detector
# 或
yarn add @fly4react/feature-detector
# 或
pnpm add @fly4react/feature-detector
```

## 快速开始

### 基础用法

```typescript
import { createFeatureDetector } from '@fly4react/feature-detector';

// 使用默认配置创建检测器
const detector = createFeatureDetector();

// 检测单个特性
const webpSupported = detector.check('webp');
console.log('WebP 支持:', webpSupported); // true/false

// 检测多个特性
const results = detector.detect(['webp', 'avif', 'css-grid']);
console.log('检测结果:', results);
```

### 高级配置

```typescript
import { createFeatureDetector } from '@fly4react/feature-detector';

// 自定义浏览器模式
const customBrowserPatterns = [
  {
    name: 'myCustomBrowser',
    pattern: /mybrowser\/([\d.]+)/i,
    versionIndex: 1
  }
];

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

const detector = createFeatureDetector(customFeatures, {
  browserPatterns: customBrowserPatterns,
  useCache: true,
  enableRuntimeTest: true
});
```

## API 参考

### 核心类

#### `FeatureDetector`

特性检测的主要类。

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
  
  // 获取检测器信息
  getStatus(): DetectorInfo
}
```

#### `createFeatureDetector`

创建检测器实例的工厂函数。

```typescript
function createFeatureDetector(
  config?: FeatureConfigMap,
  detectorConfig?: FeatureDetectorOptions
): FeatureDetector
```

### 类型定义

#### `FeatureConfig`

单个特性的配置。

```typescript
interface FeatureConfig {
  /** 浏览器版本要求 */
  browsers: BrowserSupport;
  /** 运行时测试函数 */
  runtimeTest?: () => boolean;
}
```

#### `BrowserSupport`

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

#### `DetectionResult`

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

## 浏览器支持

### 桌面浏览器

- **Chrome** - 完整支持，包含版本检测
- **Firefox** - 完整支持，包含版本检测
- **Safari** - 完整支持，包含版本检测
- **Edge** - 完整支持，包含版本检测
- **Opera** - 完整支持，包含版本检测
- **Samsung Internet** - 完整支持，包含版本检测

### 移动端和 WebView

- **iOS Safari** - 完整支持，包含 WebKit 版本映射
- **Android Chrome** - 完整支持，包含版本检测
- **iOS WebView** - 特别处理 WebKit 版本检测
- **Android WebView** - 特别处理 Chrome WebView 检测

## 内置特性

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

## 使用示例

### 在 React 中进行特性检测

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
      {features.webp && <img src="image.webp" alt="WebP 图像" />}
      {features['css-grid'] && <div className="grid-layout">网格内容</div>}
    </div>
  );
}
```

### 渐进增强

```typescript
import { createFeatureDetector } from '@fly4react/feature-detector';

const detector = createFeatureDetector();

// 检查现代特性
const hasWebP = detector.check('webp');
const hasCSSGrid = detector.check('css-grid');
const hasWebGL = detector.check('webgl');

// 应用渐进增强
if (hasWebP) {
  // 使用 WebP 图像
  document.body.classList.add('webp-supported');
}

if (hasCSSGrid) {
  // 使用 CSS Grid 布局
  document.body.classList.add('grid-supported');
}

if (hasWebGL) {
  // 启用 WebGL 特性
  document.body.classList.add('webgl-supported');
}
```

### 自定义特性检测

```typescript
import { createFeatureDetector } from '@fly4react/feature-detector';

// 定义自定义特性
const customFeatures = {
  'my-awesome-feature': {
    browsers: {
      chrome: '90',
      firefox: '88',
      safari: '14'
    },
    runtimeTest: () => {
      // 自定义运行时检测逻辑
      return 'myAwesomeFeature' in window && 
             typeof window.myAwesomeFeature === 'function';
    }
  }
};

const detector = createFeatureDetector(customFeatures);
const isSupported = detector.check('my-awesome-feature');
```

## 性能

库针对性能进行了优化，具有以下特性：

- **智能缓存** - 结果被缓存以避免重复检测
- **懒加载** - 特性仅在请求时才进行检测
- **最小开销** - 轻量级实现，包体积最小
- **智能回退** - 当运行时检测失败时优雅降级

## 浏览器兼容性

- **现代浏览器** - Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **传统浏览器** - Internet Explorer 11+ (需要 polyfills)
- **移动浏览器** - iOS Safari 12+, Android Chrome 60+
- **WebView 环境** - iOS WKWebView, Android WebView

## 贡献

欢迎贡献！请阅读我们的[贡献指南](../../CONTRIBUTING.md)了解详情。

## 许可证

MIT 许可证 - 查看 [LICENSE](../../LICENSE) 文件了解详情。

## 更新日志

查看 [CHANGELOG.md](../../CHANGELOG.md) 了解变更列表。

## 支持

- 📖 [文档](../../docs/)
- 🐛 [问题追踪](../../issues)
- 💬 [讨论](../../discussions)
