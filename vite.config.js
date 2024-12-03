// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path'
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: `assets/[name].[ext]`,
        chunkFileNames: `assets/[name].[hash].js`,
        entryFileNames: `assets/[name].[hash].js`,
      },
    },
  },
  server: {
    host: true,
  },
});
