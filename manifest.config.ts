import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  manifest_version: 3,
  name: 'ChatGPT URL Summarizer',
  short_name: 'URL Summarizer',
  description: 'Quickly summarize any webpage URL using ChatGPT. View current tab URL and send it to ChatGPT with a customizable prompt.',
  version: '1.0.0',
  permissions: ['tabs', 'storage'],
  host_permissions: ['https://chat.openai.com/*'],
  action: {
    default_popup: 'index.html',
    default_icon: {
      16: 'vite.svg',
      48: 'vite.svg',
      128: 'vite.svg',
    },
  },
  icons: {
    16: 'vite.svg',
    48: 'vite.svg',
    128: 'vite.svg',
  },
})
