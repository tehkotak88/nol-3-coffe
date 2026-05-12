import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');

  // Automatically move images from "Foto Produk Noltiga" to "public/menu" if they exist
  const oldDir = path.resolve(__dirname, 'Foto Produk Noltiga');
  const newDir = path.resolve(__dirname, 'public/menu');
  
  if (fs.existsSync(oldDir)) {
    if (!fs.existsSync(newDir)) {
      fs.mkdirSync(newDir, { recursive: true });
    }
    const files = fs.readdirSync(oldDir);
    files.forEach(file => {
      const oldPath = path.join(oldDir, file);
      const newPath = path.join(newDir, file);
      if (fs.lstatSync(oldPath).isFile()) {
        try {
          fs.renameSync(oldPath, newPath);
        } catch (err) {
          // If rename fails (e.g. across drives), try copy + unlink
          fs.copyFileSync(oldPath, newPath);
          fs.unlinkSync(oldPath);
        }
      }
    });
    // Optional: remove old dir if empty
    if (fs.readdirSync(oldDir).length === 0) {
      fs.rmdirSync(oldDir);
    }
  }

  return {
    plugins: [
      react(), 
      tailwindcss(),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
