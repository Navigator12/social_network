import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent, global.Promise)
const API = `${process.env.REACT_APP_URL}/api`

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
  del: (url, body) => superagent
    .del(`${API}${url}`, body)
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
  getAllUsers: ({ limit = 25, offset = 0 }) => requests.get(`/users?limit=${limit}&offset=${offset}`),
  getUser: (id) => requests.get(`/users/${id}`),
  getFriends: (id) => requests.get(`/users/friends/${id}`),
  getFriendStatus: (from, to) => requests.get(`/users/friends/status/${from}/${to}`),
  getPendingRequests: (id, { limit = 25, offset = 0 }) => requests.get(`/friend_request/pending/${id}?limit=${limit}&offset=${offset}`),
  getSentRequests: (id, { limit = 25, offset = 0 }) => requests.get(`/friend_request/sent/${id}?limit=${limit}&offset=${offset}`),
  sendRequest: (id) => requests.post('/friend_request/send', { to: id }),
  resolveRequest: (requestId, accept) => requests.post('/friend_request/resolve', { requestId, accept }),
  cancelRequest: (requestId) => requests.post('/friend_request/cancel', { requestId }),
  removeFriendRelation: (otherUserId) => requests.del(`/users/friends/${otherUserId}`),
}

const Post = {
  getNews: ({ limit = 25, offset = 0 }) => requests.get(`/posts/news?limit=${limit}&offset=${offset}`),
  create: (text) => requests.post('/posts/create', { text }),
  delete: (id) => requests.del(`/posts/${id}`),
  comment: (postId, text) => requests.post('/posts/comment', { postId, text }),
}

const Chat = {
  getChats: () => requests.get('/chats'),
  getChatWithMessages: (otherId) => requests.get(`/chats/${otherId}`),
  findChat: (otherId) => requests.get(`/chats/find/${otherId}`),
  createChat: (otherId) => requests.post('/chats/create', { otherId }),
}

export default {
  Auth,
  User,
  Post,
  Chat,
}
