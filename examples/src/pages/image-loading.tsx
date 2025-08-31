import { ImageLoader, ImagePreloadConsumer } from "@fly4react/image";
import React, { useRef, useState } from "react";

const ImageLoadingExample: React.FC = () => {
	const imageRef = useRef<HTMLImageElement>(null);
	const [showPreloadDemo, setShowPreloadDemo] = useState(false);

	// 自定义转换函数
	const toWebP = (src: string) => src.replace(/\.(jpg|jpeg|png)$/i, ".webp");
	const addSize = (width: number, height?: number) => (src: string) =>
		`${src}?w=${width}${height ? `&h=${height}` : ""}`;
	const addQuality = (quality: number) => (src: string) =>
		`${src}${src.includes("?") ? "&" : "?"}q=${quality}`;

	const handleImageClick = () => {
		if (imageRef.current) {
			console.log("图片信息:", {
				naturalWidth: imageRef.current.naturalWidth,
				naturalHeight: imageRef.current.naturalHeight,
				complete: imageRef.current.complete,
				src: imageRef.current.src,
			});
		}
	};

	return (
		<div className="image-loading-example">
			<h1>图片加载示例</h1>

			{/* 预加载演示模式 */}
			<div className="example-section">
				<h2>预加载演示</h2>
				<div style={{ marginBottom: "1rem" }}>
					<button
						type="button"
						onClick={() => setShowPreloadDemo(!showPreloadDemo)}
						style={{
							padding: "8px 16px",
							backgroundColor: showPreloadDemo ? "#dc3545" : "#28a745",
							color: "white",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
						}}
					>
						{showPreloadDemo ? "关闭" : "开启"} 预加载演示模式
					</button>
					<p style={{ color: "#888", fontSize: "0.9rem", marginTop: "0.5rem" }}>
						{showPreloadDemo
							? "演示模式已开启，下面的图片会被添加到预加载队列中"
							: "点击开启演示模式，查看预加载功能"}
					</p>
				</div>

				{showPreloadDemo && (
					<div
						style={{
							background: "#2a2a2a",
							padding: "1rem",
							borderRadius: "8px",
							marginBottom: "1rem",
							border: "1px solid #444",
						}}
					>
						<h4 style={{ color: "#fff", marginBottom: "0.5rem" }}>
							预加载队列预览：
						</h4>
						<PreloadQueueDemo />
					</div>
				)}
			</div>

			{/* 预加载消费者 - 在 SSR 时渲染预加载链接 */}
			<ImagePreloadConsumer />

			<div className="example-section">
				<h2>基本用法</h2>

				<div className="image-grid">
					{/* 内容图片 */}
					<div className="image-item">
						<h3>内容图片</h3>
						<ImageLoader
							type="content"
							src="https://picsum.photos/400/300?random=1"
							alt="内容图片"
							style={{ width: "100%", height: "auto" }}
						/>
					</div>

					{/* 背景图片 */}
					<div className="image-item">
						<h3>背景图片</h3>
						<ImageLoader
							type="background"
							src="https://picsum.photos/400/300?random=2"
							style={{
								width: "100%",
								height: "200px",
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
						>
							<div
								style={{
									color: "white",
									textAlign: "center",
									paddingTop: "80px",
									textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
								}}
							>
								<h3>背景图片内容</h3>
								<p>这是背景图片上的文字</p>
							</div>
						</ImageLoader>
					</div>
				</div>
			</div>

			<div className="example-section">
				<h2>懒加载</h2>

				<div className="image-grid">
					<div className="image-item">
						<h3>懒加载内容图片</h3>
						<ImageLoader
							type="content"
							src="https://picsum.photos/400/300?random=3"
							alt="懒加载内容图片"
							lazyload={true}
							style={{ width: "100%", height: "auto" }}
						/>
					</div>

					<div className="image-item">
						<h3>背景图片</h3>
						<ImageLoader
							type="background"
							src="https://picsum.photos/400/300?random=4"
							style={{
								width: "100%",
								height: "200px",
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
						>
							<div
								style={{
									color: "white",
									textAlign: "center",
									paddingTop: "80px",
									textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
								}}
							>
								<h3>背景图片</h3>
							</div>
						</ImageLoader>
					</div>
				</div>
			</div>

			<div className="example-section">
				<h2>URL 转换</h2>

				<div className="image-grid">
					<div className="image-item">
						<h3>WebP 转换</h3>
						<ImageLoader
							type="content"
							src="https://picsum.photos/400/300?random=5"
							alt="WebP 转换"
							transform={toWebP}
							style={{ width: "100%", height: "auto" }}
						/>
					</div>

					<div className="image-item">
						<h3>尺寸参数</h3>
						<ImageLoader
							type="content"
							src="https://picsum.photos/400/300?random=6"
							alt="尺寸参数"
							transform={addSize(800, 600)}
							style={{ width: "100%", height: "auto" }}
						/>
					</div>

					<div className="image-item">
						<h3>质量参数</h3>
						<ImageLoader
							type="content"
							src="https://picsum.photos/400/300?random=7"
							alt="质量参数"
							transform={addQuality(85)}
							style={{ width: "100%", height: "auto" }}
						/>
					</div>

					<div className="image-item">
						<h3>组合转换</h3>
						<ImageLoader
							type="content"
							src="https://picsum.photos/400/300?random=8"
							alt="组合转换"
							transform={(src) => addQuality(90)(addSize(800)(toWebP(src)))}
							style={{ width: "100%", height: "auto" }}
						/>
					</div>
				</div>
			</div>

			<div className="example-section">
				<h2>ForwardRef 示例</h2>

				<div className="image-grid">
					<div className="image-item">
						<h3>带 Ref 的图片</h3>
						<ImageLoader
							ref={imageRef}
							type="content"
							src="https://picsum.photos/400/300?random=9"
							alt="带 Ref 的图片"
							style={{ width: "100%", height: "auto", cursor: "pointer" }}
							onClick={handleImageClick}
						/>
						<p>点击图片查看控制台信息</p>
					</div>

					<div className="image-item">
						<h3>动态切换类型</h3>
						<DynamicImageLoader />
					</div>
				</div>
			</div>

			<div className="example-section">
				<h2>预加载配置</h2>

				<div className="image-grid">
					<div className="image-item">
						<h3>高优先级预加载</h3>
						<ImageLoader
							type="content"
							src="https://picsum.photos/400/300?random=10"
							alt="高优先级预加载"
							preload={{ priority: "high", ssr: true }}
							style={{ width: "100%", height: "auto" }}
						/>
					</div>

					<div className="image-item">
						<h3>带尺寸的预加载</h3>
						<ImageLoader
							type="content"
							src="https://picsum.photos/400/300?random=11"
							alt="带尺寸的预加载"
							preload={{
								priority: "high",
								ssr: true,
								sizes: "(max-width: 768px) 100vw, 50vw",
							}}
							style={{ width: "100%", height: "auto" }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

// 预加载队列演示组件
const PreloadQueueDemo: React.FC = () => {
	const [preloadQueue, setPreloadQueue] = useState<
		Array<{ src: string; priority?: string; sizes?: string }>
	>([]);

	// 模拟获取预加载队列
	React.useEffect(() => {
		const interval = setInterval(() => {
			// 这里我们模拟从全局队列获取数据
			// 在实际应用中，这应该来自 useImagePreload hook 或全局状态
			const mockQueue = [
				{
					src: "https://picsum.photos/400/300?random=10",
					type: "image",
					priority: "high",
					sizes: "(max-width: 768px) 100vw, 50vw",
				},
				{
					src: "https://picsum.photos/400/300?random=11",
					type: "image",
					priority: "high",
				},
			];
			setPreloadQueue(mockQueue);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	if (preloadQueue.length === 0) {
		return <p style={{ color: "#888" }}>预加载队列为空</p>;
	}

	return (
		<div>
			<p style={{ color: "#fff", marginBottom: "0.5rem" }}>
				队列中的图片 ({preloadQueue.length} 个):
			</p>
			<ul
				style={{
					color: "#ccc",
					fontSize: "0.9rem",
					margin: 0,
					paddingLeft: "1rem",
				}}
			>
				{preloadQueue.map((item, index) => (
					<li key={`${item.src}-${index}`}>
						<strong>{item.src}</strong>
						{item.priority && ` (优先级: ${item.priority})`}
						{item.sizes && ` (尺寸: ${item.sizes})`}
					</li>
				))}
			</ul>
			<p style={{ color: "#888", fontSize: "0.8rem", marginTop: "0.5rem" }}>
				在 SSR 环境中，这些图片会生成 &lt;link rel="preload"&gt; 标签
			</p>
		</div>
	);
};

// 动态切换类型的示例组件
const DynamicImageLoader: React.FC = () => {
	const [type, setType] = React.useState<"content" | "background">("content");
	const dynamicRef = useRef<HTMLImageElement | HTMLDivElement>(null);

	return (
		<div>
			<div style={{ marginBottom: "10px" }}>
				<button
					type="button"
					onClick={() => setType("content")}
					style={{
						marginRight: "10px",
						padding: "8px 16px",
						backgroundColor: type === "content" ? "#007bff" : "#6c757d",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
					}}
				>
					内容图片
				</button>
				<button
					type="button"
					onClick={() => setType("background")}
					style={{
						padding: "8px 16px",
						backgroundColor: type === "background" ? "#007bff" : "#6c757d",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
					}}
				>
					背景图片
				</button>
			</div>

			<ImageLoader
				ref={dynamicRef}
				type={type}
				src="https://picsum.photos/400/300?random=12"
				alt="动态切换"
				style={
					type === "content"
						? { width: "100%", height: "auto" }
						: { width: "100%", height: "200px" }
				}
				transform={(src) => src.replace(/\.(jpg|jpeg|png)$/i, ".webp")}
			>
				{type === "background" && (
					<div
						style={{
							color: "white",
							textAlign: "center",
							paddingTop: "80px",
							textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
						}}
					>
						<h3>动态背景</h3>
					</div>
				)}
			</ImageLoader>
		</div>
	);
};

export default ImageLoadingExample;
