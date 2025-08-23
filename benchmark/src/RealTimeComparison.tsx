import type React from "react";
import { useRef, useState, useEffect } from "react";
import { useInViewport } from "@fly4react/observer";
import VisibilitySensor from "react-visibility-sensor";

const RealTimeComparison: React.FC = () => {
	const [observerVisible, setObserverVisible] = useState(false);
	const [sensorVisible, setSensorVisible] = useState(false);
	const [observerCallbackCount, setObserverCallbackCount] = useState(0);
	const [sensorCallbackCount, setSensorCallbackCount] = useState(0);
	const [observerLastCallbackTime, setObserverLastCallbackTime] = useState(0);
	const [sensorLastCallbackTime, setSensorLastCallbackTime] = useState(0);

	const observerRef = useRef<HTMLDivElement>(null);
	const sensorRef = useRef<HTMLDivElement>(null);

	const isInViewport = useInViewport(observerRef, {
		threshold: 0.5,
		throttle: 16,
	});

	useEffect(() => {
		if (isInViewport !== undefined) {
			const startTime = performance.now();
			setObserverVisible(isInViewport);
			setObserverCallbackCount((prev) => prev + 1);
			setObserverLastCallbackTime(performance.now() - startTime);
		}
	}, [isInViewport]);

	const handleSensorChange = (isVisible: boolean) => {
		const startTime = performance.now();
		setSensorVisible(isVisible);
		setSensorCallbackCount((prev) => prev + 1);
		setSensorLastCallbackTime(performance.now() - startTime);
	};

	return (
		<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
			<h2>实时性能对比</h2>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: "20px",
					marginBottom: "20px",
				}}
			>
				{/* @fly4react/observer */}
				<div
					style={{
						border: "2px solid #007bff",
						borderRadius: "8px",
						padding: "15px",
					}}
				>
					<h3 style={{ color: "#007bff", marginTop: 0 }}>
						@fly4react/observer
					</h3>
					<div
						ref={observerRef}
						style={{
							width: "200px",
							height: "150px",
							backgroundColor: observerVisible ? "#28a745" : "#dc3545",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							color: "white",
							fontSize: "18px",
							fontWeight: "bold",
							marginBottom: "10px",
							transition: "background-color 0.3s ease",
						}}
					>
						{observerVisible ? "可见" : "不可见"}
					</div>
					<div>
						<p>
							<strong>状态:</strong> {observerVisible ? "可见" : "不可见"}
						</p>
						<p>
							<strong>回调次数:</strong> {observerCallbackCount}
						</p>
						<p>
							<strong>最后回调时间:</strong>{" "}
							{observerLastCallbackTime.toFixed(4)}ms
						</p>
					</div>
				</div>

				{/* react-visibility-sensor */}
				<div
					style={{
						border: "2px solid #ffc107",
						borderRadius: "8px",
						padding: "15px",
					}}
				>
					<h3 style={{ color: "#ffc107", marginTop: 0 }}>
						react-visibility-sensor
					</h3>
					<VisibilitySensor onChange={handleSensorChange} partialVisibility>
						<div
							style={{
								width: "200px",
								height: "150px",
								backgroundColor: sensorVisible ? "#28a745" : "#dc3545",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "white",
								fontSize: "18px",
								fontWeight: "bold",
								marginBottom: "10px",
								transition: "background-color 0.3s ease",
							}}
						>
							{sensorVisible ? "可见" : "不可见"}
						</div>
					</VisibilitySensor>
					<div>
						<p>
							<strong>状态:</strong> {sensorVisible ? "可见" : "不可见"}
						</p>
						<p>
							<strong>回调次数:</strong> {sensorCallbackCount}
						</p>
						<p>
							<strong>最后回调时间:</strong> {sensorLastCallbackTime.toFixed(4)}
							ms
						</p>
					</div>
				</div>
			</div>

			{/* 性能对比 */}
			<div
				style={{
					backgroundColor: "#f8f9fa",
					padding: "15px",
					borderRadius: "8px",
					marginBottom: "20px",
				}}
			>
				<h4>性能对比</h4>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "10px",
					}}
				>
					<div>
						<p>
							<strong>回调响应速度:</strong>
						</p>
						<p>
							{observerLastCallbackTime < sensorLastCallbackTime
								? `@fly4react/observer 快 ${(((sensorLastCallbackTime - observerLastCallbackTime) / sensorLastCallbackTime) * 100).toFixed(1)}%`
								: `react-visibility-sensor 快 ${(((observerLastCallbackTime - sensorLastCallbackTime) / observerLastCallbackTime) * 100).toFixed(1)}%`}
						</p>
					</div>
					<div>
						<p>
							<strong>回调频率:</strong>
						</p>
						<p>
							{observerCallbackCount > sensorCallbackCount
								? `@fly4react/observer 更频繁 (${observerCallbackCount - sensorCallbackCount} 次)`
								: `react-visibility-sensor 更频繁 (${sensorCallbackCount - observerCallbackCount} 次)`}
						</p>
					</div>
				</div>
			</div>

			{/* 使用说明 */}
			<div
				style={{
					backgroundColor: "#e9ecef",
					padding: "15px",
					borderRadius: "8px",
					fontSize: "14px",
				}}
			>
				<h4>使用说明</h4>
				<p>滚动页面来观察两个库的实时性能表现：</p>
				<ul>
					<li>绿色表示元素可见，红色表示不可见</li>
					<li>回调次数显示可见性变化的触发频率</li>
					<li>回调时间显示每次回调的执行速度</li>
					<li>两个组件使用相同的配置参数进行公平对比</li>
				</ul>
			</div>
		</div>
	);
};

export default RealTimeComparison;
