import { IntersectionLoad } from "@fly4react/observer";
import { useState, useRef } from "react";

/**
 * IntersectionLoad 高级使用示例
 * 展示自定义容器、动态控制等高级功能
 */
export function AdvancedLazyLoadExample() {
	const [isActive, setIsActive] = useState(true);
	const [visibilityLog, setVisibilityLog] = useState<string[]>([]);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const addLog = (message: string) => {
		setVisibilityLog((prev) => [
			...prev.slice(-4),
			`${new Date().toLocaleTimeString()}: ${message}`,
		]);
	};

	return (
		<div style={{ padding: "20px" }}>
			<h2>高级懒加载示例</h2>

			{/* 控制面板 */}
			<div
				style={{
					background: "#f5f5f5",
					padding: "15px",
					borderRadius: "8px",
					marginBottom: "20px",
				}}
			>
				<h3>控制面板</h3>
				<button
					onClick={() => setIsActive(!isActive)}
					style={{
						padding: "8px 16px",
						background: isActive ? "#ff6b6b" : "#4ecdc4",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
						marginRight: "10px",
					}}
				>
					{isActive ? "🛑 禁用懒加载" : "▶️ 启用懒加载"}
				</button>

				<button
					onClick={() => setVisibilityLog([])}
					style={{
						padding: "8px 16px",
						background: "#95a5a6",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
					}}
				>
					🗑️ 清空日志
				</button>
			</div>

			{/* 日志显示 */}
			<div
				style={{
					background: "#2c3e50",
					color: "#ecf0f1",
					padding: "10px",
					borderRadius: "4px",
					fontFamily: "monospace",
					fontSize: "12px",
					marginBottom: "20px",
					minHeight: "60px",
				}}
			>
				<div style={{ fontWeight: "bold", marginBottom: "5px" }}>
					📋 可见性日志:
				</div>
				{visibilityLog.length === 0 ? (
					<div style={{ color: "#95a5a6" }}>暂无日志...</div>
				) : (
					visibilityLog.map((log, index) => <div key={index}>{log}</div>)
				)}
			</div>

			{/* 基于 viewport 的懒加载 */}
			<section style={{ marginBottom: "40px" }}>
				<h3>🌐 基于 Viewport 的懒加载</h3>
				<div
					style={{ height: "30vh", background: "#ecf0f1", margin: "10px 0" }}
				>
					滚动查看下面的懒加载元素
				</div>

				<IntersectionLoad
					height={200}
					placeholder={
						<div
							style={{
								height: "200px",
								background: "#bdc3c7",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: "16px",
							}}
						>
							💫 等待进入视口...
						</div>
					}
					threshold={0.5} // 50% 可见时触发
					offset={50}
					active={isActive}
					onChange={(isVisible) =>
						addLog(`Viewport 元素 ${isVisible ? "可见" : "不可见"}`)
					}
				>
					<div
						style={{
							height: "200px",
							background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							color: "white",
							fontSize: "18px",
							fontWeight: "bold",
						}}
					>
						🎯 Viewport 内容已加载
					</div>
				</IntersectionLoad>
			</section>

			{/* 基于自定义容器的懒加载 */}
			<section>
				<h3>📦 基于自定义容器的懒加载</h3>
				<div
					style={{
						height: "300px",
						border: "2px solid #3498db",
						borderRadius: "8px",
						overflow: "auto",
						background: "#ecf0f1",
					}}
					ref={scrollContainerRef}
				>
					{/* 容器内的内容 */}
					<div
						style={{ height: "200px", background: "#f8f9fa", margin: "10px" }}
					>
						在这个容器内滚动
					</div>

					<IntersectionLoad
						height={150}
						placeholder={
							<div
								style={{
									height: "150px",
									background: "#e9ecef",
									margin: "10px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									border: "2px dashed #6c757d",
								}}
							>
								🔄 容器内懒加载中...
							</div>
						}
						root={scrollContainerRef.current}
						threshold="top"
						active={isActive}
						onChange={(isVisible) =>
							addLog(`容器内元素 ${isVisible ? "可见" : "不可见"}`)
						}
					>
						<div
							style={{
								height: "150px",
								background: "linear-gradient(45deg, #f093fb 0%, #f5576c 100%)",
								margin: "10px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "white",
								fontWeight: "bold",
								borderRadius: "4px",
							}}
						>
							🎉 容器内容已加载
						</div>
					</IntersectionLoad>

					<div
						style={{ height: "300px", background: "#f8f9fa", margin: "10px" }}
					>
						容器内的更多内容
					</div>
				</div>
			</section>
		</div>
	);
}
