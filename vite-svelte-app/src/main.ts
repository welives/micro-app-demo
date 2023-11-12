import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
})
// @ts-ignore
window.unmount = () => {
  app.unmount()
}

export default app
