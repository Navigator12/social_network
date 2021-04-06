import { useSelector } from 'react-redux'
import {
  authLogin, authLogout,
} from '../store/actions'
import useAsyncDispatch from './useAsyncDispatch'

export default () => {
  const user = useSelector((state) => state.user)
  const dispatch = useAsyncDispatch()

  return {
    ...user,
    authLogin: (nickname, password) => dispatch(authLogin(nickname, password)),
    authLogout: () => dispatch(authLogout()),
  }
}
