import React from 'react'
import { Link } from 'react-router-dom'
import {
  AppBar, Toolbar, Typography, Button,
} from '@material-ui/core'

import useUser from '../../hooks/useUser'
import useStyles from './styles'

export const Header = () => {
  const { user } = useUser()
  const {
    header, logo, menuButton, toolbar,
  } = useStyles()

  const links = () => (
    <div>
      <Button
        key="home"
        color="inherit"
        to="/"
        component={Link}
        className={menuButton}
      >
        Home
      </Button>
      <Button
        key="users"
        color="inherit"
        to="/users"
        component={Link}
        className={menuButton}
      >
        Users
      </Button>
      {
        user
          ? (
            <>
              <Button
                key="profile"
                color="inherit"
                to="/profile"
                component={Link}
                className={menuButton}
              >
                Profile
              </Button>
              <Button
                key="logout"
                color="inherit"
                to="/logout"
                component={Link}
                className={menuButton}
              >
                Logout
              </Button>
            </>
          )
          : (
            <>
              <Button
                key="login"
                color="inherit"
                to="/login"
                component={Link}
                className={menuButton}
              >
                Login
              </Button>
              <Button
                key="register"
                color="inherit"
                to="/register"
                component={Link}
                className={menuButton}
              >
                Register
              </Button>
            </>
          )
      }
    </div>
  )

  return (
    <AppBar className={header}>
      <Toolbar className={toolbar}>
        <Typography variant="h5" component="h1" className={logo}>
          Social network
        </Typography>
        {
          links()
        }
      </Toolbar>
    </AppBar>
  )
}
