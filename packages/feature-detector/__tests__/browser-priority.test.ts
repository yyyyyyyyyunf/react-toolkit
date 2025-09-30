import { createFeatureDetector } from '../src/FeatureDetector';

describe('浏览器检测优先级', () => {
  // 测试 Chrome WebView 优先级
  it('应该正确检测 Chrome WebView 的 WebP 支持', () => {
    const detector = createFeatureDetector(
      undefined, // 使用默认配置
      { enableRuntimeTest: false }
    );

    // 测试一个现代 Chrome WebView User Agent
    const chromeWebViewUA =
      'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';
    const result = detector.detect('webp', chromeWebViewUA);

    // 现代 Chrome WebView 支持 WebP
    expect(result.supported).toBe(true);
  });

  it('应该正确检测 Chrome WebView 的 AVIF 支持', () => {
    const detector = createFeatureDetector(
      undefined, // 使用默认配置
      { enableRuntimeTest: false }
    );

    // 测试一个现代 Chrome WebView User Agent
    const chromeWebViewUA =
      'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';
    const result = detector.detect('avif', chromeWebViewUA);

    // 现代 Chrome WebView 支持 AVIF
    expect(result.supported).toBe(true);
  });

  it('应该正确检测 Chrome WebView 的 Container Queries 支持', () => {
    const detector = createFeatureDetector(
      undefined, // 使用默认配置
      { enableRuntimeTest: false }
    );

    // 测试一个现代 Chrome WebView User Agent
    const chromeWebViewUA =
      'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';
    const result = detector.detect('container-queries', chromeWebViewUA);

    // 现代 Chrome WebView 支持 Container Queries
    expect(result.supported).toBe(true);
  });

  it('应该正确检测 Chrome WebView 的 CSS Nesting 支持', () => {
    const detector = createFeatureDetector(
      undefined, // 使用默认配置
      { enableRuntimeTest: false }
    );

    // 测试一个现代 Chrome WebView User Agent
    const chromeWebViewUA =
      'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';
    const result = detector.detect('css-nesting', chromeWebViewUA);

    // 现代 Chrome WebView 支持 CSS Nesting
    expect(result.supported).toBe(true);
  });

  it('应该正确检测 Chrome WebView 的 Web Share 支持', () => {
    const detector = createFeatureDetector(
      undefined, // 使用默认配置
      { enableRuntimeTest: false }
    );

    // 测试一个现代 Chrome WebView User Agent
    const chromeWebViewUA =
      'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';
    const result = detector.detect('web-share', chromeWebViewUA);

    // 现代 Chrome WebView 支持 Web Share
    expect(result.supported).toBe(true);
  });

  it('应该正确检测 Chrome WebView 的 Intersection Observer 支持', () => {
    const detector = createFeatureDetector(
      undefined, // 使用默认配置
      { enableRuntimeTest: false }
    );

    // 测试一个现代 Chrome WebView User Agent
    const chromeWebViewUA =
      'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';
    const result = detector.detect('intersection-observer', chromeWebViewUA);

    // 现代 Chrome WebView 支持 Intersection Observer
    expect(result.supported).toBe(true);
  });

  it('应该正确检测 Chrome WebView 的 Aspect Ratio 支持', () => {
    const detector = createFeatureDetector(
      undefined, // 使用默认配置
      { enableRuntimeTest: false }
    );

    // 测试一个现代 Chrome WebView User Agent
    const chromeWebViewUA =
      'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';
    const result = detector.detect('aspect-ratio', chromeWebViewUA);

    // 现代 Chrome WebView 支持 Aspect Ratio
    expect(result.supported).toBe(true);
  });
});
