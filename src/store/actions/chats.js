import { createAction } from 'redux-actions'
import agent from '../../agent'

const { Chat } = agent

export const getChats = createAction('CHATS/ALL', async () => {
  const { chats } = await Chat.getChats()

  return {
    chats,
  }
})

export const getChatWithMessages = createAction('CHATS/CHAT', async (otherId) => {
  const { chat } = await Chat.getChatWithMessages(otherId)

  return {
    chat,
  }
})

export const receiveMessage = createAction('CHATS/RECEIVE', async (message) => ({ message }))

export const findChat = createAction('CHATS/FIND', async (otherId) => {
  const { chat } = await Chat.findChat(otherId)

  return {
    chat,
  }
})

export const createChat = createAction('CHAT/CREATE', async (otherId) => {
  const { chat } = await Chat.createChat(otherId)

  return {
    chat,
  }
})
