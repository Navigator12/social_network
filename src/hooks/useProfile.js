import { useSelector } from 'react-redux'
import {
  getProfile,
  createProfilePost,
  deleteProfilePost,
  commentProfilePost,
  getFriendStatus,
  sendProfileFriendRequest,
  cancelProfileFriendRequest,
  resolveProfileFriendRequest,
  removeProfileFriendRelation,
} from '../store/actions'
import useAsyncDispatch from './useAsyncDispatch'

export default () => {
  const profile = useSelector(((state) => state.profile))
  const dispatch = useAsyncDispatch()

  return {
    ...profile,
    getProfile: (id) => dispatch(getProfile(id)),
    createProfilePost: (text) => dispatch(createProfilePost(text)),
    deleteProfilePost: (id) => dispatch(deleteProfilePost(id)),
    commentProfilePost: (id, text) => dispatch(commentProfilePost(id, text)),
    getFriendStatus: (from, to) => dispatch(getFriendStatus(from, to)),
    sendProfileFriendRequest: (to) => dispatch(sendProfileFriendRequest(to)),
    cancelProfileFriendRequest: (id) => dispatch(cancelProfileFriendRequest(id)),
    resolveProfileFriendRequest: (id, accept) => dispatch(resolveProfileFriendRequest(id, accept)),
    removeProfileFriendRelation: (id) => dispatch(removeProfileFriendRelation(id)),
  }
}
