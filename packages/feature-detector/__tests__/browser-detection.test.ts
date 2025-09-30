import { describe, expect, it } from "vitest";
import { createFeatureDetector } from "../src/FeatureDetector";
import {
	allUserAgents,
	chromeUserAgents,
	edgeUserAgents,
	firefoxUserAgents,
	otherBrowserUserAgents,
	safariUserAgents,
} from "./test-user-agents";

describe("浏览器检测", () => {
	// 测试 Chrome 浏览器检测
	describe("Chrome 浏览器检测", () => {
		for (const { name, userAgent, description } of chromeUserAgents) {
			it(`应该正确检测 ${description}`, () => {
				const detector = createFeatureDetector(
					{},
					{ enableRuntimeTest: false },
				);
				const result = detector.detect("webp", userAgent);

				// Chrome 系列浏览器都支持 WebP
				expect(result.supported).toBe(true);
			});
		}
	});

	// 测试 Safari 浏览器检测
	describe("Safari 浏览器检测", () => {
		for (const { name, userAgent, description } of safariUserAgents) {
			it(`应该正确检测 ${description}`, () => {
				const detector = createFeatureDetector(
					{},
					{ enableRuntimeTest: false },
				);
				const result = detector.detect("webp", userAgent);

				// iOS 13+ 支持 WebP，iOS 12 及以下不支持
				const isIOS13Plus =
					name.includes("iOS 13") ||
					name.includes("iOS 14") ||
					name.includes("iOS 15") ||
					name.includes("Desktop");
				expect(result.supported).toBe(isIOS13Plus);
			});
		}
	});

	// 测试 Firefox 浏览器检测
	describe("Firefox 浏览器检测", () => {
		firefoxUserAgents.forEach(({ name, userAgent, description }) => {
			it(`应该正确检测 ${description}`, () => {
				const detector = createFeatureDetector(
					{},
					{ enableRuntimeTest: false },
				);
				const result = detector.detect("webp", userAgent);

				// Firefox 支持 WebP
				expect(result.supported).toBe(true);
			});
		});
	});

	// 测试 Edge 浏览器检测
	describe("Edge 浏览器检测", () => {
		edgeUserAgents.forEach(({ name, userAgent, description }) => {
			it(`应该正确检测 ${description}`, () => {
				const detector = createFeatureDetector(
					{},
					{ enableRuntimeTest: false },
				);
				const result = detector.detect("webp", userAgent);

				// Edge 支持 WebP
				expect(result.supported).toBe(true);
			});
		});
	});

	// 测试其他浏览器检测
	describe("其他浏览器检测", () => {
		otherBrowserUserAgents.forEach(({ name, userAgent, description }) => {
			it(`应该正确检测 ${description}`, () => {
				const detector = createFeatureDetector(
					{},
					{ enableRuntimeTest: false },
				);
				const result = detector.detect("webp", userAgent);

				// Opera 和 Samsung Internet 支持 WebP
				expect(result.supported).toBe(true);
			});
		});
	});

	// 综合测试所有浏览器
	describe("综合浏览器检测", () => {
		it("应该能检测所有主要浏览器类型", () => {
			const detector = createFeatureDetector({}, { enableRuntimeTest: false });

			allUserAgents.forEach(({ name, userAgent, description }) => {
				const result = detector.detect("webp", userAgent);

				// 确保检测不会抛出异常
				expect(result).toBeDefined();
				expect(typeof result.supported).toBe("boolean");
			});
		});
	});
});
