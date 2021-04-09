import { ActionType } from 'redux-promise-middleware'
import { handleActions } from 'redux-actions'
import {
  getNews, createPost, commentPost,
} from '../actions'

const reducer = handleActions(
  {
    [getNews.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        news: action.payload.news,
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
    [createPost.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        news: [action.payload.post, ...(state.news)],
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
    [commentPost.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        news: state.news.map((el) => (el._id === action.payload.post._id ? action.payload.post : el)),
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
  },
  {
    news: [],
  },
)

export default reducer
