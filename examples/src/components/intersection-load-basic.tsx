import { IntersectionLoad } from "@fly4react/observer";
import { useState, useCallback } from "react";

/**
 * IntersectionLoad 基础使用示例
 * 展示懒加载的基本功能
 */
export function BasicLazyLoadExample() {
	const [loadCount, setLoadCount] = useState(0);
	const [loadingStates, setLoadingStates] = useState({
		component1: false,
		component2: false,
		component3: false,
	});

	// 模拟网络请求延迟
	const simulateLoading = useCallback(
		(componentKey: keyof typeof loadingStates) => {
			setLoadingStates((prev) => ({ ...prev, [componentKey]: true }));

			setTimeout(
				() => {
					setLoadCount((prev) => prev + 1);
					setLoadingStates((prev) => ({ ...prev, [componentKey]: false }));
				},
				1500 + Math.random() * 1000,
			); // 1.5-2.5秒随机延迟
		},
		[],
	);

	// 稳定的 onChange 回调函数
	const handleComponent1Change = useCallback(
		(visible: boolean) => {
			if (visible) {
				simulateLoading("component1");
			}
		},
		[simulateLoading],
	);

	const handleComponent2Change = useCallback(
		(visible: boolean) => {
			if (visible) {
				simulateLoading("component2");
			}
		},
		[simulateLoading],
	);

	const handleComponent3Change = useCallback(
		(visible: boolean) => {
			if (visible) {
				simulateLoading("component3");
			}
		},
		[simulateLoading],
	);

	return (
		<div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
			<h2>基础懒加载示例</h2>
			<p style={{ color: "#666", marginBottom: "20px" }}>
				向下滚动查看懒加载效果，组件只有在完全进入视口时才会开始加载（offset:
				-200px）
			</p>

			{/* 状态指示器 */}
			<div
				style={{
					position: "sticky",
					top: "20px",
					background: "white",
					padding: "15px",
					borderRadius: "8px",
					boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
					marginBottom: "20px",
					zIndex: 100,
					textAlign: "center",
				}}
			>
				🔄 已加载组件数量: {loadCount}
			</div>

			{/* 创建滚动空间 */}
			<div
				style={{
					height: "80vh",
					background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
					margin: "20px 0",
					borderRadius: "12px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "white",
					fontSize: "18px",
				}}
			>
				📜 向下滚动查看懒加载效果
			</div>

			{/* 懒加载组件 1 */}
			<IntersectionLoad
				style={{ height: 200 }}
				placeholder={
					<div
						style={{
							height: "200px",
							background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "18px",
							color: "white",
							borderRadius: "12px",
							border: "3px dashed rgba(255,255,255,0.5)",
						}}
					>
						⏳ 组件 1 正在加载中...
					</div>
				}
				threshold={0.1}
				offset={-200}
				onChange={handleComponent1Change}
			>
				<div
					style={{
						height: "200px",
						background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "24px",
						color: "white",
						fontWeight: "bold",
						borderRadius: "12px",
						boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
					}}
				>
					🎉 组件 1 已加载完成！
				</div>
			</IntersectionLoad>

			{/* 中间空间 */}
			<div
				style={{
					height: "40vh",
					background: "#f8f9fa",
					margin: "20px 0",
					borderRadius: "8px",
				}}
			>
				<div
					style={{
						height: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "#6c757d",
						fontSize: "16px",
					}}
				>
					📦 继续滚动加载更多组件
				</div>
			</div>

			{/* 懒加载组件 2 */}
			<IntersectionLoad
				style={{ height: 250 }}
				placeholder={
					<div
						style={{
							height: "250px",
							background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "18px",
							color: "#333",
							borderRadius: "12px",
							border: "3px dashed #ccc",
						}}
					>
						⏳ 组件 2 正在加载中...
					</div>
				}
				threshold={0.1}
				offset={-200}
				onChange={handleComponent2Change}
			>
				<div
					style={{
						height: "250px",
						background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "24px",
						color: "#333",
						fontWeight: "bold",
						borderRadius: "12px",
						boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
					}}
				>
					🎉 组件 2 已加载完成！
				</div>
			</IntersectionLoad>

			{/* 懒加载组件 3 */}
			<IntersectionLoad
				style={{ height: 180 }}
				placeholder={
					<div
						style={{
							height: "180px",
							background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "18px",
							color: "white",
							borderRadius: "12px",
							border: "3px dashed rgba(255,255,255,0.5)",
						}}
					>
						⏳ 组件 3 正在加载中...
					</div>
				}
				threshold={0.1}
				offset={-200}
				onChange={handleComponent3Change}
			>
				<div
					style={{
						height: "180px",
						background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "24px",
						color: "white",
						fontWeight: "bold",
						borderRadius: "12px",
						boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
					}}
				>
					🎉 组件 3 已加载完成！
				</div>
			</IntersectionLoad>

			{/* 结束区域 */}
			<div
				style={{
					height: "60vh",
					background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
					margin: "20px 0",
					borderRadius: "12px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "white",
					fontSize: "18px",
				}}
			>
				🎊 所有组件加载完成！
			</div>
		</div>
	);
}
