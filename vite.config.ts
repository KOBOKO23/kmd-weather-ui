import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: 'dist/stats.html', // bundle analysis output
      open: true,                  // open in browser automatically
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // optional: disable for prod to reduce bundle size
    target: 'es2020',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // all dependencies in vendor.js
          }
        },
      },
    },
  },
});
