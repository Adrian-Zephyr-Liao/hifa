import { relative } from 'node:path'
import type { SiteConfig } from 'shared/types'
import type { Plugin } from 'vite'
import consola from 'consola'

export default function pluginConfig(config: SiteConfig, restartServer?: () => Promise<void>): Plugin {
  const virtualModuleId = 'hifa:site-data'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  return {
    name: 'hifa:config',
    resolveId(id) {
      if (id === virtualModuleId)
        return resolvedVirtualModuleId
    },
    load(id) {
      if (id === resolvedVirtualModuleId)
        return `export default ${JSON.stringify(config.siteData)}`
    },
    async handleHotUpdate(ctx) {
      // 定义需要监听的配置文件路径
      const needWatchedFiles = [config.configPath]
      if (needWatchedFiles.some(file => ctx.file.includes(file))) {
        consola.info(`${relative(config.root, ctx.file)} has been changed, restarting server...`)
        await restartServer!()
      }
    },
  }
}
