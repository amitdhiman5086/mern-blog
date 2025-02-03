import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://16.171.170.206:3000",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
