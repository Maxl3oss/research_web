import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@views': path.resolve(__dirname, './src/views'),
    },
  },
})

// "paths": {
//   "@assets/*": ["src/assets/*"],
//   "@components/*": ["src/components/*"],
//   "@routes/*": ["src/routes/*"],
//   "@services/*": ["src/services/*"],
//   "@store/*": ["src/store/*"],
//   "@views/*": ["src/views/*"],
// },