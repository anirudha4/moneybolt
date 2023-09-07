import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from "vite-plugin-pwa";
import { manifest } from './manifest';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths({
    parseNative: false,
  }), VitePWA(manifest)],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000'
      }
    }
  }
})