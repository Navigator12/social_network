import { ActionType } from 'redux-promise-middleware'
import { handleActions } from 'redux-actions'
import {
  authLogin, authLogout,
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
        ...action.payload,
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
  },
  {
    user: null,
    token: null,
  },
)

export default reducer
