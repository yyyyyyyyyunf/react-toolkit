import type React from "react";
import { useRef } from "react";
import { useOneOffVisibilityEffect } from "@fly4react/observer";

/**
 * useOneOffVisibilityEffect 示例
 *
 * 这个hook用于在元素第一次可见时执行指定的回调函数
 * 适用于懒加载、动画触发、数据分析等场景
 */
const UseOneOffVisibilityEffectExample: React.FC = () => {
	const section1Ref = useRef<HTMLDivElement>(null);
	const section2Ref = useRef<HTMLDivElement>(null);
	const section3Ref = useRef<HTMLDivElement>(null);

	// 懒加载数据
	useOneOffVisibilityEffect(
		section1Ref,
		() => {
			console.log("Section 1 已可见，开始加载数据...");
			// 这里可以执行数据加载逻辑
			// loadData();
		},
		{ threshold: 0.5 },
	);

	// 触发动画
	useOneOffVisibilityEffect(section2Ref, () => {
		console.log("Section 2 已可见，触发动画...");
		// 这里可以执行动画逻辑
		// triggerAnimation();
	});

	// 发送分析事件
	useOneOffVisibilityEffect(
		section3Ref,
		() => {
			console.log("Section 3 已可见，发送分析事件...");
			// 这里可以发送分析数据
			// analytics.track('section_viewed', { section: 'section3' });
		},
		{ threshold: 0.8, offset: 200 },
	);

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<h1 className="text-3xl font-bold mb-8 text-center">
				useOneOffVisibilityEffect 示例
			</h1>

			<div className="space-y-8">
				<div className="bg-blue-50 p-6 rounded-lg">
					<h2 className="text-xl font-semibold mb-4">使用场景说明</h2>
					<ul className="list-disc list-inside space-y-2 text-gray-700">
						<li>
							<strong>懒加载数据：</strong>当元素可见时自动加载数据
						</li>
						<li>
							<strong>动画触发：</strong>当元素可见时触发动画效果
						</li>
						<li>
							<strong>数据分析：</strong>当元素可见时发送分析事件
						</li>
						<li>
							<strong>性能优化：</strong>只在需要时执行昂贵的操作
						</li>
					</ul>
				</div>

				<div
					ref={section1Ref}
					className="bg-green-100 p-8 rounded-lg border-2 border-green-300"
				>
					<h3 className="text-lg font-semibold mb-4">Section 1 - 懒加载数据</h3>
					<p className="text-gray-700">
						当这个区域可见时（threshold: 0.5），会在控制台输出"Section 1
						已可见，开始加载数据..."
					</p>
					<div className="mt-4 p-4 bg-white rounded border">
						<p className="text-sm text-gray-600">
							模拟内容区域 - 滚动页面查看效果
						</p>
					</div>
				</div>

				<div
					ref={section2Ref}
					className="bg-yellow-100 p-8 rounded-lg border-2 border-yellow-300"
				>
					<h3 className="text-lg font-semibold mb-4">Section 2 - 动画触发</h3>
					<p className="text-gray-700">
						当这个区域可见时（默认配置），会在控制台输出"Section 2
						已可见，触发动画..."
					</p>
					<div className="mt-4 p-4 bg-white rounded border">
						<p className="text-sm text-gray-600">
							模拟内容区域 - 滚动页面查看效果
						</p>
					</div>
				</div>

				<div
					ref={section3Ref}
					className="bg-purple-100 p-8 rounded-lg border-2 border-purple-300"
				>
					<h3 className="text-lg font-semibold mb-4">Section 3 - 分析事件</h3>
					<p className="text-gray-700">
						当这个区域可见时（threshold: 0.8, offset:
						200），会在控制台输出"Section 3 已可见，发送分析事件..."
					</p>
					<div className="mt-4 p-4 bg-white rounded border">
						<p className="text-sm text-gray-600">
							模拟内容区域 - 滚动页面查看效果
						</p>
					</div>
				</div>

				<div className="bg-gray-100 p-6 rounded-lg">
					<h3 className="text-lg font-semibold mb-4">代码示例</h3>
					<pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
						{`import { useOneOffVisibilityEffect } from "@fly4react/observer";

const MyComponent = () => {
  const ref = useRef<HTMLDivElement>(null);

  // 懒加载数据
  useOneOffVisibilityEffect(ref, () => {
    console.log("元素已可见，开始加载数据");
    loadData();
  }, { threshold: 0.5 });

  return <div ref={ref}>内容</div>;
};`}
					</pre>
				</div>
			</div>
		</div>
	);
};

export default UseOneOffVisibilityEffectExample;
