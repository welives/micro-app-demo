// @ts-nocheck
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let app = null
// 👇 将渲染操作放入 mount 函数，子应用初始化时会自动执行
window.mount = () => {
  app = new Vue({
    router,
    render: (h) => h(App),
  }).$mount('#app')
  console.log('子应用② >>> 渲染了')
}

// 👇 将卸载操作放入 unmount 函数
window.unmount = () => {
  app.$destroy()
  app.$el.innerHTML = ''
  app = null
}

// 👇 如果不在微前端环境，则直接执行mount渲染
if (!window.__MICRO_APP_ENVIRONMENT__) {
  window.mount()
}
