import { configureStore } from '@reduxjs/toolkit'
import chatReducer from '../redux/chatSlice'
import todosReducer from '../redux/tdlSlice'
export const store = configureStore({
  reducer: {
    chats: chatReducer,
    todos:todosReducer
  },
  devTools:true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch