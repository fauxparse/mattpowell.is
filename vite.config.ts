import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    viteReact(),
  ],
  preview: {
    middlewareMode: true,
  },
  build: {
    rolldownOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react'
          }
          if (id.includes('node_modules/@tanstack/react-router') || id.includes('node_modules/@tanstack/router')) {
            return 'router'
          }
        },
      },
    },
  },
})

export default config
