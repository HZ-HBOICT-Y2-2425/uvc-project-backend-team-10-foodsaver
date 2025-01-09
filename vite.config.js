import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/shopping-lists': 'http://localhost:4052', // Proxy requests to your backend
      // Add more routes as needed
    },
  },
});
