import { type ScrollDirection, useScrollDirection } from '@fly4react/observer';
import type React from 'react';
import { useRef } from 'react';

const UseScrollDirectionExample: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollDirection, isScrolling } = useScrollDirection(targetRef, {
    step: 0.25, // 每 25% 触发一次，自动生成 [0, 0.25, 0.5, 0.75, 1]
    throttle: 150, // 150ms 节流
  });

  const getDirectionText = (direction: ScrollDirection): string => {
    switch (direction) {
      case 'up':
        return '向下滚动';
      case 'down':
        return '向上滚动';
      case 'left':
        return '向右滚动';
      case 'right':
        return '向左滚动';
      case 'none':
        return '无滚动';
      default:
        return '未知';
    }
  };

  const getDirectionColor = (direction: ScrollDirection): string => {
    switch (direction) {
      case 'up':
        return '#4CAF50'; // 绿色
      case 'down':
        return '#2196F3'; // 蓝色
      case 'left':
        return '#FF9800'; // 橙色
      case 'right':
        return '#9C27B0'; // 紫色
      case 'none':
        return '#757575'; // 灰色
      default:
        return '#000000';
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>useScrollDirection Hook 示例</h2>

      <div
        style={{
          marginBottom: '20px',
          padding: '15px',
          background: '#f5f5f5',
          borderRadius: '8px',
        }}
      >
        <h3>当前状态:</h3>
        <p
          style={{
            color: getDirectionColor(scrollDirection),
            fontWeight: 'bold',
          }}
        >
          滚动方向: {getDirectionText(scrollDirection)}
        </p>
        <p style={{ color: isScrolling ? '#FF5722' : '#757575' }}>
          正在滚动: {isScrolling ? '是' : '否'}
        </p>
      </div>

      {/* 占位内容，用于产生滚动 */}
      <div
        style={{
          height: '300vh',
          background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)',
        }}
      >
        <div style={{ padding: '20px' }}>
          <p>向下滚动查看目标元素...</p>
        </div>

        {/* 目标元素 */}
        <div
          ref={targetRef}
          style={{
            height: '200px',
            background: '#FF5722',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            margin: '50px 0',
            borderRadius: '8px',
            position: 'sticky',
            top: '20px',
            zIndex: 10,
          }}
        >
          观察元素（会跟随滚动）
        </div>

        <div style={{ padding: '20px' }}>
          <p>继续滚动查看方向变化...</p>
        </div>
      </div>

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          background: '#f5f5f5',
          borderRadius: '8px',
        }}
      >
        <h3>Hook 特性:</h3>
        <ul>
          <li>
            <strong>自动节流</strong>：避免过于频繁的状态更新
          </li>
          <li>
            <strong>滚动状态</strong>：提供 isScrolling 状态，表示是否正在滚动
          </li>
          <li>
            <strong>方向检测</strong>：支持垂直和水平滚动方向检测
          </li>
          <li>
            <strong>自定义配置</strong>：支持自定义阈值、偏移量和节流时间
          </li>
        </ul>
      </div>

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          background: '#e3f2fd',
          borderRadius: '8px',
        }}
      >
        <h3>使用代码:</h3>
        <pre
          style={{
            background: '#f8f9fa',
            padding: '15px',
            borderRadius: '4px',
            overflow: 'auto',
          }}
        >
          {`import { useScrollDirection } from '@fly4react/observer';

const { scrollDirection, isScrolling } = useScrollDirection(ref, {
  threshold: [0, 0.25, 0.5, 0.75, 1],
  throttle: 150, // 150ms 节流
});`}
        </pre>
      </div>
    </div>
  );
};

export { UseScrollDirectionExample };
export default UseScrollDirectionExample;
