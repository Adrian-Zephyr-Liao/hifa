import pluginVue from '@vitejs/plugin-vue'
import pluginUnocss from 'unocss/vite'
import type { SiteConfig } from 'shared/types'
import unocssOptions from './unocss.config'
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
    pluginUnocss(unocssOptions),
    pluginConfig(config, restartServer),
    pluginRoutes({
      root: config.root,
      extensions: ['vue', 'md', 'mdx', 'ts', 'tsx', 'js', 'jsx'],
    }),
    createPluginMdx(),
  ]
}
