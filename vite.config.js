import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    host:'192.168.31.55',
    port:8080
  },
  resolve:{
    alias:{
      '@':resolve(__dirname,'src')
    }
  }
})
