import React, { useEffect } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import store from './store'

import useUser from './hooks/useUser'
import Header from './components/Header'
import Home from './pages/Home'
import Users from './pages/Users'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'

const App = () => {
  const { getCurrent } = useUser()
  const token = localStorage.getItem('token')

  useEffect(() => {
    token && getCurrent()
  }, [])

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/logout" component={Logout} />
        </Switch>
      </Router>
    </>
  )
}

const AppProviders = () => (
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
)

export default AppProviders
