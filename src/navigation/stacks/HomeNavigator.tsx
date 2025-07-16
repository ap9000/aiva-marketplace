import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList } from '../types';
import BrowseScreen from '../../features/marketplace/screens/BrowseScreen';
import VAProfileScreen from '../../features/marketplace/screens/VAProfileScreen';
import CategoryScreen from '../../features/marketplace/screens/CategoryScreen';
import { useTheme } from '../../theme/ThemeContext';

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? theme.colors.dark.surface : theme.colors.white,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: isDark ? theme.colors.dark.border : theme.colors.gray[300],
        },
        headerTintColor: isDark ? theme.colors.white : theme.colors.gray[900],
        headerTitleStyle: {
          fontFamily: theme.fontFamily.primary,
          fontSize: theme.fontSize.lg,
          fontWeight: theme.fontWeight.semibold,
        },
      }}
    >
      <Stack.Screen 
        name="Browse" 
        component={BrowseScreen}
        options={{ title: 'Browse' }}
      />
      <Stack.Screen 
        name="VAProfile" 
        component={VAProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen 
        name="Category" 
        component={CategoryScreen}
        options={({ route }) => ({ title: route.params.categoryName })}
      />
    </Stack.Navigator>
  );
}