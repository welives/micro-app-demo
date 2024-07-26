<template>
  <div class="about">
    <p>{{ JSON.stringify(data) }}</p>
    <button @click="sendData">发送数据给基座</button>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, onUnmounted } from 'vue'
onBeforeMount(() => {
  if (window.__MICRO_APP_ENVIRONMENT__) {
    // 主动获取基座下发的数据
    const parentData = window.microApp.getData()
    console.log('子应用③ >>> getData:', parentData)
    data.value = parentData
    // 监听基座下发的数据变化
    window.microApp.addDataListener(handleMicroData)
  }
})
onUnmounted(() => {
  if (window.__MICRO_APP_ENVIRONMENT__) {
    window.microApp.removeDataListener(handleMicroData)
  }
})
const data = ref<AnyObj>()
const handleMicroData = (value: AnyObj) => {
  data.value = value
}
const sendData = () => {
  if (window.__MICRO_APP_ENVIRONMENT__) {
    // 向基座发送数据,只接受对象作为参数
    window.microApp.dispatch({
      msg: `来自子应用③的数据 ${+new Date()}`
    })
  }
}
</script>
<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
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
