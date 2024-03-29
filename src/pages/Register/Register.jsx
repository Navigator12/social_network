import React, { useState } from 'react'
import {
  Container, Grid, Typography, TextField, Button,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import useUser from '../../hooks/useUser'
import useStyles from './styles'

export const Register = () => {
  const history = useHistory()
  const { register } = useUser()
  const classes = useStyles()

  const [form, setForm] = useState({
    nickname: '',
    password: '',
  })

  const [error, setError] = useState(false)

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    try {
      event.preventDefault()

      register(form.nickname, form.password)
        .then((res) => {
          if (res) {
            history.push('/login')
          } else {
            setError(true)
          }
        })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography variant="h3" component="h2">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Nickname"
                name="nickname"
                value={form.nickname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          {error && (
            <Typography
              variant="h6"
              component="span"
              color="error"
              className={classes.error}
            >
              Invalid data
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  )
}
