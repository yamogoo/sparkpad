import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import packageJson from "./package.json";

// https://vitejs.dev/config/
export default (opts: { mode: string }) => {
  const { mode } = opts;
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const port = parseInt(process.env.VITE_PORT ?? "3000");

  return defineConfig({
    plugins: [vue()],
    server: {
      port,
    },
    define: {
      "import.meta.env.APP_NAME": JSON.stringify(packageJson.name),
      "import.meta.env.APP_VERSION": JSON.stringify(packageJson.version),
      "import.meta.env.APP_AUTHOR": JSON.stringify(packageJson.author.name),
      "import.meta.env.APP_DESCRIPTION": JSON.stringify(
        packageJson.description
      ),
      "import.meta.env.APP_TITLE": JSON.stringify(packageJson.title),
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
};
