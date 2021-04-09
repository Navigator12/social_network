import { createAction } from 'redux-actions'
import agent from '../../agent'

const { Post } = agent

export const getNews = createAction('POSTS/NEWS', async (limit, offset) => {
  const { news } = await Post.getNews({ limit, offset })

  return {
    news,
  }
})

export const createPost = createAction('POSTS/CREATE', async (text) => {
  const { post } = await Post.create(text)

  return {
    post,
  }
})

export const commentPost = createAction('POSTS/COMMENT', async (id, text) => {
  const { post } = await Post.comment(id, text)

  return {
    post,
  }
})
