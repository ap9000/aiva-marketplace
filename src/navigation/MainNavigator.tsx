import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { MainTabParamList } from './types';
import HomeNavigator from './stacks/HomeNavigator';
import SearchNavigator from './stacks/SearchNavigator';
import MessagingNavigator from './stacks/MessagingNavigator';
import ProfileNavigator from './stacks/ProfileNavigator';
import AddScreen from '../features/marketplace/screens/AddScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Search':
              iconName = 'search';
              break;
            case 'Add':
              iconName = 'add-circle';
              break;
            case 'Messages':
              iconName = 'message';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'help';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary.main,
        tabBarInactiveTintColor: theme.colors.gray[500],
        tabBarStyle: {
          backgroundColor: isDark ? theme.colors.dark.surface : theme.colors.white,
          borderTopColor: isDark ? theme.colors.dark.border : theme.colors.gray[300],
          borderTopWidth: 1,
          height: theme.layout.tabBarHeight,
          paddingBottom: 4,
        },
        tabBarLabelStyle: {
          fontSize: theme.fontSize.xs,
          fontFamily: theme.fontFamily.primary,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Search" component={SearchNavigator} />
      <Tab.Screen 
        name="Add" 
        component={AddScreen}
        options={{
          tabBarLabel: 'Post',
        }}
      />
      <Tab.Screen name="Messages" component={MessagingNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
}