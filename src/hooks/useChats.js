import { useSelector } from 'react-redux'
import { getChats, getChatWithMessages, receiveMessage } from '../store/actions'
import useAsyncDispatch from './useAsyncDispatch'

export default () => {
  const chats = useSelector(((state) => state.chats))
  const dispatch = useAsyncDispatch()

  return {
    ...chats,
    getChats: () => dispatch(getChats()),
    getChatWithMessages: (otherId) => dispatch(getChatWithMessages(otherId)),
    receiveMessage: (message) => dispatch(receiveMessage(message)),
  }
}
