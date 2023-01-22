import { createApp } from 'vue'
import App from './App.vue'

function renderInBrowser() {
  createApp(App).mount('#root')
}

renderInBrowser()
