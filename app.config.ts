import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    preset: "static",
    baseURL: "/chaos-visualizer-/",
  },
  vite: {
    build: {
      target: "esnext",
    },
  },
});
