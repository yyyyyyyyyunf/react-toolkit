import type { BrowserPattern, DetectorConfig, FeatureConfigMap } from "./types";

/**
 * 默认浏览器模式匹配规则
 * @description 用于从 User Agent 字符串中识别主流浏览器及其版本
 *
 * 匹配顺序说明：
 * 1. WebView 类型优先（更具体的匹配）
 * 2. 桌面浏览器按特异性排序
 * 3. 第一个匹配的模式就是结果
 *
 * 新增 pattern 指南：
 * - WebView 类型：放在数组前面，使用更具体的正则表达式
 * - 桌面浏览器：放在数组后面，使用负向前瞻排除 WebView
 * - 通用浏览器：放在最后，使用最通用的正则表达式
 */
export const defaultBrowserPatterns: BrowserPattern[] = [
	// ===== 特定厂商浏览器（最高优先级） =====
	{
		name: "harmony",
		patterns: [
			/arkweb\/([\d.]+)/i, // 鸿蒙浏览器
		],
		versionIndex: 1,
	},
	{
		name: "wechat",
		patterns: [
			/micromessenger\/([\d.]+)/i, // 微信
		],
		versionIndex: 1,
	},
	{
		name: "xiaomi",
		patterns: [
			/xiaomi\/miuibrowser\/([\d.]+)/i, // 小米浏览器
		],
		versionIndex: 1,
	},
	{
		name: "alipay",
		patterns: [
			/alipayclient\/([\d.]+)/i, // 支付宝
		],
		versionIndex: 1,
	},
	{
		name: "bytedance",
		patterns: [
			/bytedancewebview.*chrome\/([\d.]+)/i, // 字节跳动 + Chrome版本
			/applewebkit\/([\d.]+).*bytedancewebview/i, // WebKit版本 + 字节跳动
		],
		versionIndex: 1,
	},
	{
		name: "baidu",
		patterns: [
			/baiduboxapp\/([\d.]+)/i, // 百度APP
			/haokan\/([\d.]+)/i, // 百度好看
		],
		versionIndex: 1,
	},
	{
		name: "lark",
		patterns: [
			/lark\/([\d.]+)/i, // 飞书
		],
		versionIndex: 1,
	},
	{
		name: "didi",
		patterns: [
			/didi\.passenger\/([\d.]+)/i, // 滴滴
		],
		versionIndex: 1,
	},
	{
		name: "cmcc",
		patterns: [
			/leadeon\/([\d.]+)/i, // 中国移动
		],
		versionIndex: 1,
	},

	// ===== WebView 类型（优先级次高） =====
	{
		name: "chromeWebview",
		patterns: [
			/chrome\/([\d.]+).*(?:wv|version\/)/i, // 包含 wv 或 Version/ 字段
			/(?:wv|version\/).*chrome\/([\d.]+)/i, // wv/version 在 Chrome 前面
		],
		versionIndex: 1,
	},
	{
		name: "safariWebview",
		patterns: [
			/applewebkit\/([\d.]+).*(?:mobile|iphone|ipad).*safari/i, // 标准 Safari WebView (不包含Chrome)
			/(?:iphone|ipad).*applewebkit\/([\d.]+)(?!.*chrome)/i, // 没有 Safari 关键字的 iOS WebView (仅限iPhone/iPad)
		],
		versionIndex: 1,
	},
	{
		name: "chrome",
		patterns: [
			/chrome\/([\d.]+)(?!.*(?:wv|version\/))/i, // 确保不是 WebView（不包含 wv 或 Version/）
		],
		versionIndex: 1,
	},

	// ===== 桌面浏览器（按特异性排序） =====
	{
		name: "edge",
		patterns: [/edg(?:e|ios|a)?\/([\d.]+)/i],
		versionIndex: 1,
	},
	{
		name: "firefox",
		patterns: [/(?:firefox|fxios)\/([\d.]+)/i],
		versionIndex: 1,
	},
	{
		name: "opera",
		patterns: [/(?:opera|opr)[\s/]([\d.]+)/i],
		versionIndex: 1,
	},
	{
		name: "samsung",
		patterns: [/samsungbrowser\/([\d.]+)/i],
		versionIndex: 1,
	},
	{
		name: "safari",
		patterns: [
			/version\/([\d.]+).*safari(?!.*chrome)/i, // 确保不是 Chrome
		],
		versionIndex: 1,
	},
];

/**
 * 默认检测器配置
 */
export const defaultDetectorConfig: Required<DetectorConfig> = {
	browserPatterns: defaultBrowserPatterns,
	versionExtraction: {
		versionPattern: /^([\d.]+)/,
	},
	webViewBrowsers: [
		"safariWebview",
		"chromeWebview",
		"wechat",
		"alipay",
		"baidu",
		"bytedance",
		"lark",
		"didi",
		"cmcc",
	],
};

export const defaultFeatureConfigs: FeatureConfigMap = {
	webp: {
		browsers: {
			chrome: "32",
			firefox: "65",
			safari: "14.1",
			edge: "18",
			opera: "19",
			safariWebview: "604.1",
			chromeWebview: "32",
		},
		runtimeTest: () => {
			const canvas = document.createElement("canvas");
			if (canvas.getContext?.("2d")) {
				const data = canvas.toDataURL("image/webp");
				if (data.indexOf("data:image/webp") === 0) {
					return true;
				}
			}
			return false;
		},
	},

	avif: {
		browsers: {
			chrome: "85",
			firefox: "93",
			safari: "16",
			edge: "85",
			opera: "71",
			webkit: "612.1",
			chromeWebview: "85",
		},
		runtimeTest: () => {
			const canvas = document.createElement("canvas");
      try{
			  if (canvas.getContext?.("2d")) {
          const data = canvas.toDataURL("image/avif");
            if(data.indexOf("data:image/avif") === 0){
            return true;
          }
        }
        return false;
      }
      catch{
        return false;
      }
    }
	},

	webgpu: {
		browsers: {
			chrome: "113",
			edge: "113",
			opera: "99",
			webkit: false,
			chromeWebview: false,
		},
		runtimeTest: () => "gpu" in navigator,
	},

	"container-queries": {
		browsers: {
			chrome: "106",
			firefox: "110",
			safari: "16",
			edge: "106",
			opera: "92",
			webkit: "612.1",
			chromeWebview: "106",
		},
		runtimeTest: () => {
			return CSS.supports("container-type", "inline-size");
		},
	},

	"css-nesting": {
		browsers: {
			chrome: "112",
			firefox: "117",
			safari: "16.5",
			edge: "112",
			opera: "98",
			webkit: "613.1",
			chromeWebview: "112",
		},
		runtimeTest: () => {
			try {
				return CSS.supports("selector(&)");
			} catch {
				return false;
			}
		},
	},

	"web-share": {
		browsers: {
			chrome: "89",
			safari: "12.1",
			edge: "93",
			opera: "75",
			webkit: "606.1",
			chromeWebview: "89",
		},
		runtimeTest: () => {
			if (typeof navigator === "undefined") return false;
			return "share" in navigator;
		},
	},

	"intersection-observer": {
		browsers: {
			chrome: "51",
			firefox: "55",
			safari: "12.1",
			edge: "15",
			opera: "38",
			webkit: "606.1",
			chromeWebview: "51",
		},
		runtimeTest: () => {
			return "IntersectionObserver" in window;
		},
	},

	"aspect-ratio": {
		browsers: {
			chrome: "88",
			firefox: "89",
			safari: "15",
			edge: "88",
			opera: "74",
			safariWebview: "608.1",
			chromeWebview: "88",
		},
		runtimeTest: () => {
			return CSS.supports("aspect-ratio", "1");
		},
	},
};
