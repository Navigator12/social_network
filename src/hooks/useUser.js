import { useSelector } from 'react-redux'
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
} from '../store/actions'
import useAsyncDispatch from './useAsyncDispatch'

export default () => {
  const user = useSelector((state) => state.user)
  const dispatch = useAsyncDispatch()

  return {
    ...user,
    authLogin: (nickname, password) => dispatch(authLogin(nickname, password)),
    authLogout: () => dispatch(authLogout()),
    register: (nickname, password) => dispatch(register(nickname, password)),
    getCurrent: () => dispatch(getCurrent()),
    getAllUsers: (limit, offset) => dispatch(getAllUsers(limit, offset)),
    getFriends: (id) => dispatch(getFriends(id)),
    getPendingRequests: (id, limit, offset) => dispatch(getPendingRequests(id, limit, offset)),
    getSentRequests: (id, limit, offset) => dispatch(getSentRequests(id, limit, offset)),
    resolveFriendRequest: (id, accept) => dispatch(resolveFriendRequest(id, accept)),
    cancelFriendRequest: (id) => dispatch(cancelFriendRequest(id)),
  }
}
