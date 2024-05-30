import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 9001,
  },
  define: {
    "import.meta.env.APP_NAME": JSON.stringify(packageJson.name),
    "import.meta.env.APP_VERSION": JSON.stringify(packageJson.version),
    "import.meta.env.APP_AUTHOR": JSON.stringify(packageJson.author.name),
    "import.meta.env.APP_DESCRIPTION": JSON.stringify(packageJson.description),
  },
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./", import.meta.url)),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import './src/assets/styles/_abstracts.scss';
          @import './src/assets/styles/_core.scss';
          @import './src/assets/styles/_extends.scss';
        `,
      },
    },
  },
});
