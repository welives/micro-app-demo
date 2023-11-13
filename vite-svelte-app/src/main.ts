import './app.css'
import App from './App.svelte'

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
  type AnyObj = Record<string, unknown>
}

let app: any = null
// 👇 将渲染操作放入 mount 函数，子应用初始化时会自动执行
window.mount = () => {
  app = new App({
    target: document.getElementById('app'),
  })
  console.log('子应用④ >>> 渲染了')
}

// 👇 将卸载操作放入 unmount 函数
window.unmount = () => {
  app.$destroy()
  app = null
  console.log('子应用④ >>> 卸载了')
}

// 👇 如果不在微前端环境，则直接执行mount渲染
if (!window.__MICRO_APP_ENVIRONMENT__) {
  window.mount()
}

export default app
