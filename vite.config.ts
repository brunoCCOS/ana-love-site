import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages serve the site from /<repo>/. Local dev uses /.
  base: process.env.BASE_PATH || '/',
  root: '.',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
