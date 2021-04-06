import { createStore } from 'redux'
import reducers from './reducers'
import preloadState from './preloadState'
import enhancer from './enhancer'

const store = createStore(reducers, preloadState(), enhancer)

export default store
