import { createServer as createViteDevServer } from 'vite'
import pluginVue from '@vitejs/plugin-vue'
import { pluginIndexHtml } from './plugin-hifa/indexHtml'
import pluginConfig from './plugin-hifa/config'
import { PACKAGE_ROOT } from './constants'
import { resolveConfig } from './config'

export async function createDevServer(root = process.cwd(), restartServer: () => Promise<void>) {
  const config = await resolveConfig(root, 'serve', 'development')
  return createViteDevServer({
    root: PACKAGE_ROOT,
    plugins: [pluginVue(), pluginIndexHtml(), pluginConfig(config, restartServer)],
    server: {
      fs: {
        allow: [PACKAGE_ROOT],
      },
    },
  })
}
