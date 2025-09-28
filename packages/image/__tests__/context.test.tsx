import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PreloadQueueProvider } from "../src/context/PreloadQueueProvider";
import { AddToPreloadProvider } from "../src/context/AddToPreloadProvider";
import { GetPreloadImagesProvider } from "../src/context/GetPreloadImagesProvider";
import { ClearPreloadProvider } from "../src/context/ClearPreloadProvider";
import { useAddToPreloadQueue } from "../src/hooks/useAddToPreloadQueue";
import { useGetPreloadImages } from "../src/hooks/useGetPreloadImages";
import { useClearPreloadQueue } from "../src/hooks/useClearPreloadQueue";
import { useImagePreload } from "../src/hooks/useImagePreload";
import type { PreloadOptions } from "../src/types";

// 测试组件 - 只使用 addToPreloadQueue
function TestAddComponent() {
	const addToPreloadQueue = useAddToPreloadQueue();

	const handleAddImage = () => {
		addToPreloadQueue({
			src: "https://example.com/test.jpg",
			ssr: true,
			priority: "high",
		});
	};

	return (
		<div>
			<button onClick={handleAddImage}>Add Image</button>
		</div>
	);
}

// 测试组件 - 只使用 getImages
function TestGetComponent() {
	const getImages = useGetPreloadImages();

	const handleGetImages = () => {
		const images = getImages();
		return images;
	};

	return (
		<div>
			<button onClick={handleGetImages}>Get Images</button>
		</div>
	);
}

// 测试组件 - 只使用 clearQueue
function TestClearComponent() {
	const clearQueue = useClearPreloadQueue();

	const handleClearQueue = () => {
		clearQueue();
	};

	return (
		<div>
			<button onClick={handleClearQueue}>Clear Queue</button>
		</div>
	);
}

// 完整测试组件 - 使用所有 hooks
function TestFullComponent() {
	const addToPreloadQueue = useAddToPreloadQueue();
	const getImages = useGetPreloadImages();
	const clearQueue = useClearPreloadQueue();

	const handleAddImage = () => {
		addToPreloadQueue({
			src: "https://example.com/test.jpg",
			ssr: true,
			priority: "high",
		});
	};

	const handleGetImages = () => {
		const images = getImages();
		return images;
	};

	const handleClearQueue = () => {
		clearQueue();
	};

	return (
		<div>
			<button onClick={handleAddImage}>Add Image</button>
			<button onClick={handleGetImages}>Get Images</button>
			<button onClick={handleClearQueue}>Clear Queue</button>
		</div>
	);
}

// 简单的队列实现用于测试
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

describe("PreloadQueueProvider", () => {
	it("should provide context values", () => {
		const testQueue = new TestQueue();

		render(
			<PreloadQueueProvider preloadQueue={testQueue}>
				<TestFullComponent />
			</PreloadQueueProvider>,
		);

		expect(screen.getByText("Add Image")).toBeInTheDocument();
		expect(screen.getByText("Get Images")).toBeInTheDocument();
		expect(screen.getByText("Clear Queue")).toBeInTheDocument();
	});

	it("should throw error when used outside provider", () => {
		// 抑制控制台错误
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		expect(() => {
			render(<TestFullComponent />);
		}).toThrow("useAddToPreloadQueue must be used within AddToPreloadProvider");

		consoleSpy.mockRestore();
	});
});

describe("AddToPreloadProvider", () => {
	it("should add images to queue", () => {
		const testQueue = new TestQueue();
		let addedImage: PreloadOptions | null = null;

		const mockAddImage = (options: PreloadOptions) => {
			addedImage = options;
			testQueue.addImage(options);
		};

		render(
			<AddToPreloadProvider addImage={mockAddImage}>
				<TestAddComponent />
			</AddToPreloadProvider>,
		);

		// 点击添加图片按钮
		screen.getByText("Add Image").click();

		expect(addedImage).toEqual({
			src: "https://example.com/test.jpg",
			ssr: true,
			priority: "high",
		});
	});
});

describe("GetPreloadImagesProvider", () => {
	it("should get images from queue", () => {
		const testQueue = new TestQueue();
		let getImagesCalled = false;

		const mockGetImages = () => {
			getImagesCalled = true;
			return testQueue.getImages();
		};

		render(
			<GetPreloadImagesProvider getImages={mockGetImages}>
				<TestGetComponent />
			</GetPreloadImagesProvider>,
		);

		// 点击获取图片按钮
		screen.getByText("Get Images").click();

		expect(getImagesCalled).toBe(true);
	});

	it("should throw error when getImages is not provided", () => {
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		expect(() => {
			render(
				<GetPreloadImagesProvider>
					<TestGetComponent />
				</GetPreloadImagesProvider>,
			);
		}).toThrow(
			"useGetPreloadImages must be used within GetPreloadImagesProvider and getImages method must be provided",
		);

		consoleSpy.mockRestore();
	});
});

describe("ClearPreloadProvider", () => {
	it("should clear queue", () => {
		const testQueue = new TestQueue();
		let clearImagesCalled = false;

		const mockClearImages = () => {
			clearImagesCalled = true;
			testQueue.clearImages();
		};

		render(
			<ClearPreloadProvider clearImages={mockClearImages}>
				<TestClearComponent />
			</ClearPreloadProvider>,
		);

		// 点击清空队列按钮
		screen.getByText("Clear Queue").click();

		expect(clearImagesCalled).toBe(true);
	});

	it("should throw error when clearImages is not provided", () => {
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		expect(() => {
			render(
				<ClearPreloadProvider>
					<TestClearComponent />
				</ClearPreloadProvider>,
			);
		}).toThrow(
			"useClearPreloadQueue must be used within ClearPreloadProvider and clearImages method must be provided",
		);

		consoleSpy.mockRestore();
	});
});

describe("useImagePreload", () => {
	it("should add image to queue immediately", () => {
		const testQueue = new TestQueue();
		let addedImage: PreloadOptions | null = null;

		const mockAddImage = (options: PreloadOptions) => {
			addedImage = options;
			testQueue.addImage(options);
		};

		function TestHookComponent() {
			useImagePreload({
				src: "https://example.com/hook-test.jpg",
				ssr: true,
				priority: "low",
			});
			return <div>Test</div>;
		}

		render(
			<AddToPreloadProvider addImage={mockAddImage}>
				<TestHookComponent />
			</AddToPreloadProvider>,
		);

		expect(addedImage).toEqual({
			src: "https://example.com/hook-test.jpg",
			ssr: true,
			priority: "low",
		});
	});

	it("should not add image when ssr is false", () => {
		const testQueue = new TestQueue();
		let addImageCalled = false;

		const mockAddImage = (options: PreloadOptions) => {
			addImageCalled = true;
			testQueue.addImage(options);
		};

		function TestHookComponent() {
			useImagePreload({
				src: "https://example.com/no-ssr.jpg",
				ssr: false,
				priority: "high",
			});
			return <div>Test</div>;
		}

		render(
			<AddToPreloadProvider addImage={mockAddImage}>
				<TestHookComponent />
			</AddToPreloadProvider>,
		);

		expect(addImageCalled).toBe(false);
	});
});
