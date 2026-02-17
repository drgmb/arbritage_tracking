import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { build } from 'esbuild';

function buildExtensionScripts() {
  return {
    name: 'build-extension-scripts',
    async closeBundle() {
      const distDir = resolve(__dirname, 'dist');
      const publicDir = resolve(__dirname, 'public');

      // Copy manifest.json
      if (!existsSync(distDir)) {
        mkdirSync(distDir, { recursive: true });
      }
      copyFileSync(
        resolve(publicDir, 'manifest.json'),
        resolve(distDir, 'manifest.json')
      );

      // Copy icons
      const iconsDir = resolve(publicDir, 'icons');
      const distIconsDir = resolve(distDir, 'icons');
      if (!existsSync(distIconsDir)) {
        mkdirSync(distIconsDir, { recursive: true });
      }
      if (existsSync(iconsDir)) {
        readdirSync(iconsDir).forEach((file) => {
          copyFileSync(resolve(iconsDir, file), resolve(distIconsDir, file));
        });
      }

      // Build background script with esbuild (fully bundled, no external imports)
      await build({
        entryPoints: [resolve(__dirname, 'src/background/index.ts')],
        bundle: true,
        outfile: resolve(distDir, 'background.js'),
        format: 'esm',
        target: 'esnext',
        minify: false,
        sourcemap: false,
      });

      // Build content script with esbuild
      await build({
        entryPoints: [resolve(__dirname, 'src/content/snipTool.ts')],
        bundle: true,
        outfile: resolve(distDir, 'content.js'),
        format: 'iife',
        target: 'esnext',
        minify: false,
        sourcemap: false,
      });

      console.log('✅ Extension scripts built successfully');
    },
  };
}

export default defineConfig({
  plugins: [react(), buildExtensionScripts()],
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    emptyOutDir: true,
    target: 'esnext',
    minify: false,
  },
});
