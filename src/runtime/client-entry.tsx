import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import { routes } from './Content'

function renderInBrowser() {
  const app = createApp(App)

  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  app.use(router)
  app.mount('#root')
}

renderInBrowser()
