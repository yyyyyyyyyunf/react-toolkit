import { useIntersectionRatio, useOneOffVisibility } from '@fly4react/observer';
import { useRef } from 'react';

/**
 * 动画触发示例 - 演示 useOneOffVisibility 的使用
 */
export function AnimationTriggersExample() {
  const fadeInRef = useRef<HTMLDivElement>(null);
  const slideInRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  // 使用 useOneOffVisibility 检测元素可见性
  const fadeInVisible = useOneOffVisibility(fadeInRef);
  const slideInVisible = useOneOffVisibility(slideInRef);

  // 用于演示的可见比例
  const intersectionRatio = useIntersectionRatio(demoRef, { step: 0.05 });

  return (
    <div style={{ padding: '20px', background: '#fff', color: '#333' }}>
      <h2>动画触发示例</h2>
      <p>演示如何使用 useOneOffVisibility 和 useIntersectionRatio 实现滚动触发的动画效果</p>

      {/* 可见比例演示 */}
      <div
        style={{
          position: 'sticky',
          top: '20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '15px',
          marginBottom: '20px',
          borderRadius: '8px',
          zIndex: 1000,
        }}
      >
        当前演示区域可见比例:{' '}
        {intersectionRatio !== undefined ? Math.round(intersectionRatio * 100) : 0}%
      </div>

      {/* 滚动提示 */}
      <div
        style={{
          height: '60vh',
          background: '#f8f9fa',
          margin: '20px 0',
          border: '2px dashed #ccc',
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: '#6c757d',
          }}
        >
          🎭 向下滚动查看动画效果
        </div>
      </div>

      {/* 演示区域 */}
      <div
        ref={demoRef}
        style={{
          height: '300px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          margin: '20px 0',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '18px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h3>演示区域</h3>
          <p>滚动这个区域来观察可见比例的变化</p>
          <p>
            可见比例: {intersectionRatio !== undefined ? Math.round(intersectionRatio * 100) : 0}%
          </p>
        </div>
      </div>

      {/* 淡入动画 */}
      <section style={{ marginBottom: '100px' }}>
        <h3>💫 淡入动画</h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
          使用 useOneOffVisibility 检测元素可见性，触发淡入动画
        </p>
        <div
          ref={fadeInRef}
          style={{
            height: '200px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            opacity: fadeInVisible ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            border: fadeInVisible ? '3px solid #28a745' : '3px solid #dc3545',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>💫</div>
            <div>我淡入了！</div>
            <div style={{ fontSize: '14px', marginTop: '10px' }}>
              {fadeInVisible ? '✅ 已触发' : '⏳ 等待触发'}
            </div>
          </div>
        </div>
      </section>

      {/* 滑入动画 */}
      <section style={{ marginBottom: '100px' }}>
        <h3>➡️ 滑入动画</h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
          同样使用 useOneOffVisibility，触发滑入动画效果
        </p>
        <div
          ref={slideInRef}
          style={{
            height: '200px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            transform: slideInVisible ? 'translateX(0)' : 'translateX(-100px)',
            opacity: slideInVisible ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            border: slideInVisible ? '3px solid #28a745' : '3px solid #dc3545',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>➡️</div>
            <div>我滑进来了！</div>
            <div style={{ fontSize: '14px', marginTop: '10px' }}>
              {slideInVisible ? '✅ 已触发' : '⏳ 等待触发'}
            </div>
          </div>
        </div>
      </section>

      {/* 结束空间 */}
      <div style={{ height: '50vh', background: '#f8f9fa', borderRadius: '8px' }}>
        <div
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            color: '#95a5a6',
          }}
        >
          🎊 演示完成！滚动回到顶部查看更多示例
        </div>
      </div>
    </div>
  );
}
