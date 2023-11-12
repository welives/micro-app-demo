import { defineConfig } from 'umi'

export default defineConfig({
  routes: [
    { path: '/', component: 'index', name: 'Home' },
    { path: '/sub-react-app', component: 'sub-react-app', name: 'Sub-React-App' },
    { path: '/vue-cli-app', component: 'vue-cli-app', name: 'Vue-Cli-App' },
    { path: '/vite-vue-app', component: 'vite-vue-app', name: 'Vite-Vue-App' },
    { path: '/vite-svelte-app', component: 'vite-svelte-app', name: 'Vite-Svelte-App' },
  ],
  npmClient: 'pnpm',
  plugins: [
    '@umijs/plugins/dist/tailwindcss',
    '@umijs/plugins/dist/model',
    '@umijs/plugins/dist/request',
    '@umijs/plugins/dist/antd',
    '@umijs/plugins/dist/layout',
  ],
  tailwindcss: {},
  model: {},
  request: {},
  antd: {},
  layout: {
    title: 'UmiJS Starter',
  },
})
