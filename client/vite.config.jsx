// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/companies': { // If your backend serves directly at /companies
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      // Add other proxy rules as needed
    },
  },
});