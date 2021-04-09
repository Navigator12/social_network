import { ActionType } from 'redux-promise-middleware'
import { handleActions } from 'redux-actions'
import {
  authLogin,
  authLogout,
  register,
  getCurrent,
  getAllUsers,
  getFriends,
  getPendingRequests,
  getSentRequests,
  resolveFriendRequest,
  cancelFriendRequest,
} from '../actions'

const stateToLocalStorage = (state) => {
  const { token = '' } = state
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('token', token)
  }

  return state;
}

const reducer = handleActions(
  {
    [authLogin.toString()]: {
      [ActionType.Fulfilled]: (state, action) => stateToLocalStorage({
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
    [authLogout.toString()]: {
      [ActionType.Fulfilled]: () => stateToLocalStorage({}),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
    [register.toString()]: {
      [ActionType.Fulfilled]: (state) => ({ ...state }),
      [ActionType.Rejected]: (state) => ({ ...state }),
    },
    [getCurrent.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        user: action.payload.user,
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
    [getAllUsers.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        users: action.payload.users,
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
    [getFriends.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        friends: action.payload.friends,
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
    [getPendingRequests.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        pendingRequests: action.payload.pendingRequests,
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
    [getSentRequests.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        sentRequests: action.payload.sentRequests,
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
    [resolveFriendRequest.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        pendingRequests: state.pendingRequests.filter((el) => el._id !== action.payload.friend._id),
        friends: action.payload.status ? [action.payload.friend, ...state.friends] : [...state.friends],
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
    [cancelFriendRequest.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        sentRequests: state.sentRequests.filter((el) => el.requestId !== action.payload.requestId),
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
  },
  {
    user: null,
    token: null,
    users: [],
    friends: [],
    pendingRequests: [],
    sentRequests: [],
  },
)

export default reducer
