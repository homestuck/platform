export { color as colors } from './data/color.design.json'
export { gradient as gradients } from './data/gradient.design.json'

declare module 'colors' {
  export default colors
}

declare module 'gradients' {
  export default gradients
}
