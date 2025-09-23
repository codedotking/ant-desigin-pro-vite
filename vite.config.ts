import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      viteMockServe({
        mockPath: 'mock', // mock文件夹路径
        enable: command === 'serve' // 只有开发环境才开启mock
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, './src')
      },
    },
  }
})  
