import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from './types';
import WelcomeScreen from '../features/auth/screens/WelcomeScreen';
import LoginScreen from '../features/auth/screens/LoginScreen';
import RegisterScreen from '../features/auth/screens/RegisterScreen';
import OnboardingScreen from '../features/auth/screens/OnboardingScreen';
import AuthMethodScreen from '../features/auth/screens/AuthMethodScreen';
import UserTypeSelectionScreen from '../features/auth/screens/UserTypeSelectionScreen';
import ClientOnboardingScreen from '../features/auth/screens/ClientOnboardingScreen';
import VAApplicationScreen from '../features/auth/screens/VAApplicationScreen';

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="AuthMethod" component={AuthMethodScreen} />
      <Stack.Screen name="UserTypeSelection" component={UserTypeSelectionScreen} />
      <Stack.Screen name="ClientOnboarding" component={ClientOnboardingScreen} />
      <Stack.Screen name="VAApplication" component={VAApplicationScreen} />
    </Stack.Navigator>
  );
}