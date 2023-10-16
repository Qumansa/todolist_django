import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		open: true,
	},
	build: {
		outDir: "build",
		sourcemap: true,
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "src/setupTests",
		mockReset: true,
	},
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, './src/app/common/components'),
			'@styles': path.resolve(__dirname, './src/app/common/styles'),
			'@hooks': path.resolve(__dirname, './src/app/common/hooks'),
			'@redux': path.resolve(__dirname, './src/app/redux'),
			'@types': path.resolve(__dirname, './src/app/common/types.ts'),
		}
	}
})
