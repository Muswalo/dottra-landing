import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

const page = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  build: {
    rollupOptions: {
      input: {
        main: page('./index.html'),
        privacy: page('./privacy/index.html'),
        terms: page('./terms/index.html'),
        cookies: page('./cookies/index.html'),
        licences: page('./licences/index.html'),
        about: page('./about/index.html'),
        support: page('./support/index.html'),
        contact: page('./contact/index.html'),
      },
    },
  },
})
