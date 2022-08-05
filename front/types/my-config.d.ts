
declare module 'my-config' {
  global {
    interface Window {
      __APOLLO_STATE__: any
    }
  }
}