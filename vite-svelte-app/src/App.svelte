<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  
  onMount(()=>{
    if (window.__MICRO_APP_ENVIRONMENT__) {
      // 主动获取基座下发的数据
      const parentData = window.microApp.getData()
      console.log('子应用④ >>> getData:', parentData)
      data = parentData
      // 监听基座下发的数据变化
      window.microApp.addDataListener(handleMicroData)
    }
  })
  onDestroy(()=>{
    if (window.__MICRO_APP_ENVIRONMENT__) {
      window.microApp.removeDataListener(handleMicroData)
    }
  })
  let data: AnyObj = {}
  const handleMicroData = (value: AnyObj) => {
    data = value
  }
  const sendData = () => {
    if (window.__MICRO_APP_ENVIRONMENT__) {
      // 向基座发送数据,只接受对象作为参数
      window.microApp.dispatch({
        msg: `来自子应用④的数据 ${+new Date()}`
      })
    }
  }
</script>

<main>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>子应用④ -- Svelte@4.0.5</h1>
  <h1>Vite + Svelte</h1>
  <div class="card">
    <Counter />
  </div>
  <p>{ JSON.stringify(data) }</p>
  <button on:click={sendData}>发送数据给基座</button>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  p {
  font-size: 20px;
  }
  button {
    padding: 10px;
    background-color: #fff;
    color: #000;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    outline: none;
  }
</style>
