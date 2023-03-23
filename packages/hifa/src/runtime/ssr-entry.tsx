import { createSSRApp } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { renderToString } from 'vue/server-renderer'
import { routes } from 'hifa:pages'
import App from './App.vue'
// import { routes } from './Content'

const app = createSSRApp(App)
const router = createRouter({
  history: createMemoryHistory('/guide'),
  routes,
})
app.use(router)

export async function render() {
  return await renderToString(app)
}
