import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from './index'

export const WithProvider = ({ element }: any) => {
  const store = configureStore()
  return <Provider store={store}>{element}</Provider>
}
