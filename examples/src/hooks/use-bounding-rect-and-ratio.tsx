import {
	useBoundingClientRect,
	useIntersectionRatio,
} from "@fly4react/observer";
import { useRef, useState } from "react";

/**
 * useBoundingClientRect 和 useIntersectionRatio 使用示例
 * 展示专门的边界矩形和交叉比例检测
 */
export function UseBoundingRectAndRatioExample() {
	const [showCoordinates, setShowCoordinates] = useState(true);
	const [showAdvanced, setShowAdvanced] = useState(false);

	const rect1Ref = useRef<HTMLDivElement>(null);
	const rect2Ref = useRef<HTMLDivElement>(null);
	const ratio1Ref = useRef<HTMLDivElement>(null);
	const ratio2Ref = useRef<HTMLDivElement>(null);

	// 边界矩形检测
	const boundingRect1 = useBoundingClientRect(rect1Ref, {
		step: 0.1,
		throttle: 16,
	});

	const boundingRect2 = useBoundingClientRect(rect2Ref, {
		threshold: [0, 0.5, 1], // 自定义阈值
		throttle: 33, // 30fps
	});

	// 交叉比例检测
	const intersectionRatio1 = useIntersectionRatio(ratio1Ref, {
		step: 0.05, // 更精确的比例检测
		throttle: 8,
	});

	const intersectionRatio2 = useIntersectionRatio(ratio2Ref, {
		step: 0.2, // 较大的步长
		throttle: 100,
	});

	// 格式化坐标显示
	const formatRect = (rect: DOMRect | null) => {
		if (!rect) return null;
		return {
			position: `(${rect.x.toFixed(1)}, ${rect.y.toFixed(1)})`,
			size: `${rect.width.toFixed(1)} × ${rect.height.toFixed(1)}`,
			bounds: {
				left: rect.left.toFixed(1),
				top: rect.top.toFixed(1),
				right: rect.right.toFixed(1),
				bottom: rect.bottom.toFixed(1),
			},
		};
	};

	// 可见性百分比显示组件
	const VisibilityBar = ({ ratio }: { ratio: number | undefined }) => {
		const percentage = ratio !== undefined ? ratio * 100 : 0;
		return (
			<div
				style={{
					width: "100%",
					height: "8px",
					background: "#e9ecef",
					borderRadius: "4px",
					overflow: "hidden",
					margin: "5px 0",
				}}
			>
				<div
					style={{
						width: `${percentage}%`,
						height: "100%",
						background:
							percentage > 66
								? "#28a745"
								: percentage > 33
									? "#ffc107"
									: "#dc3545",
						transition: "width 0.2s ease",
					}}
				/>
			</div>
		);
	};

	return (
		<div style={{ padding: "20px" }}>
			<h2>边界矩形 & 交叉比例检测</h2>

			{/* 控制面板 */}
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
				}}
			>
				<div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
					                                <button
                                        type="button"
                                        onClick={() => setShowCoordinates(!showCoordinates)}
						style={{
							padding: "8px 16px",
							background: showCoordinates ? "#28a745" : "#6c757d",
							color: "white",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
						}}
					>
						{showCoordinates ? "📐 隐藏坐标" : "📐 显示坐标"}
					</button>

					                                <button
                                        type="button"
                                        onClick={() => setShowAdvanced(!showAdvanced)}
						style={{
							padding: "8px 16px",
							background: showAdvanced ? "#17a2b8" : "#6c757d",
							color: "white",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
						}}
					>
						{showAdvanced ? "🔧 隐藏高级" : "🔧 显示高级"}
					</button>
				</div>

				{/* 实时数据总览 */}
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
						gap: "10px",
						marginTop: "15px",
					}}
				>
					<div
						style={{
							background: "#f8f9fa",
							padding: "10px",
							borderRadius: "4px",
						}}
					>
						<h4 style={{ margin: "0 0 5px 0", fontSize: "14px" }}>📐 矩形 1</h4>
						<div style={{ fontSize: "12px", fontFamily: "monospace" }}>
							{boundingRect1 ? formatRect(boundingRect1)?.position : "未检测"}
						</div>
					</div>

					<div
						style={{
							background: "#f8f9fa",
							padding: "10px",
							borderRadius: "4px",
						}}
					>
						<h4 style={{ margin: "0 0 5px 0", fontSize: "14px" }}>📊 比例 1</h4>
						<div style={{ fontSize: "12px" }}>
							{intersectionRatio1 !== undefined
								? `${(intersectionRatio1 * 100).toFixed(1)}%`
								: "未检测"}
						</div>
					</div>

					<div
						style={{
							background: "#f8f9fa",
							padding: "10px",
							borderRadius: "4px",
						}}
					>
						<h4 style={{ margin: "0 0 5px 0", fontSize: "14px" }}>📐 矩形 2</h4>
						<div style={{ fontSize: "12px", fontFamily: "monospace" }}>
							{boundingRect2 ? formatRect(boundingRect2)?.position : "未检测"}
						</div>
					</div>

					<div
						style={{
							background: "#f8f9fa",
							padding: "10px",
							borderRadius: "4px",
						}}
					>
						<h4 style={{ margin: "0 0 5px 0", fontSize: "14px" }}>📊 比例 2</h4>
						<div style={{ fontSize: "12px" }}>
							{intersectionRatio2 !== undefined
								? `${(intersectionRatio2 * 100).toFixed(1)}%`
								: "未检测"}
						</div>
					</div>
				</div>
			</div>

			{/* 滚动提示 */}
			<div style={{ height: "40vh", background: "#ecf0f1", margin: "20px 0" }}>
				<div
					style={{
						height: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "18px",
						color: "#7f8c8d",
					}}
				>
					📏 滚动页面观察边界矩形和交叉比例变化
				</div>
			</div>

			{/* 边界矩形示例 1 */}
			<section style={{ marginBottom: "60px" }}>
				<h3>📐 边界矩形检测 1 (高频更新)</h3>
				<p style={{ color: "#666", fontSize: "14px" }}>
					step=0.1, throttle=16ms
				</p>

				<div
					ref={rect1Ref}
					style={{
						height: "180px",
						background: boundingRect1
							? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
							: "#e9ecef",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "12px",
						color: boundingRect1 ? "white" : "#6c757d",
						fontSize: "16px",
						fontWeight: "bold",
						position: "relative",
						transition: "all 0.2s ease",
					}}
				>
					<div style={{ fontSize: "32px", marginBottom: "10px" }}>📐</div>
					<div>边界矩形检测</div>

					{showCoordinates && boundingRect1 && (
						<div
							style={{
								position: "absolute",
								top: "10px",
								left: "10px",
								background: "rgba(0,0,0,0.7)",
								color: "white",
								padding: "8px",
								borderRadius: "4px",
								fontSize: "11px",
								fontFamily: "monospace",
							}}
						>
							<div>位置: {formatRect(boundingRect1)?.position}</div>
							<div>尺寸: {formatRect(boundingRect1)?.size}</div>
						</div>
					)}

					{showAdvanced && boundingRect1 && (
						<div
							style={{
								position: "absolute",
								bottom: "10px",
								right: "10px",
								background: "rgba(0,0,0,0.7)",
								color: "white",
								padding: "8px",
								borderRadius: "4px",
								fontSize: "10px",
								fontFamily: "monospace",
							}}
						>
							<div>L: {formatRect(boundingRect1)?.bounds.left}</div>
							<div>T: {formatRect(boundingRect1)?.bounds.top}</div>
							<div>R: {formatRect(boundingRect1)?.bounds.right}</div>
							<div>B: {formatRect(boundingRect1)?.bounds.bottom}</div>
						</div>
					)}
				</div>
			</section>

			{/* 交叉比例示例 1 */}
			<section style={{ marginBottom: "60px" }}>
				<h3>📊 交叉比例检测 1 (精确检测)</h3>
				<p style={{ color: "#666", fontSize: "14px" }}>
					step=0.05, throttle=8ms
				</p>

				<div
					ref={ratio1Ref}
					style={{
						height: "180px",
						background:
							intersectionRatio1 !== undefined
								? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
								: "#e9ecef",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "12px",
						color: intersectionRatio1 !== undefined ? "white" : "#6c757d",
						fontSize: "16px",
						fontWeight: "bold",
						position: "relative",
						opacity:
							intersectionRatio1 !== undefined
								? 0.3 + intersectionRatio1 * 0.7
								: 0.3,
						transform:
							intersectionRatio1 !== undefined
								? `scale(${0.9 + intersectionRatio1 * 0.2})`
								: "scale(0.9)",
						transition: "all 0.2s ease",
					}}
				>
					<div style={{ fontSize: "32px", marginBottom: "10px" }}>📊</div>
					<div>交叉比例检测</div>
					<div
						style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px" }}
					>
						{intersectionRatio1 !== undefined
							? `${(intersectionRatio1 * 100).toFixed(1)}%`
							: "0%"}
					</div>

					{/* 可见性进度条 */}
					<div
						style={{
							position: "absolute",
							bottom: "15px",
							left: "15px",
							right: "15px",
						}}
					>
						<VisibilityBar ratio={intersectionRatio1} />
					</div>
				</div>
			</section>

			{/* 边界矩形示例 2 */}
			<section style={{ marginBottom: "60px" }}>
				<h3>📐 边界矩形检测 2 (自定义阈值)</h3>
				<p style={{ color: "#666", fontSize: "14px" }}>
					threshold=[0, 0.5, 1], throttle=33ms
				</p>

				<div
					ref={rect2Ref}
					style={{
						height: "180px",
						background: boundingRect2
							? "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
							: "#e9ecef",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "12px",
						color: boundingRect2 ? "white" : "#6c757d",
						fontSize: "16px",
						fontWeight: "bold",
						position: "relative",
						transition: "all 0.3s ease",
					}}
				>
					<div style={{ fontSize: "32px", marginBottom: "10px" }}>🔲</div>
					<div>自定义阈值检测</div>

					{boundingRect2 && (
						<div
							style={{
								position: "absolute",
								top: "10px",
								right: "10px",
								background: "rgba(0,0,0,0.7)",
								color: "white",
								padding: "8px",
								borderRadius: "4px",
								fontSize: "12px",
								textAlign: "center",
							}}
						>
							<div style={{ fontWeight: "bold" }}>尺寸</div>
							<div>{formatRect(boundingRect2)?.size}</div>
						</div>
					)}
				</div>
			</section>

			{/* 交叉比例示例 2 */}
			<section style={{ marginBottom: "60px" }}>
				<h3>📊 交叉比例检测 2 (低频更新)</h3>
				<p style={{ color: "#666", fontSize: "14px" }}>
					step=0.2, throttle=100ms
				</p>

				<div
					ref={ratio2Ref}
					style={{
						height: "180px",
						background:
							intersectionRatio2 !== undefined
								? "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
								: "#e9ecef",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "12px",
						color: intersectionRatio2 !== undefined ? "white" : "#6c757d",
						fontSize: "16px",
						fontWeight: "bold",
						position: "relative",
						transition: "all 0.3s ease",
					}}
				>
					<div style={{ fontSize: "32px", marginBottom: "10px" }}>📈</div>
					<div>低频比例检测</div>

					{/* 分段显示 */}
					<div
						style={{
							display: "flex",
							gap: "5px",
							marginTop: "15px",
							position: "absolute",
							bottom: "15px",
							left: "50%",
							transform: "translateX(-50%)",
						}}
					>
						      {[0, 0.2, 0.4, 0.6, 0.8, 1].map((threshold) => (
							<div
								key={threshold}
								style={{
									width: "15px",
									height: "15px",
									borderRadius: "50%",
									background:
										intersectionRatio2 !== undefined &&
										intersectionRatio2 >= threshold
											? "rgba(255,255,255,0.9)"
											: "rgba(255,255,255,0.3)",
									transition: "all 0.3s ease",
								}}
							/>
						))}
					</div>

					<div
						style={{
							position: "absolute",
							top: "15px",
							left: "50%",
							transform: "translateX(-50%)",
							fontSize: "20px",
							fontWeight: "bold",
						}}
					>
						{intersectionRatio2 !== undefined
							? `${(intersectionRatio2 * 100).toFixed(0)}%`
							: "0%"}
					</div>
				</div>
			</section>

			{/* 结束空间 */}
			<div style={{ height: "50vh", background: "#f8f9fa" }}>
				<div
					style={{
						height: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "16px",
						color: "#95a5a6",
					}}
				>
					📏 边界矩形和交叉比例检测演示完成
				</div>
			</div>
		</div>
	);
}
