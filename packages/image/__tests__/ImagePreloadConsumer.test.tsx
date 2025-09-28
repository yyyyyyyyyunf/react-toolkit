import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ImagePreloadConsumer } from "../src/components/ImagePreloadConsumer";
import { GetPreloadImagesProvider } from "../src/context/GetPreloadImagesProvider";
import type { PreloadOptions } from "../src/types";

// 测试队列实现
class TestQueue {
	private images: PreloadOptions[] = [];

	constructor() {
		this.images = [];
	}

	addImage(options: PreloadOptions): void {
		const exists = this.images.some((img) => img.src === options.src);
		if (!exists) {
			this.images.push(options);
		}
	}

	getImages(): PreloadOptions[] {
		return [...this.images];
	}

	clearImages(): void {
		this.images.length = 0;
	}
}

describe("ImagePreloadConsumer", () => {
	it("should render preload links when images are available", () => {
		const testQueue = new TestQueue();

		// 添加一些测试图片
		testQueue.addImage({
			src: "https://example.com/image1.jpg",
			ssr: true,
			priority: "high",
			type: "image",
		});

		testQueue.addImage({
			src: "https://example.com/image2.jpg",
			ssr: true,
			priority: "low",
			type: "image/webp",
			sizes: "100vw",
			media: "(max-width: 768px)",
		});

		const mockGetImages = () => testQueue.getImages();

		render(
			<GetPreloadImagesProvider getImages={mockGetImages}>
				<ImagePreloadConsumer ssr={true} />
			</GetPreloadImagesProvider>,
		);

		// 检查是否渲染了预加载链接
		const containers = screen.getAllByRole("generic");
		expect(containers.length).toBeGreaterThanOrEqual(2);

		// 检查所有链接是否包含预期的内容
		const allHTML = containers.map((c) => c.innerHTML).join("");
		expect(allHTML).toContain('href="https://example.com/image1.jpg"');
		expect(allHTML).toContain('importance="high"');
		expect(allHTML).toContain('href="https://example.com/image2.jpg"');
		expect(allHTML).toContain('importance="low"');
		expect(allHTML).toContain('sizes="100vw"');
	});

	it("should not render when no images are available", () => {
		const testQueue = new TestQueue();
		const mockGetImages = () => testQueue.getImages();

		const { container } = render(
			<GetPreloadImagesProvider getImages={mockGetImages}>
				<ImagePreloadConsumer ssr={true} />
			</GetPreloadImagesProvider>,
		);

		// 应该没有渲染任何内容
		expect(container.firstChild).toBeNull();
	});

	it("should not render when ssr is false", () => {
		const testQueue = new TestQueue();
		const mockGetImages = () => testQueue.getImages();

		testQueue.addImage({
			src: "https://example.com/image.jpg",
			ssr: true,
		});

		const { container } = render(
			<GetPreloadImagesProvider getImages={mockGetImages}>
				<ImagePreloadConsumer ssr={false} />
			</GetPreloadImagesProvider>,
		);

		// 当 ssr=false 时，应该不渲染任何内容
		expect(container.firstChild).toBeNull();
	});

	it("should handle default values correctly", () => {
		const testQueue = new TestQueue();
		const mockGetImages = () => testQueue.getImages();

		testQueue.addImage({
			src: "https://example.com/default.jpg",
			ssr: true,
		});

		render(
			<GetPreloadImagesProvider getImages={mockGetImages}>
				<ImagePreloadConsumer />
			</GetPreloadImagesProvider>,
		);

		const containers = screen.getAllByRole("generic");
		expect(containers.length).toBeGreaterThanOrEqual(1);

		const container = containers[0];
		expect(container.innerHTML).toContain(
			'href="https://example.com/default.jpg"',
		);
		expect(container.innerHTML).toContain('rel="preload"');
	});

	it("should handle auto priority correctly", () => {
		const testQueue = new TestQueue();
		const mockGetImages = () => testQueue.getImages();

		testQueue.addImage({
			src: "https://example.com/auto-priority.jpg",
			ssr: true,
			priority: "auto",
		});

		render(
			<GetPreloadImagesProvider getImages={mockGetImages}>
				<ImagePreloadConsumer ssr={true} />
			</GetPreloadImagesProvider>,
		);

		const containers = screen.getAllByRole("generic");
		expect(containers.length).toBeGreaterThanOrEqual(1);

		const container = containers[0];
		expect(container.innerHTML).toContain(
			'href="https://example.com/auto-priority.jpg"',
		);
		expect(container.innerHTML).toContain('rel="preload"');
		// auto priority 不应该有 importance 属性
		expect(container.innerHTML).not.toContain("importance=");
	});

	it("should throw error when used without GetPreloadImagesProvider", () => {
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		expect(() => {
			render(<ImagePreloadConsumer ssr={true} />);
		}).toThrow(
			"useGetPreloadImages must be used within GetPreloadImagesProvider and getImages method must be provided",
		);

		consoleSpy.mockRestore();
	});
});
