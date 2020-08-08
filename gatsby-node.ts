import path from 'path'
import { GatsbyNode } from 'gatsby'
import LoadablePlugin from '@loadable/webpack-plugin'

const root = path.resolve(__dirname, './')

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions, getConfig }) => {
  const config = getConfig()

  config.plugins.push(new LoadablePlugin())

  if (!Array.isArray(config.resolve.modules)) config.resolve.modules = []
  config.resolve.modules.push(`${root}/src`, 'node_modules')

  config.node.fs = 'empty'

  actions.replaceWebpackConfig(config)
}
