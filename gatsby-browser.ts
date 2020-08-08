/* https://www.gatsbyjs.org/docs/browser-apis/ */
import 'modules/stylization/css-reset.css'
import { detectBrowser } from 'modules/polyfills'

export { wrapPageElement, Layout as wrapRootElement } from 'components/layout'

export const onClientEntry = async () => {
  detectBrowser()
}
