import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@features': '/src/features',
      '@pages': '/src/pages',
      '@hooks': '/src/hooks',
      '@constants': '/src/constants',
      '@types': '/src/types',
    },
  },
});
