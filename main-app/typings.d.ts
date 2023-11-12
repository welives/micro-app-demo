import 'umi/typings'

interface IChildApp {
  name: string
  url: string
}
declare global {
  const SUB_REACT_APP: IChildApp
  const VUE_CLI_APP: IChildApp
  const VITE_VUE_APP: IChildApp
  const VITE_SVELTE_APP: IChildApp
}
