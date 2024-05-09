import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { PreRenderedAsset } from 'rollup'
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
const config = defineConfig(async () => {
  return {
    base: '/',
    envDir: '.',
    envPrefix: 'APP_',
    plugins: [
      svgr(),
      react()
    ],
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo: PreRenderedAsset) => {
            if (!assetInfo.name) {
              throw new Error("Asset name is undefined!");
            }
            const info = assetInfo.name.split(".");
            let ext = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              ext = "img";
            } else if (/woff|woff2/.test(ext)) {
              ext = "css";
            }
            return `assets/${ext}/[name]-[hash][extname]`;
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        },
      },
      chunkSizeWarningLimit: 1024,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, 'src')
      }
    },
    server: {
      host: 'localhost',
      port: 4000,
      strictPort: true,
      open: false,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})

export default config