import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  manifest_version: 3,
  name: 'Utils',
  version: '1.0.0',
  permissions: ['tabs', 'storage'],
  action: {
    default_popup: 'index.html',
  },
})
