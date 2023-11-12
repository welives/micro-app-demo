/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import { Modal } from 'antd'
export default function SubReactApp() {
  const onCreated = () => {
    console.log('基座 >>> 子应用① Sub-React-App 创建了')
  }
  const onBeforemount = () => {
    console.log('基座 >>> 子应用① Sub-React-App 即将被渲染')
  }
  const onMounted = () => {
    console.log('基座 >>> 子应用① Sub-React-App 已经渲染完成')
  }
  const onUnmount = () => {
    console.log('基座 >>> 子应用① Sub-React-App 已经卸载')
  }
  const onError = () => {
    Modal.error({
      title: '提示',
      content: '子应用① Sub-React-App 加载失败',
    })
  }
  const onDataChange = (e: CustomEvent) => {
    console.log('基座 >>> 来自子应用① Sub-React-App 的数据:', e.detail.data)
  }
  return (
    <div>
      <micro-app
        name="sub-react-app"
        url="http://localhost:3100"
        data={{ msg: '来自基座的数据' }}
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
