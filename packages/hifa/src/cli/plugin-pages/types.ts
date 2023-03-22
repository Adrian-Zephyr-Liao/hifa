export interface PluginOptions {
  root: string
  /**
   * Valid file extensions for page components.
   * @default ['vue','md','mdx','tsx','jsx']
   */
  extensions: string[]
  /**
   * List of path globs to exclude when resolving pages.
   */
  excludes?: string[]
}

export type UserOptions = Partial<Omit<PluginOptions, 'root'>>

export interface ResolvedOptions extends Omit<PluginOptions, 'excludes' | 'root'> {
  extensionsREG: RegExp
}
