import { defineConfig } from 'umi'
import { ChildAppName } from './src/constants'

export default defineConfig({
  routes: [
    { path: '/', component: 'index', name: 'Home' },
    { path: ChildAppName.CHILD_REACT18, component: 'child-react18', name: ChildAppName.CHILD_REACT18 },
    { path: ChildAppName.CHILD_VUE2, component: 'child-vue2', name: ChildAppName.CHILD_VUE2 },
    { path: ChildAppName.CHILD_VUE3, component: 'child-vue3', name: ChildAppName.CHILD_VUE3 },
    { path: ChildAppName.CHILD_SVELTE, component: 'child-svelte', name: ChildAppName.CHILD_SVELTE },
  ],
  npmClient: 'pnpm',
  plugins: [
    '@umijs/plugins/dist/model',
    '@umijs/plugins/dist/antd',
    '@umijs/plugins/dist/layout',
  ],
  model: {},
  antd: {},
  layout: {
    title: 'UmiJS Starter',
  },
})
