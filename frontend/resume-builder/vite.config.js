import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify('https://resume-builder-backend-tvxl.onrender.com')
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'https://resume-builder-backend-tvxl.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
