import { defineConfig } from 'tsup'

export default defineConfig([{
  entry: {
    cli: 'src/cli/cli.ts',
    dev: 'src/cli/dev.ts',
    index: 'src/cli/index.ts',
  },
  format: ['cjs', 'esm'],
  minifyIdentifiers: false,
  bundle: true,
  dts: true,
  sourcemap: true,
  splitting: true,
  minify: process.env.NODE_ENV === 'production',
  skipNodeModulesBundle: true,
  outDir: 'dist/cli',
  shims: true,
  clean: true,
}])
