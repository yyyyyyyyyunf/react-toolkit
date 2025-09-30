import { describe, it, expect } from 'vitest';
import { createFeatureDetector } from '../src/FeatureDetector';

describe('浏览器检测', () => {
  it('应该将 iOS WebView 检测为 safariWebview', () => {
    const detector = createFeatureDetector({}, { enableRuntimeTest: false });
    
    // iOS WebView 用户代理字符串
    const iosUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148';
    const result = detector.detect('webp', iosUA);
    
    // 应该检测为 safariWebview 并支持 WebP
    expect(result.supported).toBe(true);
  });

  it('应该将 Android WebView 检测为 chromeWebview', () => {
    const detector = createFeatureDetector({}, { enableRuntimeTest: false });
    
    // Android Chrome WebView 用户代理字符串
    const androidUA = 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/91.0.4472.120 Mobile Safari/537.36 wv';
    const result = detector.detect('webp', androidUA);
    
    // 应该检测为 chromeWebview 并支持 WebP
    expect(result.supported).toBe(true);
  });

  it('应该正确检测桌面 Chrome', () => {
    const detector = createFeatureDetector({}, { enableRuntimeTest: false });
    
    // 桌面 Chrome 用户代理字符串
    const chromeUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    const result = detector.detect('webp', chromeUA);
    
    // 应该检测为 chrome 并支持 WebP
    expect(result.supported).toBe(true);
  });

  it('应该正确检测桌面 Safari', () => {
    const detector = createFeatureDetector({}, { enableRuntimeTest: false });
    
    // 桌面 Safari 用户代理字符串
    const safariUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15';
    const result = detector.detect('webp', safariUA);
    
    // 应该检测为 safari 并支持 WebP
    expect(result.supported).toBe(true);
  });
});
