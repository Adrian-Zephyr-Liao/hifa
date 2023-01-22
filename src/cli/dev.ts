import { createServer as createViteDevServer } from 'vite'
import pluginVue from '@vitejs/plugin-vue'
import { pluginIndexHtml } from './plugin-hifa/indexHtml'

export async function createDevServer(root = process.cwd()) {
  return createViteDevServer({
    root,
    plugins: [pluginVue(), pluginIndexHtml()],
  })
}
