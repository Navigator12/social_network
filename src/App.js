import React, { useEffect } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import store from './store'

import useUser from './hooks/useUser'
import Home from './pages/Home'
import Login from './pages/Login'
import Users from './pages/Users'

const App = () => {
  const { getCurrent } = useUser()

  useEffect(() => {
    getCurrent()
  }, [])

  return(
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/users" component={Users} />
      </Switch>
    </Router>
  )
}

const AppProviders = () => (
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
)

export default AppProviders
