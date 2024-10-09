import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    hmr: {
      protocol: "wss",
      host: "j11b204.p.ssafy.io",
      port: 443,
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,

      manifest: {
        name: "책 먹는 여우",
        short_name: "책 먹는 여우",
        description: "책 먹는 여우",
        theme_color: process.env.VITE_THEME_COLOR || "#ffffff",
        icons: [
          {
            src: "favicon.ico",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "favicon.ico",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,jpg,jpeg}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
