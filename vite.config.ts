import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  base: '/chaos-visualizer-/',
  build: {
    target: 'esnext',
    outDir: '.',
  },
});
