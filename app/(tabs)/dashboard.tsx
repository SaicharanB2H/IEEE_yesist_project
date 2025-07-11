import DashboardScreen from '@/app/screens/DashboardScreen';
import { store } from '@/store';
import React from 'react';
import { Provider } from 'react-redux';

export default function HomeScreen() {
  return (
    <Provider store={store}>
      <DashboardScreen />
    </Provider>
  );
}
