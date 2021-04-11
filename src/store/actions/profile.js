import { createAction } from 'redux-actions'
import { omit } from 'lodash'
import agent from '../../agent'

const { User, Post } = agent

export const getProfile = createAction('PROFILE/GET', async (id) => {
  const { user } = await User.getUser(id)

  return {
    posts: user.posts,
    profile: omit(user, 'posts'),
  }
})

export const getFriendStatus = createAction('PROFILE/FRIEND/STATUS', async (from, to) => {
  const { status } = await User.getFriendStatus(from, to)

  return {
    status,
  }
})

export const sendProfileFriendRequest = createAction('PROFILE/FRIEND/REQUEST/SEND', async (to) => {
  const { request } = await User.sendRequest(to)

  return {
    request,
  }
})

export const resolveProfileFriendRequest = createAction('PROFILE/FRIEND/REQUEST/RESOLVE', async (id, accept) => {
  const { status } = await User.resolveRequest(id, accept)

  return {
    status,
  }
})

export const cancelProfileFriendRequest = createAction('PROFILE/FRIEND/REQUEST/CANCEL', async (id) => {
  const { requestId } = await User.cancelRequest(id)

  return {
    requestId,
  }
})

export const removeProfileFriendRelation = createAction('PROFILE/FRIEND/RELATION/REMOVE', async (id) => {
  await User.removeFriendRelation(id)

  return {}
})

export const createProfilePost = createAction('PROFILE/POST/CREATE', async (text) => {
  const { post } = await Post.create(text)

  return {
    post,
  }
})

export const commentProfilePost = createAction('PROFILE/POST/COMMENT', async (id, text) => {
  const { post } = await Post.comment(id, text)

  return {
    post,
  }
})
