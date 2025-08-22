import React, { useState } from 'react';
import { IntersectionLoad } from '@fly4react/observer';

/**
 * 图片懒加载示例
 * 展示如何使用 IntersectionLoad 实现图片懒加载
 */
export function ImageLazyLoadExample() {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const images = [
    { id: 1, url: 'https://picsum.photos/400/300?random=1', alt: '随机图片 1' },
    { id: 2, url: 'https://picsum.photos/400/300?random=2', alt: '随机图片 2' },
    { id: 3, url: 'https://picsum.photos/400/300?random=3', alt: '随机图片 3' },
    { id: 4, url: 'https://picsum.photos/400/300?random=4', alt: '随机图片 4' },
    { id: 5, url: 'https://picsum.photos/400/300?random=5', alt: '随机图片 5' },
  ];

  const handleImageLoad = (imageId: number) => {
    setLoadedImages(prev => new Set(prev).add(imageId));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>图片懒加载示例</h2>
      <p>已加载图片数量: {loadedImages.size}/{images.length}</p>
      
      {/* 添加一些初始空间 */}
      <div style={{ height: '50vh', background: '#f0f0f0', margin: '20px 0' }}>
        向下滚动查看图片懒加载
      </div>

      {images.map((image, index) => (
        <div key={image.id} style={{ marginBottom: '100px' }}>
          <h3>图片 {index + 1}</h3>
          
          <IntersectionLoad
            height={300}
            placeholder={
              <div style={{
                height: '300px',
                width: '400px',
                background: '#e0e0e0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed #ccc',
                margin: '20px 0'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>🖼️</div>
                <div style={{ fontSize: '16px', color: '#666' }}>
                  图片 {index + 1} 加载中...
                </div>
              </div>
            }
            threshold="any" // 任何部分可见时就开始加载
            offset={200} // 提前 200px 开始加载
            onChange={(isVisible) => {
              if (isVisible) {
                console.log(`图片 ${index + 1} 开始加载`);
              }
            }}
          >
            <img
              src={image.url}
              alt={image.alt}
              style={{
                width: '400px',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
              onLoad={() => handleImageLoad(image.id)}
              onError={() => console.error(`图片 ${index + 1} 加载失败`)}
            />
          </IntersectionLoad>
          
          {loadedImages.has(image.id) && (
            <div style={{ 
              color: 'green', 
              fontSize: '14px', 
              marginTop: '5px' 
            }}>
              ✅ 图片已加载
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
