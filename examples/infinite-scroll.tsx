import React, { useState, useRef, useCallback } from 'react';
import { useOneOffVisibility } from '@fly4react/observer';

/**
 * 无限滚动示例
 * 展示如何使用 useOneOffVisibility 实现无限滚动列表
 */
export function InfiniteScrollExample() {
  const [items, setItems] = useState<Array<{ id: number; title: string; content: string }>>(
    () => Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `项目 ${i + 1}`,
      content: `这是第 ${i + 1} 个项目的内容，包含一些描述文字...`
    }))
  );
  
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loadCount, setLoadCount] = useState(1);
  
  const triggerRef = useRef<HTMLDivElement>(null);
  
  // 检测触发器是否可见
  const shouldLoadMore = useOneOffVisibility(triggerRef, {
    rootMargin: '100px' // 提前 100px 触发
  });

  // 模拟加载更多数据
  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const newItems = Array.from({ length: 10 }, (_, i) => ({
      id: items.length + i + 1,
      title: `项目 ${items.length + i + 1}`,
      content: `这是第 ${items.length + i + 1} 个项目的内容，这是第 ${loadCount + 1} 次加载的数据...`
    }));
    
    setItems(prev => [...prev, ...newItems]);
    setLoadCount(prev => prev + 1);
    setIsLoading(false);
    
    // 模拟数据用完的情况
    if (loadCount >= 5) {
      setHasMore(false);
    }
  }, [items.length, isLoading, hasMore, loadCount]);

  // 当触发器可见时加载更多
  React.useEffect(() => {
    if (shouldLoadMore && hasMore && !isLoading) {
      loadMore();
    }
  }, [shouldLoadMore, hasMore, isLoading, loadMore]);

  const resetList = () => {
    setItems(Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `项目 ${i + 1}`,
      content: `这是第 ${i + 1} 个项目的内容，包含一些描述文字...`
    })));
    setIsLoading(false);
    setHasMore(true);
    setLoadCount(1);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>无限滚动列表示例</h2>
      
      {/* 状态栏 */}
      <div style={{
        position: 'sticky',
        top: '20px',
        background: 'white',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '20px',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <span style={{ marginRight: '20px' }}>📋 项目总数: {items.length}</span>
          <span style={{ marginRight: '20px' }}>🔄 加载次数: {loadCount}</span>
          <span style={{ 
            color: hasMore ? '#28a745' : '#dc3545',
            fontWeight: 'bold'
          }}>
            {hasMore ? '✅ 有更多数据' : '🏁 已加载完成'}
          </span>
        </div>
        
        <button
          onClick={resetList}
          style={{
            padding: '8px 16px',
            background: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🔄 重置列表
        </button>
      </div>

      {/* 项目列表 */}
      <div style={{ space: '20px' }}>
        {items.map((item, index) => (
          <div
            key={item.id}
            style={{
              background: 'white',
              padding: '20px',
              marginBottom: '15px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e9ecef',
              transition: 'transform 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <h3 style={{
                margin: 0,
                color: '#495057',
                fontSize: '18px'
              }}>
                {item.title}
              </h3>
              <span style={{
                background: '#e9ecef',
                color: '#6c757d',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px'
              }}>
                #{item.id}
              </span>
            </div>
            
            <p style={{
              margin: 0,
              color: '#6c757d',
              lineHeight: '1.5'
            }}>
              {item.content}
            </p>

            {/* 新加载的项目标记 */}
            {index >= 20 && (
              <div style={{
                marginTop: '10px',
                padding: '4px 8px',
                background: '#d1ecf1',
                color: '#0c5460',
                borderRadius: '4px',
                fontSize: '12px',
                display: 'inline-block'
              }}>
                🆕 第 {Math.floor((index - 19) / 10) + 1} 次加载
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 加载更多触发器 */}
      {hasMore && (
        <div
          ref={triggerRef}
          style={{
            padding: '40px',
            textAlign: 'center',
            background: isLoading ? '#f8f9fa' : 'transparent',
            borderRadius: '8px',
            margin: '20px 0'
          }}
        >
          {isLoading ? (
            <div>
              <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid #e9ecef',
                borderTop: '4px solid #007bff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 15px'
              }} />
              <div style={{ color: '#6c757d', fontSize: '16px' }}>
                🔄 正在加载更多...
              </div>
            </div>
          ) : (
            <div style={{
              color: '#6c757d',
              fontSize: '16px',
              padding: '20px',
              border: '2px dashed #dee2e6',
              borderRadius: '8px'
            }}>
              📍 滚动到此处自动加载更多
            </div>
          )}
        </div>
      )}

      {/* 加载完成提示 */}
      {!hasMore && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#6c757d',
          fontSize: '16px',
          background: '#f8f9fa',
          borderRadius: '8px',
          margin: '20px 0'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎉</div>
          <div>所有数据已加载完成！</div>
          <div style={{ fontSize: '14px', marginTop: '5px' }}>
            总共 {items.length} 个项目，{loadCount} 次加载
          </div>
        </div>
      )}

      {/* CSS 动画 */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
