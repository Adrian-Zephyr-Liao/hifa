import type { ResolvedOptions, UserOptions } from './types'

const DEFAULT_EXTENSIONS = ['vue', 'md', 'mdx', 'ts', 'tsx', 'js', 'jsx']

export function resolvedOptions(userOptions: UserOptions): ResolvedOptions {
  const {
    extensions = DEFAULT_EXTENSIONS,
  } = userOptions
  const extensionsREG = new RegExp(`\\.(${extensions.join('|')})$`)
  return {
    extensions,
    extensionsREG,
  }
}
