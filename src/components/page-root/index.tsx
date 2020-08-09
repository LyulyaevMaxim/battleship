import { LoadableComponent } from '@loadable/component'
import { getModuleAsync } from 'modules/optimizations'

export const GameBoard: LoadableComponent<{}> = getModuleAsync({
    moduleName: 'GameBoard',
    moduleImport: () => import(/* webpackChunkName: "GameBoard", webpackPrefetch: true */ `./GameBoard`),
  }),
  GameInfo: LoadableComponent<{}> = getModuleAsync({
    moduleName: 'GameInfo',
    moduleImport: () => import(/* webpackChunkName: "GameInfo", webpackPrefetch: true */ `./GameInfo`),
  })
