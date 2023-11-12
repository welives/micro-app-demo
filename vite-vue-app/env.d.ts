/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_HOST: string
  readonly VITE_APP_PORT: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
