// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/companies': 'http://localhost:5000',  // Proxy to Flask
      '/admin': 'http://localhost:5000',      // Proxy to Flask
    },
  },
});