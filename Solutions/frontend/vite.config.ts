import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@atoms": path.resolve(__dirname, "./src/components/atoms"),
      "@molecules": path.resolve(__dirname, "./src/components/molecules"),
      "@organisms": path.resolve(__dirname, "./src/components/organisms"),
      "@templates": path.resolve(__dirname, "./src/components/templates"),
      "@pages": path.resolve(__dirname, "./src/components/pages"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@routes": path.resolve(__dirname, "./src/routes"),
    },
  },
  server: {
    proxy: {
      "/auth": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
})
