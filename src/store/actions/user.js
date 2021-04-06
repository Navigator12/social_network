import { createAction } from 'redux-actions'
import agent from '../../agent'

const { Auth } = agent

export const authLogin = createAction('AUTH/LOGIN', async (nickname, password) => {
  const auth = await Auth.login(nickname, password)

  Auth.set(auth.token)
  localStorage.setItem('token', auth.token);

  return {
    token: auth.token,
  }
})

export const authLogout = createAction('AUTH/LOGOUT', async () => {
  Auth.set('')

  return {
    user: null,
    token: null,
  }
})
