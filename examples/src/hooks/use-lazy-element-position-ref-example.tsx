import { useLazyElementPositionRef } from "@fly4react/observer";
import type React from "react";
import { useRef, useState } from "react";

/**
 * useLazyElementPositionRef 示例
 *
 * 这个 Hook 是 useElementPositionRef 的 lazy 版本，不实时计算位置信息，
 * 而是返回一个 callback 函数，只有当用户主动调用时才计算并返回位置信息。
 * 适用于需要按需获取元素位置信息的场景，可以进一步减少计算开销。
 */
export const UseLazyElementPositionRefExample: React.FC = () => {
	const elementRef = useRef<HTMLDivElement>(null);
	const [lastPosition, setLastPosition] = useState<string>("");
	
	// 使用 lazy 版本的 hook
	const getPosition = useLazyElementPositionRef(elementRef, {
		step: 0.1, // 每 10% 触发一次
		throttle: 16, // 60fps
		forceCalibrate: true, // 启用强制校准
		calibrateInterval: 2500, // 校准间隔 2.5 秒
	});

	// 事件处理函数示例：按需获取位置信息
	const handleGetPosition = () => {
		const position = getPosition();
		if (position) {
			const positionInfo = {
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
			
			console.log("=== Lazy 元素位置信息 ===", positionInfo);
			setLastPosition(JSON.stringify(positionInfo, null, 2));
		} else {
			console.log("元素位置信息尚未可用（需要等待 Intersection Observer 提供初始数据）");
			setLastPosition("位置信息尚未可用");
		}
	};

	// 模拟频繁调用，展示 lazy 特性
	const handleFrequentCalls = () => {
		console.log("=== 频繁调用测试 ===");
		for (let i = 0; i < 5; i++) {
			setTimeout(() => {
				const position = getPosition();
				console.log(`调用 ${i + 1}:`, position ? "有位置数据" : "无位置数据");
			}, i * 100);
		}
	};

	return (
		<div className="example-container">
			<h2>useLazyElementPositionRef 示例</h2>
			<p>
				这个 Hook 是 useElementPositionRef 的 lazy 版本，不实时计算位置信息，
				而是返回一个 callback 函数，只有当用户主动调用时才计算并返回位置信息。
				适用于需要按需获取元素位置信息的场景，可以进一步减少计算开销。
			</p>

			<div className="demo-section">
				<h3>功能演示</h3>
				<div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
					<button type="button" onClick={handleGetPosition} className="demo-button">
						按需获取位置信息
					</button>
					<button type="button" onClick={handleFrequentCalls} className="demo-button">
						测试频繁调用
					</button>
				</div>

				<div
					ref={elementRef}
					className="tracked-element"
					style={{
						width: "200px",
						height: "100px",
						backgroundColor: "#e8f5e8",
						border: "2px solid #4caf50",
						borderRadius: "8px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						margin: "20px 0",
						transition: "all 0.3s ease",
					}}
				>
					被跟踪的元素 (Lazy 版本)
				</div>

				{lastPosition && (
					<div className="position-display">
						<h4>最后获取的位置信息：</h4>
						<pre style={{ 
							backgroundColor: "#f5f5f5", 
							padding: "10px", 
							borderRadius: "4px",
							overflow: "auto",
							maxHeight: "200px"
						}}>
							{lastPosition}
						</pre>
					</div>
				)}

				<div className="info-section">
					<h4>Lazy 特性说明：</h4>
					<ul>
						<li>
							<strong>按需计算：</strong>只在用户主动调用 callback 时才计算位置信息
						</li>
						<li>
							<strong>延迟初始化：</strong>需要等待 Intersection Observer 提供初始数据后才能获取位置
						</li>
						<li>
							<strong>智能缓存：</strong>滚动位置未变化时，直接返回缓存的位置信息
						</li>
						<li>
							<strong>性能优化：</strong>避免不必要的计算，进一步减少计算开销
						</li>
						<li>
							<strong>不触发渲染：</strong>位置信息存储在 ref 中，不会触发组件重新渲染
						</li>
						<li>
							<strong>智能计算：</strong>基于滚动变化计算新位置，而不是重新计算整个位置
						</li>
					</ul>
				</div>

				<div className="code-section">
					<h4>代码示例：</h4>
					<pre>
						{`const elementRef = useRef<HTMLDivElement>(null);
const getPosition = useLazyElementPositionRef(elementRef, {
  step: 0.1,
  throttle: 16, // 60fps
  forceCalibrate: true, // 启用强制校准
  calibrateInterval: 2500, // 校准间隔 2.5 秒
});

// 按需获取位置信息
const handleClick = () => {
  const position = getPosition();
  if (position) {
    console.log('位置:', position.boundingClientRect);
    console.log('交叉比例:', position.intersectionRatio);
    console.log('滚动位置:', { x: position.scrollX, y: position.scrollY });
  } else {
    console.log('位置信息尚未可用');
  }
};`}
					</pre>
				</div>

				<div className="comparison-section">
					<h4>与 useElementPositionRef 的区别：</h4>
					<table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
						<thead>
							<tr style={{ backgroundColor: "#f5f5f5" }}>
								<th style={{ padding: "8px", border: "1px solid #ddd" }}>特性</th>
								<th style={{ padding: "8px", border: "1px solid #ddd" }}>useElementPositionRef</th>
								<th style={{ padding: "8px", border: "1px solid #ddd" }}>useLazyElementPositionRef</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td style={{ padding: "8px", border: "1px solid #ddd" }}>计算时机</td>
								<td style={{ padding: "8px", border: "1px solid #ddd" }}>实时计算</td>
								<td style={{ padding: "8px", border: "1px solid #ddd" }}>按需计算</td>
							</tr>
							<tr>
								<td style={{ padding: "8px", border: "1px solid #ddd" }}>性能开销</td>
								<td style={{ padding: "8px", border: "1px solid #ddd" }}>中等（实时更新）</td>
								<td style={{ padding: "8px", border: "1px solid #ddd" }}>最低（按需计算）</td>
							</tr>
							<tr>
								<td style={{ padding: "8px", border: "1px solid #ddd" }}>使用场景</td>
								<td style={{ padding: "8px", border: "1px solid #ddd" }}>需要实时位置信息</td>
								<td style={{ padding: "8px", border: "1px solid #ddd" }}>偶尔需要位置信息</td>
							</tr>
							<tr>
								<td style={{ padding: "8px", border: "1px solid #ddd" }}>初始化</td>
								<td style={{ padding: "8px", border: "1px solid #ddd" }}>立即可用</td>
								<td style={{ padding: "8px", border: "1px solid #ddd" }}>需要等待 Intersection Observer</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			{/* 添加一些空间让用户可以滚动测试 */}
			<div
				style={{
					height: "1000px",
					backgroundColor: "#f5f5f5",
					marginTop: "20px",
				}}
			>
				<div style={{ padding: "20px", textAlign: "center" }}>
					向下滚动以测试元素位置跟踪
				</div>
			</div>
		</div>
	);
};
