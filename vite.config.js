import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // ВИНОСИМО СЮДИ: це головне налаштування для всього проєкту
  // Якщо ми будуємо проект для GitHub (production), додаємо префікс.
  // Якщо просто розробляємо (development), залишаємо корінь '/'.
  base: './',
  // Вказуємо, що робочі файли лежать у src
  root: 'src',

  build: {
    // Шлях до папки docs відносно src
    outDir: '../docs',
    emptyOutDir: true,
    // Додаємо карту коду для дебагу в F12
    sourcemap: true,
    rollupOptions: {
      input: {
        // Головна точка входу
        main: resolve(process.cwd(), 'src/index.html'),
      },
    },
  },

  // Налаштування для команди preview
  preview: {
    port: 8080,
    strictPort: true,
  },
});
