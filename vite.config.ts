import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [
    reactRouter(),
    svgr(),
    tsconfigPaths(),
  ],
  ssr: {
    // @apollo/client has no "exports" map so Node/Vite module runner picks main.cjs;
    // bundling it here forces the ESM entry to be used in both dev SSR and prerender.
    noExternal: ['@apollo/client', 'ts-invariant'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [path.resolve(import.meta.dirname, 'src')],
      },
    },
  },
});
