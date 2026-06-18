import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.config'
import zip from 'vite-plugin-zip-pack'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
    crx({ manifest }),
    zip({
      outDir: 'release',
      outFileName: 'release.zip',
      // Exclude Vite's internal build manifest — not used by the published extension
      filter: (fileName, filePath) =>
        fileName !== '.vite' && !filePath.includes('/.vite/'),
    }),
  ],
  server: {
    cors: {
      origin: [
        /chrome-extension:\/\//,
      ],
    },
  },
})
