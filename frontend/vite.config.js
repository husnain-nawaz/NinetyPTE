import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolveFrontendModule = (pkg) => path.resolve(__dirname, 'node_modules', pkg);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      'react/jsx-dev-runtime': resolveFrontendModule('react/jsx-dev-runtime.js'),
      'react/jsx-runtime': resolveFrontendModule('react/jsx-runtime.js'),
      'react-dom/client': resolveFrontendModule('react-dom/client.js'),
      react: resolveFrontendModule('react'),
      'react-dom': resolveFrontendModule('react-dom'),
      'react-router-dom': resolveFrontendModule('react-router-dom'),
      'lucide-react': resolveFrontendModule('lucide-react'),
    },
    dedupe: ['react', 'react-dom', 'react-router-dom'],
  },
  server: {
    fs: {
      allow: ['..'],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
