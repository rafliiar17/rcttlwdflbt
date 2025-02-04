import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Cek apakah sedang dalam mode produksi (untuk GitHub Pages)
const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [react()],
  base: isProd ? "/rcttlwdflbt/" : "/", // Gunakan "/" saat development
  build: {
    outDir: "build", // Pastikan hasil build masuk ke folder "build"
    emptyOutDir: true, // Hapus isi folder sebelum build baru
  },
});
