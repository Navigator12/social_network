import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import { store, persisted } from './store'

import Header from './components/Header'
import Home from './pages/Home'
import Users from './pages/Users'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Logout from './pages/Logout'

const App = () => (
  <>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route path="/profile/:id" component={Profile} />
        <Route exact path="/logout" component={Logout} />
      </Switch>
    </Router>
  </>
)

const AppProviders = () => (
  <StoreProvider store={store}>
    <PersistGate persistor={persisted}>
      <App />
    </PersistGate>
  </StoreProvider>
)

export default AppProviders
