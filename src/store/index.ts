import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { get } from 'lodash'

export interface IStore {}

export function configureStore<IStore>(preloadedState?: any) {
  const middlewares = [thunkMiddleware],
    composedEnhancers =
      (process.env.isDev && get(global, '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', Function.prototype)({ trace: true })) ||
      compose,
    enhancer = composedEnhancers(applyMiddleware(...middlewares))

  return createStore(combineReducers({}), preloadedState, enhancer)
}
