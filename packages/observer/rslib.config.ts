import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig } from "@rslib/core";

export default defineConfig({
	source: {
		entry: {
			index: ["./src/index.ts"],
		},
		exclude: ["./src/**/__tests__/**", "./src/**/*.test.*", "./src/**/*.spec.*"],
	},
	lib: [
		{
			bundle: true,
			dts: true,
			format: "esm",
		},
		{
			bundle: true,
			dts: false, // CommonJS 不需要重复生成类型文件
			format: "cjs",
		},
	],
	output: {
		target: "web",
	},
	plugins: [pluginReact()],
});
