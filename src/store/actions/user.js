import { createAction } from 'redux-actions'
import agent from '../../agent'

const { Auth, User } = agent

export const authLogin = createAction('AUTH/LOGIN', async (nickname, password) => {
  const { token } = await Auth.login(nickname, password)

  Auth.set(token)
  localStorage.setItem('token', token);

  const { user } = await Auth.current()

  return {
    user,
    token,
  }
})

export const authLogout = createAction('AUTH/LOGOUT', async () => {
  Auth.set('')

  return {
    user: null,
    token: null,
  }
})

export const getCurrent = createAction('USER/CURRENT', async () => {
  const { user } = await Auth.current()

  return {
    user,
  }
})

export const getFriends = createAction('USER/FRIENDS', async (id) => {
  const { friends } = await User.friends(id)

  return {
    friends,
  }
})
