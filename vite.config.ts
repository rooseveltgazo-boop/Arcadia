import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Kukunin nito ang pangalan ng repo mo base sa homepage sa package.json 
  // o manual mong palitan ang 'Arcadia' dito kung magbabago ang repo name.
  const repoName = '/Arcadia/'; 

  return {
    base: mode === 'production' ? repoName : '/',
    
    plugins: [
      react(),
      tailwindcss(),
    ],
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    // Support for specific file types
    assetsInclude: ['**/*.svg', '**/*.csv'],

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      emptyOutDir: true,
      // Siguraduhin na ang rollup options ay tama para sa SPA
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router'],
          },
        },
      },
    },

    // Para sa local development troubleshooting
    server: {
      port: 3000,
      host: true,
    },
  }
})