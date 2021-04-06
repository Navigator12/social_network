import agent from '../agent'

export default () => {
  const token = localStorage.getItem('token')

  const user = {
    token: token || '',
  }

  agent.Auth.set(user.token || '')

  return { user }
}
