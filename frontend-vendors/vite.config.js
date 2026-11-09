import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vendor Management Frontend - Port 5173
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/cloudvendor': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
