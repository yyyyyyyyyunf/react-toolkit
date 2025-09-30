import { useInViewport } from '@fly4react/observer';
import { useEffect, useRef } from 'react';

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

  // 使用默认配置检测元素是否在视口中
  const isInViewport2 = useInViewport(ref2);

  // 使用默认配置检测元素是否在视口中
  const isInViewport3 = useInViewport(ref3);

  // 添加 console 输出
  console.log('useInViewport 状态变化:', {
    示例1: isInViewport1,
    示例2: isInViewport2,
    示例3: isInViewport3,
  });

  // 添加更详细的调试信息
  useEffect(() => {
    if (ref1.current) {
      const rect = ref1.current.getBoundingClientRect();
      console.log('示例1 元素位置:', {
        top: rect.top,
        bottom: rect.bottom,
        height: rect.height,
        isInViewport: isInViewport1,
      });
    }
  }, [isInViewport1]);

  useEffect(() => {
    if (ref2.current) {
      const rect = ref2.current.getBoundingClientRect();
      console.log('示例2 元素位置:', {
        top: rect.top,
        bottom: rect.bottom,
        height: rect.height,
        isInViewport: isInViewport2,
      });
    }
  }, [isInViewport2]);

  useEffect(() => {
    if (ref3.current) {
      const rect = ref3.current.getBoundingClientRect();
      console.log('示例3 元素位置:', {
        top: rect.top,
        bottom: rect.bottom,
        height: rect.height,
        isInViewport: isInViewport3,
      });
    }
  }, [isInViewport3]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>useInViewport Hook 示例</h1>

      {/* 顶部占位区域，确保示例元素初始在视口外 */}
      <div
        style={{
          height: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '40px',
          borderRadius: '12px',
        }}
      >
        👆 向下滚动查看 useInViewport 效果
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>功能说明</h2>
        <p>
          <code>useInViewport</code> 是一个简化的 hook，用于检测元素是否在视口中可见。 它基于{' '}
          <code>useIntersectionRatio</code> 实现，返回一个简单的 boolean 值。
        </p>
        <ul>
          <li>
            <strong>返回值</strong>：boolean - 元素是否在视口中可见
          </li>
          <li>
            <strong>参数</strong>：ref 和可选的配置选项
          </li>
          <li>
            <strong>特点</strong>：简单易用，适合只需要可见性状态的场景
          </li>
        </ul>
      </div>

      {/* 示例 1：默认配置 */}
      <div style={{ marginBottom: '60px' }}>
        <h3>示例 1：默认配置</h3>
        <p style={{ color: '#666', marginBottom: '20px' }}>向下滚动查看元素状态变化</p>
        <div
          ref={ref1}
          style={{
            height: '300px',
            backgroundColor: isInViewport1 ? '#4CAF50' : '#f44336',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            transition: 'all 0.5s ease',
            marginBottom: '20px',
            borderRadius: '12px',
            boxShadow: isInViewport1
              ? '0 8px 25px rgba(76, 175, 80, 0.3)'
              : '0 4px 15px rgba(244, 67, 54, 0.3)',
            transform: isInViewport1 ? 'scale(1.02)' : 'scale(1)',
          }}
        >
          {isInViewport1 ? '✅ 元素在视口中可见' : '❌ 元素不在视口中'}
        </div>
        <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
          <strong>状态</strong>：{isInViewport1 ? '🟢 可见' : '🔴 不可见'}
        </p>
      </div>

      {/* 示例 2：默认配置 */}
      <div style={{ marginBottom: '60px' }}>
        <h3>示例 2：默认配置</h3>
        <p style={{ color: '#666', marginBottom: '20px' }}>继续向下滚动查看元素状态变化</p>
        <div
          ref={ref2}
          style={{
            height: '300px',
            backgroundColor: isInViewport2 ? '#2196F3' : '#FF9800',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            transition: 'all 0.5s ease',
            marginBottom: '20px',
            borderRadius: '12px',
            boxShadow: isInViewport2
              ? '0 8px 25px rgba(33, 150, 243, 0.3)'
              : '0 4px 15px rgba(255, 152, 0, 0.3)',
            transform: isInViewport2 ? 'scale(1.02)' : 'scale(1)',
          }}
        >
          {isInViewport2 ? '✅ 元素在视口中可见' : '❌ 元素不在视口中'}
        </div>
        <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
          <strong>状态</strong>：{isInViewport2 ? '🟢 可见' : '🔴 不可见'}
        </p>
        <p style={{ color: '#666' }}>
          <strong>配置</strong>：使用默认配置
        </p>
      </div>

      {/* 示例 3：默认配置 */}
      <div style={{ marginBottom: '60px' }}>
        <h3>示例 3：默认配置</h3>
        <p style={{ color: '#666', marginBottom: '20px' }}>继续向下滚动查看元素状态变化</p>
        <div
          ref={ref3}
          style={{
            height: '300px',
            backgroundColor: isInViewport3 ? '#9C27B0' : '#607D8B',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            transition: 'all 0.5s ease',
            marginBottom: '20px',
            borderRadius: '12px',
            boxShadow: isInViewport3
              ? '0 8px 25px rgba(156, 39, 176, 0.3)'
              : '0 4px 15px rgba(96, 125, 139, 0.3)',
            transform: isInViewport3 ? 'scale(1.02)' : 'scale(1)',
          }}
        >
          {isInViewport3 ? '✅ 元素在视口中可见' : '❌ 元素不在视口中'}
        </div>
        <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
          <strong>状态</strong>：{isInViewport3 ? '🟢 可见' : '🔴 不可见'}
        </p>
        <p style={{ color: '#666' }}>
          <strong>配置</strong>：使用默认配置
        </p>
      </div>

      {/* 使用说明 */}
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '30px',
          borderRadius: '12px',
          marginTop: '40px',
          color: 'white',
          boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
        }}
      >
        <h3 style={{ color: 'white', marginBottom: '20px', fontSize: '24px' }}>📚 使用说明</h3>
        <div style={{ marginBottom: '25px' }}>
          <h4 style={{ color: 'white', marginBottom: '10px', fontSize: '18px' }}>🔧 基本用法：</h4>
          <pre
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              padding: '15px',
              borderRadius: '8px',
              overflow: 'auto',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '14px',
            }}
          >
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

        <div style={{ marginBottom: '25px' }}>
          <h4 style={{ color: 'white', marginBottom: '10px', fontSize: '18px' }}>
            ⚙️ 带配置的用法：
          </h4>
          <pre
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              padding: '15px',
              borderRadius: '8px',
              overflow: 'auto',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '14px',
            }}
          >
            {'const isInViewport = useInViewport(ref);'}
          </pre>
        </div>

        <div>
          <h4 style={{ color: 'white', marginBottom: '10px', fontSize: '18px' }}>📋 配置选项：</h4>
          <ul style={{ color: 'white', fontSize: '16px', lineHeight: '1.6' }}>
            <li style={{ marginBottom: '8px' }}>
              <code
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}
              >
                useInViewport
              </code>
              ：使用默认配置，无需额外参数
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>特点：</strong>简单易用，开箱即用，无需复杂配置
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>性能：</strong>基于 IntersectionObserver，性能优异
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>兼容性：</strong>使用标准 polyfill，支持所有浏览器
            </li>
          </ul>
        </div>
      </div>

      {/* 滚动提示 */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#333',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '20px',
          fontSize: '14px',
        }}
      >
        👆 滚动页面查看效果
      </div>
    </div>
  );
}
