import path from 'node:path'
import { cac } from 'cac'
import { createDevServer } from './dev'
import { build } from './build'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const version = require('./../../package.json')

const cli = cac('hifa').version(version).help()

cli
  .command('[root]', 'start dev server')
  .alias('dev')
  .action(async (root: string) => {
    // 添加以下逻辑
    root = root ? path.resolve(root) : process.cwd()
    const server = await createDevServer(root)
    await server.listen()
    server.printUrls()
  })

cli
  .command('build [root]', 'build for production')
  .action(async (root: string) => {
    try {
      root = path.resolve(root)
      await build(root)
    }
    catch (e) {
      console.log(e)
    }
  })

cli.parse()
