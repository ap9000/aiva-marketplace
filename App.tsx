import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { Platform, View } from 'react-native';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from './tamagui.config';
import { HybridThemeProvider } from './src/theme/HybridThemeProvider';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  console.log('🚀 App.tsx: Starting app on platform:', Platform.OS);
  
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <Provider store={store}>
        <HybridThemeProvider>
          <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <StatusBar style="auto" />
            <RootNavigator />
          </View>
        </HybridThemeProvider>
      </Provider>
    </TamaguiProvider>
  );
}
