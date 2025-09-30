import { createFeatureDetector } from '../src/FeatureDetector';

describe('iOS WebView 检测', () => {
  // 测试 iOS Safari WebView WebP 支持
  it('应该正确检测 iOS Safari WebView WebP 支持', () => {
    const detector = createFeatureDetector(
      undefined, // 使用默认配置
      { enableRuntimeTest: false }
    );

    // 测试一个现代 iOS Safari WebView User Agent
    const iosSafariWebViewUA =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
    const result = detector.detect('webp', iosSafariWebViewUA);

    // 现代 iOS Safari WebView 支持 WebP
    expect(result.supported).toBe(true);
  });

  // 测试 iOS Safari WebView AVIF 支持
  it('应该正确检测 iOS Safari WebView AVIF 支持', () => {
    const detector = createFeatureDetector(
      undefined, // 使用默认配置
      { enableRuntimeTest: false }
    );

    // 测试一个现代 iOS Safari WebView User Agent (AVIF 需要 WebKit 612.1+)
    const iosSafariWebViewUA =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/612.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/612.1';
    const result = detector.detect('avif', iosSafariWebViewUA);

    // 现代 iOS Safari WebView 支持 AVIF
    expect(result.supported).toBe(true);
  });

  // 测试 iOS Safari WebView Container Queries 支持
  it('应该正确检测 iOS Safari WebView Container Queries 支持', () => {
    const detector = createFeatureDetector(
      undefined, // 使用默认配置
      { enableRuntimeTest: false }
    );

    // 测试一个现代 iOS Safari WebView User Agent (Container Queries 需要 WebKit 612.1+)
    const iosSafariWebViewUA =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/612.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/612.1';
    const result = detector.detect('container-queries', iosSafariWebViewUA);

    // 现代 iOS Safari WebView 支持 Container Queries
    expect(result.supported).toBe(true);
  });

  // 测试 iOS Safari WebView CSS Nesting 支持
  it('应该正确检测 iOS Safari WebView CSS Nesting 支持', () => {
    const detector = createFeatureDetector(
      undefined, // 使用默认配置
      { enableRuntimeTest: false }
    );

    // 测试一个现代 iOS Safari WebView User Agent (CSS Nesting 需要 WebKit 613.1+)
    const iosSafariWebViewUA =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/613.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/613.1';
    const result = detector.detect('css-nesting', iosSafariWebViewUA);

    // 现代 iOS Safari WebView 支持 CSS Nesting
    expect(result.supported).toBe(true);
  });

  // 测试 iOS Safari WebView Web Share 支持
  it('应该正确检测 iOS Safari WebView Web Share 支持', () => {
    const detector = createFeatureDetector(
      undefined, // 使用默认配置
      { enableRuntimeTest: false }
    );

    // 测试一个现代 iOS Safari WebView User Agent (Web Share 需要 WebKit 606.1+)
    const iosSafariWebViewUA =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/606.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/606.1';
    const result = detector.detect('web-share', iosSafariWebViewUA);

    // 现代 iOS Safari WebView 支持 Web Share
    expect(result.supported).toBe(true);
  });

  // 测试 iOS Safari WebView Intersection Observer 支持
  it('应该正确检测 iOS Safari WebView Intersection Observer 支持', () => {
    const detector = createFeatureDetector(
      undefined, // 使用默认配置
      { enableRuntimeTest: false }
    );

    // 测试一个现代 iOS Safari WebView User Agent (Intersection Observer 需要 WebKit 606.1+)
    const iosSafariWebViewUA =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/606.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/606.1';
    const result = detector.detect('intersection-observer', iosSafariWebViewUA);

    // 现代 iOS Safari WebView 支持 Intersection Observer
    expect(result.supported).toBe(true);
  });

  // 测试 iOS Safari WebView Aspect Ratio 支持
  it('应该正确检测 iOS Safari WebView Aspect Ratio 支持', () => {
    const detector = createFeatureDetector(
      undefined, // 使用默认配置
      { enableRuntimeTest: false }
    );

    // 测试一个现代 iOS Safari WebView User Agent (Aspect Ratio 需要 WebKit 608.1+)
    const iosSafariWebViewUA =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/608.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/608.1';
    const result = detector.detect('aspect-ratio', iosSafariWebViewUA);

    // 现代 iOS Safari WebView 支持 Aspect Ratio
    expect(result.supported).toBe(true);
  });
});
