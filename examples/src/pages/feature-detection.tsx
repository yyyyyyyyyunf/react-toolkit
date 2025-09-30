import { type FeatureConfigMap, createFeatureDetector } from '@fly4react/feature-detector';
import { useEffect, useState } from 'react';

// 自定义特性配置（放在组件外面避免每次渲染都重新创建）
const customFeatureConfigs: FeatureConfigMap = {
  webp: {
    browsers: {
      chrome: '32',
      firefox: '65',
      safari: '14.1',
      edge: '18',
      opera: '19',
      safariWebview: '604.1',
      chromeWebview: '32',
    },
    runtimeTest: () => {
      const canvas = document.createElement('canvas');
      if (canvas.getContext?.('2d')) {
        const data = canvas.toDataURL('image/webp');
        if (data.indexOf('data:image/webp') === 0) {
          return true;
        }
      }
      return false;
    },
  },
  avif: {
    browsers: {
      chrome: '85',
      firefox: '93',
      safari: '16',
      edge: '85',
      opera: '71',
      safariWebview: '612.1',
      chromeWebview: '85',
    },
  },
  'css-grid': {
    browsers: {
      chrome: '57',
      firefox: '52',
      safari: '10.1',
      edge: '16',
      opera: '44',
      safariWebview: '603.1',
      chromeWebview: '57',
    },
    runtimeTest: () => {
      if (typeof window === 'undefined') return false;
      return CSS.supports('display', 'grid');
    },
  },
  'css-flexbox': {
    browsers: {
      chrome: '21',
      firefox: '28',
      safari: '9',
      edge: '12',
      opera: '12.1',
      safariWebview: '537.1',
      chromeWebview: '21',
    },
    runtimeTest: () => {
      if (typeof window === 'undefined') return false;
      return CSS.supports('display', 'flex');
    },
  },
  'css-custom-properties': {
    browsers: {
      chrome: '49',
      firefox: '31',
      safari: '9.1',
      edge: '15',
      opera: '36',
      safariWebview: '601.1',
      chromeWebview: '49',
    },
    runtimeTest: () => {
      if (typeof window === 'undefined') return false;
      return CSS.supports('--custom', 'value');
    },
  },
  'intersection-observer': {
    browsers: {
      chrome: '51',
      firefox: '55',
      safari: '12.1',
      edge: '15',
      opera: '38',
      safariWebview: '606.1',
      chromeWebview: '51',
    },
    runtimeTest: () => {
      if (typeof window === 'undefined') return false;
      return 'IntersectionObserver' in window;
    },
  },
  'resize-observer': {
    browsers: {
      chrome: '64',
      firefox: '69',
      safari: '13.1',
      edge: '79',
      opera: '51',
      safariWebview: '605.1',
      chromeWebview: '64',
    },
    runtimeTest: () => {
      if (typeof window === 'undefined') return false;
      return 'ResizeObserver' in window;
    },
  },
  'web-animations': {
    browsers: {
      chrome: '36',
      firefox: '48',
      safari: '13.1',
      edge: '79',
      opera: '23',
      safariWebview: '605.1',
      chromeWebview: '36',
    },
    runtimeTest: () => {
      if (typeof window === 'undefined') return false;
      return 'animate' in Element.prototype;
    },
  },
  'service-workers': {
    browsers: {
      chrome: '40',
      firefox: '44',
      safari: '11.1',
      edge: '17',
      opera: '27',
      safariWebview: '605.1',
      chromeWebview: '40',
    },
    runtimeTest: () => {
      if (typeof navigator === 'undefined') return false;
      return 'serviceWorker' in navigator;
    },
  },
  webgl: {
    browsers: {
      chrome: '9',
      firefox: '4',
      safari: '5.1',
      edge: '12',
      opera: '12',
      safariWebview: '534.1',
      chromeWebview: '9',
    },
    runtimeTest: () => {
      if (typeof window === 'undefined') return false;
      try {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      } catch {
        return false;
      }
    },
  },
  webgl2: {
    browsers: {
      chrome: '56',
      firefox: '51',
      safari: '15',
      edge: '79',
      opera: '43',
      safariWebview: '608.1',
      chromeWebview: '56',
    },
    runtimeTest: () => {
      if (typeof window === 'undefined') return false;
      try {
        const canvas = document.createElement('canvas');
        return !!canvas.getContext('webgl2');
      } catch {
        return false;
      }
    },
  },
  webrtc: {
    browsers: {
      chrome: '23',
      firefox: '22',
      safari: '11',
      edge: '15',
      opera: '18',
      safariWebview: '604.1',
      chromeWebview: '23',
    },
    runtimeTest: () => {
      if (typeof window === 'undefined') return false;
      return !!(
        window.RTCPeerConnection ||
        (window as any).webkitRTCPeerConnection ||
        (window as any).mozRTCPeerConnection
      );
    },
  },
  webassembly: {
    browsers: {
      chrome: '57',
      firefox: '52',
      safari: '11',
      edge: '16',
      opera: '44',
      safariWebview: '604.1',
      chromeWebview: '57',
    },
    runtimeTest: () => {
      if (typeof window === 'undefined') return false;
      return typeof WebAssembly === 'object';
    },
  },
  'aspect-ratio': {
    browsers: {
      chrome: '88',
      firefox: '89',
      safari: '15',
      edge: '88',
      opera: '74',
      safariWebview: '608.1',
      chromeWebview: '88',
    },
    runtimeTest: () => {
      return CSS.supports('aspect-ratio', '1');
    },
  },
};

/**
 * 特性检测示例页面
 * @description 演示如何使用 feature-detector 库进行浏览器特性检测
 */
export default function FeatureDetectionExample() {
  const [detector] = useState(() => createFeatureDetector(customFeatureConfigs));
  const [features, setFeatures] = useState<Record<string, boolean>>({});
  const [detailedResults, setDetailedResults] = useState<Record<string, any>>({});
  const [customFeature, setCustomFeature] = useState('');
  const [customResult, setCustomResult] = useState<any>(null);

  // 预定义的特性和描述
  const predefinedFeatures = [
    { name: 'webp', description: 'WebP 图像格式支持' },
    { name: 'avif', description: 'AVIF 图像格式支持' },
    { name: 'css-grid', description: 'CSS Grid 布局支持' },
    { name: 'css-flexbox', description: 'CSS Flexbox 支持' },
    { name: 'css-custom-properties', description: 'CSS 自定义属性支持' },
    {
      name: 'intersection-observer',
      description: 'Intersection Observer API 支持',
    },
    { name: 'resize-observer', description: 'Resize Observer API 支持' },
    { name: 'web-animations', description: 'Web Animations API 支持' },
    { name: 'service-workers', description: 'Service Worker API 支持' },
    { name: 'webgl', description: 'WebGL 支持' },
    { name: 'webgl2', description: 'WebGL 2.0 支持' },
    { name: 'webrtc', description: 'WebRTC 支持' },
    { name: 'webassembly', description: 'WebAssembly 支持' },
    { name: 'aspect-ratio', description: 'CSS aspect-ratio 属性支持' },
  ];

  // 检测所有预定义特性
  useEffect(() => {
    const featureNames = predefinedFeatures.map(f => f.name);

    // 清除缓存以确保使用最新配置
    detector.clearCache();

    // 调试信息
    console.log('🔍 特性检测调试信息');
    console.log('当前 UA:', navigator.userAgent);
    console.log('检测器状态:', detector.getStatus());

    // 快速检测（只返回布尔值）
    const quickResults = detector.check(featureNames, navigator.userAgent);
    const featureMap: Record<string, boolean> = {};
    featureNames.forEach((name, index) => {
      featureMap[name] = quickResults[index];
    });
    setFeatures(featureMap);

    // 详细检测（返回完整信息）
    const detailedResults = detector.detect(featureNames, navigator.userAgent);
    const detailedMap: Record<string, any> = {};
    featureNames.forEach((name, index) => {
      detailedMap[name] = detailedResults[index];
    });
    setDetailedResults(detailedMap);

    // 调试 WebP 检测
    console.log('WebP 检测结果:', detailedMap.webp);
  }, [detector]);

  // 检测自定义特性
  const handleCustomDetection = () => {
    if (!customFeature.trim()) return;

    try {
      const result = detector.detect(customFeature, navigator.userAgent);
      setCustomResult(result);
    } catch {
      setCustomResult({ error: '特性不存在或检测失败' });
    }
  };

  // 获取检测器状态信息
  const getBrowserInfo = () => {
    const info = detector.getStatus();
    return info;
  };

  const browserInfo = getBrowserInfo();

  return (
    <div className="example-container">
      <h2>特性检测示例</h2>
      <p>
        使用 <code>@fly4react/feature-detector</code> 检测浏览器对特定特性的支持情况。
      </p>

      {/* 浏览器信息 */}
      <div className="demo-section">
        <h3>当前浏览器信息</h3>
        <div className="info-grid">
          <div className="info-item">
            <strong>用户代理：</strong>
            <code>{navigator.userAgent}</code>
          </div>
          <div className="info-item">
            <strong>缓存状态：</strong>
            <span className={browserInfo.useCache ? 'status-enabled' : 'status-disabled'}>
              {browserInfo.useCache ? '已启用' : '已禁用'}
            </span>
          </div>
          <div className="info-item">
            <strong>运行时检测：</strong>
            <span className={browserInfo.enableRuntimeTest ? 'status-enabled' : 'status-disabled'}>
              {browserInfo.enableRuntimeTest ? '已启用' : '已禁用'}
            </span>
          </div>
          <div className="info-item">
            <strong>缓存大小：</strong>
            <span>{browserInfo.cacheSize} 项</span>
          </div>
          <div className="info-item">
            <strong>动态特性：</strong>
            <span>{browserInfo.dynamicFeaturesCount} 个</span>
          </div>
          {browserInfo.browserInfo && (
            <>
              <div className="info-item">
                <strong>检测到的浏览器：</strong>
                <code>
                  {browserInfo.browserInfo.name} {browserInfo.browserInfo.version}
                </code>
              </div>
              <div className="info-item">
                <strong>是否 WebView：</strong>
                <span
                  className={
                    browserInfo.browserInfo.isWebView ? 'status-enabled' : 'status-disabled'
                  }
                >
                  {browserInfo.browserInfo.isWebView ? '是' : '否'}
                </span>
              </div>
              {browserInfo.browserInfo.webkitVersion && (
                <div className="info-item">
                  <strong>WebKit 版本：</strong>
                  <code>{browserInfo.browserInfo.webkitVersion}</code>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* 预定义特性检测结果 */}
      <div className="demo-section">
        <h3>预定义特性检测结果</h3>
        <div className="features-grid">
          {predefinedFeatures.map(feature => (
            <div key={feature.name} className="feature-card">
              <div className="feature-header">
                <h4>{feature.name}</h4>
                <span
                  className={`status-badge ${features[feature.name] ? 'supported' : 'not-supported'}`}
                >
                  {features[feature.name] ? '支持' : '不支持'}
                </span>
              </div>
              <p className="feature-description">{feature.description}</p>
              {detailedResults[feature.name] && (
                <div className="feature-details">
                  <div className="detail-item">
                    <strong>检测方法：</strong>
                    <code>{detailedResults[feature.name].method}</code>
                  </div>
                  <div className="detail-item">
                    <strong>置信度：</strong>
                    <span className={`confidence-${detailedResults[feature.name].confidence}`}>
                      {detailedResults[feature.name].confidence}
                    </span>
                  </div>
                  {detailedResults[feature.name].browserInfo && (
                    <div className="detail-item">
                      <strong>浏览器：</strong>
                      <code>
                        {detailedResults[feature.name].browserInfo.name}{' '}
                        {detailedResults[feature.name].browserInfo.version}
                      </code>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 自定义特性检测 */}
      <div className="demo-section">
        <h3>自定义特性检测</h3>
        <div className="custom-detection">
          <div className="input-group">
            <input
              type="text"
              value={customFeature}
              onChange={e => setCustomFeature(e.target.value)}
              placeholder="输入特性名称，如：webp、css-grid 等"
              className="feature-input"
            />
            <button onClick={handleCustomDetection} className="detect-button">
              检测特性
            </button>
          </div>

          {customResult && (
            <div className="custom-result">
              <h4>检测结果：</h4>
              {customResult.error ? (
                <div className="error-message">{customResult.error}</div>
              ) : (
                <div className="result-details">
                  <div className="result-item">
                    <strong>支持状态：</strong>
                    <span
                      className={`status-badge ${customResult.supported ? 'supported' : 'not-supported'}`}
                    >
                      {customResult.supported ? '支持' : '不支持'}
                    </span>
                  </div>
                  <div className="result-item">
                    <strong>检测方法：</strong>
                    <code>{customResult.method}</code>
                  </div>
                  <div className="result-item">
                    <strong>置信度：</strong>
                    <span className={`confidence-${customResult.confidence}`}>
                      {customResult.confidence}
                    </span>
                  </div>
                  {customResult.browserInfo && (
                    <div className="result-item">
                      <strong>浏览器信息：</strong>
                      <code>
                        {customResult.browserInfo.name} {customResult.browserInfo.version}
                      </code>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 使用示例代码 */}
      <div className="demo-section">
        <h3>使用示例</h3>
        <div className="code-example">
          <pre>
            <code>{`import { createFeatureDetector } from '@fly4react/feature-detector';

// 创建检测器实例
const detector = createFeatureDetector();

// 快速检测单个特性
const webpSupported = detector.check('webp');
console.log('WebP 支持:', webpSupported);

// 检测多个特性
const [webp, avif, cssGrid] = detector.check(['webp', 'avif', 'css-grid']);
console.log('特性支持:', { webp, avif, cssGrid });

// 获取详细检测结果
const result = detector.detect('webp');
console.log('详细结果:', {
  supported: result.supported,
  method: result.method,
  confidence: result.confidence
});

// 批量检测并返回对象格式
const results = detector.checkAsRecord(['webp', 'avif', 'css-grid']);
console.log('批量结果:', results);`}</code>
          </pre>
        </div>
      </div>

      {/* 性能优化提示 */}
      <div className="demo-section">
        <h3>性能优化提示</h3>
        <ul className="tips-list">
          <li>
            使用 <code>check()</code> 方法进行快速检测，只返回布尔值
          </li>
          <li>
            使用 <code>detect()</code> 方法获取详细检测结果
          </li>
          <li>检测器会自动缓存结果，避免重复检测</li>
          <li>支持运行时检测和 User Agent 分析两种方式</li>
          <li>可以动态注册新的特性配置</li>
        </ul>
      </div>
    </div>
  );
}
