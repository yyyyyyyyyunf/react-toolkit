import type React from "react";
import RealTimeComparison from "./RealTimeComparison";

const BenchmarkApp: React.FC = () => {
	return (
		<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
			<h1>Performance Benchmark</h1>
			<h2>@fly4react/observer vs react-visibility-sensor</h2>

			<RealTimeComparison />

			<div
				style={{
					marginTop: "30px",
					padding: "15px",
					backgroundColor: "#e9ecef",
					borderRadius: "5px",
				}}
			>
				<h4>测试说明</h4>
				<ul>
					<li>实时对比两个库的性能表现</li>
					<li>滚动页面观察可见性检测的响应速度</li>
					<li>回调次数显示触发频率</li>
					<li>回调时间显示执行效率</li>
				</ul>
				<p>
					<strong>注意:</strong> 这些测试结果可能因浏览器、设备和系统性能而异。
				</p>
			</div>
		</div>
	);
};

export default BenchmarkApp;
