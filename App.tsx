import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { ThemeProvider } from './src/theme/ThemeContext';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <StatusBar style="auto" />
        <RootNavigator />
      </ThemeProvider>
    </Provider>
  );
}
