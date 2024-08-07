import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const PORT = parseInt(env.VITE_APP_PORT)
  return {
    base: '/child/vite-svelte',
    server: {
      host: env.VITE_APP_HOST,
      port: isNaN(PORT) ? undefined : PORT,
    },
    plugins: [svelte()],
  }
})
