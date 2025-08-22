import React, { useRef, useState } from 'react';
import { useIntersectionObserver, type ObserverCallbackParamType } from '@fly4react/observer';

/**
 * useIntersectionObserver 基础使用示例
 * 展示最底层的 Intersection Observer Hook 的使用
 */
export function UseIntersectionObserverExample() {
  const [status, setStatus] = useState<'waiting' | 'visible' | 'hidden'>('waiting');
  const [details, setDetails] = useState<string>('');
  const [intersectionData, setIntersectionData] = useState<Partial<ObserverCallbackParamType>>({});
  
  const targetRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver(
    targetRef,
    (entry: ObserverCallbackParamType) => {
      // 更新可见性状态
      setStatus(entry.isIntersecting ? 'visible' : 'hidden');
      
      // 更新详细信息
      const ratio = (entry.intersectionRatio * 100).toFixed(1);
      const scrollDir = entry.scrollDirection || 'none';
      setDetails(`可见比例: ${ratio}%, 滚动方向: ${scrollDir}`);
      
      // 保存完整的 intersection 数据
      setIntersectionData({
        isIntersecting: entry.isIntersecting,
        intersectionRatio: entry.intersectionRatio,
        scrollDirection: entry.scrollDirection,
        time: entry.time,
        boundingClientRect: entry.boundingClientRect,
        intersectionRect: entry.intersectionRect,
        rootBounds: entry.rootBounds
      });
      
      console.log('Intersection Observer 回调:', entry);
    },
    {
      threshold: [0, 0.25, 0.5, 0.75, 1], // 多个阈值，获得更精确的可见性信息
      rootMargin: '50px', // 提前 50px 触发
    }
  );

  const getStatusColor = () => {
    switch (status) {
      case 'visible': return '#27ae60';
      case 'hidden': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'visible': return '👁️';
      case 'hidden': return '🙈';
      default: return '⏳';
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>useIntersectionObserver 基础示例</h2>
      
      {/* 状态显示面板 */}
      <div style={{
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: `3px solid ${getStatusColor()}`
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: getStatusColor() }}>
          {getStatusIcon()} 观察状态: {status.toUpperCase()}
        </h3>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>{details}</p>
        
        {/* 详细数据显示 */}
        {intersectionData.boundingClientRect && (
          <details style={{ marginTop: '15px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              📊 详细数据
            </summary>
            <div style={{ 
              background: '#ffffff', 
              padding: '10px', 
              borderRadius: '4px', 
              marginTop: '10px',
              fontFamily: 'monospace',
              fontSize: '12px'
            }}>
              <div><strong>是否相交:</strong> {intersectionData.isIntersecting ? '是' : '否'}</div>
              <div><strong>相交比例:</strong> {intersectionData.intersectionRatio?.toFixed(3)}</div>
              <div><strong>滚动方向:</strong> {intersectionData.scrollDirection}</div>
              <div><strong>时间戳:</strong> {intersectionData.time?.toFixed(2)}ms</div>
              <div><strong>元素位置:</strong> 
                top: {intersectionData.boundingClientRect?.top.toFixed(1)}, 
                left: {intersectionData.boundingClientRect?.left.toFixed(1)}
              </div>
              <div><strong>元素尺寸:</strong> 
                {intersectionData.boundingClientRect?.width.toFixed(1)} × 
                {intersectionData.boundingClientRect?.height.toFixed(1)}
              </div>
            </div>
          </details>
        )}
      </div>

      {/* 创建滚动空间 */}
      <div style={{ height: '80vh', background: '#ecf0f1', margin: '20px 0' }}>
        <div style={{ 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '18px',
          color: '#7f8c8d'
        }}>
          ⬇️ 向下滚动查看观察元素
        </div>
      </div>

      {/* 被观察的目标元素 */}
      <div
        ref={targetRef}
        style={{
          height: '200px',
          background: `linear-gradient(135deg, ${getStatusColor()} 0%, ${getStatusColor()}88 100%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          transform: status === 'visible' ? 'scale(1.02)' : 'scale(1)',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>
          {getStatusIcon()}
        </div>
        <div>被观察的元素</div>
        <div style={{ fontSize: '14px', marginTop: '5px', opacity: 0.9 }}>
          {details}
        </div>
      </div>

      {/* 更多空间 */}
      <div style={{ height: '50vh', background: '#f8f9fa', margin: '20px 0' }}>
        <div style={{ 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '16px',
          color: '#95a5a6'
        }}>
          继续滚动测试 hidden 状态
        </div>
      </div>
    </div>
  );
}
