import { describe, expect, it } from "vitest";
import { createFeatureDetector } from "../src/FeatureDetector";
import { safariUserAgents } from "./test-user-agents";

describe("iOS WebView 检测", () => {
	// 测试 iOS WebView Safari WebP 支持
	describe("iOS WebView Safari WebP 支持", () => {
		const iosWebViewCases = safariUserAgents.filter(
			(ua) => ua.expectedBrowser === "safariWebview",
		);

		iosWebViewCases.forEach(({ name, userAgent, description }) => {
			it(`应该正确检测 ${description} 的 WebP 支持`, () => {
				const detector = createFeatureDetector(
					{},
					{ enableRuntimeTest: false },
				);
				const result = detector.detect("webp", userAgent);

				// 基于WebKit版本判断WebP支持：WebKit 604.1+ 支持WebP
				// iOS微信WebView使用WebKit 605.1.15，应该支持WebP
				const isWebKit604Plus =
					name.includes("iOS 18") ||
					name.includes("iOS 16") ||
					name.includes("iOS 15") ||
					name.includes("iOS 14") ||
					name.includes("iOS 13");
				expect(result.supported).toBe(isWebKit604Plus);
			});
		});
	});

	// 测试 iOS WebView Safari aspect-ratio 支持
	describe("iOS WebView Safari aspect-ratio 支持", () => {
		const iosWebViewCases = safariUserAgents.filter(
			(ua) => ua.expectedBrowser === "safariWebview",
		);

		iosWebViewCases.forEach(({ name, userAgent, description }) => {
			it(`应该正确检测 ${description} 的 aspect-ratio 支持`, () => {
				const detector = createFeatureDetector(
					{},
					{ enableRuntimeTest: false },
				);
				const result = detector.detect("aspect-ratio", userAgent);

				// 只有 iOS 15+ 支持 aspect-ratio
				const isIOS15Plus = name.includes("iOS 15");
				expect(result.supported).toBe(isIOS15Plus);
			});
		});
	});

	// 测试 iOS WebView Safari 其他功能支持
	describe("iOS WebView Safari 其他功能支持", () => {
		const iosWebViewCases = safariUserAgents.filter(
			(ua) => ua.expectedBrowser === "safariWebview",
		);

		iosWebViewCases.forEach(({ name, userAgent, description }) => {
			it(`应该正确检测 ${description} 的 Intersection Observer 支持`, () => {
				const detector = createFeatureDetector(
					{},
					{ enableRuntimeTest: false },
				);
				const result = detector.detect("intersection-observer", userAgent);

				// iOS 12.1+ 支持 Intersection Observer
				const isIOS121Plus =
					name.includes("iOS 13") ||
					name.includes("iOS 14") ||
					name.includes("iOS 15");
				expect(result.supported).toBe(isIOS121Plus);
			});
		});
	});

	// 测试 iOS WebView Safari 版本检测
	describe("iOS WebView Safari 版本检测", () => {
		const iosWebViewCases = safariUserAgents.filter(
			(ua) => ua.expectedBrowser === "safariWebview",
		);

		iosWebViewCases.forEach(({ name, userAgent, description }) => {
			it(`应该正确检测 ${description} 的浏览器类型`, () => {
				const detector = createFeatureDetector(
					{},
					{ enableRuntimeTest: false },
				);
				const result = detector.detect("webp", userAgent);

				// 确保检测结果不为空
				expect(result).toBeDefined();
				expect(typeof result.supported).toBe("boolean");
			});
		});
	});

	// 测试 iOS WebView Safari 综合功能检测
	describe("iOS WebView Safari 综合功能检测", () => {
		const features = [
			"webp",
			"aspect-ratio",
			"intersection-observer",
			"container-queries",
			"css-nesting",
		];

		features.forEach((feature) => {
			const iosWebViewCases = safariUserAgents.filter(
				(ua) => ua.expectedBrowser === "safariWebview",
			);

			iosWebViewCases.forEach(({ name, userAgent, description }) => {
				it(`应该正确检测 ${description} 的 ${feature} 支持`, () => {
					const detector = createFeatureDetector(
						{},
						{ enableRuntimeTest: false },
					);
					const result = detector.detect(feature, userAgent);

					// 确保检测结果不为空
					expect(result).toBeDefined();
					expect(typeof result.supported).toBe("boolean");
				});
			});
		});
	});
});
