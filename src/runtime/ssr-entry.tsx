import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'

const app = createSSRApp(App)

export async function render() {
  return await renderToString(app)
}
