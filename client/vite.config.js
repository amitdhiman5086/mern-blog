import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { BASE_URL } from "./src/redux/constant";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://16.171.170.206:3000/",
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, BASE_URL)

      },
    },
  },
  plugins: [react()],
});
