import './assets/main.css'
import { createApp, type App as AppInstance } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import type { Router, RouterHistory } from 'vue-router'
import App from './App.vue'
import routes from './router'

declare global {
  interface Window {
    microApp: any
    __MICRO_APP_NAME__: string
    __MICRO_APP_ENVIRONMENT__: boolean
    __MICRO_APP_BASE_ROUTE__: string
    __MICRO_APP_PUBLIC_PATH__: string
    mount: () => void
    unmount: () => void
  }
  type AnyObj = Record<string, any>
}

let app: AppInstance | null = null
let router: Router | null = null
let history: RouterHistory | null = null
// 👇 将渲染操作放入 mount 函数，子应用初始化时会自动执行
window.mount = () => {
  history = createWebHistory(window.__MICRO_APP_BASE_ROUTE__ || import.meta.env.BASE_URL)
  router = createRouter({ history, routes })
  app = createApp(App)
  app.use(router)
  app.mount('#app')
  console.log('子应用③ >>> 渲染了')
}

// 👇 将卸载操作放入 unmount 函数
window.unmount = () => {
  app?.unmount()
  history?.destroy()
  app = null
  router = null
  history = null
  console.log('子应用③ >>> 卸载了')
}

// 👇 如果不在微前端环境，则直接执行mount渲染
if (!window.__MICRO_APP_ENVIRONMENT__) {
  window.mount()
}
