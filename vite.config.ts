import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRefresh()],
  resolve: {
    alias: {
      '@app': resolve(projectRootDir, './src'),
      '@navigation': resolve(projectRootDir, './src/navigation'),
      '@components': resolve(projectRootDir, './src/components'),
      '@assets': resolve(projectRootDir, './src/assets'),
      '@utils': resolve(projectRootDir, './src/utils'),
      '@hooks': resolve(projectRootDir, './src/hooks'),
      '@styles': resolve(projectRootDir, './src/styles'),
      '@services': resolve(projectRootDir, './src/services'),
      '@constants': resolve(projectRootDir, './src/constants'),
      '@pages': resolve(projectRootDir, './src/pages'),
      '@screens': resolve(projectRootDir, './src/screens'),
      '@store': resolve(projectRootDir, './src/store')
    }
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  }
});
