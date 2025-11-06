import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  manifest_version: 3,
  name: 'URL Summarize',
  short_name: 'URL Summarize',
  description: 'Quickly summarize any webpage URL using ChatGPT. View current tab URL and send it to ChatGPT with a customizable prompt.',
  version: '1.0.0',
  permissions: ['tabs', 'storage'],
  action: {
    default_popup: 'index.html',
    default_icon: {
      16: 'icon.svg',
      32: 'icon.svg',
      48: 'icon.svg',
      64: 'icon.svg',
      96: 'icon.svg',
      128: 'icon.svg',
      192: 'icon.svg',
      512: 'icon.svg',
    },
  },
  icons: {
    16: 'icon.svg',
    32: 'icon.svg',
    48: 'icon.svg',
    64: 'icon.svg',
    96: 'icon.svg',
    128: 'icon.svg',
    192: 'icon.svg',
    512: 'icon.svg',
  },
})
