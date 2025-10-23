/**
 * Redux Store Configuration
 * 
 * Configures the Redux store with:
 * - Redux Toolkit
 * - Redux Persist (for offline capability and persistence)
 * - AsyncStorage as storage engine
 * 
 * @module redux/store
 */

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

import articlesReducer from '../slices/articlesSlice';
import preferencesReducer from '../slices/preferencesSlice';

/**
 * Persist configuration for Redux Persist
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['articles', 'preferences'], // Only persist these reducers
  version: 1,
};

/**
 * Root reducer combining all slices
 */
const rootReducer = combineReducers({
  articles: articlesReducer,
  preferences: preferencesReducer,
});

/**
 * Persisted reducer
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Configure and create the Redux store
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from redux-persist
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

/**
 * Persistor for Redux Persist
 */
export const persistor = persistStore(store);

export default store;

