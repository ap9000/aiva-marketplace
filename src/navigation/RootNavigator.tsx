import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector, useAppDispatch } from '../store';
import { loadStoredAuth } from '../features/auth/store/authSlice';
import { Loading } from '../shared/components';
import { useResponsive } from '../shared/hooks/useResponsive';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isGuestMode, isProfileComplete } = useAppSelector((state) => state.auth);
  const { isWeb, isDesktop, width } = useResponsive();
  const [isLoading, setIsLoading] = React.useState(true);

  console.log('🔍 RootNavigator: Responsive info:', { isWeb, isDesktop, width });
  console.log('🔍 RootNavigator: Auth state:', { isAuthenticated, isGuestMode, isProfileComplete });

  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log('🔄 RootNavigator: Loading stored auth...');
        await dispatch(loadStoredAuth()).unwrap();
        console.log('✅ RootNavigator: Auth loaded successfully');
      } catch (error) {
        console.error('❌ RootNavigator: Failed to load stored auth:', error);
      } finally {
        console.log('🏁 RootNavigator: Auth loading complete');
        setIsLoading(false);
      }
    };

    initAuth();
  }, [dispatch]);

  if (isLoading) {
    console.log('⏳ RootNavigator: Showing loading screen');
    return <Loading fullScreen text="Loading..." />;
  }

  // For web desktop, always show MainNavigator (which includes landing page)
  if (isWeb && isDesktop) {
    console.log('🖥️ RootNavigator: Showing web desktop MainNavigator');
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // For mobile, show auth or main based on auth state
  const shouldShowMain = (isAuthenticated || isGuestMode) && (isGuestMode || isProfileComplete);
  console.log('📱 RootNavigator: Mobile flow, shouldShowMain:', shouldShowMain);
  
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