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

	// 打印之前获取的位置信息，用于比较 lazy 计算
	// 这个函数打印的是 lastPosition 状态中保存的位置，不触发新的计算
	const handlePrintCurrentPosition = () => {
		if (lastPosition && lastPosition !== "位置信息尚未可用") {
			console.log("=== 之前获取的位置信息（缓存） ===");
			console.log(lastPosition);
			console.log("注意：这是之前获取的缓存位置，证明 lazy 特性！");
		} else {
			console.log("=== 之前获取的位置信息 ===");
			console.log("请先点击'按需获取位置信息'按钮获取位置数据");
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
				<div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
					<button type="button" onClick={handleGetPosition} className="demo-button">
						按需获取位置信息
					</button>
					<button type="button" onClick={handlePrintCurrentPosition} className="demo-button">
						打印之前的位置
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
					
					<h4>Lazy 特性验证步骤：</h4>
					<ol>
						<li>
							<strong>步骤 1：</strong>点击"按需获取位置信息" - 获取初始位置并显示在页面上
						</li>
						<li>
							<strong>步骤 2：</strong>点击"打印之前的位置" - 打印刚才获取的位置信息
						</li>
						<li>
							<strong>步骤 3：</strong>滚动页面改变元素位置
						</li>
						<li>
							<strong>步骤 4：</strong>再次点击"打印之前的位置" - 应该还是旧的位置（证明是懒计算）
						</li>
						<li>
							<strong>步骤 5：</strong>点击"按需获取位置信息" - 触发新的位置计算
						</li>
						<li>
							<strong>步骤 6：</strong>再次点击"打印之前的位置" - 现在才显示新位置
						</li>
					</ol>
					
					<h4>按钮说明：</h4>
					<ul>
						<li>
							<strong>"按需获取位置信息"：</strong>触发位置计算并显示在页面上
						</li>
						<li>
							<strong>"打印之前的位置"：</strong>打印之前获取的位置信息（不触发新计算）
						</li>
						<li>
							<strong>"测试频繁调用"：</strong>模拟频繁调用，展示 lazy 特性的性能优势
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
