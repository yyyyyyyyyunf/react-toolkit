import {
  getDebugComponents,
  getIgnoreProps,
  registerDebugComponent,
  registerIgnoreProp,
} from '@fly4react/memo';
import { useState } from 'react';

// 配置管理组件
const MemoConfigDemo = () => {
  const [newDebugComponent, setNewDebugComponent] = useState('');
  const [newIgnoreProp, setNewIgnoreProp] = useState('');
  const [testData, setTestData] = useState({
    name: 'Test Component',
    count: 0,
    timestamp: Date.now(),
  });

  // 更新测试数据
  const updateTestData = () => {
    setTestData({
      name: 'Test Component',
      count: testData.count + 1,
      timestamp: Date.now(),
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Memo 配置管理演示</h1>

      {/* 配置管理区域 */}
      <div style={{ marginBottom: '30px' }}>
        <h2>配置管理</h2>

        {/* 调试组件管理 */}
        <div style={{ marginBottom: '20px' }}>
          <h3>调试组件管理</h3>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={newDebugComponent}
              onChange={e => setNewDebugComponent(e.target.value)}
              placeholder="输入组件名称"
              style={{ marginRight: '10px', padding: '5px' }}
            />
            <button
              type="button"
              onClick={() => {
                if (newDebugComponent.trim()) {
                  registerDebugComponent(newDebugComponent.trim());
                  setNewDebugComponent('');
                  // 强制重新渲染以显示更新
                  setTestData({ ...testData });
                }
              }}
              style={{ padding: '5px 10px' }}
            >
              注册调试组件
            </button>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>当前调试组件:</strong>{' '}
            {getDebugComponents().length > 0 ? getDebugComponents().join(', ') : '无'}
          </div>
        </div>

        {/* 忽略属性管理 */}
        <div style={{ marginBottom: '20px' }}>
          <h3>忽略属性管理</h3>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={newIgnoreProp}
              onChange={e => setNewIgnoreProp(e.target.value)}
              placeholder="输入属性名称"
              style={{ marginRight: '10px', padding: '5px' }}
            />
            <button
              type="button"
              onClick={() => {
                if (newIgnoreProp.trim()) {
                  registerIgnoreProp(newIgnoreProp.trim());
                  setNewIgnoreProp('');
                  // 强制重新渲染以显示更新
                  setTestData({ ...testData });
                }
              }}
              style={{ padding: '5px 10px' }}
            >
              注册忽略属性
            </button>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>当前忽略属性:</strong>{' '}
            {getIgnoreProps().length > 0 ? getIgnoreProps().join(', ') : '无'}
          </div>
        </div>
      </div>

      {/* 测试区域 */}
      <div style={{ marginBottom: '30px' }}>
        <h2>测试区域</h2>
        <p>
          点击下面的按钮来更新测试组件的数据。如果组件名称在调试列表中，你会在控制台看到调试日志。
        </p>
        <button
          type="button"
          onClick={updateTestData}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          更新测试数据
        </button>

        {/* 暂时注释掉有问题的组件 */}
        {/* <TestComponent {...testData} /> */}
      </div>

      {/* 说明区域 */}
      <div
        style={{
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '5px',
          border: '1px solid #dee2e6',
        }}
      >
        <h3>使用说明</h3>
        <ul>
          <li>
            <strong>调试组件:</strong> 当组件名称包含调试列表中的任何字符串时，会在控制台输出 props
            变化的调试日志
          </li>
          <li>
            <strong>忽略属性:</strong> 在比较 props 时，这些属性会被自动忽略，不会触发重新渲染
          </li>
          <li>
            <strong>全局配置:</strong> 这是一个全局配置，适用于整个应用中的所有 memo 组件
          </li>
          <li>
            <strong>简单注册:</strong> 只需要调用 registerDebugComponent 和 registerIgnoreProp 即可
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MemoConfigDemo;
