import { useRef, useEffect, useState, useCallback } from "react";
import {
	useElementPosition,
	useInViewport,
	useOneOffVisibility,
} from "@fly4react/observer";

const InitialViewportTest = () => {
	const elementPositionRef = useRef<HTMLDivElement>(null);
	const inViewportRef = useRef<HTMLDivElement>(null);
	const oneOffVisibilityRef = useRef<HTMLDivElement>(null);

	// 使用不同的 hooks 测试初始 viewport 行为
	const position = useElementPosition(elementPositionRef, { step: 0.1 });
	const isInViewport = useInViewport(inViewportRef, { step: 0.1 });
	const hasBeenVisible = useOneOffVisibility(oneOffVisibilityRef, {
		threshold: 0.1,
	});

	const [logs, setLogs] = useState<string[]>([]);

	const addLog = useCallback((message: string) => {
		setLogs((prev) => [
			...prev,
			`${new Date().toLocaleTimeString()}: ${message}`,
		]);
	}, []);

	useEffect(() => {
		addLog("=== 初始 Viewport 测试开始 ===");
		addLog(`useElementPosition 初始值: ${position ? "有值" : "null"}`);
		addLog(`useInViewport 初始值: ${isInViewport}`);
		addLog(`useOneOffVisibility 初始值: ${hasBeenVisible}`);
	}, [addLog, position, isInViewport, hasBeenVisible]);

	useEffect(() => {
		if (position) {
			addLog(
				`✅ useElementPosition 获得位置信息 - 交叉比例: ${position.intersectionRatio.toFixed(2)}`,
			);
		}
	}, [position, addLog]);

	useEffect(() => {
		addLog(`🔄 useInViewport 状态变化: ${isInViewport}`);
	}, [isInViewport, addLog]);

	useEffect(() => {
		if (hasBeenVisible) {
			addLog("🎯 useOneOffVisibility 触发 - 元素已可见");
		}
	}, [hasBeenVisible, addLog]);

	return (
		<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
			<h1 style={{ color: "#333", marginBottom: "20px" }}>
				初始 Viewport 行为测试
			</h1>

			<div style={{ marginBottom: "30px" }}>
				<h3>测试说明</h3>
				<p>这个测试验证当组件一开始就在 viewport 中时，各个 hooks 的行为：</p>
				<ul>
					<li>✅ 应该立即获得位置信息（而不是 null）</li>
					<li>✅ 应该立即知道元素在 viewport 中</li>
					<li>✅ 一次性可见性检测应该立即触发</li>
				</ul>
			</div>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: "20px",
					marginBottom: "30px",
				}}
			>
				{/* useElementPosition 测试 */}
				<div
					style={{
						border: "2px solid #007acc",
						borderRadius: "8px",
						padding: "15px",
					}}
				>
					<h4 style={{ color: "#007acc", marginBottom: "10px" }}>
						useElementPosition 测试
					</h4>
					<div
						ref={elementPositionRef}
						style={{
							width: "100%",
							height: "120px",
							backgroundColor: position ? "#e8f5e8" : "#ffe8e8",
							border: `2px solid ${position ? "#4caf50" : "#f44336"}`,
							borderRadius: "6px",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "14px",
						}}
					>
						{position ? (
							<>
								<div style={{ fontWeight: "bold", color: "#4caf50" }}>
									✅ 已获得位置信息
								</div>
								<div>交叉比例: {position.intersectionRatio.toFixed(2)}</div>
								<div>是否相交: {position.isIntersecting ? "是" : "否"}</div>
								<div>时间戳: {position.time}</div>
							</>
						) : (
							<div style={{ color: "#f44336" }}>❌ 等待位置信息...</div>
						)}
					</div>
				</div>

				{/* useInViewport 测试 */}
				<div
					style={{
						border: "2px solid #ff9800",
						borderRadius: "8px",
						padding: "15px",
					}}
				>
					<h4 style={{ color: "#ff9800", marginBottom: "10px" }}>
						useInViewport 测试
					</h4>
					<div
						ref={inViewportRef}
						style={{
							width: "100%",
							height: "120px",
							backgroundColor: isInViewport ? "#fff3e0" : "#ffe8e8",
							border: `2px solid ${isInViewport ? "#ff9800" : "#f44336"}`,
							borderRadius: "6px",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "14px",
						}}
					>
						{isInViewport ? (
							<>
								<div style={{ fontWeight: "bold", color: "#ff9800" }}>
									✅ 元素在视口中
								</div>
								<div>状态: 可见</div>
							</>
						) : (
							<div style={{ color: "#f44336" }}>❌ 元素不在视口中</div>
						)}
					</div>
				</div>
			</div>

			{/* useOneOffVisibility 测试 */}
			<div
				style={{
					border: "2px solid #9c27b0",
					borderRadius: "8px",
					padding: "15px",
					marginBottom: "30px",
				}}
			>
				<h4 style={{ color: "#9c27b0", marginBottom: "10px" }}>
					useOneOffVisibility 测试
				</h4>
				<div
					ref={oneOffVisibilityRef}
					style={{
						width: "100%",
						height: "120px",
						backgroundColor: hasBeenVisible ? "#f3e5f5" : "#ffe8e8",
						border: `2px solid ${hasBeenVisible ? "#9c27b0" : "#f44336"}`,
						borderRadius: "6px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "14px",
					}}
				>
					{hasBeenVisible ? (
						<>
							<div style={{ fontWeight: "bold", color: "#9c27b0" }}>
								🎯 元素已可见过
							</div>
							<div>一次性触发完成</div>
						</>
					) : (
						<div style={{ color: "#f44336" }}>⏳ 等待元素可见...</div>
					)}
				</div>
			</div>

			{/* 日志区域 */}
			<div
				style={{
					border: "1px solid #ddd",
					borderRadius: "6px",
					padding: "15px",
				}}
			>
				<h4 style={{ marginBottom: "10px" }}>实时日志</h4>
				<div
					style={{
						height: "200px",
						overflowY: "auto",
						backgroundColor: "#f5f5f5",
						padding: "10px",
						fontFamily: "monospace",
						fontSize: "12px",
						border: "1px solid #ddd",
						borderRadius: "4px",
					}}
				>
					{logs.map((log, index) => (
						<div
							key={`log-${index}-${log.slice(0, 20)}`}
							style={{ marginBottom: "2px" }}
						>
							{log}
						</div>
					))}
				</div>
				<button
					type="button"
					onClick={() => setLogs([])}
					style={{
						marginTop: "10px",
						padding: "5px 10px",
						backgroundColor: "#f44336",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
					}}
				>
					清空日志
				</button>
			</div>

			{/* 说明区域 */}
			<div
				style={{
					marginTop: "20px",
					padding: "15px",
					backgroundColor: "#e3f2fd",
					borderRadius: "6px",
				}}
			>
				<h4>预期结果</h4>
				<p>如果组件一开始就在 viewport 中，你应该看到：</p>
				<ul>
					<li>所有三个测试区域都显示绿色/成功状态</li>
					<li>日志中显示立即获得了位置信息</li>
					<li>useInViewport 立即返回 true</li>
					<li>useOneOffVisibility 立即触发</li>
				</ul>
				<p>
					<strong>
						这证明了 Intersection Observer 在元素一开始就在 viewport
						中时会立即触发回调！
					</strong>
				</p>
			</div>
		</div>
	);
};

export default InitialViewportTest;
