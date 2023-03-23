import type { VitePluginConfig } from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'

const options: VitePluginConfig = {
  presets: [presetAttributify(), presetUno({}), presetIcons()],
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'menu': 'flex justify-around items-center text-sm font-bold',
  },
}

export default options
