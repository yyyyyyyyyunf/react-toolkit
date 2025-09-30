import { describe, expect, it } from "vitest";
import { createFeatureDetector } from "../src/FeatureDetector";
import {
	chromeUserAgents,
	edgeUserAgents,
	safariUserAgents,
} from "./test-user-agents";

describe("浏览器检测优先级", () => {
	// 测试 Chrome WebView 优先级
	describe("Chrome WebView 优先级检测", () => {
		const chromeWebViewCases = chromeUserAgents.filter(
			(ua) => ua.expectedBrowser === "chromeWebview",
		);

		chromeWebViewCases.forEach(({ name, userAgent, description }) => {
			it(`应该优先检测 ${description} 为 Chrome WebView`, () => {
				const detector = createFeatureDetector(
					{},
					{ enableRuntimeTest: false },
				);
				const result = detector.detect("webp", userAgent);

				// 应该检测为 chromeWebview，不是 chrome
				expect(result.supported).toBe(true);
			});
		});
	});

	// 测试 Safari WebView 优先级
	describe("Safari WebView 优先级检测", () => {
		const safariWebViewCases = safariUserAgents.filter(
			(ua) => ua.expectedBrowser === "safariWebview",
		);

		safariWebViewCases.forEach(({ name, userAgent, description }) => {
			it(`应该优先检测 ${description} 为 Safari WebView`, () => {
				const detector = createFeatureDetector(
					{},
					{ enableRuntimeTest: false },
				);
				const result = detector.detect("webp", userAgent);

				// 应该检测为 safariWebview，不是 safari
				expect(result.supported).toBe(true);
			});
		});
	});

	// 测试桌面浏览器优先级
	describe("桌面浏览器优先级检测", () => {
		const desktopChromeCases = chromeUserAgents.filter(
			(ua) => ua.expectedBrowser === "chrome" && ua.name.includes("Desktop"),
		);
		const desktopSafariCases = safariUserAgents.filter(
			(ua) => ua.expectedBrowser === "safari" && ua.name.includes("Desktop"),
		);
		const desktopEdgeCases = edgeUserAgents.filter((ua) =>
			ua.name.includes("Desktop"),
		);

		[...desktopChromeCases, ...desktopSafariCases, ...desktopEdgeCases].forEach(
			({ name, userAgent, description }) => {
				it(`应该正确检测 ${description}`, () => {
					const detector = createFeatureDetector(
						{},
						{ enableRuntimeTest: false },
					);
					const result = detector.detect("webp", userAgent);

					// 桌面浏览器应该支持 WebP
					expect(result.supported).toBe(true);
				});
			},
		);
	});

	// 测试 Edge 优先级
	describe("Edge 优先级检测", () => {
		edgeUserAgents.forEach(({ name, userAgent, description }) => {
			it(`应该正确检测 ${description} 为 Edge`, () => {
				const detector = createFeatureDetector(
					{},
					{ enableRuntimeTest: false },
				);
				const result = detector.detect("webp", userAgent);

				// 应该检测为 edge，不是 chrome
				expect(result.supported).toBe(true);
			});
		});
	});

	// 测试移动浏览器优先级
	describe("移动浏览器优先级检测", () => {
		const mobileChromeCases = chromeUserAgents.filter(
			(ua) => ua.expectedBrowser === "chrome" && ua.name.includes("Mobile"),
		);
		const mobileSafariCases = safariUserAgents.filter(
			(ua) => ua.expectedBrowser === "safari" && ua.name.includes("Mobile"),
		);
		const mobileEdgeCases = edgeUserAgents.filter((ua) =>
			ua.name.includes("Mobile"),
		);

		[...mobileChromeCases, ...mobileSafariCases, ...mobileEdgeCases].forEach(
			({ name, userAgent, description }) => {
				it(`应该正确检测 ${description}`, () => {
					const detector = createFeatureDetector(
						{},
						{ enableRuntimeTest: false },
					);
					const result = detector.detect("webp", userAgent);

					// 移动浏览器应该支持 WebP
					expect(result.supported).toBe(true);
				});
			},
		);
	});
});
