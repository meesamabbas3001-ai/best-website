import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, Plugin } from 'vite';
import healthHandler from './api/health.ts';
import evaluateHandler from './api/ats/evaluate.ts';
import analyzeHandler from './api/ats/analyze.ts';

const currentDir = path.dirname(fileURLToPath(import.meta.url));

function apiRoutesPlugin(): Plugin {
  return {
    name: 'api-routes-dev-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) {
          return next();
        }

        // Helper to parse JSON request body for POST requests
        let body: any = {};
        if (req.method === 'POST') {
          const buffers: Uint8Array[] = [];
          for await (const chunk of req) {
            buffers.push(chunk);
          }
          const raw = Buffer.concat(buffers).toString('utf-8');
          try {
            body = raw ? JSON.parse(raw) : {};
          } catch {
            body = {};
          }
        }

        // Mock Vercel Request & Response wrappers for local dev
        const vercelReq = Object.assign(req, {
          query: {},
          cookies: {},
          body,
        });

        const vercelRes = Object.assign(res, {
          status(statusCode: number) {
            res.statusCode = statusCode;
            return vercelRes;
          },
          json(data: any) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return vercelRes;
          },
          send(data: any) {
            res.end(data);
            return vercelRes;
          },
        });

        const url = req.url.split('?')[0];

        try {
          if (url === '/api/health') {
            return await healthHandler(vercelReq as any, vercelRes as any);
          } else if (url === '/api/ats/evaluate') {
            return await evaluateHandler(vercelReq as any, vercelRes as any);
          } else if (url === '/api/ats/analyze') {
            return await analyzeHandler(vercelReq as any, vercelRes as any);
          }
        } catch (err: any) {
          console.error(`Dev API Error [${url}]:`, err);
          return vercelRes.status(500).json({ error: 'Internal Dev Server Error', details: err.message });
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiRoutesPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(currentDir, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
