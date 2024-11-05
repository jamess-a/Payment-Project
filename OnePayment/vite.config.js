import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import process from "process";
import util from 'util';

export default defineConfig({
  define: {
    "process.env": process.env,
  },
  plugins: [react()],
});
