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
  register: (nickname, password) => requests.post('/users/register', { nickname, password }),
  set: (jwt) => {
    token = jwt;
  },
}

const User = {
  friends: (id) => requests.get(`/users/friends/${id}`),
}

const Post = {
  getNews: ({ limit = 10, offset = 0 }) => requests.get(`/posts/news?limit=${limit}&offset=${offset}`),
  create: (text) => requests.post('/posts/create', { text }),
  comment: (postId, text) => requests.post('/posts/comment', { postId, text }),
}

export default {
  Auth,
  User,
  Post,
}
