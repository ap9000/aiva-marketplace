import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProjectStackParamList } from '../types';

// Import screens
import ProjectDashboard from '../../features/projects/screens/ProjectDashboard';
import ProjectPostingScreen from '../../features/projects/screens/ProjectPostingScreen';
import TeamManagementScreen from '../../features/team/screens/TeamManagementScreen';

const Stack = createStackNavigator<ProjectStackParamList>();

export default function ProjectNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F8FAFC' }
      }}
    >
      <Stack.Screen 
        name="ProjectDashboard" 
        component={ProjectDashboard}
      />
      <Stack.Screen 
        name="ProjectPosting" 
        component={ProjectPostingScreen}
      />
      <Stack.Screen 
        name="TeamManagement" 
        component={TeamManagementScreen}
      />
    </Stack.Navigator>
  );
}