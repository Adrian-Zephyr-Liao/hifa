import path from 'node:path'
import type { Plugin } from 'vite'
import { RouteService } from './RouteService'
import type { PluginOptions } from './types'

export const DEFAULT_EXCLUDE = ['**/node_modules/**', '**/.*', '**/dist/**']

export default function pages(options: PluginOptions): Plugin {
  let scanDir: string
  const { root = 'src', ...restOptions } = options
  const virtualModuleId = 'hifa:pages'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`
  const routeService = new RouteService(options.root, restOptions)
  return {
    name: 'hifa:pages',
    enforce: 'pre',
    async configResolved() {
      scanDir = path.isAbsolute(root)
        ? path.join(root)
        : path.join(process.cwd(), root)
      // Vite 启动时，对 RouteService 进行初始化
      await routeService.init()
    },
    resolveId(id: string) {
      if (id === virtualModuleId)
        return resolvedVirtualModuleId
    },
    load(id: string) {
      if (id === resolvedVirtualModuleId)
        return routeService.generateRoutesCode()
    },
    configureServer(server) {
      const fileChange = () => {
        const moduleNode = server.moduleGraph.getModuleById(resolvedVirtualModuleId)
        moduleNode && server.moduleGraph.invalidateModule(moduleNode)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.add(scanDir).unwatch([...DEFAULT_EXCLUDE, ...(options?.excludes || [])])
        .on('add', async (file) => {
          await routeService.addRoute(file)
          fileChange()
        })
        .on('unlink', async (file) => {
          await routeService.removeRoute(file)
          fileChange()
        })
        .on('change', async () => {
          fileChange()
        })
    },
  }
}
