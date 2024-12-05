import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()], 
  resolve: {
    alias: {
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@components': path.resolve(__dirname, './src/components'),
      '@context': path.resolve(__dirname, './src/context'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@api': path.resolve(__dirname, './src/api'),
    }
  },
  server: { 
    https: true
  }
});
