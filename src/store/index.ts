import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { get } from 'lodash-es'

import { NBattleshipGame } from 'store/battleshipGame/@types'
import { battleshipGameReducer } from 'store/battleshipGame/reducer'

export interface IStore {
  battleshipGame: NBattleshipGame.IStore
}

export function configureStore<IStore>(preloadedState?: any) {
  const middlewares = [thunkMiddleware],
    composedEnhancers =
      (process.env.isDev && get(global, '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', Function.prototype)({ trace: true })) ||
      compose,
    enhancer = composedEnhancers(applyMiddleware(...middlewares))

  return createStore(
    combineReducers({
      battleshipGame: battleshipGameReducer,
    }),
    preloadedState,
    enhancer
  )
}
