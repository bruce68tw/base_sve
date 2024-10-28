import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  /*
  resolve: {
    alias: {
      //tsconfig.json, vite.config.ts 都必須加@ts0才能使用捷徑 !!
      "@": path.resolve(__dirname, "./src"),
      "@chart": path.resolve(__dirname, "../svelte-chartjs/src"),
    },
  },
  */
})
