import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import user from './user'
import posts from './posts'
import profile from './profile'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
}

const reducers = combineReducers({
  user,
  posts,
  profile,
})

export default persistReducer(persistConfig, reducers)
