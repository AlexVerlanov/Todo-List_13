import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/Todo-List_13/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})