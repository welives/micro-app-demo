type MicroAppKey = keyof typeof config

const config = {
  'sub-react-app': 'http://localhost:3100',
  'vue-cli-app': 'http://localhost:3200',
  'vite-vue-app': 'http://localhost:3300',
  'vite-svelte-app': 'http://localhost:3400',
}

// 线上环境地址
if (process.env.NODE_ENV === 'production') {
  // 基座应用和子应用部署在同一个域名下，这里使用location.origin进行补全
  Object.keys(config).forEach((key) => {
    config[key as MicroAppKey] = window.location.origin
  })
}
export default Object.freeze(config)
