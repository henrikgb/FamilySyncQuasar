import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: 'src', replacement: path.resolve(__dirname, './src') },
      // Mirrors the "layouts"/"pages" aliases @quasar/app-vite sets up for the real
      // build, needed here because routes.ts references them as bare specifiers.
      { find: 'layouts', replacement: path.resolve(__dirname, './src/layouts') },
      { find: 'pages', replacement: path.resolve(__dirname, './src/pages') },
    ],
  },
  test: {
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    environment: 'jsdom',
  },
});
