import React, { useRef, useState } from "react";
import {
	type ObserverCallbackParamType,
	type ScrollDirection,
	useIntersectionObserver,
} from "react-intersection-tool";

const ScrollDirectionExample: React.FC = () => {
	const [scrollDirection, setScrollDirection] =
		useState<ScrollDirection>("none");
	const [isVisible, setIsVisible] = useState(false);
	const targetRef = useRef<HTMLDivElement>(null);

	useIntersectionObserver(
		targetRef,
		(entry: ObserverCallbackParamType) => {
			setIsVisible(entry.isIntersecting);

			// 获取滚动方向
			if (entry.scrollDirection && entry.scrollDirection !== "none") {
				setScrollDirection(entry.scrollDirection);
				console.log("滚动方向:", entry.scrollDirection);
			}
		},
		{
			threshold: [0, 0.25, 0.5, 0.75, 1], // 使用多个阈值来获得更频繁的更新
		},
	);

	const getDirectionText = (direction: ScrollDirection): string => {
		switch (direction) {
			case "up":
				return "向下滚动";
			case "down":
				return "向上滚动";
			case "left":
				return "向右滚动";
			case "right":
				return "向左滚动";
			case "none":
				return "无滚动";
			default:
				return "未知";
		}
	};

	const getDirectionColor = (direction: ScrollDirection): string => {
		switch (direction) {
			case "up":
				return "#4CAF50"; // 绿色
			case "down":
				return "#2196F3"; // 蓝色
			case "left":
				return "#FF9800"; // 橙色
			case "right":
				return "#9C27B0"; // 紫色
			case "none":
				return "#757575"; // 灰色
			default:
				return "#000000";
		}
	};

	return (
		<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
			<h2>滚动方向检测示例</h2>

			<div style={{ marginBottom: "20px" }}>
				<h3>当前状态:</h3>
				<p>可见性: {isVisible ? "可见" : "不可见"}</p>
				<p style={{ color: getDirectionColor(scrollDirection) }}>
					滚动方向: {getDirectionText(scrollDirection)}
				</p>
			</div>

			{/* 占位内容，用于产生滚动 */}
			<div
				style={{
					height: "200vh",
					background: "linear-gradient(to bottom, #f0f0f0, #e0e0e0)",
				}}
			>
				<div style={{ padding: "20px" }}>
					<p>向下滚动查看目标元素...</p>
				</div>

				{/* 目标元素 */}
				<div
					ref={targetRef}
					style={{
						height: "200px",
						background: isVisible ? "#4CAF50" : "#f44336",
						color: "white",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "18px",
						fontWeight: "bold",
						margin: "50px 0",
						borderRadius: "8px",
						transition: "background-color 0.3s ease",
					}}
				>
					{isVisible ? "元素可见！" : "元素不可见"}
				</div>

				<div style={{ padding: "20px" }}>
					<p>继续滚动查看方向变化...</p>
				</div>
			</div>

			<div
				style={{
					marginTop: "20px",
					padding: "20px",
					background: "#f5f5f5",
					borderRadius: "8px",
				}}
			>
				<h3>使用说明:</h3>
				<ul>
					<li>滚动页面观察目标元素的状态变化</li>
					<li>控制台会输出实时的滚动方向信息</li>
					<li>元素颜色会根据可见性状态变化</li>
					<li>滚动方向会实时更新显示</li>
				</ul>
			</div>
		</div>
	);
};

export { ScrollDirectionExample };
export default ScrollDirectionExample;
