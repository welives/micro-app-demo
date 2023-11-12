// @ts-nocheck
import './public-path'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const domNode = document.getElementById('root')
let root: ReactDOM.Root
// 👇 将渲染操作放入 mount 函数，子应用初始化时会自动执行
window.mount = () => {
  root = ReactDOM.createRoot(domNode as HTMLElement)
  root.render(<App />)
  console.log('子应用① >>> 渲染了')
}
// 👇 将卸载操作放入 unmount 函数，就是上面步骤2中的卸载函数
window.unmount = () => {
  root.unmount()
  console.log('子应用① >>> 卸载了')
}

// 👇 如果不在微前端环境，则直接执行mount渲染
if (!window.__MICRO_APP_ENVIRONMENT__) {
  window.mount()
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
