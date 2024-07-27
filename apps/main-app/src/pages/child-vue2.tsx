/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from "@micro-zoe/micro-app/polyfill/jsx-custom-event";
import microApp from "@micro-zoe/micro-app";
import { Modal, Space, Button, Input, Typography } from "antd";
import { useState } from "react";
import { ChildAppName } from "../constants";
import microAppConfig from "../../micro-app-config";
export default function VueCliApp() {
  const childBaseRoute = `/${ChildAppName.CHILD_VUE2}`;
  const [msg, setMsg] = useState("来自基座的初始数据");
  const [childMsg, setChildMsg] = useState();
  const onCreated = () => {
    console.log("基座 >>> 子应用② 创建了");
  };
  const onBeforemount = () => {
    console.log("基座 >>> 子应用② 即将被渲染");
  };
  const onMounted = () => {
    console.log("基座 >>> 子应用② 已经渲染完成");
  };
  const onUnmount = () => {
    console.log("基座 >>> 子应用② 已经卸载");
  };
  const onError = () => {
    Modal.error({
      title: "提示",
      content: "子应用② 加载失败",
    });
  };
  // 获取子应用发送过来的数据
  const onDataChange = (e: CustomEvent) => {
    setChildMsg(e.detail.data);
  };
  // 手动发送数据给子应用,第二个参数只接受对象类型
  const sendData = () => {
    microApp.setData(ChildAppName.CHILD_VUE2, {
      data: `来自基座的数据 ${+new Date()}`,
    });
  };
  const controlChildRouter = () => {
    // 子应用不设置 baseroute 时, 路由跳转也不要加 baseroute
    // microApp.router.push({ name: ChildAppName.CHILD_VUE2, path: `/about` })
    microApp.router.push({
      name: ChildAppName.CHILD_VUE2,
      path: `${childBaseRoute}/about`,
    });
  };
  return (
    <Space direction="vertical" size="middle">
      <Space>
        <Input
          placeholder="发送给子应用②的数据"
          onChange={(e) => setMsg(e.target.value)}
        ></Input>
        <Button type="primary" onClick={sendData}>
          setData发送数据
        </Button>
        <Button type="primary" onClick={controlChildRouter}>
          打开子应用About页面
        </Button>
        <Typography.Text>{JSON.stringify(childMsg)}</Typography.Text>
      </Space>
      <micro-app
        name={ChildAppName.CHILD_VUE2}
        // 使用默认的 search 模式路由就正常,只是url难看而已
        url={`${microAppConfig[ChildAppName.CHILD_VUE2]}/child/vue2`}
        // 下面两个都会导致子应用刷新变空白的问题, 估计是刷新后找不到匹配的路由, 暂时没空去处理
        baseroute={childBaseRoute}
        // 开启这个虚拟路由的话,在子应用的子路由刷新页面会变空白
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
  );
}
