import path from "node:path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
// import devtools from 'solid-devtools/vite';
import presetWind from "@unocss/preset-wind";
import UnoCSS from "unocss/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import legacy from "@vitejs/plugin-legacy";

import { px2remPlugin } from "./build/px2rem";

const projectRootDir = path.resolve(__dirname);
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@/components": path.resolve(__dirname, "src/components"),
    },
  },
  plugins: [
    /*
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    UnoCSS({
      shortcuts: [{ center: "flex justify-center items-center" }],
      presets: [presetWind()],
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, "src/assets/svg")],
      symbolId: "icon-[dir]-[name]",
    }),
    px2remPlugin(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Removes console.log in production builds
        drop_debugger: true, // Optionally remove debugger statements
      },
    },
  },
});
