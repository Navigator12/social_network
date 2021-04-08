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
  localStorage.removeItem('token');

  return {
    user: null,
    token: null,
  }
})

export const register = createAction('USER/REGISTER', async (nickname, password) => {
  await Auth.register(nickname, password)

  return {}
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

// export const getNews = createAction('USER/NEWS', async (id) => {
//   const { posts } = await Post.news
// })
