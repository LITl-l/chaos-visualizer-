import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solid()],
  // Set base path for GitHub Pages deployment
  // For GitHub Pages: https://<username>.github.io/<repo-name>/
  // Set base to '/<repo-name>/' in production or use env variable
  base: process.env.NODE_ENV === 'production' ? '/chaos-visualizer-/' : '/',
  build: {
    // Ensure build output is optimized
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate source maps for debugging
    sourcemap: false,
    // Optimize bundle
    minify: 'esbuild',
    target: 'esnext',
  },
})
