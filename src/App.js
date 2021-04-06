import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import './App.css'
import store from './store'

const App = () => (
  <h1>Front-end</h1>
)

const AppProviders = () => (
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
)

export default AppProviders
