import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import fs from 'fs-extra'
import type { InlineConfig } from 'vite'
import { build as viteBuild } from 'vite'
import pluginVue from '@vitejs/plugin-vue'
import type { RollupOutput } from 'rollup'
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constants'

export async function bundle(root: string) {
  const resolveViteConfig = (isServer: boolean): InlineConfig => {
    return {
      mode: 'production',
      root,
      build: {
        ssr: isServer,
        outDir: isServer ? '.temp' : 'build',
        rollupOptions: {
          input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
          output: isServer
            ? {
                format: 'cjs',
              }
            : {
                format: 'esm',
              },
        },

      },
      plugins: [pluginVue()],
    }
  }
  console.log('Building Server and Client.....')
  try {
    const [clientBundle, serverBundle] = await Promise.all([viteBuild(resolveViteConfig(false)), viteBuild(resolveViteConfig(true))])
    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput]
  }
  catch (error) {
    console.log('[ error ] >', error)
  }
}

export async function renderPage(
  render: () => string,
  root: string,
  clientBundle: RollupOutput,
) {
  const clientChunk = clientBundle.output.find(
    chunk => chunk.type === 'chunk' && chunk.isEntry,
  )
  console.log('Rendering page in server side...')
  const appHtml = await render()
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>title</title>
    <meta name="description" content="xxx">
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <script type="module" src="/${clientChunk?.fileName}"></script>
  </body>
</html>`.trim()
  await fs.ensureDir(join(root, 'build'))
  await fs.writeFile(join(root, 'build/index.html'), html)
  await fs.remove(join(root, '.temp'))
}

export async function build(root: string) {
  const [clientBundle, serverBundle] = await bundle(root) as [RollupOutput, RollupOutput]
  // 引入 ssr 入口模块
  const serverEntryPath = resolve(root, '.temp', serverBundle.output[0].fileName)
  const { render } = (await import(pathToFileURL(serverEntryPath).toString()))
  await renderPage(render, root, clientBundle)
}
