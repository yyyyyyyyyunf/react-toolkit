import React, { useRef } from 'react';
import { useInViewport } from '@fly4react/observer';

/**
 * useInViewport Hook 示例
 * 
 * 这个示例展示了如何使用 useInViewport hook 来检测元素是否在视口中可见。
 * useInViewport 是一个简化的 hook，基于 useIntersectionRatio 实现，
 * 专门用于需要简单可见性检测的场景。
 */

export function UseInViewportExample() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);

  // 使用默认配置检测元素是否在视口中
  const isInViewport1 = useInViewport(ref1);
  
  // 使用自定义配置，每 10% 触发一次，60fps 节流
  const isInViewport2 = useInViewport(ref2, {
    step: 0.1,
    throttle: 16
  });
  
  // 使用更敏感的配置，每 5% 触发一次
  const isInViewport3 = useInViewport(ref3, {
    step: 0.05,
    throttle: 8
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>useInViewport Hook 示例</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>功能说明</h2>
        <p>
          <code>useInViewport</code> 是一个简化的 hook，用于检测元素是否在视口中可见。
          它基于 <code>useIntersectionRatio</code> 实现，返回一个简单的 boolean 值。
        </p>
        <ul>
          <li><strong>返回值</strong>：boolean - 元素是否在视口中可见</li>
          <li><strong>参数</strong>：ref 和可选的配置选项</li>
          <li><strong>特点</strong>：简单易用，适合只需要可见性状态的场景</li>
        </ul>
      </div>

      {/* 示例 1：默认配置 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>示例 1：默认配置</h3>
        <div
          ref={ref1}
          style={{
            height: '200px',
            backgroundColor: isInViewport1 ? '#4CAF50' : '#f44336',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
            marginBottom: '20px'
          }}
        >
          {isInViewport1 ? '✅ 元素在视口中可见' : '❌ 元素不在视口中'}
        </div>
        <p>
          <strong>状态</strong>：{isInViewport1 ? '可见' : '不可见'}
        </p>
      </div>

      {/* 示例 2：自定义配置 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>示例 2：自定义配置 (step: 0.1, throttle: 16)</h3>
        <div
          ref={ref2}
          style={{
            height: '200px',
            backgroundColor: isInViewport2 ? '#2196F3' : '#FF9800',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
            marginBottom: '20px'
          }}
        >
          {isInViewport2 ? '✅ 元素在视口中可见' : '❌ 元素不在视口中'}
        </div>
        <p>
          <strong>状态</strong>：{isInViewport2 ? '可见' : '不可见'}
        </p>
        <p>
          <strong>配置</strong>：每 10% 触发一次，60fps 节流
        </p>
      </div>

      {/* 示例 3：更敏感的配置 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>示例 3：更敏感的配置 (step: 0.05, throttle: 8)</h3>
        <div
          ref={ref3}
          style={{
            height: '200px',
            backgroundColor: isInViewport3 ? '#9C27B0' : '#607D8B',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
            marginBottom: '20px'
          }}
        >
          {isInViewport3 ? '✅ 元素在视口中可见' : '❌ 元素不在视口中'}
        </div>
        <p>
          <strong>状态</strong>：{isInViewport3 ? '可见' : '不可见'}
        </p>
        <p>
          <strong>配置</strong>：每 5% 触发一次，120fps 节流（更敏感）
        </p>
      </div>

      {/* 使用说明 */}
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '40px'
      }}>
        <h3>使用说明</h3>
        <div style={{ marginBottom: '15px' }}>
          <h4>基本用法：</h4>
          <pre style={{ 
            backgroundColor: '#fff', 
            padding: '10px', 
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`import { useInViewport } from '@fly4react/observer';

const MyComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInViewport = useInViewport(ref);
  
  return (
    <div ref={ref}>
      {isInViewport ? '可见' : '不可见'}
    </div>
  );
};`}
          </pre>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h4>带配置的用法：</h4>
          <pre style={{ 
            backgroundColor: '#fff', 
            padding: '10px', 
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`const isInViewport = useInViewport(ref, {
  step: 0.1,        // 每 10% 触发一次
  throttle: 16,     // 60fps 节流
  rootMargin: '50px' // 50px 的边距
});`}
          </pre>
        </div>

        <div>
          <h4>配置选项：</h4>
          <ul>
            <li><code>step</code>：触发阈值步长（0-1）</li>
            <li><code>throttle</code>：节流时间（毫秒）</li>
            <li><code>rootMargin</code>：根元素边距</li>
            <li><code>threshold</code>：自定义阈值数组</li>
          </ul>
        </div>
      </div>

      {/* 滚动提示 */}
      <div style={{ 
        position: 'fixed', 
        bottom: '20px', 
        right: '20px',
        backgroundColor: '#333',
        color: 'white',
        padding: '10px 15px',
        borderRadius: '20px',
        fontSize: '14px'
      }}>
        👆 滚动页面查看效果
      </div>
    </div>
  );
};


