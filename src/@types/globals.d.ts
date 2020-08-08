import '@testing-library/jest-dom/extend-expect'
import '@types/styled-components/cssprop'

declare module '*.scss' {
  export const content: { [className: string]: string }
  export default content
}
