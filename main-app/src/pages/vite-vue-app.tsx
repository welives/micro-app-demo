/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import { Modal, message } from 'antd'
message.config({ maxCount: 2, duration: 1 })
export default function ViteVueApp() {
  const onCreated = () => {
    message.info('子应用Vite-Vue-App 创建了')
  }
  const onBeforemount = () => {
    message.info('子应用Vite-Vue-App 即将被渲染')
  }
  const onMounted = () => {
    message.info('子应用Vite-Vue-App 已经渲染完成')
  }
  const onUnmount = () => {
    message.info('子应用Vite-Vue-App 已经卸载')
  }
  const onError = () => {
    Modal.error({
      title: '提示',
      content: '子应用Vite-Vue-App 加载失败',
    })
  }
  return (
    <div>
      <micro-app
        name="vite-vue-app"
        url="http://localhost:5174"
        iframe
        onCreated={onCreated}
        onBeforemount={onBeforemount}
        onMounted={onMounted}
        onUnmount={onUnmount}
        onError={onError}
      ></micro-app>
    </div>
  )
}
