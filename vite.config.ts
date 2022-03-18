import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from "vite-plugin-imp"
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
        ]
      },
    }),
    vitePluginImp(
      {
        optimize: true,
        libList: [
          {
            libName: 'antd-mobile',
            style: (name) => `antd-mobile/es/${name}/style/css.js`
          }
        ],
      },
    ),
  ],
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  },
  server: {
    proxy: {
      "/api/": {
        target: "/",
        changeOrigin: true,
      }
    }
  }
})
