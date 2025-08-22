import React, { useRef, useState } from 'react';
import { useOneOffVisibility } from '@fly4react/observer';

/**
 * useOneOffVisibility 使用示例
 * 展示一次性可见性检测的各种应用场景
 */
export function UseOneOffVisibilityExample() {
  const [triggerCount, setTriggerCount] = useState(0);
  
  // 多个观察元素的 refs
  const trigger1Ref = useRef<HTMLDivElement>(null);
  const trigger2Ref = useRef<HTMLDivElement>(null);
  const trigger3Ref = useRef<HTMLDivElement>(null);
  const trigger4Ref = useRef<HTMLDivElement>(null);

  // 使用不同的配置检测可见性
  const isVisible1 = useOneOffVisibility(trigger1Ref, {
    threshold: 0.1 // 10% 可见时触发
  });

  const isVisible2 = useOneOffVisibility(trigger2Ref, {
    threshold: 0.5 // 50% 可见时触发
  });

  const isVisible3 = useOneOffVisibility(trigger3Ref, {
    threshold: 1.0 // 完全可见时触发
  });

  const isVisible4 = useOneOffVisibility(trigger4Ref, {
    rootMargin: '100px' // 提前 100px 触发
  });

  // 模拟动画效果
  const AnimatedElement = ({ 
    isVisible, 
    children, 
    delay = 0 
  }: { 
    isVisible: boolean; 
    children: React.ReactNode; 
    delay?: number;
  }) => (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );

  // 计数触发器
  React.useEffect(() => {
    if (isVisible1 || isVisible2 || isVisible3 || isVisible4) {
      setTriggerCount(prev => prev + 1);
    }
  }, [isVisible1, isVisible2, isVisible3, isVisible4]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>useOneOffVisibility 示例</h2>
      
      {/* 状态面板 */}
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
        <h3 style={{ margin: '0 0 10px 0' }}>🎯 触发状态监控</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          <div style={{ 
            padding: '8px', 
            background: isVisible1 ? '#d4edda' : '#f8d7da',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            触发器 1 (10%): {isVisible1 ? '✅ 已触发' : '⏳ 等待中'}
          </div>
          <div style={{ 
            padding: '8px', 
            background: isVisible2 ? '#d4edda' : '#f8d7da',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            触发器 2 (50%): {isVisible2 ? '✅ 已触发' : '⏳ 等待中'}
          </div>
          <div style={{ 
            padding: '8px', 
            background: isVisible3 ? '#d4edda' : '#f8d7da',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            触发器 3 (100%): {isVisible3 ? '✅ 已触发' : '⏳ 等待中'}
          </div>
          <div style={{ 
            padding: '8px', 
            background: isVisible4 ? '#d4edda' : '#f8d7da',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            触发器 4 (提前): {isVisible4 ? '✅ 已触发' : '⏳ 等待中'}
          </div>
        </div>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          总触发次数: {triggerCount}
        </div>
      </div>

      {/* 滚动提示 */}
      <div style={{ height: '60vh', background: '#f8f9fa', margin: '20px 0' }}>
        <div style={{ 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '18px',
          color: '#6c757d'
        }}>
          📜 向下滚动触发各种可见性检测
        </div>
      </div>

      {/* 触发器 1: 10% 可见性触发 */}
      <section style={{ marginBottom: '100px' }}>
        <h3>🎯 触发器 1: 10% 可见性触发</h3>
        <div
          ref={trigger1Ref}
          style={{
            height: '200px',
            background: isVisible1 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : '#e9ecef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            border: isVisible1 ? '3px solid #667eea' : '3px solid transparent'
          }}
        >
          <AnimatedElement isVisible={isVisible1}>
            <div style={{ textAlign: 'center', color: isVisible1 ? 'white' : '#6c757d' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>
                {isVisible1 ? '🎉' : '⏳'}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {isVisible1 ? '已触发！' : '等待 10% 可见'}
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* 触发器 2: 50% 可见性触发 */}
      <section style={{ marginBottom: '100px' }}>
        <h3>🎯 触发器 2: 50% 可见性触发</h3>
        <div
          ref={trigger2Ref}
          style={{
            height: '200px',
            background: isVisible2 
              ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
              : '#e9ecef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            border: isVisible2 ? '3px solid #f093fb' : '3px solid transparent'
          }}
        >
          <AnimatedElement isVisible={isVisible2} delay={200}>
            <div style={{ textAlign: 'center', color: isVisible2 ? 'white' : '#6c757d' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>
                {isVisible2 ? '🚀' : '⏳'}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {isVisible2 ? '已触发！' : '等待 50% 可见'}
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* 触发器 3: 100% 可见性触发 */}
      <section style={{ marginBottom: '100px' }}>
        <h3>🎯 触发器 3: 100% 可见性触发</h3>
        <div
          ref={trigger3Ref}
          style={{
            height: '200px',
            background: isVisible3 
              ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
              : '#e9ecef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            border: isVisible3 ? '3px solid #4facfe' : '3px solid transparent'
          }}
        >
          <AnimatedElement isVisible={isVisible3} delay={400}>
            <div style={{ textAlign: 'center', color: isVisible3 ? 'white' : '#6c757d' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>
                {isVisible3 ? '💯' : '⏳'}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {isVisible3 ? '完全可见！' : '等待完全可见'}
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* 触发器 4: 提前触发 */}
      <section style={{ marginBottom: '100px' }}>
        <h3>🎯 触发器 4: 提前 100px 触发</h3>
        <div
          ref={trigger4Ref}
          style={{
            height: '200px',
            background: isVisible4 
              ? 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
              : '#e9ecef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            border: isVisible4 ? '3px solid #fa709a' : '3px solid transparent'
          }}
        >
          <AnimatedElement isVisible={isVisible4} delay={600}>
            <div style={{ textAlign: 'center', color: isVisible4 ? 'white' : '#6c757d' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>
                {isVisible4 ? '⚡' : '⏳'}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {isVisible4 ? '提前触发！' : '等待提前触发'}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>
                (rootMargin: 100px)
              </div>
            </div>
          </AnimatedElement>
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
          🎊 所有触发器测试完成！
        </div>
      </div>
    </div>
  );
}
