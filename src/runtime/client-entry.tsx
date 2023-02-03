import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'hifa:pages'
import App from './App.vue'
console.log('🚀 ~ file: client-entry.tsx:4 ~ routes', routes)

// import { routes } from './Content'

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
