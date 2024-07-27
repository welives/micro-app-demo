import { ChildAppName } from './src/constants'

const config = {
  [ChildAppName.CHILD_REACT18]: 'http://localhost:3100',
  [ChildAppName.CHILD_VUE2]: 'http://localhost:3200',
  [ChildAppName.CHILD_VUE3]: 'http://localhost:3300',
  [ChildAppName.CHILD_SVELTE]: 'http://localhost:3400',
}

// 线上环境地址
if (process.env.NODE_ENV === 'production') {
  // 基座应用和子应用部署在同一个域名下，这里使用location.origin进行补全
  Object.keys(config).forEach((key) => {
    config[key as `${ChildAppName}`] = window.location.origin
  })
}
export default Object.freeze(config)
