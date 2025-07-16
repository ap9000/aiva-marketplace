import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchStackParamList } from '../types';
import SearchScreen from '../../features/search/screens/SearchScreen';
import SearchResultsScreen from '../../features/search/screens/SearchResultsScreen';
import VAProfileScreen from '../../features/marketplace/screens/VAProfileScreen';
import { useTheme } from '../../theme/ThemeContext';

const Stack = createStackNavigator<SearchStackParamList>();

export default function SearchNavigator() {
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
        name="SearchScreen" 
        component={SearchScreen}
        options={{ title: 'Search' }}
      />
      <Stack.Screen 
        name="SearchResults" 
        component={SearchResultsScreen}
        options={{ title: 'Results' }}
      />
      <Stack.Screen 
        name="VAProfile" 
        component={VAProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Stack.Navigator>
  );
}