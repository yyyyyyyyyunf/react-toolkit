import { useLazyElementPositionEffect } from '@fly4react/observer';
import type React from 'react';
import { useRef, useState } from 'react';

/**
 * useLazyElementPositionEffect 示例
 *
 * 这个 Hook 基于 useLazyElementPositionRef，增加定时检测功能。
 * 返回一个函数，调用时才开始执行定时检测。
 * 每隔指定时间间隔检测一次元素位置，如果位置发生变化则调用回调函数。
 */
export const UseLazyElementPositionEffectExample: React.FC = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [detectionStatus, setDetectionStatus] = useState<string>('未开始');
  const [changeCount, setChangeCount] = useState<number>(0);
  const [lastChangeInfo, setLastChangeInfo] = useState<string>('');

  // 使用 useLazyElementPositionEffect
  const startDetection = useLazyElementPositionEffect(elementRef, {
    interval: 100, // 每 100ms 检测一次
    count: 20, // 执行 20 次
    callback: position => {
      if (position) {
        setChangeCount(prev => prev + 1);
        const changeInfo = {
          boundingClientRect: {
            top: position.boundingClientRect.top,
            left: position.boundingClientRect.left,
            width: position.boundingClientRect.width,
            height: position.boundingClientRect.height,
          },
          intersectionRatio: position.intersectionRatio,
          isIntersecting: position.isIntersecting,
          scrollX: position.scrollX,
          scrollY: position.scrollY,
          time: new Date(position.time).toLocaleTimeString(),
        };
        setLastChangeInfo(JSON.stringify(changeInfo, null, 2));
        console.log('=== 位置变化检测 ===', changeInfo);
      }
    },
    step: 0.1,
    throttle: 16,
    forceCalibrate: true,
    calibrateInterval: 2500,
  });

  // 开始检测
  const handleStartDetection = () => {
    setDetectionStatus('检测中...');
    setChangeCount(0);
    setLastChangeInfo('');
    startDetection();
  };

  // 停止检测（通过重新开始来重置）
  const handleStopDetection = () => {
    setDetectionStatus('已停止');
  };

  return (
    <div className="example-container">
      <h2>useLazyElementPositionEffect 示例</h2>
      <p>
        这个 Hook 基于 useLazyElementPositionRef，增加定时检测功能。
        返回一个函数，调用时才开始执行定时检测。
        每隔指定时间间隔检测一次元素位置，如果位置发生变化则调用回调函数。
      </p>

      <div className="demo-section">
        <h3>功能演示</h3>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '20px',
            flexWrap: 'wrap',
          }}
        >
          <button type="button" onClick={handleStartDetection} className="demo-button">
            开始检测
          </button>
          <button type="button" onClick={handleStopDetection} className="demo-button">
            停止检测
          </button>
        </div>

        <div
          style={{
            padding: '10px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            marginBottom: '20px',
          }}
        >
          <p>
            <strong>检测状态：</strong>
            {detectionStatus}
          </p>
          <p>
            <strong>位置变化次数：</strong>
            {changeCount}
          </p>
        </div>

        <div
          ref={elementRef}
          className="tracked-element"
          style={{
            width: '200px',
            height: '100px',
            backgroundColor: '#e8f5e8',
            border: '2px solid #4caf50',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '20px 0',
            transition: 'all 0.3s ease',
          }}
        >
          被跟踪的元素
        </div>

        {lastChangeInfo && (
          <div className="position-display">
            <h4>最后一次位置变化信息：</h4>
            <pre
              style={{
                backgroundColor: '#f5f5f5',
                padding: '10px',
                borderRadius: '4px',
                overflow: 'auto',
                maxHeight: '200px',
              }}
            >
              {lastChangeInfo}
            </pre>
          </div>
        )}

        <div className="info-section">
          <h4>功能特性：</h4>
          <ul>
            <li>
              <strong>延迟执行：</strong>返回一个函数，调用时才开始执行定时检测
            </li>
            <li>
              <strong>定时检测：</strong>每隔指定时间间隔检测一次元素位置
            </li>
            <li>
              <strong>变化检测：</strong>只有当位置发生变化时才调用回调
            </li>
            <li>
              <strong>执行次数控制：</strong>可以指定执行次数，达到次数后自动停止
            </li>
            <li>
              <strong>立即执行：</strong>如果 interval 为 0，立即执行一次检测
            </li>
            <li>
              <strong>自动清理：</strong>组件卸载时自动清理定时器
            </li>
          </ul>

          <h4>使用步骤：</h4>
          <ol>
            <li>
              <strong>步骤 1：</strong>点击"开始检测"按钮 - 开始定时检测元素位置
            </li>
            <li>
              <strong>步骤 2：</strong>滚动页面改变元素位置 - 观察位置变化次数增加
            </li>
            <li>
              <strong>步骤 3：</strong>查看控制台和页面上的位置变化信息
            </li>
            <li>
              <strong>步骤 4：</strong>检测会在执行指定次数后自动停止
            </li>
          </ol>

          <h4>配置说明：</h4>
          <ul>
            <li>
              <strong>interval: 100</strong> - 每 100ms 检测一次
            </li>
            <li>
              <strong>count: 20</strong> - 执行 20 次后自动停止
            </li>
            <li>
              <strong>callback</strong> - 位置变化时调用，接收 ElementPosition | null
            </li>
          </ul>
        </div>

        <div className="code-section">
          <h4>代码示例：</h4>
          <pre>
            {`const ref = useRef<HTMLDivElement>(null);
const startDetection = useLazyElementPositionEffect(ref, {
  interval: 100, // 每 100ms 检测一次
  count: 20, // 执行 20 次
  callback: (position) => {
    if (position) {
      console.log('位置变化:', position.boundingClientRect);
      console.log('交叉比例:', position.intersectionRatio);
      console.log('滚动位置:', { x: position.scrollX, y: position.scrollY });
    }
  },
  step: 0.1,
  throttle: 16,
});

// 在需要时开始检测
const handleClick = () => {
  startDetection();
};`}
          </pre>
        </div>

        <div className="comparison-section">
          <h4>与 useLazyElementPositionRef 的区别：</h4>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '10px',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>特性</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>
                  useLazyElementPositionRef
                </th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>
                  useLazyElementPositionEffect
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>执行方式</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>手动调用</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>定时自动检测</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>回调机制</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>无</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>位置变化时自动调用</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>使用场景</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>按需获取位置</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>需要监控位置变化</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>执行控制</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>完全手动</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>可配置间隔和次数</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 添加一些空间让用户可以滚动测试 */}
      <div
        style={{
          height: '1000px',
          backgroundColor: '#f5f5f5',
          marginTop: '20px',
        }}
      >
        <div style={{ padding: '20px', textAlign: 'center' }}>向下滚动以测试元素位置跟踪</div>
      </div>
    </div>
  );
};
