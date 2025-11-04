/// <reference types="vite/client" />

interface Window {
  ethereum?: any
}

declare module '*.gif' {
  const src: string
  export default src
}



