import { ActionType } from 'redux-promise-middleware'
import { handleActions } from 'redux-actions'
import {
  getChats,
  getChatWithMessages,
  receiveMessage,
  findChat,
  createChat,
} from '../actions'

const reducer = handleActions(
  {
    [getChats.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        chats: action.payload.chats,
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
    [getChatWithMessages.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        chat: action.payload.chat,
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
    [receiveMessage.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        chat: {
          ...state.chat,
          messages: [action.payload.message, ...state.chat.messages],
        },
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
    [findChat.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        profileChat: action.payload.chat,
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
    [createChat.toString()]: {
      [ActionType.Fulfilled]: (state, action) => ({
        ...state,
        profileChat: action.payload.chat,
      }),
      [ActionType.Rejected]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    },
  },
  {
    chats: [],
    chat: null,
    profileChat: null,
  },
)

export default reducer
