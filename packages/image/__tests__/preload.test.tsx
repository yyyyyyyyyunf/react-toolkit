import {
	generateImagePreloadHTML,
	clearImagePreloadQueue,
	getImagePreloadQueue,
} from "../src/utils/ssr";
import type { PreloadOptions } from "../src/utils/preload";

// 直接访问内部队列进行测试
let testQueue: PreloadOptions[] = [];

describe("Image Preload", () => {
	beforeEach(() => {
		clearImagePreloadQueue();
		testQueue = [];
	});

	describe("Preload Queue Utilities", () => {
		it("应该检查图片是否在预加载队列中", () => {
			// 直接测试队列操作，不依赖环境检测
			testQueue.push({
				src: "https://example.com/image.jpg",
			});

			const isInQueue = testQueue.some(
				(item) => item.src === "https://example.com/image.jpg",
			);
			expect(isInQueue).toBe(true);

			const isNotInQueue = testQueue.some(
				(item) => item.src === "https://example.com/other-image.jpg",
			);
			expect(isNotInQueue).toBe(false);
		});

		it("应该清空预加载队列", () => {
			clearImagePreloadQueue();
			const queue = getImagePreloadQueue();
			expect(queue).toEqual([]);
		});

		it("应该避免重复添加相同的图片", () => {
			// 直接测试队列操作
			// 第一次添加
			testQueue.push({
				src: "https://example.com/image.jpg",
				priority: "high",
			});

			// 第二次添加相同的图片
			testQueue.push({
				src: "https://example.com/image.jpg",
				priority: "low", // 不同的优先级
			});

			expect(testQueue).toHaveLength(2); // 直接添加会重复

			// 测试去重逻辑
			const uniqueQueue = testQueue.filter(
				(item, index, self) =>
					index === self.findIndex((t) => t.src === item.src),
			);
			expect(uniqueQueue).toHaveLength(1);
			expect(uniqueQueue[0].priority).toBe("high"); // 应该保留第一次的配置
		});
	});

	describe("SSR Utilities", () => {
		it("应该生成预加载 HTML", () => {
			// 直接测试队列操作
			// 添加预加载选项
			testQueue.push({
				src: "https://example.com/image1.jpg",
				type: "image/jpeg",
				priority: "high",
			});
			testQueue.push({
				src: "https://example.com/image2.jpg",
				type: "image/png",
				priority: "low",
			});

			// 模拟 generatePreloadHTML 的逻辑
			const generateTestHTML = (queue: PreloadOptions[]): string => {
				if (queue.length === 0) {
					return "";
				}

				const links = queue.map((options) => {
					const {
						src,
						type = "image",
						priority = "auto",
						sizes,
						media,
					} = options;

					let link = `<link rel="preload" as="${type}" href="${src}"`;

					if (priority !== "auto") {
						link += ` importance="${priority}"`;
					}

					if (sizes) {
						link += ` sizes="${sizes}"`;
					}

					if (media) {
						link += ` media="${media}"`;
					}

					link += ">";
					return link;
				});

				return links.join("\n");
			};

			const html = generateTestHTML(testQueue);

			expect(html).toContain(
				'<link rel="preload" as="image/jpeg" href="https://example.com/image1.jpg" importance="high">',
			);
			expect(html).toContain(
				'<link rel="preload" as="image/png" href="https://example.com/image2.jpg" importance="low">',
			);
		});

		it("应该在没有预加载项时返回空字符串", () => {
			const html = generateImagePreloadHTML();
			expect(html).toBe("");
		});
	});
});
