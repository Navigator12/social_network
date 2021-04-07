import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent, global.Promise)
const API = `${process.env.REACT_APP_URL}api`

let token = ''

const responseBody = (res) => res.body

const tokenPlugin = (req) => {
  if (token) {
    req.set('authorization', `Bearer ${token}`);
  }
}

const requests = {
  get: (url) => superagent
    .get(`${API}${url}`)
    .use(tokenPlugin)
    .then(responseBody),
  post: (url, body) => superagent
    .post(`${API}${url}`, body)
    .use(tokenPlugin)
    .then(responseBody),
}

const Auth = {
  current: () => requests.get('/users/me'),
  login: (nickname, password) => requests.post('/users/login', { nickname, password }),
  set: (jwt) => {
    token = jwt;
  },
}

const User = {
  friends: (id) => requests.get(`/users/friends/${id}`),
}

export default {
  Auth,
  User,
}
