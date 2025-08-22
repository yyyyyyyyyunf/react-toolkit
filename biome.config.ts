const config = {
	// 导入排序配置
	organizeImports: {
		enabled: true,
	},

	// Linter 配置
	linter: {
		enabled: true,
		rules: {
			recommended: true,
			correctness: {
				noUnusedVariables: "error",
			},
			suspicious: {
				noExplicitAny: "warn",
			},
			style: {
				useConst: "error",
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

	// 文件配置
	files: {
		ignoreUnknown: false,
		includes: ["src/**/*", "*.ts", "*.tsx", "*.js", "*.jsx", "*.json"],
	},
};

export default config;
