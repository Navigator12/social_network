import { useSelector } from 'react-redux'
import {
  getChats,
  getChatWithMessages,
  receiveMessage,
  findChat,
  createChat,
} from '../store/actions'
import useAsyncDispatch from './useAsyncDispatch'

export default () => {
  const chats = useSelector(((state) => state.chats))
  const dispatch = useAsyncDispatch()

  return {
    ...chats,
    getChats: () => dispatch(getChats()),
    getChatWithMessages: (otherId) => dispatch(getChatWithMessages(otherId)),
    receiveMessage: (message) => dispatch(receiveMessage(message)),
    findChat: (otherId) => dispatch(findChat(otherId)),
    createChat: (otherId) => dispatch(createChat(otherId)),
  }
}
