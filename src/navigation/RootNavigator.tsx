import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector, useAppDispatch } from '../store';
import { loadStoredAuth } from '../features/auth/store/authSlice';
import { Loading } from '../shared/components';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isGuestMode, isProfileComplete, onboardingStep } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await dispatch(loadStoredAuth()).unwrap();
      } catch (error) {
        console.error('Failed to load stored auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [dispatch]);

  if (isLoading) {
    return <Loading fullScreen text="Loading..." />;
  }

  // Determine which screen to show based on auth state
  const shouldShowMain = (isAuthenticated || isGuestMode) && (isGuestMode || isProfileComplete);
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {shouldShowMain ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}