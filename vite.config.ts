import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'serve-menu-images',
        configureServer(server) {
          server.middlewares.use('/menu', (req, res, next) => {
            let fileName = decodeURIComponent(req.url || '').split('?')[0];
            if (fileName.startsWith('/')) fileName = fileName.slice(1);
            const filePath = path.join(__dirname, 'Foto Produk Noltiga', fileName);
            
            if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
              const ext = path.extname(filePath).toLowerCase();
              const contentType = ext === '.png' ? 'image/png' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'application/octet-stream';
              res.setHeader('Content-Type', contentType);
              res.end(fs.readFileSync(filePath));
            } else {
              next();
            }
          });
          // Serve logo from root for dev favicon
          server.middlewares.use('/logo.jpeg', (_req, res, next) => {
            const logoPath = path.join(__dirname, 'logo.jpeg');
            if (fs.existsSync(logoPath)) {
              res.setHeader('Content-Type', 'image/jpeg');
              res.end(fs.readFileSync(logoPath));
            } else {
              next();
            }
          });
        },
        // Copy logo to public output for favicon in production build
        closeBundle() {
          const src = path.join(__dirname, 'logo.jpeg');
          const dest = path.join(__dirname, 'dist', 'logo.jpeg');
          if (fs.existsSync(src)) {
            fs.copyFileSync(src, dest);
          }
        }
      }
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
