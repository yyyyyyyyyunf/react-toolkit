# 浏览器模式匹配指南

## 概述

浏览器模式匹配规则通过数组顺序控制优先级，第一个匹配的模式就是检测结果。

## 匹配顺序规则

### 1. WebView 类型（优先级最高）
- 放在数组最前面
- 使用更具体的正则表达式
- 避免与桌面浏览器冲突

### 2. 桌面浏览器（按特异性排序）
- 放在数组中间
- 使用负向前瞻排除 WebView
- 按特异性从高到低排序

### 3. 通用浏览器（优先级最低）
- 放在数组最后
- 使用最通用的正则表达式
- 作为兜底匹配

## 新增 Pattern 指南

### 步骤 1: 确定浏览器类型
```typescript
// WebView 类型
if (isWebView) {
  // 放在数组前面
  // 使用具体的正则表达式
}

// 桌面浏览器
if (isDesktopBrowser) {
  // 放在数组中间
  // 使用负向前瞻排除 WebView
}
```

### 步骤 2: 编写正则表达式
```typescript
// WebView 示例
{
  name: 'newWebview',
  pattern: /specific-pattern\/([\d.]+).*webview-identifier/i,
  versionIndex: 1
}

// 桌面浏览器示例
{
  name: 'newBrowser',
  pattern: /browser-pattern\/([\d.]+)(?!.*webview-identifier)/i,
  versionIndex: 1
}
```

### 步骤 3: 确定插入位置
```typescript
export const defaultBrowserPatterns: BrowserPattern[] = [
  // 1. WebView 类型（最前面）
  { name: 'chromeWebview', pattern: /.../ },
  { name: 'safariWebview', pattern: /.../ },
  { name: 'newWebview', pattern: /.../ }, // 新增 WebView
  
  // 2. 桌面浏览器（中间）
  { name: 'edge', pattern: /.../ },
  { name: 'chrome', pattern: /.../ },
  { name: 'newBrowser', pattern: /.../ }, // 新增桌面浏览器
  
  // 3. 通用浏览器（最后）
  { name: 'safari', pattern: /.../ }
];
```

## 常见模式示例

### WebView 模式
```typescript
// Android WebView
{
  name: 'androidWebview',
  pattern: /chrome\/([\d.]+).*(?:wv|version\/[\d.]+)/i,
  versionIndex: 1
}

// iOS WebView
{
  name: 'iosWebview',
  pattern: /applewebkit\/([\d.]+).*(?:mobile|iphone|ipad).*safari/i,
  versionIndex: 1
}
```

### 桌面浏览器模式
```typescript
// 排除 WebView 的桌面浏览器
{
  name: 'desktopBrowser',
  pattern: /browser-pattern\/([\d.]+)(?!.*(?:wv|version\/))/i,
  versionIndex: 1
}

// 排除其他浏览器的特定浏览器
{
  name: 'specificBrowser',
  pattern: /specific-pattern\/([\d.]+)(?!.*other-browser)/i,
  versionIndex: 1
}
```

## 测试新 Pattern

### 1. 创建测试用例
```typescript
describe('New Browser Pattern', () => {
  it('should detect new browser correctly', () => {
    const detector = createFeatureDetector({}, {});
    
    const testUA = 'Mozilla/5.0 (Test Browser) NewBrowser/1.0.0';
    const result = detector.detect('webp', testUA);
    
    expect(result.supported).toBe(true);
  });
});
```

### 2. 验证优先级
```typescript
it('should prioritize new browser over existing ones', () => {
  const detector = createFeatureDetector({}, {});
  
  const testUA = 'Mozilla/5.0 (Test Browser) NewBrowser/1.0.0 Chrome/91.0.4472.124';
  const result = detector.detect('webp', testUA);
  
  // 应该检测为 newBrowser，不是 chrome
  expect(result.supported).toBe(true);
});
```

## 注意事项

1. **正则表达式特异性**: 更具体的模式应该放在前面
2. **负向前瞻**: 使用 `(?!.*pattern)` 排除不需要的匹配
3. **版本号提取**: 确保 `versionIndex` 正确指向版本号组
4. **测试覆盖**: 为新的 pattern 创建完整的测试用例
5. **文档更新**: 更新相关文档和注释

## 调试技巧

### 1. 使用正则表达式测试工具
- [Regex101](https://regex101.com/)
- [RegExr](https://regexr.com/)

### 2. 测试不同 User Agent
```typescript
const testUAs = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/91.0.4472.120 Mobile Safari/537.36 wv',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
];

testUAs.forEach(ua => {
  const result = detector.detect('webp', ua);
  console.log(`${ua} -> ${result.supported ? 'Supported' : 'Not supported'}`);
});
```

### 3. 检查匹配顺序
```typescript
// 在 detectBrowser 方法中添加调试日志
console.log(`Testing pattern: ${pattern.name}`);
console.log(`Pattern: ${pattern.pattern}`);
console.log(`Match result: ${match}`);
```
