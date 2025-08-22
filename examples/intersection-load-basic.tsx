import React from 'react';
import { IntersectionLoad } from 'react-intersection-tool';

/**
 * IntersectionLoad 基础使用示例
 * 展示懒加载的基本功能
 */
export function BasicLazyLoadExample() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>基础懒加载示例</h2>
      
      {/* 创建一些空间，需要滚动才能看到懒加载元素 */}
      <div style={{ height: '100vh', background: '#f0f0f0', margin: '20px 0' }}>
        滚动下面查看懒加载效果
      </div>
      
      {/* 基础懒加载 */}
      <IntersectionLoad
        height={300}
        placeholder={
          <div style={{ 
            height: '300px', 
            background: '#e0e0e0', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '18px',
            color: '#666'
          }}>
            📦 正在加载...
          </div>
        }
        threshold={0.1} // 10% 可见时触发
        offset={100} // 提前 100px 开始加载
      >
        <div style={{ 
          height: '300px', 
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '24px',
          color: 'white',
          fontWeight: 'bold'
        }}>
          🎉 内容已加载！
        </div>
      </IntersectionLoad>

      {/* 更多内容 */}
      <div style={{ height: '50vh', background: '#f9f9f9', margin: '20px 0' }}>
        更多内容...
      </div>
    </div>
  );
}
