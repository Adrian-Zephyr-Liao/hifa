import { defineConfig } from 'tsup'

export default defineConfig([{
  entry: {
    cli: 'src/cli/cli.ts',
    dev: 'src/cli/dev.ts',
  },
  bundle: true,
  splitting: true,
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true,
  shims: true,
}])
