const config = {
	// Linter 配置
	linter: {
		enabled: true,
		rules: {
			recommended: true,
			a11y: {
				useAltText: "off", // 禁用 alt 文本检查，让用户自己决定
			},
		},
	},

	// 格式化配置
	formatter: {
		enabled: true,
		indentStyle: "space",
		indentWidth: 2,
		lineWidth: 100,
		lineEnding: "lf",
	},

	// JavaScript 格式化配置
	javascript: {
		formatter: {
			quoteStyle: "single",
			trailingCommas: "es5",
			semicolons: "always",
		},
	},
};

export default config;
