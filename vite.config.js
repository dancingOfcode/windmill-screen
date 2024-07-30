import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  build: {
    outDir: "./dist",
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/styles/variable.scss" as *;
          @use "@/assets/styles/mixins.scss" as *;
        `,
      },
      less: {
        modifyVars: {
          "dark-primary-5": "#37a8d3", // 悬浮
          "dark-primary-6": "#64c5e6", // 常规
          "dark-primary-7": "#209ac9", // 点击
          "dark-color-bg-5": "#02273a",
          "dark-color-bg-2": "#02273a",
          "dark-gray-2": "#042438",
          "dark-gray-3": "#1a465c",
          "border-radius-medium": "0px",
          "border-radius-small": "0px",
          "color-fill-2": "#1a3948",
        },
      },
    },
  },
});
