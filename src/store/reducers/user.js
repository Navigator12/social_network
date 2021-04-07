import { ActionType } from 'redux-promise-middleware'
import { handleActions } from 'redux-actions'
import {
  authLogin, authLogout, getCurrent, getFriends,
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
    [getCurrent.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        user: action.payload.user,
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      })
    },
    [getFriends.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        friends: action.payload.friends,
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      })
    },
  },
  {
    user: null,
    token: null,
    friends: []
  },
)

export default reducer
