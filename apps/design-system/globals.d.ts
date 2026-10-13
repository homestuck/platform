declare module '*.svg' {
  const ReactComponent: React.ComponentType<unknown>
  export { ReactComponent }
  const content: string
  export default content
}
