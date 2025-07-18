import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { TamaguiProvider } from 'tamagui';
import { HybridThemeProvider } from './src/theme/HybridThemeProvider';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import { tamaguiConfig } from './tamagui.config';

export default function App() {
  return (
    <Provider store={store}>
      <TamaguiProvider config={tamaguiConfig}>
        <HybridThemeProvider>
          <StatusBar style="auto" />
          <RootNavigator />
        </HybridThemeProvider>
      </TamaguiProvider>
    </Provider>
  );
}
