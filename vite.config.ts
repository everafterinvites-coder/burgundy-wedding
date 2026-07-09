import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/burgundy-wedding/', // Required for GitHub Pages project sites
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist', // Ensures the output folder matches your deploy.yml
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
