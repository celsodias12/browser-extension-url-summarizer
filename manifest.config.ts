import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  manifest_version: 3,
  name: 'URL Summarize',
  short_name: 'URL Summarize',
  description: 'Quickly summarize any webpage URL using ChatGPT. View current tab URL and send it to ChatGPT with a customizable prompt.',
  version: '1.0.1',
  permissions: ['tabs', 'storage'],
  action: {
    default_popup: 'index.html',
    default_icon: {
      48: 'icon.png',
    },
  },
  icons: {
    48: 'icon.png',
  },
})
