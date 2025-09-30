import { createFeatureDetector } from '../src/FeatureDetector';

describe('浏览器检测', () => {
  // 测试 WebP 支持
  it('应该能够检测现代 Chrome 浏览器的 WebP 支持', () => {
    const detector = createFeatureDetector(
      undefined, // 使用默认配置
      { enableRuntimeTest: false }
    );

    // 测试一个现代 Chrome User Agent
    const modernChromeUA =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    const result = detector.detect('webp', modernChromeUA);

    // 现代 Chrome 浏览器支持 WebP
    expect(result.supported).toBe(true);
  });

  // 测试 AVIF 支持
  it('应该能够检测现代 Chrome 浏览器的 AVIF 支持', () => {
    const detector = createFeatureDetector(
      undefined, // 使用默认配置
      { enableRuntimeTest: false }
    );

    // 测试一个现代 Chrome User Agent
    const modernChromeUA =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    const result = detector.detect('avif', modernChromeUA);

    // 现代 Chrome 浏览器支持 AVIF
    expect(result.supported).toBe(true);
  });

  // 测试 WebGPU 支持
  it('应该能够检测现代 Chrome 浏览器的 WebGPU 支持', () => {
    const detector = createFeatureDetector(
      undefined, // 使用默认配置
      { enableRuntimeTest: false }
    );

    // 测试一个现代 Chrome User Agent
    const modernChromeUA =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    const result = detector.detect('webgpu', modernChromeUA);

    // 现代 Chrome 浏览器支持 WebGPU
    expect(result.supported).toBe(true);
  });

  // 测试 Container Queries 支持
  it('应该能够检测现代 Chrome 浏览器的 Container Queries 支持', () => {
    const detector = createFeatureDetector(
      undefined, // 使用默认配置
      { enableRuntimeTest: false }
    );

    // 测试一个现代 Chrome User Agent
    const modernChromeUA =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    const result = detector.detect('container-queries', modernChromeUA);

    // 现代 Chrome 浏览器支持 Container Queries
    expect(result.supported).toBe(true);
  });

  // 测试 CSS Nesting 支持
  it('应该能够检测现代 Chrome 浏览器的 CSS Nesting 支持', () => {
    const detector = createFeatureDetector(
      undefined, // 使用默认配置
      { enableRuntimeTest: false }
    );

    // 测试一个现代 Chrome User Agent
    const modernChromeUA =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    const result = detector.detect('css-nesting', modernChromeUA);

    // 现代 Chrome 浏览器支持 CSS Nesting
    expect(result.supported).toBe(true);
  });

  // 测试 Web Share 支持
  it('应该能够检测现代 Chrome 浏览器的 Web Share 支持', () => {
    const detector = createFeatureDetector(
      undefined, // 使用默认配置
      { enableRuntimeTest: false }
    );

    // 测试一个现代 Chrome User Agent
    const modernChromeUA =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    const result = detector.detect('web-share', modernChromeUA);

    // 现代 Chrome 浏览器支持 Web Share
    expect(result.supported).toBe(true);
  });

  // 测试 Intersection Observer 支持
  it('应该能够检测现代 Chrome 浏览器的 Intersection Observer 支持', () => {
    const detector = createFeatureDetector(
      undefined, // 使用默认配置
      { enableRuntimeTest: false }
    );

    // 测试一个现代 Chrome User Agent
    const modernChromeUA =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    const result = detector.detect('intersection-observer', modernChromeUA);

    // 现代 Chrome 浏览器支持 Intersection Observer
    expect(result.supported).toBe(true);
  });

  // 测试 Aspect Ratio 支持
  it('应该能够检测现代 Chrome 浏览器的 Aspect Ratio 支持', () => {
    const detector = createFeatureDetector(
      undefined, // 使用默认配置
      { enableRuntimeTest: false }
    );

    // 测试一个现代 Chrome User Agent
    const modernChromeUA =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    const result = detector.detect('aspect-ratio', modernChromeUA);

    // 现代 Chrome 浏览器支持 Aspect Ratio
    expect(result.supported).toBe(true);
  });
});
