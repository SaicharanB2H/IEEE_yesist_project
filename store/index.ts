import { RootState } from '@/types';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import analyticsSlice from './slices/analyticsSlice';
import automationSlice from './slices/automationSlice';
import devicesSlice from './slices/devicesSlice';
import notificationsSlice from './slices/notificationsSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    devices: devicesSlice,
    user: userSlice,
    analytics: analyticsSlice,
    automation: automationSlice,
    notifications: notificationsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
