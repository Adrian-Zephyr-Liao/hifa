import pluginVue from '@vitejs/plugin-vue'
import type { SiteConfig } from 'shared/types'
import { pluginIndexHtml } from './plugin-hifa/indexHtml'
import pluginConfig from './plugin-hifa/config'
import pluginRoutes from './plugin-pages'
import { createPluginMdx } from './plugin-mdx'

export function createVitePlugins(
  config: SiteConfig,
  restartServer?: () => Promise<void>,
) {
  return [
    pluginIndexHtml(),
    pluginVue(),
    pluginConfig(config, restartServer),
    pluginRoutes({
      root: config.root,
    }),
    createPluginMdx(),
  ]
}
