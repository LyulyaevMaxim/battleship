/* https://www.gatsbyjs.org/docs/browser-apis/ */
import 'antd/dist/antd.css'
import 'modules/stylization/css-reset.css'
import { detectBrowser } from 'modules/polyfills'

export { wrapPageElement, Layout as wrapRootElement } from 'components/layout'

export const onClientEntry = async () => {
  detectBrowser()
}
