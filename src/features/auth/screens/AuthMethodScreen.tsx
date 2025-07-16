import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../../navigation/types';
import { useTheme } from '../../../theme/ThemeContext';
import { theme } from '../../../theme';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useAppDispatch } from '../../../store';
import { login, updateUserProfile } from '../store/authSlice';

WebBrowser.maybeCompleteAuthSession();

// Development mode flag - set to true for testing without real OAuth
const DEV_MODE = true;

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'AuthMethod'>;
  route: RouteProp<AuthStackParamList, 'AuthMethod'>;
};

// Google OAuth Config
const GOOGLE_CLIENT_ID = 'your-google-client-id.apps.googleusercontent.com';
const GOOGLE_REDIRECT_URI = AuthSession.makeRedirectUri();

export default function AuthMethodScreen({ navigation, route }: Props) {
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();
  const styles = createStyles(isDark);
  const { method } = route.params;

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: GOOGLE_CLIENT_ID,
      scopes: ['openid', 'profile', 'email'],
      redirectUri: GOOGLE_REDIRECT_URI,
      responseType: AuthSession.ResponseType.Token,
    },
    { authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth' }
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      handleGoogleLogin(access_token);
    } else if (response?.type === 'error') {
      Alert.alert('Authentication Error', 'Failed to authenticate with Google');
      navigation.goBack();
    }
  }, [response]);

  useEffect(() => {
    if (DEV_MODE) {
      // In dev mode, simulate OAuth login
      setTimeout(() => {
        handleMockLogin(method);
      }, 1500); // Simulate network delay
    } else {
      // Production OAuth flow
      if (method === 'google' && request) {
        promptAsync();
      } else if (method === 'apple') {
        handleAppleLogin();
      }
    }
  }, [request, method]);

  const handleGoogleLogin = async (accessToken: string) => {
    try {
      const userInfoResponse = await fetch(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const userInfo = await userInfoResponse.json();
      
      // In a real app, you'd send this to your backend to create/login user
      // For now, we'll simulate a successful SSO login
      // The backend should return whether this is a new user or existing user
      
      // Simulating that this is a new user who needs to select their type
      navigation.navigate('UserTypeSelection');
      
    } catch (error) {
      Alert.alert('Login Failed', 'Unable to complete Google sign in');
      navigation.goBack();
    }
  };

  const handleAppleLogin = async () => {
    // Apple Sign In implementation would go here
    // For now, show a placeholder message
    Alert.alert(
      'Apple Sign In',
      'Apple Sign In will be available soon!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const handleMockLogin = async (authMethod: 'google' | 'apple') => {
    try {
      // Generate mock user data based on auth method
      const mockUserData = authMethod === 'google' ? {
        id: 'mock-google-user-123',
        email: 'john.doe@gmail.com',
        displayName: 'John Doe',
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
      } : {
        id: 'mock-apple-user-456',
        email: 'jane.smith@icloud.com',
        displayName: 'Jane Smith',
        avatarUrl: 'https://i.pravatar.cc/150?img=2',
      };

      // Simulate successful authentication
      // In a real app, this would come from your backend
      await dispatch(login({
        email: mockUserData.email,
        password: 'mock-password', // This won't be used in mock mode
      })).unwrap();
      
      // Update user profile with mock data
      await dispatch(updateUserProfile({
        ...mockUserData,
        onboardingStep: 'user-type',
      }));

      // Navigate to user type selection
      navigation.navigate('UserTypeSelection');
      
    } catch (error) {
      Alert.alert('Mock Login Failed', 'Something went wrong with the mock login');
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={theme.colors.primary.main} />
        <Text style={styles.text}>
          {method === 'google' ? 'Connecting to Google...' : 'Connecting to Apple...'}
        </Text>
        {DEV_MODE && (
          <Text style={styles.devModeText}>
            Development Mode - Using Mock Authentication
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const createStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? theme.colors.dark.background : theme.colors.gray[100],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing[4],
  },
  text: {
    marginTop: theme.spacing[3],
    fontSize: theme.fontSize.lg,
    color: isDark ? theme.colors.white : theme.colors.gray[900],
  },
  devModeText: {
    marginTop: theme.spacing[2],
    fontSize: theme.fontSize.sm,
    color: theme.colors.warning,
    fontStyle: 'italic',
  },
});