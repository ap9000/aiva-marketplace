import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileStackParamList } from '../types';
import ProfileScreen from '../../features/profile/screens/ProfileScreen';
import EditProfileScreen from '../../features/profile/screens/EditProfileScreen';
import SettingsScreen from '../../features/profile/screens/SettingsScreen';
import HelpScreen from '../../features/profile/screens/HelpScreen';
import { useTheme } from '../../theme/ThemeContext';

const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator() {
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
        name="ProfileScreen" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{ title: 'Edit Profile' }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
      <Stack.Screen 
        name="Help" 
        component={HelpScreen}
        options={{ title: 'Help & Support' }}
      />
    </Stack.Navigator>
  );
}