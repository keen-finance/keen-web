import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
    global: "globalThis",
    util:{}
  }
  ,
  plugins: [react()],
  resolve: {
    alias: [
      // {
      //   find: /^~.+/,
      //   replacement: (val) => {
      //     return val.replace(/^~/, "");
      //   },
      // },
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  } 
})
