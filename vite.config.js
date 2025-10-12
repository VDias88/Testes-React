import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
  server: {
    host: true,             
    strictPort: true,
    watch: {
      usePolling: true,      
      interval: 100
    }
  },
  plugins: [
    react(),
    checker({
      typescript: false,
      // eslint: {
      //   lintCommand: 'eslint . --ext .ts,.tsx,.js,.jsx'
      // }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
});
