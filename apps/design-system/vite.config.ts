import tailwindcss from '@tailwindcss/vite'
import { defineConfig, lazyPlugins } from 'vite-plus'

export default defineConfig({
  plugins: lazyPlugins(() => [tailwindcss()]),
})
