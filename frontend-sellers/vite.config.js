import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// E-commerce Seller Management Frontend - Port 5174
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/ecommerce-seller': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
