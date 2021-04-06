import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createPromise } from 'redux-promise-middleware'

const promise = createPromise({ promiseTypeDelimiter: '/' })
const middlewares = [thunk, promise]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(require('redux-logger').default) // eslint-disable-line global-require
}

const composeEnhancers = process.env.NODE_ENV === 'development'
&& typeof window !== 'undefined'
&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose

const enhancer = composeEnhancers(applyMiddleware(...middlewares))

export default enhancer
