/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import { Modal } from 'antd'
export default function ViteVueApp() {
  const onCreated = () => {
    console.log('基座 >>> 子应用③ Vite-Vue-App 创建了')
  }
  const onBeforemount = () => {
    console.log('基座 >>> 子应用③ Vite-Vue-App 即将被渲染')
  }
  const onMounted = () => {
    console.log('基座 >>> 子应用③ Vite-Vue-App 已经渲染完成')
  }
  const onUnmount = () => {
    console.log('基座 >>> 子应用③ Vite-Vue-App 已经卸载')
  }
  const onError = () => {
    Modal.error({
      title: '提示',
      content: '子应用③ Vite-Vue-App 加载失败',
    })
  }
  const onDataChange = (e: CustomEvent) => {
    console.log('基座 >>> 来自子应用③ Vite-Vue-App 的数据:', e.detail.data)
  }
  return (
    <div>
      <micro-app
        name="vite-vue-app"
        url="http://localhost:3300"
        iframe
        onCreated={onCreated}
        onBeforemount={onBeforemount}
        onMounted={onMounted}
        onUnmount={onUnmount}
        onError={onError}
        onDataChange={onDataChange}
      ></micro-app>
    </div>
  )
}
