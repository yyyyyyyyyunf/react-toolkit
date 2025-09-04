import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig } from "@rslib/core";

export default defineConfig({
	source: {
		entry: {
			index: ["./src/index.ts"],
		},
	},
	lib: [
		{
			bundle: true,
			dts: true,
			format: "esm",
			autoExternal: {
				peerDependencies: true,
				devDependencies: true,
			},
		},
		{
			bundle: true,
			dts: false, // CommonJS 不需要重复生成类型文件
			format: "cjs",
			autoExternal: {
				peerDependencies: true,
				devDependencies: true,
			},
		},
	],
	output: {
		target: "web",
	},
	plugins: [pluginReact()],
	// 确保rslib能正确解析workspace依赖
	server: {
		fs: {
			allow: [".."],
		},
	},
});
