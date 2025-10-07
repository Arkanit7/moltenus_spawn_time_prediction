import {defineConfig} from 'vite'

/** @see https://vite.dev/config/ */
export default defineConfig({
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // Silence Sass deprecation warnings
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import', 'color-functions', 'global-builtin'],
      },
    },
  },
})
