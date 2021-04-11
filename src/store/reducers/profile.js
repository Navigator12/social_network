import { ActionType } from 'redux-promise-middleware'
import { handleActions } from 'redux-actions'
import {
  getProfile,
  createProfilePost,
  commentProfilePost,
  getFriendStatus,
  sendProfileFriendRequest,
  cancelProfileFriendRequest,
  resolveProfileFriendRequest,
  removeProfileFriendRelation,
} from '../actions'
import friendStatus from '../../helpers/friendStatus/friendStatus'

const reducer = handleActions(
  {
    [getProfile.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        profile: action.payload.profile,
        posts: action.payload.posts,
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
    [createProfilePost.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        posts: [action.payload.post, ...state.posts],
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
    [commentProfilePost.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        posts: state.posts.map((el) => (el._id === action.payload.post._id ? action.payload.post : el)),
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
    [getFriendStatus.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        status: action.payload.status,
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
    [sendProfileFriendRequest.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        status: {
          code: friendStatus.sentRequest,
          requestId: action.payload.request.requestId,
        },
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
    [cancelProfileFriendRequest.toString()]: {
      [ActionType.Fulfilled]: (state) => ({
        ...state,
        status: {
          code: friendStatus.notFriend,
        },
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
    [resolveProfileFriendRequest.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        status: {
          code: action.payload.status ? friendStatus.isFriend : friendStatus.notFriend,
        },
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
    [removeProfileFriendRelation.toString()]: {
      [ActionType.Fulfilled]: (state) => ({
        ...state,
        status: {
          code: friendStatus.notFriend,
        },
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
  },
  {
    profile: null,
    posts: [],
    status: {
      code: friendStatus.notFriend,
    },
  },
)

export default reducer
