import { useSelector } from 'react-redux'
import {
  getNews, createPost, commentPost,
} from '../store/actions'
import useAsyncDispatch from './useAsyncDispatch'

export default () => {
  const posts = useSelector(((state) => state.posts))
  const dispatch = useAsyncDispatch()

  return {
    ...posts,
    getNews: (limit, offset) => dispatch(getNews(limit, offset)),
    createPost: (text) => dispatch(createPost(text)),
    commentPost: (id, text) => dispatch(commentPost(id, text)),
  }
}
