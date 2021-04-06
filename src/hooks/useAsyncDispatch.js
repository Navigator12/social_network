import { useDispatch } from 'react-redux'

export default function useAsyncDispatch() {
  const dispatch = useDispatch()

  return (action) => Promise.resolve(dispatch(action)).catch(console.warn)
}
