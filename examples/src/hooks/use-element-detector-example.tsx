import React, { useRef } from "react";
import { useElementDetector } from "@fly4react/observer";

/**
 * useElementDetector 示例
 * 
 * 展示 useElementDetector Hook 的使用方法，包括默认贴顶检测和自定义条件检测。
 */
export const UseElementDetectorExample: React.FC = () => {
	const basicRef = useRef<HTMLDivElement>(null);
	const customRef = useRef<HTMLDivElement>(null);
	const complexRef = useRef<HTMLDivElement>(null);

	// 默认贴顶检测
	const isCeiling = useElementDetector(basicRef);

	// 自定义条件检测：检测元素是否在指定范围内
	const isInRange = useElementDetector(customRef, {
		compute: (rect) => rect.top <= 50 && rect.bottom >= 100,
	});

	// 复杂条件检测：检测元素是否在视口中心区域
	const isInCenter = useElementDetector(complexRef, {
		compute: (rect) => {
			const viewportHeight = window.innerHeight;
			const centerY = viewportHeight / 2;
			const elementCenter = rect.top + rect.height / 2;
			const tolerance = 50; // 容差范围
			return Math.abs(elementCenter - centerY) <= tolerance;
		},
	});

	return (
		<div className="example-container">
			<h2>useElementDetector 示例</h2>
			<p>
				展示 useElementDetector Hook 的使用方法，支持默认贴顶检测和自定义条件检测。
			</p>

			<div className="demo-section">
				<h3>默认贴顶检测</h3>
				<div
					ref={basicRef}
					className={`demo-element ${isCeiling ? "ceiling" : ""}`}
					style={{
						height: "100px",
						backgroundColor: isCeiling ? "#4caf50" : "#e3f2fd",
						border: "2px solid #2196f3",
						borderRadius: "8px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						margin: "20px 0",
						transition: "all 0.3s ease",
					}}
				>
					<div>
						<div>默认贴顶检测</div>
						<div>条件: top ≤ 0</div>
						<div>状态: {isCeiling ? "已贴顶" : "未贴顶"}</div>
					</div>
				</div>

				<h3>自定义条件检测</h3>
				<div
					ref={customRef}
					className={`demo-element ${isInRange ? "custom" : ""}`}
					style={{
						height: "150px",
						backgroundColor: isInRange ? "#ff9800" : "#fff3e0",
						border: "2px solid #ff9800",
						borderRadius: "8px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						margin: "20px 0",
						transition: "all 0.3s ease",
					}}
				>
					<div>
						<div>自定义条件检测</div>
						<div>条件: top ≤ 50px 且 bottom ≥ 100px</div>
						<div>状态: {isInRange ? "满足条件" : "不满足条件"}</div>
					</div>
				</div>

				<h3>复杂条件检测</h3>
				<div
					ref={complexRef}
					className={`demo-element ${isInCenter ? "center" : ""}`}
					style={{
						height: "120px",
						backgroundColor: isInCenter ? "#9c27b0" : "#f3e5f5",
						border: "2px solid #9c27b0",
						borderRadius: "8px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						margin: "20px 0",
						transition: "all 0.3s ease",
					}}
				>
					<div>
						<div>视口中心检测</div>
						<div>条件: 元素中心在视口中心 ±50px 范围内</div>
						<div>状态: {isInCenter ? "在中心区域" : "不在中心区域"}</div>
					</div>
				</div>

				<div className="info-section">
					<h4>功能说明：</h4>
					<ul>
						<li>
							<strong>默认检测：</strong>不传参数时，默认检测元素是否贴顶（top ≤ 0）
						</li>
						<li>
							<strong>自定义检测：</strong>传入 compute 函数实现自定义检测逻辑
						</li>
						<li>
							<strong>灵活配置：</strong>支持任何基于 boundingClientRect 的检测逻辑
						</li>
						<li>
							<strong>状态持久化：</strong>一旦满足条件就保持激活状态
						</li>
					</ul>
				</div>

				<div className="code-section">
					<h4>代码示例：</h4>
					<pre>
						{`// 默认贴顶检测
const isCeiling = useElementDetector(ref);

// 自定义条件检测
const isInRange = useElementDetector(ref, {
  compute: (rect) => rect.top <= 50 && rect.bottom >= 100
});

// 复杂条件检测：检测元素是否在视口中心
const isInCenter = useElementDetector(ref, {
  compute: (rect) => {
    const viewportHeight = window.innerHeight;
    const centerY = viewportHeight / 2;
    const elementCenter = rect.top + rect.height / 2;
    const tolerance = 50;
    return Math.abs(elementCenter - centerY) <= tolerance;
  }
});`}
					</pre>
				</div>
			</div>

			{/* 添加一些空间让用户可以滚动测试 */}
			<div style={{ height: "800px", backgroundColor: "#f5f5f5", marginTop: "20px" }}>
				<div style={{ padding: "20px", textAlign: "center" }}>
					向下滚动以测试各种检测功能
				</div>
			</div>
		</div>
	);
};
