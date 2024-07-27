/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import microApp from '@micro-zoe/micro-app'
import { Modal, Space, Button, Input, Typography } from 'antd'
import { useState } from 'react'
import { ChildAppName } from '../constants'
import microAppConfig from '../../micro-app-config'
export default function SubReactApp() {
  const childBaseRoute = `/${ChildAppName.CHILD_REACT18}`
  const [msg, setMsg] = useState('来自基座的初始数据')
  const [childMsg, setChildMsg] = useState()
  const onCreated = () => {
    console.log('基座 >>> 子应用① 创建了')
  }
  const onBeforemount = () => {
    console.log('基座 >>> 子应用① 即将被渲染')
  }
  const onMounted = () => {
    console.log('基座 >>> 子应用① 已经渲染完成')
  }
  const onUnmount = () => {
    console.log('基座 >>> 子应用① 已经卸载')
  }
  const onError = () => {
    Modal.error({
      title: '提示',
      content: '子应用① 加载失败',
    })
  }
  // 获取子应用发送过来的数据
  const onDataChange = (e: CustomEvent) => {
    setChildMsg(e.detail.data)
  }
  // 手动发送数据给子应用,第二个参数只接受对象类型
  const sendData = () => {
    microApp.setData(ChildAppName.CHILD_REACT18, { data: `来自基座的数据 ${+new Date()}` })
  }
  return (
    <Space direction="vertical" size="middle">
      <Space>
        <Input placeholder="发送给子应用①的数据" onChange={(e) => setMsg(e.target.value)}></Input>
        <Button type="primary" onClick={sendData}>
          setData发送数据
        </Button>
        <Typography.Text>{JSON.stringify(childMsg)}</Typography.Text>
      </Space>
      <micro-app
        name={ChildAppName.CHILD_REACT18}
        url={`${microAppConfig[ChildAppName.CHILD_REACT18]}/child/react18`}
        baseroute={childBaseRoute}
        disable-memory-router
        clear-data
        // 通过 data 属性发送数据给子应用
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
