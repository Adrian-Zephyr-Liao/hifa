import path from 'node:path'
import { cac } from 'cac'
import pkg from '../../package.json'
import { createDevServer } from './dev'

const cli = cac('hifa').version(pkg.version).help()

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
    console.log('build', root)
  })

cli.parse()
