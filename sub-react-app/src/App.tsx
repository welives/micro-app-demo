// @ts-nocheck
import React from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [data, setData] = React.useState()
  const handleMicroData = (data: Record<string, unknown>) => {
    setData(data)
  }
  React.useEffect(() => {
    if (window.__MICRO_APP_ENVIRONMENT__) {
      // 主动获取基座下发的数据
      const parentData = window.microApp.getData()
      console.log('子应用① >>> getData:', parentData)
      setData(parentData)
      // 监听基座下发的数据变化
      window.microApp.addDataListener(handleMicroData)
    }
    return () => {
      if (window.__MICRO_APP_ENVIRONMENT__) {
        window.microApp.removeDataListener(handleMicroData)
      }
    }
  }, [])
  const sendData = () => {
    if (window.__MICRO_APP_ENVIRONMENT__) {
      // 向基座发送数据,只接受对象作为参数
      window.microApp.dispatch({
        msg: `来自子应用①的数据 ${+new Date()}`,
      })
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>子应用① -- React@{React.version}</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>{JSON.stringify(data)}</p>
        <button onClick={sendData}>发送数据给基座</button>
      </header>
    </div>
  )
}

export default App
