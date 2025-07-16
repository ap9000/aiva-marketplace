import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MessagingStackParamList } from '../types';
import ConversationsScreen from '../../features/messaging/screens/ConversationsScreen';
import ChatScreen from '../../features/messaging/screens/ChatScreen';
import { useTheme } from '../../theme/ThemeContext';

const Stack = createStackNavigator<MessagingStackParamList>();

export default function MessagingNavigator() {
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
        name="Conversations" 
        component={ConversationsScreen}
        options={{ title: 'Messages' }}
      />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen}
        options={({ route }) => ({ title: route.params.recipientName })}
      />
    </Stack.Navigator>
  );
}