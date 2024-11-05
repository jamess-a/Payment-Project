import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Payment-Project/",

  build: {
    outDir: "dist",
  }
});
