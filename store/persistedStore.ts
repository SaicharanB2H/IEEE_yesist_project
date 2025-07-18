import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

import analyticsSlice from './slices/analyticsSlice';
import automationSlice from './slices/automationSlice';
import devicesSlice from './slices/devicesSlice';
import notificationsSlice from './slices/notificationsSlice';
import userSlice from './slices/userSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['devices', 'user', 'automation'], // Only persist these slices
  blacklist: ['analytics', 'notifications'], // Don't persist real-time data
};

const rootReducer = combineReducers({
  devices: devicesSlice,
  user: userSlice,
  analytics: analyticsSlice,
  automation: automationSlice,
  notifications: notificationsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
