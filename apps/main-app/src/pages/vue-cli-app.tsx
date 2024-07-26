/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import microApp from '@micro-zoe/micro-app'
import { Modal, Space, Button, Input, Typography } from 'antd'
import { useState } from 'react'
import config from '../utils/childAppConfig'
export default function VueCliApp() {
  const childBaseRoute = '/vue-cli-app'
  const [msg, setMsg] = useState('来自基座的初始数据')
  const [childMsg, setChildMsg] = useState()
  const onCreated = () => {
    console.log('基座 >>> 子应用② 创建了')
  }
  const onBeforemount = () => {
    console.log('基座 >>> 子应用② 即将被渲染')
  }
  const onMounted = () => {
    console.log('基座 >>> 子应用② 已经渲染完成')
  }
  const onUnmount = () => {
    console.log('基座 >>> 子应用② 已经卸载')
  }
  const onError = () => {
    Modal.error({
      title: '提示',
      content: '子应用② 加载失败',
    })
  }
  // 获取子应用发送过来的数据
  const onDataChange = (e: CustomEvent) => {
    setChildMsg(e.detail.data)
  }
  // 手动发送数据给子应用,第二个参数只接受对象类型
  const sendData = () => {
    microApp.setData('vue-cli-app', { data: `来自基座的数据 ${+new Date()}` })
  }
  const controlChildRouter = () => {
    microApp.router.push({ name: 'vue-cli-app', path: `${childBaseRoute}/about` })
  }
  return (
    <Space direction="vertical" size="middle">
      <Space>
        <Input placeholder="发送给子应用②的数据" onChange={(e) => setMsg(e.target.value)}></Input>
        <Button type="primary" onClick={sendData}>
          setData发送数据
        </Button>
        <Button type="primary" onClick={controlChildRouter}>
          打开子应用About页面
        </Button>
        <Typography.Text>{JSON.stringify(childMsg)}</Typography.Text>
      </Space>
      <micro-app
        name="vue-cli-app"
        url={`${config['vue-cli-app']}/child/vue2`}
        baseroute={childBaseRoute}
        disable-memory-router
        clear-data
        data={{ msg }}
        onDataChange={onDataChange}
        onCreated={onCreated}
        onBeforemount={onBeforemount}
        onMounted={onMounted}
        onUnmount={onUnmount}
        onError={onError}
      ></micro-app>
    </Space>
  )
}
