import config from '../../childAppConfig'
export default function ViteSvelteApp() {
  return (
    <div>
      <micro-app name="vite-svelte-app" url={config['vite-svelte-app']} iframe></micro-app>
    </div>
  )
}
