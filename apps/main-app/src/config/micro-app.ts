export enum ChildAppKey {
  CHILD_REACT18 = 'child-react18',
  CHILD_VUE2 = 'child-vue2',
  CHILD_VUE3 = 'child-vue3',
  CHILD_SVELTE = 'child-svelte'
}

const microAppConfig = {
  [ChildAppKey.CHILD_REACT18]: 'http://localhost:3100',
  [ChildAppKey.CHILD_VUE2]: 'http://localhost:3200',
  [ChildAppKey.CHILD_VUE3]: 'http://localhost:3300',
  [ChildAppKey.CHILD_SVELTE]: 'http://localhost:3400',
}

// 线上环境地址
if (process.env.NODE_ENV === 'production') {
  // 基座应用和子应用部署在同一个域名下，这里使用location.origin进行补全
  Object.keys(microAppConfig).forEach((key) => {
    microAppConfig[key as `${ChildAppKey}`] = window.location.origin
  })
}
export default Object.freeze(microAppConfig)
