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
		},
		{
			bundle: true,
			dts: false,
			format: "cjs",
		},
	],
	output: {
		target: "web",
	},
	plugins: [pluginReact()],
});
