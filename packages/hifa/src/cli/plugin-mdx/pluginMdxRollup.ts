import pluginMdx from '@mdx-js/rollup'
import { babel } from '@rollup/plugin-babel'
import remarkPluginGFM from 'remark-gfm'
import rehypePluginAutolinkHeadings from 'rehype-autolink-headings'
import rehypePluginSlug from 'rehype-slug'
import remarkPluginMDXFrontMatter from 'remark-mdx-frontmatter'
import remarkPluginFrontmatter from 'remark-frontmatter'

export function pluginMdxRollup() {
  return [
    pluginMdx({
      remarkPlugins: [
        remarkPluginGFM,
        remarkPluginFrontmatter,
        [remarkPluginMDXFrontMatter, { name: 'frontmatter' }],
      ],
      rehypePlugins: [
        rehypePluginSlug,
        [
          rehypePluginAutolinkHeadings,
          {
            properties: {
              class: 'header-anchor',
            },
            content: {
              type: 'text',
              value: '#',
            },
          },
        ],
      ],
      jsx: true,
    }),
    babel({
      extensions: ['.js', '.jsx', '.cjs', '.mjs', '.md', '.mdx'],
      plugins: ['@vue/babel-plugin-jsx', '@babel/plugin-transform-runtime'],
      babelHelpers: 'runtime',
    }),
  ]
}
