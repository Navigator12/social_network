import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import user from './user'
import posts from './posts'
import profile from './profile'
import chats from './chats'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
}

const reducers = combineReducers({
  user,
  posts,
  profile,
  chats,
})

export default persistReducer(persistConfig, reducers)
