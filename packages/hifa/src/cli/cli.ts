import path from 'node:path'
import { cac } from 'cac'
import { build } from './build'
import { resolveConfig } from './config'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const version = require('./../../package.json')

const cli = cac('hifa').version(version).help()

cli
  .command('[root]', 'start dev server')
  .alias('dev')
  .action(async (root: string) => {
    // 添加以下逻辑
    root = root ? path.resolve(root) : process.cwd()
    const { createDevServer } = await import('./dev.js')
    const createServer = async () => {
      const server = await createDevServer(root, async () => {
        await server.close()
        await createServer()
      })
      await server.listen()
      server.printUrls()
    }
    await createServer()
  })

cli
  .command('build [root]', 'build for production')
  .action(async (root: string) => {
    try {
      root = path.resolve(root)
      const config = await resolveConfig(root, 'build', 'production')
      await build(root, config)
    }
    catch (e) {
      console.log(e)
    }
  })

cli.parse()
