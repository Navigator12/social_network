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

export const getAllUsers = createAction('/USER/ALL', async (limit, offset) => {
  const { users } = await User.getAllUsers({ limit, offset })

  return {
    users,
  }
})

export const getFriends = createAction('USER/FRIENDS', async (id) => {
  const { friends } = await User.getFriends(id)

  return {
    friends,
  }
})

export const getPendingRequests = createAction('USER/FRIENDS/REQUESTS/PENDING', async (id, limit, offset) => {
  const { pendingRequests } = await User.getPendingRequests(id, { limit, offset })

  return {
    pendingRequests,
  }
})

export const getSentRequests = createAction('USER/FRIENDS/REQUESTS/SENT', async (id, limit, offset) => {
  const { sentRequests } = await User.getSentRequests(id, { limit, offset })

  return {
    sentRequests,
  }
})

export const resolveFriendRequest = createAction('USER/FRIENDS/REQUEST/RESOLVE', async (id, accept) => {
  const { friend, status } = await User.resolveRequest(id, accept)

  return {
    status,
    friend,
  }
})

export const cancelFriendRequest = createAction('USER/FRIENDS/REQUEST/CANCEL', async (id) => {
  const { requestId } = await User.cancelRequest(id)

  return {
    requestId,
  }
})
