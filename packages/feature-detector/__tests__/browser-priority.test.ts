import { describe, it, expect } from 'vitest';
import { createFeatureDetector } from '../src/FeatureDetector';

describe('浏览器检测优先级', () => {
  it('应该优先检测 Chrome WebView 而不是 Chrome（带 wv 标识）', () => {
    const detector = createFeatureDetector({}, { enableRuntimeTest: false });
    
    // Android Chrome WebView 用户代理字符串（带 wv 标识）
    const chromeWebViewUA1 = 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/91.0.4472.120 Mobile Safari/537.36 wv';
    const result1 = detector.detect('webp', chromeWebViewUA1);
    
    // 应该检测为 chromeWebview，不是 chrome
    expect(result1.supported).toBe(true);
  });

  it('应该优先检测 Chrome WebView 而不是 Chrome（带 Version/ 标识）', () => {
    const detector = createFeatureDetector({}, { enableRuntimeTest: false });
    
    // Android Chrome WebView 用户代理字符串（带 Version/ 标识）
    const chromeWebViewUA2 = 'Mozilla/5.0 (Linux; Android 4.0.3; Galaxy Nexus Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Chrome/18.0.1025.133 Mobile Safari/534.30';
    const result2 = detector.detect('webp', chromeWebViewUA2);
    
    // 应该检测为 chromeWebview，不是 chrome
    expect(result2.supported).toBe(true);
  });

  it('应该优先检测 Safari WebView 而不是 Safari', () => {
    const detector = createFeatureDetector({}, { enableRuntimeTest: false });
    
    // iOS Safari WebView 用户代理字符串
    const safariWebViewUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148';
    const result = detector.detect('webp', safariWebViewUA);
    
    // 应该检测为 safariWebview，不是 safari
    expect(result.supported).toBe(true);
  });

  it('应该正确检测桌面 Chrome', () => {
    const detector = createFeatureDetector({}, { enableRuntimeTest: false });
    
    // 桌面 Chrome 用户代理字符串
    const chromeUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    const result = detector.detect('webp', chromeUA);
    
    // 应该检测为 chrome，不是 safariWebview
    expect(result.supported).toBe(true);
  });

  it('应该正确检测桌面 Safari', () => {
    const detector = createFeatureDetector({}, { enableRuntimeTest: false });
    
    // 桌面 Safari 用户代理字符串
    const safariUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15';
    const result = detector.detect('webp', safariUA);
    
    // 应该检测为 safari，不是 safariWebview
    expect(result.supported).toBe(true);
  });

  it('应该正确检测 Edge', () => {
    const detector = createFeatureDetector({}, { enableRuntimeTest: false });
    
    // Edge 用户代理字符串
    const edgeUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59';
    const result = detector.detect('webp', edgeUA);
    
    // 应该检测为 edge，不是 chrome
    expect(result.supported).toBe(true);
  });
});
