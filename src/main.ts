import { loadSlim } from '@tsparticles/slim'
import Particles from '@tsparticles/vue3'
import { InstallCodeMirror } from 'codemirror-editor-vue3'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

import App from './App.vue'
import '@unocss/reset/tailwind.css'
import './styles/main.css'

import 'uno.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import 'vant/lib/index.css'

const app = createApp(App)
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})
app.use(ElementPlus)
app.use(router)
app.use(InstallCodeMirror)
app.use(Particles, {
  init: async (engine) => {
    await loadSlim(engine)
  },
})
app.mount('#app')
