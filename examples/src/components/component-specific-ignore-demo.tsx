import type React from 'react';
import { useState } from 'react';
import {
  createMemoComponent,
  registerComponentIgnoreProp,
  registerIgnoreProp,
  getComponentIgnoreProps,
  getIgnoreProps,
} from '@fly4react/memo';

/**
 * 组件特定忽略属性演示
 *
 * 展示如何使用 registerComponentIgnoreProp 来忽略特定组件的特定属性
 */
const ComponentSpecificIgnoreDemo: React.FC = () => {
  const [globalIgnore, setGlobalIgnore] = useState<string[]>([]);
  const [componentIgnores, setComponentIgnores] = useState<Record<string, string[]>>({});

  // 示例组件1 - 用户卡片
  const UserCard = createMemoComponent<{
    id: number;
    name: string;
    email: string;
    avatar: string;
    lastLogin: string;
    onClick: () => void;
  }>(({ name, email, avatar, lastLogin, onClick }) => (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-center space-x-3">
        <img src={avatar} alt={name} className="w-12 h-12 rounded-full" />
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-gray-600 text-sm">{email}</p>
          <p className="text-gray-500 text-xs">最后登录: {lastLogin}</p>
        </div>
      </div>
      <button
        onClick={onClick}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
      >
        点击
      </button>
    </div>
  ));

  // 示例组件2 - 产品卡片
  const ProductCard = createMemoComponent<{
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    onAddToCart: () => void;
  }>(({ title, price, image, description, onAddToCart }) => (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <img src={image} alt={title} className="w-full h-32 object-cover rounded mb-3" />
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-2">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-green-600">¥{price}</span>
        <button
          onClick={onAddToCart}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
        >
          加入购物车
        </button>
      </div>
    </div>
  ));

  // 处理全局忽略属性
  const handleGlobalIgnore = (prop: string) => {
    registerIgnoreProp(prop);
    setGlobalIgnore([...getIgnoreProps()]);
  };

  // 处理组件特定忽略属性
  const handleComponentIgnore = (componentName: string, prop: string) => {
    registerComponentIgnoreProp(componentName, prop);
    setComponentIgnores({
      ...componentIgnores,
      [componentName]: [...getComponentIgnoreProps(componentName)],
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">组件特定忽略属性演示</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 控制面板 */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">功能说明</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>全局忽略：</strong>使用 <code>registerIgnoreProp</code>{' '}
                忽略所有组件的特定属性
              </li>
              <li>
                <strong>组件特定忽略：</strong>使用 <code>registerComponentIgnoreProp</code>{' '}
                只忽略特定组件的特定属性
              </li>
              <li>
                <strong>优先级：</strong>全局忽略 &gt; 组件特定忽略
              </li>
            </ul>
          </div>

          {/* 全局忽略控制 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">全局忽略属性</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleGlobalIgnore('onClick')}
                className="block w-full text-left px-3 py-2 bg-red-100 hover:bg-red-200 rounded text-sm"
              >
                忽略所有组件的 onClick 属性
              </button>
              <button
                onClick={() => handleGlobalIgnore('onAddToCart')}
                className="block w-full text-left px-3 py-2 bg-red-100 hover:bg-red-200 rounded text-sm"
              >
                忽略所有组件的 onAddToCart 属性
              </button>
            </div>
            {globalIgnore.length > 0 && (
              <div className="mt-3">
                <p className="text-sm text-gray-600">当前全局忽略：</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {globalIgnore.map(prop => (
                    <span key={prop} className="px-2 py-1 bg-red-200 text-red-800 rounded text-xs">
                      {prop}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 组件特定忽略控制 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">组件特定忽略属性</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-2">UserCard 组件：</p>
                <div className="space-y-1">
                  <button
                    onClick={() => handleComponentIgnore('UserCard', 'lastLogin')}
                    className="block w-full text-left px-3 py-2 bg-yellow-100 hover:bg-yellow-200 rounded text-sm"
                  >
                    忽略 UserCard 的 lastLogin 属性
                  </button>
                  <button
                    onClick={() => handleComponentIgnore('UserCard', 'avatar')}
                    className="block w-full text-left px-3 py-2 bg-yellow-100 hover:bg-yellow-200 rounded text-sm"
                  >
                    忽略 UserCard 的 avatar 属性
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">ProductCard 组件：</p>
                <div className="space-y-1">
                  <button
                    onClick={() => handleComponentIgnore('ProductCard', 'description')}
                    className="block w-full text-left px-3 py-2 bg-yellow-100 hover:bg-yellow-200 rounded text-sm"
                  >
                    忽略 ProductCard 的 description 属性
                  </button>
                  <button
                    onClick={() => handleComponentIgnore('ProductCard', 'image')}
                    className="block w-full text-left px-3 py-2 bg-yellow-100 hover:bg-yellow-200 rounded text-sm"
                  >
                    忽略 ProductCard 的 image 属性
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 组件展示区域 */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">UserCard 组件</h3>
            <div className="space-y-4">
              <UserCard
                id={1}
                name="张三"
                email="zhangsan@example.com"
                avatar="https://via.placeholder.com/48"
                lastLogin="2024-01-15 10:30"
                onClick={() => console.log('UserCard clicked')}
              />
              <UserCard
                id={2}
                name="李四"
                email="lisi@example.com"
                avatar="https://via.placeholder.com/48"
                lastLogin="2024-01-15 11:45"
                onClick={() => console.log('UserCard clicked')}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">ProductCard 组件</h3>
            <div className="space-y-4">
              <ProductCard
                id={1}
                title="智能手机"
                price={2999}
                image="https://via.placeholder.com/300x200"
                description="高性能智能手机，配备最新处理器"
                onAddToCart={() => console.log('Product added to cart')}
              />
              <ProductCard
                id={2}
                title="笔记本电脑"
                price={5999}
                image="https://via.placeholder.com/300x200"
                description="轻薄便携的商务笔记本电脑"
                onAddToCart={() => console.log('Product added to cart')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 代码示例 */}
      <div className="mt-8 bg-gray-100 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">代码示例</h3>
        <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
          {`import { registerComponentIgnoreProp, registerIgnoreProp } from "@fly4react/memo";

// 全局忽略 - 所有组件都忽略 onClick 属性
registerIgnoreProp("onClick");

// 组件特定忽略 - 只有 UserCard 组件忽略 lastLogin 属性
registerComponentIgnoreProp("UserCard", "lastLogin");

// 组件特定忽略 - 只有 ProductCard 组件忽略 description 属性
registerComponentIgnoreProp("ProductCard", "description");`}
        </pre>
      </div>
    </div>
  );
};

export default ComponentSpecificIgnoreDemo;
