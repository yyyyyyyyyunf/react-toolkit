import { describe, expect, it } from 'vitest';
import { createFeatureDetector } from '../src/FeatureDetector';
import {
  allUserAgents,
  chromeUserAgents,
  edgeUserAgents,
  firefoxUserAgents,
  otherBrowserUserAgents,
  safariUserAgents,
} from './test-user-agents';

describe('浏览器检测', () => {
  // 测试 Chrome 浏览器检测
  describe('Chrome 浏览器检测', () => {
    for (const { name, userAgent, description } of chromeUserAgents) {
      it(`应该正确检测 ${description}`, () => {
        const detector = createFeatureDetector(
          undefined, // 使用默认配置
          { enableRuntimeTest: false }
        );
        const result = detector.detect('webp', userAgent);

        // Chrome 系列浏览器根据版本支持 WebP
        // Chrome 32+ 支持 WebP，Chrome WebView 32+ 支持 WebP
        const shouldSupport =
          !name.includes('Legacy') && !name.includes('18') && !name.includes('Chrome/18');
        expect(result.supported).toBe(shouldSupport);
      });
    }
  });

  // 测试 Safari 浏览器检测
  describe('Safari 浏览器检测', () => {
    for (const { name, userAgent, description } of safariUserAgents) {
      it(`应该正确检测 ${description}`, () => {
        const detector = createFeatureDetector(
          undefined, // 使用默认配置
          { enableRuntimeTest: false }
        );
        const result = detector.detect('webp', userAgent);

        // iOS 13+ 支持 WebP，iOS 12 及以下不支持
        const isIOS13Plus =
          name.includes('iOS 13') ||
          name.includes('iOS 14') ||
          name.includes('iOS 15') ||
          name.includes('iOS 16') ||
          name.includes('iOS 17') ||
          name.includes('iOS 18') ||
          name.includes('Desktop');
        expect(result.supported).toBe(isIOS13Plus);
      });
    }
  });

  // 测试 Firefox 浏览器检测
  describe('Firefox 浏览器检测', () => {
    for (const { name, userAgent, description } of firefoxUserAgents) {
      it(`应该正确检测 ${description}`, () => {
        const detector = createFeatureDetector(
          undefined, // 使用默认配置
          { enableRuntimeTest: false }
        );
        const result = detector.detect('webp', userAgent);

        // Firefox 支持 WebP
        expect(result.supported).toBe(true);
      });
    }
  });

  // 测试 Edge 浏览器检测
  describe('Edge 浏览器检测', () => {
    for (const { name, userAgent, description } of edgeUserAgents) {
      it(`应该正确检测 ${description}`, () => {
        const detector = createFeatureDetector(
          undefined, // 使用默认配置
          { enableRuntimeTest: false }
        );
        const result = detector.detect('webp', userAgent);

        // Edge 支持 WebP
        expect(result.supported).toBe(true);
      });
    }
  });

  // 测试其他浏览器检测
  describe('其他浏览器检测', () => {
    for (const { name, userAgent, description } of otherBrowserUserAgents) {
      it(`应该正确检测 ${description}`, () => {
        const detector = createFeatureDetector(
          undefined, // 使用默认配置
          { enableRuntimeTest: false }
        );
        const result = detector.detect('webp', userAgent);

        // Opera 和 Samsung Internet 支持 WebP
        expect(result.supported).toBe(true);
      });
    }
  });

  // 综合测试所有浏览器
  describe('综合浏览器检测', () => {
    it('应该能检测所有主要浏览器类型', () => {
      const detector = createFeatureDetector(undefined, {
        enableRuntimeTest: false,
      });

      for (const { name, userAgent, description } of allUserAgents) {
        const result = detector.detect('webp', userAgent);

        // 确保检测不会抛出异常
        expect(result).toBeDefined();
        expect(typeof result.supported).toBe('boolean');
      }
    });
  });
});
