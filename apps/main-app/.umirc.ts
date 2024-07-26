import { defineConfig } from 'umi'
import { ChildAppKey } from './src/config/micro-app'

export default defineConfig({
  routes: [
    { path: '/', component: 'index', name: 'Home' },
    { path: ChildAppKey.CHILD_REACT18, component: 'child-react18', name: ChildAppKey.CHILD_REACT18 },
    { path: ChildAppKey.CHILD_VUE2, component: 'child-vue2', name: ChildAppKey.CHILD_VUE2 },
    { path: ChildAppKey.CHILD_VUE3, component: 'child-vue3', name: ChildAppKey.CHILD_VUE3 },
    { path: ChildAppKey.CHILD_SVELTE, component: 'child-svelte', name: ChildAppKey.CHILD_SVELTE },
  ],
  npmClient: 'pnpm',
  plugins: [
    '@umijs/plugins/dist/model',
    '@umijs/plugins/dist/request',
    '@umijs/plugins/dist/antd',
    '@umijs/plugins/dist/layout',
  ],
  model: {},
  request: {},
  antd: {},
  layout: {
    title: 'UmiJS Starter',
  },
})
