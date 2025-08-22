import React, { useRef, useState } from 'react';
import { useElementPosition } from 'react-intersection-tool';

/**
 * useElementPosition 使用示例
 * 展示实时位置跟踪功能
 */
export function UseElementPositionExample() {
  const [isTracking, setIsTracking] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  
  const element1Ref = useRef<HTMLDivElement>(null);
  const element2Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const element3Ref = useRef<HTMLDivElement>(null);

  // 基于 viewport 的位置跟踪
  const position1 = useElementPosition(element1Ref, {
    step: 0.1, // 每 10% 触发一次
    throttle: 16, // 60fps
    skipWhenOffscreen: true
  });

  // 高频率位置跟踪
  const position2 = useElementPosition(element2Ref, {
    step: 0.05, // 每 5% 触发一次，更精确
    throttle: 8, // 120fps，更流畅
    skipWhenOffscreen: false // 即使不可见也跟踪
  });

  // 基于自定义容器的位置跟踪
  const position3 = useElementPosition(element3Ref, {
    root: containerRef.current,
    step: 0.25, // 每 25% 触发一次
    throttle: 50 // 20fps，降低频率
  });

  const formatPosition = (position: any) => {
    if (!position) return '未检测到';
    
    return {
      visible: `${(position.intersectionRatio * 100).toFixed(1)}%`,
      top: position.boundingClientRect.top.toFixed(1),
      left: position.boundingClientRect.left.toFixed(1),
      width: position.boundingClientRect.width.toFixed(1),
      height: position.boundingClientRect.height.toFixed(1),
      isIntersecting: position.isIntersecting,
      time: new Date(position.time).toLocaleTimeString()
    };
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>useElementPosition 实时位置跟踪</h2>
      
      {/* 控制面板 */}
      <div style={{
        position: 'sticky',
        top: '20px',
        background: 'white',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '20px',
        zIndex: 100
      }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '15px' }}>
          <button
            onClick={() => setIsTracking(!isTracking)}
            style={{
              padding: '8px 16px',
              background: isTracking ? '#e74c3c' : '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {isTracking ? '🛑 停止跟踪' : '▶️ 开始跟踪'}
          </button>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            style={{
              padding: '8px 16px',
              background: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {showDetails ? '📊 隐藏详情' : '📊 显示详情'}
          </button>
        </div>

        {/* 实时数据显示 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
          <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#495057' }}>🎯 元素 1 (基础跟踪)</h4>
            <div style={{ fontSize: '12px', fontFamily: 'monospace' }}>
              <div>可见: {formatPosition(position1).visible}</div>
              <div>位置: ({formatPosition(position1).left}, {formatPosition(position1).top})</div>
              <div>状态: {formatPosition(position1).isIntersecting ? '✅ 可见' : '❌ 不可见'}</div>
            </div>
          </div>
          
          <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#495057' }}>⚡ 元素 2 (高频跟踪)</h4>
            <div style={{ fontSize: '12px', fontFamily: 'monospace' }}>
              <div>可见: {formatPosition(position2).visible}</div>
              <div>位置: ({formatPosition(position2).left}, {formatPosition(position2).top})</div>
              <div>状态: {formatPosition(position2).isIntersecting ? '✅ 可见' : '❌ 不可见'}</div>
            </div>
          </div>
          
          <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#495057' }}>📦 元素 3 (容器内)</h4>
            <div style={{ fontSize: '12px', fontFamily: 'monospace' }}>
              <div>可见: {formatPosition(position3).visible}</div>
              <div>位置: ({formatPosition(position3).left}, {formatPosition(position3).top})</div>
              <div>状态: {formatPosition(position3).isIntersecting ? '✅ 可见' : '❌ 不可见'}</div>
            </div>
          </div>
        </div>

        {/* 详细信息 */}
        {showDetails && (
          <details open style={{ marginTop: '15px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              📋 详细位置数据
            </summary>
            <div style={{ 
              background: '#2c3e50', 
              color: '#ecf0f1', 
              padding: '10px', 
              borderRadius: '4px', 
              marginTop: '10px',
              fontFamily: 'monospace',
              fontSize: '11px'
            }}>
              {[
                { name: '元素 1', pos: position1 },
                { name: '元素 2', pos: position2 },
                { name: '元素 3', pos: position3 }
              ].map(({ name, pos }) => (
                <div key={name} style={{ marginBottom: '10px' }}>
                  <strong>{name}:</strong> {pos ? JSON.stringify(formatPosition(pos), null, 2) : '未检测到'}
                </div>
              ))}
            </div>
          </details>
        )}
      </div>

      {/* 滚动提示 */}
      <div style={{ height: '40vh', background: '#ecf0f1', margin: '20px 0' }}>
        <div style={{ 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '18px',
          color: '#7f8c8d'
        }}>
          📜 滚动页面观察位置变化
        </div>
      </div>

      {/* 元素 1: 基础位置跟踪 */}
      <section style={{ marginBottom: '80px' }}>
        <h3>🎯 元素 1: 基础位置跟踪</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>配置: step=0.1, throttle=16ms, skipWhenOffscreen=true</p>
        <div
          ref={element1Ref}
          style={{
            height: '150px',
            background: position1?.isIntersecting 
              ? `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
              : '#e9ecef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            color: position1?.isIntersecting ? 'white' : '#6c757d',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '5px' }}>
              {position1?.isIntersecting ? '👁️' : '📍'}
            </div>
            <div>基础位置跟踪</div>
            {position1 && (
              <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.8 }}>
                可见度: {(position1.intersectionRatio * 100).toFixed(1)}%
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 元素 2: 高频率跟踪 */}
      <section style={{ marginBottom: '80px' }}>
        <h3>⚡ 元素 2: 高频率跟踪</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>配置: step=0.05, throttle=8ms, skipWhenOffscreen=false</p>
        <div
          ref={element2Ref}
          style={{
            height: '150px',
            background: position2?.isIntersecting 
              ? `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`
              : '#e9ecef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            transition: 'all 0.1s ease', // 更快的过渡
            color: position2?.isIntersecting ? 'white' : '#6c757d',
            fontSize: '16px',
            fontWeight: 'bold',
            transform: position2 ? `scale(${0.95 + position2.intersectionRatio * 0.1})` : 'scale(0.95)'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '5px' }}>
              {position2?.isIntersecting ? '🚀' : '📍'}
            </div>
            <div>高频率跟踪</div>
            {position2 && (
              <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.8 }}>
                可见度: {(position2.intersectionRatio * 100).toFixed(1)}%
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 自定义容器的位置跟踪 */}
      <section style={{ marginBottom: '80px' }}>
        <h3>📦 基于自定义容器的位置跟踪</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>配置: 自定义容器, step=0.25, throttle=50ms</p>
        
        <div
          ref={containerRef}
          style={{
            height: '300px',
            border: '3px solid #3498db',
            borderRadius: '12px',
            overflow: 'auto',
            background: '#f8f9fa',
            position: 'relative'
          }}
        >
          {/* 容器内容 */}
          <div style={{ height: '200px', background: '#ffffff', margin: '20px', borderRadius: '8px' }}>
            <div style={{ 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#7f8c8d'
            }}>
              在容器内滚动
            </div>
          </div>

          {/* 被跟踪的元素 */}
          <div
            ref={element3Ref}
            style={{
              height: '120px',
              background: position3?.isIntersecting 
                ? `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`
                : '#dee2e6',
              margin: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              color: position3?.isIntersecting ? 'white' : '#6c757d',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', marginBottom: '5px' }}>
                {position3?.isIntersecting ? '🎯' : '📍'}
              </div>
              <div>容器内跟踪</div>
              {position3 && (
                <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.8 }}>
                  可见度: {(position3.intersectionRatio * 100).toFixed(1)}%
                </div>
              )}
            </div>
          </div>

          {/* 容器底部内容 */}
          <div style={{ height: '300px', background: '#ffffff', margin: '20px', borderRadius: '8px' }}>
            <div style={{ 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#7f8c8d'
            }}>
              容器底部内容
            </div>
          </div>
        </div>
      </section>

      {/* 结束空间 */}
      <div style={{ height: '50vh', background: '#f8f9fa' }}>
        <div style={{ 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '16px',
          color: '#95a5a6'
        }}>
          📊 位置跟踪演示完成
        </div>
      </div>
    </div>
  );
}
