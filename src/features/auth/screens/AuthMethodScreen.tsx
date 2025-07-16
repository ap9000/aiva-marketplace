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
import { login } from '../store/authSlice';

WebBrowser.maybeCompleteAuthSession();

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
    if (method === 'google' && request) {
      promptAsync();
    } else if (method === 'apple') {
      handleAppleLogin();
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
      await dispatch(login({
        email: userInfo.email,
        password: 'google-oauth-' + userInfo.id, // This is a placeholder
      })).unwrap();
      
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={theme.colors.primary.main} />
        <Text style={styles.text}>
          {method === 'google' ? 'Connecting to Google...' : 'Connecting to Apple...'}
        </Text>
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
});