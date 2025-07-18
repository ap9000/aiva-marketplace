import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { HybridThemeProvider } from './src/theme/HybridThemeProvider';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <HybridThemeProvider>
        <StatusBar style="auto" />
        <RootNavigator />
      </HybridThemeProvider>
    </Provider>
  );
}
