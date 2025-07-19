import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TopNavBar } from './components/TopNavBar';
import { useTheme } from '../theme/ThemeContext';
import { theme } from '../theme';

// Import screens
import LandingScreen from '../features/landing/screens/LandingScreen';
// Temporarily disabled Tamagui-dependent screens
// import BrowseScreen from '../features/marketplace/screens/BrowseScreen';
// import VAProfileScreen from '../features/marketplace/screens/VAProfileScreen';
// import SearchScreen from '../features/search/screens/SearchScreen';
// import ConversationsScreen from '../features/messaging/screens/ConversationsScreen';
// import ChatScreen from '../features/messaging/screens/ChatScreen';
// import ProfileScreen from '../features/profile/screens/ProfileScreen';
// import SettingsScreen from '../features/profile/screens/SettingsScreen';
// import ClientDashboard from '../features/dashboard/screens/ClientDashboard';
// import ProjectManagement from '../features/projects/screens/ProjectManagement';
// import HowItWorksScreen from '../features/static/screens/HowItWorksScreen';
// import PricingScreen from '../features/static/screens/PricingScreen';
// import TeamManagementScreen from '../features/team/screens/TeamManagementScreen';
// import BillingScreen from '../features/billing/screens/BillingScreen';
// import AuthModal from '../features/auth/components/AuthModal';

// Temporary placeholder component
const PlaceholderScreen = () => {
  const { isDark } = useTheme();
  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: isDark ? theme.colors.dark.background : theme.colors.white,
    }}>
      <Text style={{ 
        fontSize: 24, 
        color: isDark ? theme.colors.white : theme.colors.gray[900] 
      }}>
        Coming Soon
      </Text>
    </View>
  );
};

// Define navigation params
export type WebStackParamList = {
  Landing: undefined;
  Browse: undefined;
  HowItWorks: undefined;
  Pricing: undefined;
  VAProfile: { vaId: string };
  Search: undefined;
  Messages: undefined;
  Chat: { conversationId: string };
  Profile: undefined;
  Settings: undefined;
  Dashboard: undefined;
  ProjectManagement: undefined;
  TeamManagement: undefined;
  Billing: undefined;
};

const Stack = createStackNavigator<WebStackParamList>();

export default function WebNavigator() {
  const { isDark } = useTheme();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const styles = createStyles(isDark);

  console.log('🌐 WebNavigator: Rendering with isDark:', isDark);

  const handleAuthPress = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const CustomHeader = () => (
    <TopNavBar onAuthPress={handleAuthPress} />
  );

  return (
    <View style={styles.container}>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          header: () => <CustomHeader />,
          cardStyle: { backgroundColor: isDark ? theme.colors.dark.background : theme.colors.gray[50] },
          animationEnabled: true,
          gestureEnabled: false,
        }}
      >
        {/* Public Routes */}
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Browse" component={PlaceholderScreen} />
        <Stack.Screen name="HowItWorks" component={PlaceholderScreen} />
        <Stack.Screen name="Pricing" component={PlaceholderScreen} />
        <Stack.Screen name="VAProfile" component={PlaceholderScreen} />
        <Stack.Screen name="Search" component={PlaceholderScreen} />
        
        {/* Protected Routes */}
        <Stack.Screen name="Messages" component={PlaceholderScreen} />
        <Stack.Screen name="Chat" component={PlaceholderScreen} />
        <Stack.Screen name="Profile" component={PlaceholderScreen} />
        <Stack.Screen name="Settings" component={PlaceholderScreen} />
        <Stack.Screen name="Dashboard" component={PlaceholderScreen} />
        <Stack.Screen name="ProjectManagement" component={PlaceholderScreen} />
        <Stack.Screen name="TeamManagement" component={PlaceholderScreen} />
        <Stack.Screen name="Billing" component={PlaceholderScreen} />
      </Stack.Navigator>

      {/* AuthModal temporarily disabled
      {showAuthModal && (
        <AuthModal
          visible={showAuthModal}
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSwitchMode={(mode) => setAuthMode(mode)}
        />
      )}
      */}
    </View>
  );
}

const createStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? '#0A0E1A' : '#FFFFFF',
    minHeight: '100vh',
  },
});