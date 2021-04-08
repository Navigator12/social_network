import { createStore } from 'redux'
import { persistStore } from 'redux-persist'
import reducers from './reducers'
import preloadState from './preloadState'
import enhancer from './enhancer'

export const store = createStore(reducers, preloadState(), enhancer)

export const persisted = persistStore(store)

