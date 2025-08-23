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
      '@fly4react/memo': resolve(__dirname, 'node_modules/@fly4react/memo/dist/index.js'),
    },
  },
  optimizeDeps: {
    include: ['@fly4react/memo'],
  },
});
