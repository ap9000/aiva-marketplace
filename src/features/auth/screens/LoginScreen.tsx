import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../navigation/types';
import { Button, Input, Card } from '../../../shared/components';
import { useTheme } from '../../../theme/ThemeContext';
import { theme } from '../../../theme';
import { useAppDispatch, useAppSelector } from '../../../store';
import { login } from '../store/authSlice';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: Props) {
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const styles = createStyles(isDark);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = () => {
    let isValid = true;
    
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      await dispatch(login({ email, password })).unwrap();
      // Navigation will be handled by RootNavigator based on auth state
    } catch (err) {
      Alert.alert('Login Failed', error || 'Please check your credentials and try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>

          <Card style={styles.formCard}>
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              error={emailError}
              keyboardType="email-address"
              autoCapitalize="none"
              icon="email"
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              error={passwordError}
              secureTextEntry
              icon="lock"
            />

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              title="Sign In"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              onPress={handleLogin}
              style={styles.loginButton}
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <Button
              title="Continue with Google"
              variant="secondary"
              size="lg"
              fullWidth
              onPress={() => Alert.alert('Coming Soon', 'Social login will be available soon!')}
              style={styles.socialButton}
            />

            <Button
              title="Continue with LinkedIn"
              variant="secondary"
              size="lg"
              fullWidth
              onPress={() => Alert.alert('Coming Soon', 'Social login will be available soon!')}
            />
          </Card>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? theme.colors.dark.background : theme.colors.gray[100],
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing[3],
    paddingTop: theme.spacing[8],
    paddingBottom: theme.spacing[4],
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing[6],
  },
  title: {
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    color: isDark ? theme.colors.white : theme.colors.gray[900],
    marginBottom: theme.spacing[1],
  },
  subtitle: {
    fontSize: theme.fontSize.lg,
    color: isDark ? theme.colors.gray[300] : theme.colors.gray[700],
  },
  formCard: {
    padding: theme.spacing[4],
    marginBottom: theme.spacing[4],
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing[3],
  },
  forgotPasswordText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary.main,
  },
  loginButton: {
    marginBottom: theme.spacing[4],
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing[4],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: isDark ? theme.colors.dark.border : theme.colors.gray[300],
  },
  dividerText: {
    paddingHorizontal: theme.spacing[2],
    fontSize: theme.fontSize.sm,
    color: isDark ? theme.colors.gray[300] : theme.colors.gray[700],
  },
  socialButton: {
    marginBottom: theme.spacing[2],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: theme.fontSize.base,
    color: isDark ? theme.colors.gray[300] : theme.colors.gray[700],
  },
  footerLink: {
    fontSize: theme.fontSize.base,
    color: theme.colors.primary.main,
    fontWeight: theme.fontWeight.medium,
  },
});