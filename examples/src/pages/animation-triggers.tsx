import { useIntersectionRatio, useOneOffVisibility } from "@fly4react/observer";
import React, { useState, useRef } from "react";

/**
 * 动画触发示例
 * 展示如何使用可见性检测触发各种动画效果
 */
export function AnimationTriggersExample() {
	const [playedAnimations, setPlayedAnimations] = useState<Set<string>>(
		new Set(),
	);

	// 各种动画元素的 refs
	const fadeInRef = useRef<HTMLDivElement>(null);
	const slideInRef = useRef<HTMLDivElement>(null);
	const scaleInRef = useRef<HTMLDivElement>(null);
	const rotateInRef = useRef<HTMLDivElement>(null);
	const bounceInRef = useRef<HTMLDivElement>(null);
	const progressRef = useRef<HTMLDivElement>(null);
	const countUpRef = useRef<HTMLDivElement>(null);

	// 一次性动画触发
	const fadeInVisible = useOneOffVisibility(fadeInRef, { threshold: 0.3 });
	const slideInVisible = useOneOffVisibility(slideInRef, { threshold: 0.5 });
	const scaleInVisible = useOneOffVisibility(scaleInRef, { threshold: 0.4 });
	const rotateInVisible = useOneOffVisibility(rotateInRef, { threshold: 0.6 });
	const bounceInVisible = useOneOffVisibility(bounceInRef, { threshold: 0.3 });
	const countUpVisible = useOneOffVisibility(countUpRef, { threshold: 0.5 });

	// 进度条使用交叉比例
	const progressRatio = useIntersectionRatio(progressRef, {
		step: 0.05,
		throttle: 16,
	});

	// 计数动画 Hook
	const useCountUp = (isVisible: boolean, target: number, duration = 2000) => {
		const [count, setCount] = useState(0);

		React.useEffect(() => {
			if (!isVisible) return;

			// const start = 0; // 未使用的变量
			const startTime = Date.now();

			const animate = () => {
				const elapsed = Date.now() - startTime;
				const progress = Math.min(elapsed / duration, 1);

				// 使用 easeOut 缓动函数
				const easeOut = 1 - (1 - progress) ** 3;
				const current = Math.floor(target * easeOut);

				setCount(current);

				if (progress < 1) {
					requestAnimationFrame(animate);
				}
			};

			requestAnimationFrame(animate);
		}, [isVisible, target, duration]);

		return count;
	};

	const count1 = useCountUp(countUpVisible, 1234, 2000);
	const count2 = useCountUp(countUpVisible, 567, 1500);
	const count3 = useCountUp(countUpVisible, 89, 1000);

	// 记录已播放的动画
	React.useEffect(() => {
		const animations = [
			{ name: "fadeIn", visible: fadeInVisible },
			{ name: "slideIn", visible: slideInVisible },
			{ name: "scaleIn", visible: scaleInVisible },
			{ name: "rotateIn", visible: rotateInVisible },
			{ name: "bounceIn", visible: bounceInVisible },
			{ name: "countUp", visible: countUpVisible },
		];

		                                for (const { name, visible } of animations) {
                        if (visible) {
                                setPlayedAnimations((prev) => new Set([...prev, name]));
                        }
                }
	}, [
		fadeInVisible,
		slideInVisible,
		scaleInVisible,
		rotateInVisible,
		bounceInVisible,
		countUpVisible,
	]);

	const resetAnimations = () => {
		setPlayedAnimations(new Set());
		window.location.reload(); // 简单的重置方式
	};

	return (
		<div style={{ padding: "20px" }}>
			<h2>动画触发示例</h2>

			{/* 状态面板 */}
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
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<div>
						<h3 style={{ margin: "0 0 10px 0" }}>🎬 动画播放状态</h3>
						<div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
							{[
								"fadeIn",
								"slideIn",
								"scaleIn",
								"rotateIn",
								"bounceIn",
								"countUp",
							].map((name) => (
								<span
									key={name}
									style={{
										padding: "4px 8px",
										borderRadius: "12px",
										fontSize: "12px",
										background: playedAnimations.has(name)
											? "#d4edda"
											: "#f8d7da",
										color: playedAnimations.has(name) ? "#155724" : "#721c24",
									}}
								>
									{playedAnimations.has(name) ? "✅" : "⏳"} {name}
								</span>
							))}
						</div>
					</div>

					                                <button
                                        type="button"
                                        onClick={resetAnimations}
						style={{
							padding: "8px 16px",
							background: "#6c757d",
							color: "white",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
						}}
					>
						🔄 重置动画
					</button>
				</div>
			</div>

			{/* 滚动提示 */}
			<div style={{ height: "60vh", background: "#f8f9fa", margin: "20px 0" }}>
				<div
					style={{
						height: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "18px",
						color: "#6c757d",
					}}
				>
					🎭 向下滚动触发各种动画效果
				</div>
			</div>

			{/* 淡入动画 */}
			<section style={{ marginBottom: "100px" }}>
				<h3>💫 淡入动画 (Fade In)</h3>
				<div
					ref={fadeInRef}
					style={{
						height: "200px",
						background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "12px",
						color: "white",
						fontSize: "20px",
						fontWeight: "bold",
						opacity: fadeInVisible ? 1 : 0,
						transition: "opacity 1s ease-in-out",
					}}
				>
					<div style={{ textAlign: "center" }}>
						<div style={{ fontSize: "48px", marginBottom: "10px" }}>💫</div>
						<div>我淡入了！</div>
					</div>
				</div>
			</section>

			{/* 滑入动画 */}
			<section style={{ marginBottom: "100px" }}>
				<h3>➡️ 滑入动画 (Slide In)</h3>
				<div
					ref={slideInRef}
					style={{
						height: "200px",
						background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "12px",
						color: "white",
						fontSize: "20px",
						fontWeight: "bold",
						transform: slideInVisible ? "translateX(0)" : "translateX(-100px)",
						opacity: slideInVisible ? 1 : 0,
						transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
					}}
				>
					<div style={{ textAlign: "center" }}>
						<div style={{ fontSize: "48px", marginBottom: "10px" }}>➡️</div>
						<div>我滑进来了！</div>
					</div>
				</div>
			</section>

			{/* 缩放动画 */}
			<section style={{ marginBottom: "100px" }}>
				<h3>🔍 缩放动画 (Scale In)</h3>
				<div
					ref={scaleInRef}
					style={{
						height: "200px",
						background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "12px",
						color: "white",
						fontSize: "20px",
						fontWeight: "bold",
						transform: scaleInVisible ? "scale(1)" : "scale(0.3)",
						opacity: scaleInVisible ? 1 : 0,
						transition: "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
					}}
				>
					<div style={{ textAlign: "center" }}>
						<div style={{ fontSize: "48px", marginBottom: "10px" }}>🔍</div>
						<div>我放大了！</div>
					</div>
				</div>
			</section>

			{/* 旋转动画 */}
			<section style={{ marginBottom: "100px" }}>
				<h3>🌀 旋转动画 (Rotate In)</h3>
				<div
					ref={rotateInRef}
					style={{
						height: "200px",
						background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "12px",
						color: "white",
						fontSize: "20px",
						fontWeight: "bold",
						transform: rotateInVisible
							? "rotate(0deg) scale(1)"
							: "rotate(-180deg) scale(0.5)",
						opacity: rotateInVisible ? 1 : 0,
						transition: "all 0.8s ease-out",
					}}
				>
					<div style={{ textAlign: "center" }}>
						<div style={{ fontSize: "48px", marginBottom: "10px" }}>🌀</div>
						<div>我旋转进来了！</div>
					</div>
				</div>
			</section>

			{/* 弹跳动画 */}
			<section style={{ marginBottom: "100px" }}>
				<h3>🏀 弹跳动画 (Bounce In)</h3>
				<div
					ref={bounceInRef}
					style={{
						height: "200px",
						background: "linear-gradient(135deg, #96fbc4 0%, #f9f047 100%)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "12px",
						color: "#333",
						fontSize: "20px",
						fontWeight: "bold",
						transform: bounceInVisible ? "scale(1)" : "scale(0)",
						opacity: bounceInVisible ? 1 : 0,
						animation: bounceInVisible
							? "bounceIn 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
							: "none",
					}}
				>
					<div style={{ textAlign: "center" }}>
						<div style={{ fontSize: "48px", marginBottom: "10px" }}>🏀</div>
						<div>我弹跳进来了！</div>
					</div>
				</div>
			</section>

			{/* 进度条动画 */}
			<section style={{ marginBottom: "100px" }}>
				<h3>📊 进度条动画 (基于可见比例)</h3>
				<div
					ref={progressRef}
					style={{
						height: "200px",
						background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
						borderRadius: "12px",
						padding: "30px",
						color: "white",
					}}
				>
					<h4 style={{ margin: "0 0 20px 0", textAlign: "center" }}>
						📈 动态进度显示
					</h4>

					<div style={{ marginBottom: "15px" }}>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "5px",
							}}
						>
							<span>进度 A</span>
							<span>
								{progressRatio !== undefined
									? Math.round(progressRatio * 100)
									: 0}
								%
							</span>
						</div>
						<div
							style={{
								width: "100%",
								height: "10px",
								background: "rgba(255,255,255,0.2)",
								borderRadius: "5px",
								overflow: "hidden",
							}}
						>
							<div
								style={{
									width: `${progressRatio !== undefined ? progressRatio * 100 : 0}%`,
									height: "100%",
									background: "rgba(255,255,255,0.9)",
									transition: "width 0.3s ease",
									borderRadius: "5px",
								}}
							/>
						</div>
					</div>

					<div style={{ marginBottom: "15px" }}>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "5px",
							}}
						>
							<span>进度 B</span>
							<span>
								{progressRatio !== undefined
									? Math.round(progressRatio * 80)
									: 0}
								%
							</span>
						</div>
						<div
							style={{
								width: "100%",
								height: "10px",
								background: "rgba(255,255,255,0.2)",
								borderRadius: "5px",
								overflow: "hidden",
							}}
						>
							<div
								style={{
									width: `${progressRatio !== undefined ? progressRatio * 80 : 0}%`,
									height: "100%",
									background: "rgba(255,255,255,0.9)",
									transition: "width 0.3s ease",
									borderRadius: "5px",
								}}
							/>
						</div>
					</div>

					<div
						style={{
							textAlign: "center",
							marginTop: "20px",
							fontSize: "14px",
							opacity: 0.8,
						}}
					>
						📍 滚动位置控制进度条
					</div>
				</div>
			</section>

			{/* 数字计数动画 */}
			<section style={{ marginBottom: "100px" }}>
				<h3>🔢 数字计数动画 (Count Up)</h3>
				<div
					ref={countUpRef}
					style={{
						height: "200px",
						background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "12px",
						color: "white",
					}}
				>
					<div style={{ textAlign: "center", width: "100%" }}>
						<h4 style={{ margin: "0 0 20px 0" }}>📈 统计数据</h4>
						<div style={{ display: "flex", justifyContent: "space-around" }}>
							<div>
								<div style={{ fontSize: "36px", fontWeight: "bold" }}>
									{count1.toLocaleString()}
								</div>
								<div style={{ fontSize: "14px", opacity: 0.8 }}>用户数</div>
							</div>
							<div>
								<div style={{ fontSize: "36px", fontWeight: "bold" }}>
									{count2.toLocaleString()}
								</div>
								<div style={{ fontSize: "14px", opacity: 0.8 }}>项目数</div>
							</div>
							<div>
								<div style={{ fontSize: "36px", fontWeight: "bold" }}>
									{count3.toLocaleString()}
								</div>
								<div style={{ fontSize: "14px", opacity: 0.8 }}>团队数</div>
							</div>
						</div>
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
					🎊 所有动画演示完成！
				</div>
			</div>

			{/* CSS 动画定义 */}
			<style>{`
        @keyframes bounceIn {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
		</div>
	);
}
