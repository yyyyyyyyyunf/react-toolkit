import React, { useRef } from 'react';
import { useElementPosition, useScrollDirection } from 'react-intersection-tool';

/**
 * 视差滚动示例
 * 展示如何使用位置跟踪和滚动方向检测实现视差效果
 */
export function ParallaxScrollExample() {
  const hero1Ref = useRef<HTMLDivElement>(null);
  const hero2Ref = useRef<HTMLDivElement>(null);
  const hero3Ref = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // 获取各个元素的位置信息
  const hero1Position = useElementPosition(hero1Ref, {
    step: 0.02, // 高频更新，更流畅的视差效果
    throttle: 8,
    skipWhenOffscreen: false // 即使不可见也要跟踪，用于视差计算
  });

  const hero2Position = useElementPosition(hero2Ref, {
    step: 0.02,
    throttle: 8,
    skipWhenOffscreen: false
  });

  const hero3Position = useElementPosition(hero3Ref, {
    step: 0.02,
    throttle: 8,
    skipWhenOffscreen: false
  });

  // 滚动方向检测
  const { scrollDirection, isScrolling } = useScrollDirection(scrollIndicatorRef, {
    step: 0.1,
    throttle: 50
  });

  // 计算视差偏移
  const calculateParallax = (position: any, speed: number = 0.5) => {
    if (!position) return 0;
    
    const elementTop = position.boundingClientRect.top;
    const windowHeight = window.innerHeight;
    
    // 当元素在视口中心时偏移为0，向上滚动时负偏移，向下滚动时正偏移
    const offset = (elementTop - windowHeight / 2) * speed;
    
    return offset;
  };

  const hero1Offset = calculateParallax(hero1Position, 0.3);
  const hero2Offset = calculateParallax(hero2Position, -0.2); // 反向滚动
  const hero3Offset = calculateParallax(hero3Position, 0.4);

  // 获取滚动进度
  const getScrollProgress = (position: any) => {
    if (!position) return 0;
    
    const elementTop = position.boundingClientRect.top;
    const windowHeight = window.innerHeight;
    const elementHeight = position.boundingClientRect.height;
    
    // 计算元素从底部进入到顶部离开的进度
    const totalDistance = windowHeight + elementHeight;
    const currentPosition = windowHeight - elementTop;
    const progress = Math.max(0, Math.min(1, currentPosition / totalDistance));
    
    return progress;
  };

  const hero1Progress = getScrollProgress(hero1Position);
  const hero2Progress = getScrollProgress(hero2Position);
  const hero3Progress = getScrollProgress(hero3Position);

  return (
    <div style={{ overflow: 'hidden' }}>
      <h2 style={{ textAlign: 'center', padding: '20px', margin: 0 }}>视差滚动示例</h2>
      
      {/* 滚动指示器 */}
      <div 
        ref={scrollIndicatorRef}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          zIndex: 1000,
          fontSize: '14px',
          fontFamily: 'monospace'
        }}
      >
        <div>🧭 滚动方向: {scrollDirection}</div>
        <div>🎯 滚动状态: {isScrolling ? '滚动中' : '静止'}</div>
        <div style={{ marginTop: '10px', fontSize: '12px', opacity: 0.8 }}>
          <div>Hero1 进度: {(hero1Progress * 100).toFixed(0)}%</div>
          <div>Hero2 进度: {(hero2Progress * 100).toFixed(0)}%</div>
          <div>Hero3 进度: {(hero3Progress * 100).toFixed(0)}%</div>
        </div>
      </div>

      {/* 初始空间 */}
      <div style={{ height: '50vh', background: '#f8f9fa' }}>
        <div style={{ 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '18px',
          color: '#6c757d'
        }}>
          🌊 开始视差滚动之旅
        </div>
      </div>

      {/* Hero Section 1 - 向下视差 */}
      <div
        ref={hero1Ref}
        style={{
          height: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* 背景层 - 慢速滚动 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            transform: `translateY(${hero1Offset * 0.5}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        
        {/* 前景内容 */}
        <div
          style={{
            textAlign: 'center',
            color: 'white',
            zIndex: 1,
            transform: `translateY(${hero1Offset}px)`,
            transition: 'transform 0.1s ease-out',
            opacity: 1 - hero1Progress * 0.5 // 滚动时逐渐变透明
          }}
        >
          <h1 style={{ 
            fontSize: '4rem', 
            margin: '0 0 20px 0',
            transform: `scale(${1 + hero1Progress * 0.2})` // 滚动时轻微放大
          }}>
            🌟 视差效果 1
          </h1>
          <p style={{ fontSize: '1.5rem', margin: 0 }}>
            向下滚动，感受视差魅力
          </p>
          <div style={{ 
            marginTop: '30px', 
            fontSize: '14px', 
            opacity: 0.8,
            transform: `translateY(${-hero1Offset * 0.5}px)` // 反向移动
          }}>
            滚动进度: {(hero1Progress * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      {/* 分隔区域 */}
      <div style={{ 
        height: '50vh', 
        background: '#2c3e50',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '18px'
      }}>
        📜 继续滚动探索更多效果
      </div>

      {/* Hero Section 2 - 反向视差 */}
      <div
        ref={hero2Ref}
        style={{
          height: '100vh',
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* 反向移动的背景元素 */}
        <div
          style={{
            position: 'absolute',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            transform: `translate(${-hero2Offset * 0.3}px, ${hero2Offset * 0.2}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        
        <div
          style={{
            textAlign: 'center',
            color: 'white',
            zIndex: 1,
            transform: `translateY(${hero2Offset}px) rotate(${hero2Progress * 5}deg)`, // 滚动时轻微旋转
            transition: 'transform 0.1s ease-out'
          }}
        >
          <h1 style={{ 
            fontSize: '4rem', 
            margin: '0 0 20px 0',
            filter: `blur(${hero2Progress * 2}px)` // 滚动时轻微模糊
          }}>
            🌀 反向视差
          </h1>
          <p style={{ fontSize: '1.5rem', margin: 0 }}>
            背景反向移动的效果
          </p>
          <div style={{ 
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center',
            gap: '10px'
          }}>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.8)',
                  transform: `translateY(${Math.sin((hero2Progress * Math.PI * 2) + (i * 0.5)) * 20}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section 3 - 复合视差 */}
      <div
        ref={hero3Ref}
        style={{
          height: '100vh',
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* 多层视差背景 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%), linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%)',
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px',
            transform: `translate(${hero3Offset * 0.2}px, ${hero3Offset * 0.1}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.3)',
            transform: `translate(${hero3Offset * 0.8}px, ${hero3Offset * 0.3}px) scale(${1 + hero3Progress * 0.5})`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        
        <div
          style={{
            position: 'absolute',
            top: '60%',
            right: '15%',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.4)',
            transform: `translate(${-hero3Offset * 0.6}px, ${hero3Offset * 0.4}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        
        <div
          style={{
            textAlign: 'center',
            color: 'white',
            zIndex: 1,
            transform: `translateY(${hero3Offset}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <h1 style={{ 
            fontSize: '4rem', 
            margin: '0 0 20px 0',
            textShadow: `${hero3Progress * 10}px ${hero3Progress * 10}px ${hero3Progress * 20}px rgba(0,0,0,0.3)`
          }}>
            🎨 复合视差
          </h1>
          <p style={{ fontSize: '1.5rem', margin: 0 }}>
            多层元素协同运动
          </p>
          
          {/* 进度指示器 */}
          <div style={{ marginTop: '40px' }}>
            <div style={{ 
              width: '200px', 
              height: '4px', 
              background: 'rgba(255,255,255,0.3)', 
              borderRadius: '2px',
              margin: '0 auto',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${hero3Progress * 100}%`,
                height: '100%',
                background: 'white',
                borderRadius: '2px',
                transition: 'width 0.1s ease-out'
              }} />
            </div>
            <div style={{ marginTop: '10px', fontSize: '14px', opacity: 0.8 }}>
              视差进度: {(hero3Progress * 100).toFixed(0)}%
            </div>
          </div>
        </div>
      </div>

      {/* 结束区域 */}
      <div style={{ 
        height: '100vh', 
        background: '#2c3e50',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <h2 style={{ fontSize: '3rem', margin: '0 0 20px 0' }}>🎊</h2>
        <h3 style={{ fontSize: '2rem', margin: '0 0 20px 0' }}>视差滚动演示完成！</h3>
        <p style={{ fontSize: '1.2rem', textAlign: 'center', maxWidth: '600px', lineHeight: 1.6 }}>
          通过 useElementPosition 和 useScrollDirection Hook，
          我们可以轻松实现各种复杂的视差滚动效果。
        </p>
        
        <div style={{ 
          marginTop: '40px',
          padding: '20px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          fontSize: '14px',
          textAlign: 'center'
        }}>
          <div>💡 实现要点:</div>
          <div>• 高频位置更新 (step=0.02, throttle=8ms)</div>
          <div>• 关闭 skipWhenOffscreen 以持续跟踪</div>
          <div>• 基于 boundingClientRect 计算偏移</div>
          <div>• 结合滚动进度实现动画</div>
        </div>
      </div>
    </div>
  );
}
