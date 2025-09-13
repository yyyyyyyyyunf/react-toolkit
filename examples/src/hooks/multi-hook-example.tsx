import React, { useRef, useState, useCallback, useMemo } from "react";
import {
	useElementDetector,
	useInViewport,
	useElementPosition,
	useElementPositionRef,
	useBoundingClientRect,
	useIntersectionRatio,
	type UseElementDetectorOptions,
	type Options,
} from "@fly4react/observer";

interface LogEntry {
	id: string;
	timestamp: string;
	hook: string;
	message: string;
	type: "info" | "success" | "warning" | "error";
}

interface HookConfig {
	name: string;
	enabled: boolean;
	description: string;
}

/**
 * 多 Hook 同时观察同一元素示例
 *
 * 演示如何对同一个元素应用多个 hook，验证：
 * 1. 多个 hook 可以同时工作
 * 2. 每个 hook 都能正确触发回调
 * 3. 智能位置同步策略正常工作
 * 4. 资源清理正确
 */
export const MultiHookExample = () => {
	const ref = useRef<HTMLDivElement>(null);
	const [logs, setLogs] = useState<LogEntry[]>([]);
	const [hookConfigs, setHookConfigs] = useState<Record<string, HookConfig>>({
		elementDetector: {
			name: "useElementDetector",
			enabled: true,
			description: "检测元素是否贴顶",
		},
		inViewport: {
			name: "useInViewport",
			enabled: true,
			description: "检测元素是否在视口内",
		},
		elementPosition: {
			name: "useElementPosition",
			enabled: true,
			description: "跟踪元素位置 (useState 版本)",
		},
		elementPositionRef: {
			name: "useElementPositionRef",
			enabled: true,
			description: "跟踪元素位置 (useRef 版本)",
		},
		boundingRect: {
			name: "useBoundingClientRect",
			enabled: true,
			description: "获取元素边界矩形",
		},
		intersectionRatio: {
			name: "useIntersectionRatio",
			enabled: true,
			description: "获取元素交叉比例",
		},
	});
	const [logFilter, setLogFilter] = useState<string>("all");
	const [performanceStats, setPerformanceStats] = useState<
		Record<string, number>
	>({});

	// 添加日志
	const addLog = useCallback(
		(hook: string, message: string, type: LogEntry["type"] = "info") => {
			const timestamp = new Date().toLocaleTimeString();
			const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
			const newLog: LogEntry = { id, timestamp, hook, message, type };
			setLogs((prev) => [newLog, ...prev.slice(0, 49)]); // Keep last 50 logs
		},
		[],
	);

	// 更新性能统计
	const updatePerformanceStats = useCallback((hookName: string) => {
		setPerformanceStats((prev) => ({
			...prev,
			[hookName]: (prev[hookName] || 0) + 1,
		}));
	}, []);

	const ceilingOptions: UseElementDetectorOptions = useMemo(
		() => ({
			compute: (rect) => rect.top <= 0,
			forceCalibrate: true,
			calibrateInterval: 2000,
		}),
		[],
	);

	// 1. 元素检测器 - 检测是否贴顶
	const isCeiling = useElementDetector(ref, ceilingOptions);

	// 2. 视口检测
	const isInViewport = useInViewport(ref);

	const elementPositionOptions: Options = useMemo(
		() => ({
			forceCalibrate: true,
			calibrateInterval: 2000,
		}),
		[],
	);
	// 3. 元素位置跟踪 (useState 版本)
	const position = useElementPosition(ref, elementPositionOptions);

	// 4. 元素位置跟踪 (useRef 版本)
	const positionRef = useElementPositionRef(ref, elementPositionOptions);

	// 5. 边界矩形
	const boundingRect = useBoundingClientRect(ref, elementPositionOptions);

	const intersectionRatioOptions: Options = useMemo(
		() => ({
			threshold: [0, 0.25, 0.5, 0.75, 1],
		}),
		[],
	);
	// 6. 交叉比例
	const intersectionRatio = useIntersectionRatio(ref, intersectionRatioOptions);

	// 监听状态变化并记录日志
	React.useEffect(() => {
		if (hookConfigs.elementDetector.enabled) {
			addLog(
				"useElementDetector",
				`${isCeiling ? "已贴顶" : "未贴顶"}`,
				isCeiling ? "success" : "info",
			);
			updatePerformanceStats("useElementDetector");
			console.log("isCeiling", isCeiling);
		}
	}, [
		isCeiling,
		hookConfigs.elementDetector.enabled,
		addLog,
		updatePerformanceStats,
	]);

	React.useEffect(() => {
		if (hookConfigs.inViewport.enabled) {
			addLog(
				"useInViewport",
				`${isInViewport ? "在视口内" : "在视口外"}`,
				isInViewport ? "success" : "warning",
			);
			updatePerformanceStats("useInViewport");
		}
	}, [
		isInViewport,
		hookConfigs.inViewport.enabled,
		addLog,
		updatePerformanceStats,
	]);

	React.useEffect(() => {
		if (hookConfigs.elementPosition.enabled && position) {
			addLog(
				"useElementPosition",
				`top=${Math.round(position.boundingClientRect.top)}, ratio=${position.intersectionRatio.toFixed(2)}`,
				"info",
			);
			updatePerformanceStats("useElementPosition");
		}
	}, [
		position,
		hookConfigs.elementPosition.enabled,
		addLog,
		updatePerformanceStats,
	]);

	React.useEffect(() => {
		if (hookConfigs.boundingRect.enabled && boundingRect) {
			addLog(
				"useBoundingClientRect",
				`width=${Math.round(boundingRect.width)}, height=${Math.round(boundingRect.height)}`,
				"info",
			);
			updatePerformanceStats("useBoundingClientRect");
		}
	}, [
		boundingRect,
		hookConfigs.boundingRect.enabled,
		addLog,
		updatePerformanceStats,
	]);

	React.useEffect(() => {
		if (
			hookConfigs.intersectionRatio.enabled &&
			intersectionRatio !== undefined
		) {
			addLog(
				"useIntersectionRatio",
				`ratio=${intersectionRatio.toFixed(2)}`,
				"info",
			);
			updatePerformanceStats("useIntersectionRatio");
		}
	}, [
		intersectionRatio,
		hookConfigs.intersectionRatio.enabled,
		addLog,
		updatePerformanceStats,
	]);

	// 切换 Hook 启用状态
	const toggleHook = useCallback(
		(hookKey: string) => {
			setHookConfigs((prev) => ({
				...prev,
				[hookKey]: { ...prev[hookKey], enabled: !prev[hookKey].enabled },
			}));
			addLog(
				"System",
				`${hookConfigs[hookKey].name} ${hookConfigs[hookKey].enabled ? "已禁用" : "已启用"}`,
				"warning",
			);
		},
		[hookConfigs, addLog],
	);

	// 手动检查 positionRef
	const checkPositionRef = useCallback(() => {
		if (positionRef.current) {
			const { boundingClientRect, scrollX, scrollY } = positionRef.current;
			addLog(
				"Manual Check",
				`positionRef: top=${Math.round(boundingClientRect.top)}, scrollX=${scrollX}, scrollY=${scrollY}`,
				"info",
			);
		} else {
			addLog("Manual Check", "positionRef: null", "warning");
		}
	}, [positionRef, addLog]);

	// 清空日志
	const clearLogs = useCallback(() => {
		setLogs([]);
		addLog("System", "日志已清空", "info");
	}, [addLog]);

	// 重置性能统计
	const resetStats = useCallback(() => {
		setPerformanceStats({});
		addLog("System", "性能统计已重置", "info");
	}, [addLog]);

	// 过滤日志
	const filteredLogs = useMemo(() => {
		if (logFilter === "all") return logs;
		return logs.filter((log) => log.hook === logFilter);
	}, [logs, logFilter]);

	// 获取可用的 Hook 名称用于过滤
	const availableHooks = useMemo(() => {
		const hooks = ["all", ...Object.keys(hookConfigs)];
		return hooks;
	}, [hookConfigs]);

	return (
		<div className="multi-hook-example">
			{/* Header Section */}
			<div className="example-header">
				<div className="header-content">
					<h1>多 Hook 同时观察同一元素</h1>
					<p className="header-description">
						这个示例演示如何对同一个元素应用多个 hook，验证多个 hook
						可以同时工作、正确触发回调、智能位置同步策略正常工作以及资源清理正确。
					</p>
				</div>
			</div>

			{/* Control Panel */}
			<div className="control-panel">
				<div className="panel-section">
					<h3>Hook 控制</h3>
					<div className="hook-toggles">
						{Object.entries(hookConfigs).map(([key, config]) => (
							<div key={key} className="hook-toggle">
								<label className="toggle-label">
									<input
										type="checkbox"
										checked={config.enabled}
										onChange={() => toggleHook(key)}
										className="toggle-input"
									/>
									<span className="toggle-slider" />
									<div className="toggle-info">
										<span className="hook-name">{config.name}</span>
										<span className="hook-description">
											{config.description}
										</span>
									</div>
								</label>
							</div>
						))}
					</div>
				</div>

				<div className="panel-section">
					<h3>操作控制</h3>
					<div className="action-buttons">
						<button onClick={checkPositionRef} className="btn btn-primary">
							🔍 检查 positionRef
						</button>
						<button onClick={clearLogs} className="btn btn-secondary">
							🗑️ 清空日志
						</button>
						<button onClick={resetStats} className="btn btn-secondary">
							📊 重置统计
						</button>
					</div>
				</div>

				<div className="panel-section">
					<h3>性能统计</h3>
					<div className="performance-stats">
						{Object.entries(performanceStats).map(([hook, count]) => (
							<div key={hook} className="stat-item">
								<span className="stat-hook">{hook}</span>
								<span className="stat-count">{count}</span>
							</div>
						))}
						{Object.keys(performanceStats).length === 0 && (
							<div className="no-stats">暂无统计数据</div>
						)}
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="example-content">
				{/* Observed Element */}
				<div className="element-section">
					<h3>被观察的元素</h3>
					<div
						ref={ref}
						className={`observed-element ${isCeiling ? "ceiling" : ""} ${isInViewport ? "in-viewport" : ""}`}
					>
						<div className="element-content">
							<div className="element-title">被观察的元素</div>
							<div className="element-status">
								<span
									className={`status-badge ${isCeiling ? "ceiling" : "normal"}`}
								>
									{isCeiling ? "已贴顶" : "未贴顶"}
								</span>
								<span
									className={`status-badge ${isInViewport ? "in-viewport" : "out-viewport"}`}
								>
									{isInViewport ? "在视口内" : "在视口外"}
								</span>
							</div>
							{intersectionRatio !== undefined && (
								<div className="element-ratio">
									可见比例: {(intersectionRatio * 100).toFixed(1)}%
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Status Dashboard */}
				<div className="status-dashboard">
					<h3>实时状态</h3>
					<div className="status-grid">
						<div className="status-card">
							<div className="status-header">
								<span className="status-icon">🎯</span>
								<span className="status-title">元素检测器</span>
							</div>
							<div
								className={`status-value ${isCeiling ? "active" : "inactive"}`}
							>
								{isCeiling ? "已贴顶" : "未贴顶"}
							</div>
						</div>

						<div className="status-card">
							<div className="status-header">
								<span className="status-icon">👁️</span>
								<span className="status-title">视口检测</span>
							</div>
							<div
								className={`status-value ${isInViewport ? "active" : "inactive"}`}
							>
								{isInViewport ? "在视口内" : "在视口外"}
							</div>
						</div>

						<div className="status-card">
							<div className="status-header">
								<span className="status-icon">📍</span>
								<span className="status-title">位置跟踪</span>
							</div>
							<div className="status-value">
								{position
									? `top: ${Math.round(position.boundingClientRect.top)}px`
									: "未初始化"}
							</div>
						</div>

						<div className="status-card">
							<div className="status-header">
								<span className="status-icon">📐</span>
								<span className="status-title">边界矩形</span>
							</div>
							<div className="status-value">
								{boundingRect
									? `${Math.round(boundingRect.width)}×${Math.round(boundingRect.height)}px`
									: "未初始化"}
							</div>
						</div>

						<div className="status-card">
							<div className="status-header">
								<span className="status-icon">📊</span>
								<span className="status-title">交叉比例</span>
							</div>
							<div className="status-value">
								{intersectionRatio !== undefined
									? `${(intersectionRatio * 100).toFixed(1)}%`
									: "未初始化"}
							</div>
						</div>

						<div className="status-card">
							<div className="status-header">
								<span className="status-icon">🔗</span>
								<span className="status-title">位置引用</span>
							</div>
							<div className="status-value">
								{positionRef.current ? "已初始化" : "未初始化"}
							</div>
						</div>
					</div>
				</div>

				{/* Logs Section */}
				<div className="logs-section">
					<div className="logs-header">
						<h3>实时日志</h3>
						<div className="logs-controls">
							<select
								value={logFilter}
								onChange={(e) => setLogFilter(e.target.value)}
								className="log-filter"
							>
								{availableHooks.map((hook) => (
									<option key={hook} value={hook}>
										{hook === "all" ? "全部日志" : hook}
									</option>
								))}
							</select>
							<span className="log-count">共 {filteredLogs.length} 条日志</span>
						</div>
					</div>
					<div className="logs-container">
						{filteredLogs.length === 0 ? (
							<div className="no-logs">
								<div className="no-logs-icon">📝</div>
								<div className="no-logs-text">暂无日志，滚动页面查看效果</div>
							</div>
						) : (
							filteredLogs.map((log) => (
								<div key={log.id} className={`log-item log-${log.type}`}>
									<div className="log-header">
										<span className="log-timestamp">{log.timestamp}</span>
										<span className="log-hook">{log.hook}</span>
									</div>
									<div className="log-message">{log.message}</div>
								</div>
							))
						)}
					</div>
				</div>
			</div>

			<style>{`
				.multi-hook-example {
					padding: 0;
					max-width: 1400px;
					margin: 0 auto;
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					min-height: 100vh;
					font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
				}

				/* Header Styles */
				.example-header {
					background: rgba(255, 255, 255, 0.95);
					backdrop-filter: blur(10px);
					padding: 2rem;
					margin-bottom: 2rem;
					border-radius: 0 0 20px 20px;
					box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
				}

				.header-content h1 {
					color: #2d3748;
					font-size: 2.5rem;
					font-weight: 700;
					margin: 0 0 1rem 0;
					background: linear-gradient(135deg, #667eea, #764ba2);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
				}

				.header-description {
					color: #4a5568;
					font-size: 1.1rem;
					line-height: 1.6;
					margin: 0;
				}

				/* Control Panel */
				.control-panel {
					display: grid;
					grid-template-columns: 2fr 1fr 1fr;
					gap: 2rem;
					margin: 0 2rem 2rem 2rem;
					background: rgba(255, 255, 255, 0.95);
					backdrop-filter: blur(10px);
					padding: 2rem;
					border-radius: 20px;
					box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
				}

				.panel-section h3 {
					color: #2d3748;
					font-size: 1.2rem;
					font-weight: 600;
					margin: 0 0 1rem 0;
					display: flex;
					align-items: center;
					gap: 0.5rem;
				}

				/* Hook Toggles */
				.hook-toggles {
					display: flex;
					flex-direction: column;
					gap: 1rem;
				}

				.hook-toggle {
					background: #f7fafc;
					border-radius: 12px;
					padding: 1rem;
					border: 2px solid transparent;
					transition: all 0.3s ease;
				}

				.hook-toggle:hover {
					border-color: #e2e8f0;
					transform: translateY(-2px);
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
				}

				.toggle-label {
					display: flex;
					align-items: center;
					gap: 1rem;
					cursor: pointer;
					width: 100%;
				}

				.toggle-input {
					display: none;
				}

				.toggle-slider {
					position: relative;
					width: 50px;
					height: 24px;
					background: #cbd5e0;
					border-radius: 12px;
					transition: all 0.3s ease;
					flex-shrink: 0;
				}

				.toggle-slider::before {
					content: '';
					position: absolute;
					top: 2px;
					left: 2px;
					width: 20px;
					height: 20px;
					background: white;
					border-radius: 50%;
					transition: all 0.3s ease;
					box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
				}

				.toggle-input:checked + .toggle-slider {
					background: #48bb78;
				}

				.toggle-input:checked + .toggle-slider::before {
					transform: translateX(26px);
				}

				.toggle-info {
					flex: 1;
				}

				.hook-name {
					display: block;
					font-weight: 600;
					color: #2d3748;
					margin-bottom: 0.25rem;
				}

				.hook-description {
					display: block;
					font-size: 0.875rem;
					color: #718096;
				}

				/* Action Buttons */
				.action-buttons {
					display: flex;
					flex-direction: column;
					gap: 0.75rem;
				}

				.btn {
					padding: 0.75rem 1rem;
					border: none;
					border-radius: 8px;
					font-weight: 500;
					cursor: pointer;
					transition: all 0.3s ease;
					display: flex;
					align-items: center;
					gap: 0.5rem;
					justify-content: center;
				}

				.btn-primary {
					background: linear-gradient(135deg, #667eea, #764ba2);
					color: white;
				}

				.btn-primary:hover {
					transform: translateY(-2px);
					box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
				}

				.btn-secondary {
					background: #e2e8f0;
					color: #4a5568;
				}

				.btn-secondary:hover {
					background: #cbd5e0;
					transform: translateY(-2px);
				}

				/* Performance Stats */
				.performance-stats {
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
				}

				.stat-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0.5rem;
					background: #f7fafc;
					border-radius: 6px;
					font-size: 0.875rem;
				}

				.stat-hook {
					color: #4a5568;
					font-weight: 500;
				}

				.stat-count {
					background: #667eea;
					color: white;
					padding: 0.25rem 0.5rem;
					border-radius: 4px;
					font-weight: 600;
					min-width: 2rem;
					text-align: center;
				}

				.no-stats {
					color: #a0aec0;
					font-style: italic;
					text-align: center;
					padding: 1rem;
				}

				/* Main Content */
				.example-content {
					margin: 0 2rem 2rem 2rem;
					display: flex;
					flex-direction: column;
					gap: 2rem;
				}

				/* Element Section */
				.element-section {
					background: rgba(255, 255, 255, 0.95);
					backdrop-filter: blur(10px);
					padding: 2rem;
					border-radius: 20px;
					box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
				}

				.element-section h3 {
					color: #2d3748;
					font-size: 1.5rem;
					font-weight: 600;
					margin: 0 0 1.5rem 0;
				}

				.observed-element {
					width: 100%;
					max-width: 400px;
					height: 250px;
					margin: 0 auto;
					background: linear-gradient(135deg, #4ecdc4, #44a08d);
					border-radius: 16px;
					display: flex;
					align-items: center;
					justify-content: center;
					transition: all 0.3s ease;
					box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
					position: relative;
					overflow: hidden;
				}

				.observed-element::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), transparent);
					pointer-events: none;
				}

				.observed-element.ceiling {
					background: linear-gradient(135deg, #ff6b6b, #ee5a52);
					transform: scale(1.05);
				}

				.observed-element.in-viewport {
					box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);
					transform: scale(1.02);
				}

				.element-content {
					text-align: center;
					color: white;
					z-index: 1;
					position: relative;
				}

				.element-title {
					font-size: 1.5rem;
					font-weight: 700;
					margin-bottom: 1rem;
					text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
				}

				.element-status {
					display: flex;
					gap: 0.5rem;
					justify-content: center;
					margin-bottom: 0.5rem;
				}

				.status-badge {
					padding: 0.25rem 0.75rem;
					border-radius: 20px;
					font-size: 0.875rem;
					font-weight: 600;
					text-shadow: none;
				}

				.status-badge.ceiling {
					background: rgba(255, 255, 255, 0.9);
					color: #e53e3e;
				}

				.status-badge.normal {
					background: rgba(255, 255, 255, 0.2);
					color: white;
				}

				.status-badge.in-viewport {
					background: rgba(72, 187, 120, 0.9);
					color: white;
				}

				.status-badge.out-viewport {
					background: rgba(245, 101, 101, 0.9);
					color: white;
				}

				.element-ratio {
					font-size: 0.875rem;
					opacity: 0.9;
				}

				/* Status Dashboard */
				.status-dashboard {
					background: rgba(255, 255, 255, 0.95);
					backdrop-filter: blur(10px);
					padding: 2rem;
					border-radius: 20px;
					box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
				}

				.status-dashboard h3 {
					color: #2d3748;
					font-size: 1.5rem;
					font-weight: 600;
					margin: 0 0 1.5rem 0;
				}

				.status-grid {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
					gap: 1rem;
				}

				.status-card {
					background: #f7fafc;
					border-radius: 12px;
					padding: 1.5rem;
					border: 2px solid transparent;
					transition: all 0.3s ease;
				}

				.status-card:hover {
					border-color: #e2e8f0;
					transform: translateY(-2px);
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
				}

				.status-header {
					display: flex;
					align-items: center;
					gap: 0.75rem;
					margin-bottom: 1rem;
				}

				.status-icon {
					font-size: 1.5rem;
				}

				.status-title {
					font-weight: 600;
					color: #2d3748;
				}

				.status-value {
					font-size: 1.1rem;
					font-weight: 500;
					padding: 0.5rem 1rem;
					border-radius: 8px;
					text-align: center;
				}

				.status-value.active {
					background: #c6f6d5;
					color: #22543d;
				}

				.status-value.inactive {
					background: #fed7d7;
					color: #742a2a;
				}

				/* Logs Section */
				.logs-section {
					background: rgba(255, 255, 255, 0.95);
					backdrop-filter: blur(10px);
					padding: 2rem;
					border-radius: 20px;
					box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
				}

				.logs-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 1.5rem;
				}

				.logs-header h3 {
					color: #2d3748;
					font-size: 1.5rem;
					font-weight: 600;
					margin: 0;
				}

				.logs-controls {
					display: flex;
					align-items: center;
					gap: 1rem;
				}

				.log-filter {
					padding: 0.5rem 1rem;
					border: 2px solid #e2e8f0;
					border-radius: 8px;
					background: white;
					color: #4a5568;
					font-weight: 500;
				}

				.log-count {
					color: #718096;
					font-size: 0.875rem;
					font-weight: 500;
				}

				.logs-container {
					max-height: 400px;
					overflow-y: auto;
					background: #1a202c;
					border-radius: 12px;
					padding: 1rem;
					border: 2px solid #2d3748;
				}

				.no-logs {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 3rem;
					color: #a0aec0;
				}

				.no-logs-icon {
					font-size: 3rem;
					margin-bottom: 1rem;
				}

				.no-logs-text {
					font-size: 1.1rem;
					font-style: italic;
				}

				.log-item {
					margin-bottom: 0.75rem;
					padding: 0.75rem;
					border-radius: 8px;
					border-left: 4px solid;
					background: rgba(255, 255, 255, 0.05);
					transition: all 0.3s ease;
				}

				.log-item:hover {
					background: rgba(255, 255, 255, 0.1);
				}

				.log-item.log-info {
					border-left-color: #4299e1;
				}

				.log-item.log-success {
					border-left-color: #48bb78;
				}

				.log-item.log-warning {
					border-left-color: #ed8936;
				}

				.log-item.log-error {
					border-left-color: #f56565;
				}

				.log-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 0.5rem;
				}

				.log-timestamp {
					color: #a0aec0;
					font-size: 0.75rem;
					font-family: 'Courier New', monospace;
				}

				.log-hook {
					background: #4a5568;
					color: white;
					padding: 0.25rem 0.5rem;
					border-radius: 4px;
					font-size: 0.75rem;
					font-weight: 600;
				}

				.log-message {
					color: #e2e8f0;
					font-family: 'Courier New', monospace;
					font-size: 0.875rem;
					line-height: 1.4;
				}

				/* Responsive Design */
				@media (max-width: 1024px) {
					.control-panel {
						grid-template-columns: 1fr;
						gap: 1.5rem;
					}
					
					.status-grid {
						grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
					}
				}

				@media (max-width: 768px) {
					.multi-hook-example {
						padding: 0;
					}
					
					.example-header,
					.control-panel,
					.example-content {
						margin: 0 1rem 1rem 1rem;
					}
					
					.header-content h1 {
						font-size: 2rem;
					}
					
					.observed-element {
						height: 200px;
					}
					
					.element-title {
						font-size: 1.25rem;
					}
					
					.status-grid {
						grid-template-columns: 1fr;
					}
					
					.logs-header {
						flex-direction: column;
						gap: 1rem;
						align-items: flex-start;
					}
				}
			`}</style>
		</div>
	);
};
