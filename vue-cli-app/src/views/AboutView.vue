<template>
  <div class="about">
    <p>{{ JSON.stringify(data) }}</p>
    <button @click="sendData">发送数据给基座</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      data: null as AnyObj,
    }
  },
  created() {
    if (window.__MICRO_APP_ENVIRONMENT__) {
      // 主动获取基座下发的数据
      const parentData = window.microApp.getData()
      console.log('子应用② >>> getData:', parentData)
      this.data = parentData
      // 监听基座下发的数据变化
      window.microApp.addDataListener(this.handleMicroData)
    }
  },
  destroyed() {
    if (window.__MICRO_APP_ENVIRONMENT__) {
      window.microApp.removeDataListener(this.handleMicroData)
    }
  },
  methods: {
    handleMicroData(data: AnyObj) {
      this.data = data
    },
    sendData() {
      if (window.__MICRO_APP_ENVIRONMENT__) {
        // 向基座发送数据,只接受对象作为参数
        window.microApp.dispatch({
          msg: `来自子应用②的数据 ${+new Date()}`,
        })
      }
    },
  },
})
</script>

<style scoped>
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
