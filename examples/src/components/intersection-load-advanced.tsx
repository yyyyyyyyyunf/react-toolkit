import { IntersectionLoad } from "@fly4react/observer";
import { useState, useRef, useCallback } from "react";

/**
 * IntersectionLoad 高级使用示例
 * 展示不同配置下的懒加载效果
 */
export function AdvancedLazyLoadExample() {
	const [isActive, setIsActive] = useState(true);
	const [loadCount, setLoadCount] = useState(0);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	// 模拟网络请求延迟
	const simulateLoading = useCallback(() => {
		return new Promise<void>((resolve) => {
			setTimeout(
				() => {
					setLoadCount((prev) => prev + 1);
					resolve();
				},
				1000 + Math.random() * 1000,
			); // 1-2秒随机延迟
		});
	}, []);

	// 稳定的 onChange 回调函数
	const handleViewportChange = useCallback(
		async (isVisible: boolean) => {
			if (isVisible) {
				await simulateLoading();
			}
		},
		[simulateLoading],
	);

	const handleContainerChange = useCallback(
		async (isVisible: boolean) => {
			if (isVisible) {
				await simulateLoading();
			}
		},
		[simulateLoading],
	);

	return (
		<div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
			<h2>高级懒加载示例</h2>
			<p style={{ color: "#666", marginBottom: "20px" }}>
				展示不同配置下的懒加载效果，包括不同的触发条件和自定义容器
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
				<button
					type="button"
					onClick={() => setIsActive(!isActive)}
					style={{
						padding: "8px 16px",
						background: isActive ? "#ff6b6b" : "#4ecdc4",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
						marginLeft: "15px",
					}}
				>
					{isActive ? "🛑 禁用懒加载" : "▶️ 启用懒加载"}
				</button>
			</div>

			{/* 创建滚动空间 */}
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
				📜 向下滚动查看不同配置的懒加载效果
			</div>

			{/* 配置1: 50% 可见时触发 */}
			<section style={{ marginBottom: "40px" }}>
				<h3>🎯 配置1: 50% 可见时触发 (threshold: 0.5)</h3>
				<p style={{ color: "#666", marginBottom: "10px" }}>
					元素需要50%进入视口才会开始加载
				</p>

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
							⏳ 等待50%可见...
						</div>
					}
					threshold={0.5}
					offset={-100}
					active={isActive}
					onChange={handleViewportChange}
				>
					<div
						style={{
							height: "200px",
							background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							color: "white",
							fontSize: "24px",
							fontWeight: "bold",
							borderRadius: "12px",
							boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
						}}
					>
						🎉 50%可见触发 - 内容已加载！
					</div>
				</IntersectionLoad>
			</section>

			{/* 配置2: 80% 可见时触发 */}
			<section style={{ marginBottom: "40px" }}>
				<h3>🎯 配置2: 80% 可见时触发 (threshold: 0.8)</h3>
				<p style={{ color: "#666", marginBottom: "10px" }}>
					元素需要80%进入视口才会开始加载
				</p>

				<IntersectionLoad
					style={{ height: 200 }}
					placeholder={
						<div
							style={{
								height: "200px",
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
							⏳ 等待80%可见...
						</div>
					}
					threshold={0.8}
					offset={-100}
					active={isActive}
					onChange={handleViewportChange}
				>
					<div
						style={{
							height: "200px",
							background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							color: "#333",
							fontSize: "24px",
							fontWeight: "bold",
							borderRadius: "12px",
							boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
						}}
					>
						🎉 80%可见触发 - 内容已加载！
					</div>
				</IntersectionLoad>
			</section>

			{/* 配置3: 自定义容器 */}
			<section>
				<h3>📦 配置3: 自定义容器内的懒加载</h3>
				<p style={{ color: "#666", marginBottom: "10px" }}>
					在自定义滚动容器内进行懒加载，而不是整个页面
				</p>

				<div
					style={{
						height: "400px",
						border: "3px solid #3498db",
						borderRadius: "12px",
						overflow: "auto",
						background: "#f8f9fa",
						position: "relative",
					}}
					ref={scrollContainerRef}
				>
					{/* 容器内的内容 */}
					<div
						style={{
							height: "350px",
							background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
							margin: "15px",
							borderRadius: "8px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							color: "white",
							fontSize: "16px",
						}}
					>
						📜 向下滚动查看懒加载效果
					</div>

					<IntersectionLoad
						style={{ height: 180 }}
						placeholder={
							<div
								style={{
									height: "180px",
									background:
										"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
									margin: "15px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									border: "3px dashed rgba(255,255,255,0.5)",
									borderRadius: "8px",
									color: "white",
									fontSize: "16px",
								}}
							>
								⏳ 容器内懒加载中...
							</div>
						}
						root={scrollContainerRef.current}
						threshold={0.8}
						offset={-50}
						active={isActive}
						onChange={handleContainerChange}
					>
						<div
							style={{
								height: "180px",
								background: "linear-gradient(45deg, #f093fb 0%, #f5576c 100%)",
								margin: "15px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "white",
								fontWeight: "bold",
								borderRadius: "8px",
								boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
								fontSize: "18px",
							}}
						>
							🎉 容器内内容已加载！
						</div>
					</IntersectionLoad>

					<div
						style={{
							height: "300px",
							background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
							margin: "15px",
							borderRadius: "8px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							color: "#333",
							fontSize: "16px",
						}}
					>
						容器内的更多内容
					</div>
				</div>
			</section>
		</div>
	);
}
