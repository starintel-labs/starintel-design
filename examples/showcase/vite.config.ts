import { defineConfig } from "vite";

export default defineConfig({
  // Shared the design-system assets at / so SVG references survive the build.
  publicDir: "../../assets",
  build: { outDir: "dist", emptyOutDir: true },
});
