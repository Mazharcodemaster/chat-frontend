import { combineReducers, configureStore } from '@reduxjs/toolkit'
import  userReducer from './slice/userSlice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { setAppStore } from '@/lib/api/config';

const rootReducer = combineReducers({
  userData: userReducer, // this matches your selector (state.userData)
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userData'], // only these slices will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store);

// provide the store instance to axios config lazily to avoid circular import
setAppStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
// Inferred type: {userData: UserState}

// export type RootState = ReturnType<typeof store.getState>



// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// Inferred type: {userData: UserState}

// export type AppDispatch = typeof store.dispatch