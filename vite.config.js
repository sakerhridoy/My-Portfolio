import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // REQUIRED for Vercel (prevents blank page issues)
  build: {
    outDir: 'dist', // already default, but safe to include
  },
});
