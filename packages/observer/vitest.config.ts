import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./__tests__/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@fly4react/memo': './node_modules/@fly4react/memo/dist/index.js',
    },
  },
  optimizeDeps: {
    include: ['@fly4react/memo'],
  },
  define: {
    'process.env.NODE_ENV': '"test"',
  },
  // 添加更详细的模块解析配置
  ssr: {
    noExternal: ['@fly4react/memo'],
  },
});
