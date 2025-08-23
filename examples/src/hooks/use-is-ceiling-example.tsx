import { useIsCeiling } from "@fly4react/observer";
import type React from "react";
import { useRef } from "react";

/**
 * useIsCeiling 示例
 *
 * 演示如何使用 useIsCeiling hook 检测元素是否达到指定位置
 */
export const UseIsCeilingExample: React.FC = () => {
	const ref1 = useRef<HTMLDivElement>(null);
	const ref2 = useRef<HTMLDivElement>(null);
	const ref3 = useRef<HTMLDivElement>(null);

	// 检测是否贴顶（默认 position = 0）
	const isCeiling1 = useIsCeiling(ref1);

	// 检测是否达到距离顶部 200px 的位置
	const isCeiling2 = useIsCeiling(ref2, 200);

	// 检测是否达到距离顶部 -50px 的位置（超出视口顶部）
	const isCeiling3 = useIsCeiling(ref3, -50);

	return (
		<div className="example-container">
			<h2>useIsCeiling 示例</h2>
			<p className="description">
				检测元素的顶部是否达到指定位置，用于实现贴顶效果。
			</p>

			<div className="status-panel">
				<div className="status-item">
					<span className="status-label">贴顶检测 (position = 0):</span>
					<span
						className={`status-value ${isCeiling1 ? "active" : "inactive"}`}
					>
						{isCeiling1 ? "已贴顶" : "未贴顶"}
					</span>
				</div>
				<div className="status-item">
					<span className="status-label">位置检测 (position = 200px):</span>
					<span
						className={`status-value ${isCeiling2 ? "active" : "inactive"}`}
					>
						{isCeiling2 ? "已达到" : "未达到"}
					</span>
				</div>
				<div className="status-item">
					<span className="status-label">超出检测 (position = -50px):</span>
					<span
						className={`status-value ${isCeiling3 ? "active" : "inactive"}`}
					>
						{isCeiling3 ? "已超出" : "未超出"}
					</span>
				</div>
			</div>

			{/* 添加调试信息 */}
			<div
				style={{
					backgroundColor: "#f0f0f0",
					padding: "10px",
					marginBottom: "20px",
					borderRadius: "4px",
					fontSize: "12px",
				}}
			>
				<strong>调试信息：</strong>
				<div>元素1 (贴顶): {isCeiling1 ? "✅ 已激活" : "❌ 未激活"}</div>
				<div>元素2 (200px): {isCeiling2 ? "✅ 已激活" : "❌ 未激活"}</div>
				<div>元素3 (-50px): {isCeiling3 ? "✅ 已激活" : "❌ 未激活"}</div>
				<div style={{ marginTop: "10px", fontSize: "10px", color: "#666" }}>
					<strong>说明：</strong>在移动设备上，Chrome 的地址栏和状态栏会影响
					viewport 计算。 元素变绿时，其顶部可能已经超出视口顶部，这是正常现象。
				</div>
			</div>

			<div className="demo-section">
				<h3>演示区域</h3>
				<p>滚动页面查看不同元素的贴顶状态变化</p>

				{/* 第一个检测元素 - 贴顶检测 */}
				<div
					ref={ref1}
					className={`demo-element ${isCeiling1 ? "ceiling-active" : ""}`}
					style={{
						height: "800px",
						backgroundColor: isCeiling1 ? "#4CAF50" : "#2196F3",
						marginBottom: "50px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "white",
						fontWeight: "bold",
						transition: "background-color 0.3s ease",
					}}
				>
					<div>
						<h4>贴顶检测元素</h4>
						<p>当元素顶部到达或超出视口顶部时变绿</p>
						<p>当前状态: {isCeiling1 ? "已贴顶" : "未贴顶"}</p>
						<p style={{ fontSize: "12px", opacity: 0.8 }}>
							注意：在移动设备上，由于地址栏影响，元素可能看起来是底部越过视口才变绿
						</p>
					</div>
				</div>

				{/* 第二个检测元素 - 位置检测 */}
				<div
					ref={ref2}
					className={`demo-element ${isCeiling2 ? "ceiling-active" : ""}`}
					style={{
						height: "200px",
						backgroundColor: isCeiling2 ? "#FF9800" : "#9C27B0",
						marginBottom: "50px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "white",
						fontWeight: "bold",
						transition: "background-color 0.3s ease",
					}}
				>
					<div>
						<h4>位置检测元素</h4>
						<p>当元素顶部到达距离顶部 200px 时变橙</p>
						<p>当前状态: {isCeiling2 ? "已达到" : "未达到"}</p>
					</div>
				</div>

				{/* 第三个检测元素 - 超出检测 */}
				<div
					ref={ref3}
					className={`demo-element ${isCeiling3 ? "ceiling-active" : ""}`}
					style={{
						height: "200px",
						backgroundColor: isCeiling3 ? "#F44336" : "#607D8B",
						marginBottom: "20px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "white",
						fontWeight: "bold",
						transition: "background-color 0.3s ease",
					}}
				>
					<div>
						<h4>超出检测元素</h4>
						<p>当元素顶部超出视口顶部 50px 时变红</p>
						<p>当前状态: {isCeiling3 ? "已超出" : "未超出"}</p>
					</div>
				</div>

				{/* 额外的内容区域，用于滚动 */}
				<div
					style={{
						height: "800px",
						backgroundColor: "#f5f5f5",
						padding: "20px",
					}}
				>
					<h3>滚动区域</h3>
					<p>向下滚动查看元素状态变化</p>
					<div
						style={{
							height: "600px",
							backgroundColor: "#e0e0e0",
							marginTop: "20px",
						}}
					>
						<p style={{ padding: "20px" }}>
							这是一个额外的滚动区域，用于演示 useIsCeiling 的效果。
							当你滚动页面时，上面的元素会根据它们的位置状态改变颜色。
						</p>
						<div style={{ padding: "20px" }}>
							<h4>使用说明：</h4>
							<ul>
								<li>
									<strong>贴顶检测</strong>：当元素顶部到达视口顶部时，元素变绿
								</li>
								<li>
									<strong>位置检测</strong>：当元素顶部到达距离顶部 200px
									时，元素变橙
								</li>
								<li>
									<strong>超出检测</strong>：当元素顶部超出视口顶部 50px
									时，元素变红
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div className="code-section">
				<h3>代码示例</h3>
				<pre className="code-block">
					{`import React, { useRef } from "react";
import { useIsCeiling } from "@fly4react/observer";

const MyComponent = () => {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  
  // 检测是否贴顶（默认 position = 0）
  const isCeiling1 = useIsCeiling(ref1);
  
  // 检测是否达到距离顶部 100px 的位置
  const isCeiling2 = useIsCeiling(ref2, 100);
  
  return (
    <div>
      <div ref={ref1} className={isCeiling1 ? "ceiling" : ""}>
        贴顶检测元素
      </div>
      <div ref={ref2} className={isCeiling2 ? "at-position" : ""}>
        位置检测元素
      </div>
    </div>
  );
};`}
				</pre>
			</div>

			<div className="features-section">
				<h3>特性</h3>
				<ul>
					<li>
						<strong>精确检测</strong>：使用连续的 threshold 来精确检测元素位置
					</li>
					<li>
						<strong>状态优化</strong>：只在状态改变时更新，避免频繁触发
					</li>
					<li>
						<strong>灵活配置</strong>：可自定义比较位置，支持正负值
					</li>
					<li>
						<strong>性能优化</strong>：直接使用 IntersectionObserver，无额外开销
					</li>
					<li>
						<strong>类型安全</strong>：完整的 TypeScript 支持
					</li>
				</ul>
			</div>
		</div>
	);
};
