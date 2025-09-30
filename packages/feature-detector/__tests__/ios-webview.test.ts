import { describe, it, expect } from 'vitest';
import { createFeatureDetector } from '../src/FeatureDetector';

describe('iOS WebView 检测', () => {

  it('应该正确检测 iOS WebView Safari', () => {
    const detector = createFeatureDetector({}, { enableRuntimeTest: false });
    
    // iOS 15 WebView 用户代理字符串（支持 WebP）
    const ios15UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/608.1.15 (KHTML, like Gecko) Mobile/15E148';
    const result15 = detector.detect('webp', ios15UA);
    expect(result15.supported).toBe(true); // iOS 15 支持 WebP
    
    // iOS 14 WebView 用户代理字符串（支持 WebP）
    const ios14UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148';
    const result14 = detector.detect('webp', ios14UA);
    expect(result14.supported).toBe(true); // iOS 14 支持 WebP
    
    // iOS 13 WebView 用户代理字符串（支持 WebP）
    const ios13UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Mobile/15E148';
    const result13 = detector.detect('webp', ios13UA);
    expect(result13.supported).toBe(true); // iOS 13 支持 WebP
    
    // iOS 12 WebView 用户代理字符串（不支持 WebP）
    const ios12UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/15E148';
    const result12 = detector.detect('webp', ios12UA);
    expect(result12.supported).toBe(false); // iOS 12 不支持 WebP
    
    // iOS 11 WebView 用户代理字符串（不支持 WebP）
    const ios11UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Mobile/15E148';
    const result11 = detector.detect('webp', ios11UA);
    expect(result11.supported).toBe(false); // iOS 11 不支持 WebP
  });

  it('应该检测 iOS WebView 中的 aspect-ratio 支持', () => {
    const detector = createFeatureDetector({}, { enableRuntimeTest: false });
    
    // iOS 15 WebView 用户代理字符串（支持 aspect-ratio）
    const ios15UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/608.1.15 (KHTML, like Gecko) Mobile/15E148';
    const result = detector.detect('aspect-ratio', ios15UA);
    expect(result.supported).toBe(true);
    
    // iOS 14 WebView 用户代理字符串（不支持 aspect-ratio）
    const ios14UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148';
    const result14 = detector.detect('aspect-ratio', ios14UA);
    expect(result14.supported).toBe(false);
  });
});
