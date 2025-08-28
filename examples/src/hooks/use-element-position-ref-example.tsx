import React, { useRef } from "react";
import { useElementPositionRef } from "@fly4react/observer";

/**
 * useElementPositionRef 示例
 * 
 * 这个 Hook 与 useElementPosition 功能相同，但使用 useRef 存储位置信息，
 * 不会触发组件重新渲染，适用于需要实时获取元素位置但不想影响渲染性能的场景。
 */
export const UseElementPositionRefExample: React.FC = () => {
	const elementRef = useRef<HTMLDivElement>(null);
	const positionRef = useElementPositionRef(elementRef, {
		step: 0.1, // 每 10% 触发一次
		throttle: 16, // 60fps
		skipWhenOffscreen: true,
	});

	// 事件处理函数示例：获取实时位置信息
	const handleClick = () => {
		if (positionRef.current) {
			console.log("=== 元素位置信息 ===");
			console.log("边界矩形:", positionRef.current.boundingClientRect);
			console.log("交叉比例:", positionRef.current.intersectionRatio);
			console.log("是否相交:", positionRef.current.isIntersecting);
			console.log("时间戳:", positionRef.current.time);
			console.log("相对位置:", positionRef.current.relativeRect);
		} else {
			console.log("元素位置信息尚未可用");
		}
	};

	// 定时器示例：定期检查位置信息
	React.useEffect(() => {
		const interval = setInterval(() => {
			if (positionRef.current?.isIntersecting) {
				console.log("元素当前可见，位置:", positionRef.current.boundingClientRect);
			}
		}, 1000);

		return () => clearInterval(interval);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="example-container">
			<h2>useElementPositionRef 示例</h2>
			<p>
				这个 Hook 使用 useRef 存储位置信息，不会触发组件重新渲染。
				适用于需要实时获取元素位置但不想影响渲染性能的场景。
			</p>

			<div className="demo-section">
				<h3>功能演示</h3>
				<button type="button" onClick={handleClick} className="demo-button">
					点击获取当前元素位置信息
				</button>

				<div
					ref={elementRef}
					className="tracked-element"
					style={{
						width: "200px",
						height: "100px",
						backgroundColor: "#e3f2fd",
						border: "2px solid #2196f3",
						borderRadius: "8px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						margin: "20px 0",
						transition: "all 0.3s ease",
					}}
				>
					被跟踪的元素
				</div>

				<div className="info-section">
					<h4>使用说明：</h4>
					<ul>
						<li>
							<strong>不会触发重新渲染：</strong>位置信息存储在 ref 中，组件不会因为位置变化而重新渲染
						</li>
						<li>
							<strong>实时获取位置：</strong>可以在事件处理函数、定时器等地方实时获取元素位置
						</li>
						<li>
							<strong>性能优化：</strong>适合需要频繁检查元素位置但不想影响渲染性能的场景
						</li>
						<li>
							<strong>节流控制：</strong>支持自定义节流时间，控制位置更新的频率
						</li>
					</ul>
				</div>

				<div className="code-section">
					<h4>代码示例：</h4>
					<pre>
						{`const elementRef = useRef<HTMLDivElement>(null);
const positionRef = useElementPositionRef(elementRef, {
  step: 0.1,
  throttle: 16,
  skipWhenOffscreen: true,
});

// 在事件处理函数中获取位置
const handleClick = () => {
  if (positionRef.current) {
    console.log('位置:', positionRef.current.boundingClientRect);
    console.log('交叉比例:', positionRef.current.intersectionRatio);
  }
};`}
					</pre>
				</div>
			</div>

			{/* 添加一些空间让用户可以滚动测试 */}
			<div style={{ height: "1000px", backgroundColor: "#f5f5f5", marginTop: "20px" }}>
				<div style={{ padding: "20px", textAlign: "center" }}>
					向下滚动以测试元素位置跟踪
				</div>
			</div>
		</div>
	);
};
