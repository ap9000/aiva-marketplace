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
  Pressable,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../navigation/types';
import { 
  Button, 
  Input, 
  Card, 
  ResponsiveContainer,
  ResponsiveRow,
  ResponsiveColumn,
} from '../../../shared/components';
import { useTheme } from '../../../theme/ThemeContext';
import { theme } from '../../../theme';
import { useAppDispatch, useAppSelector } from '../../../store';
import { login } from '../store/authSlice';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: Props) {
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const { isDesktop, isTablet, isWeb } = useResponsive();
  const styles = createStyles(isDark, isDesktop, isTablet, isWeb);

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

  const renderForm = () => (
    <Animated.View 
      style={styles.formContainer}
      entering={!isWeb ? FadeInUp.delay(200).duration(800) : undefined}
    >
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
          size={isDesktop ? 'lg' : 'md'}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          error={passwordError}
          secureTextEntry
          icon="lock"
          size={isDesktop ? 'lg' : 'md'}
        />

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <Button
          title="Sign In"
          variant="primary"
          size={isDesktop ? 'lg' : 'md'}
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
          size={isDesktop ? 'lg' : 'md'}
          fullWidth
          onPress={() => Alert.alert('Coming Soon', 'Social login will be available soon!')}
          style={styles.socialButton}
        />

        <Button
          title="Continue with LinkedIn"
          variant="secondary"
          size={isDesktop ? 'lg' : 'md'}
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
    </Animated.View>
  );

  const renderHeader = () => (
    <Animated.View 
      style={styles.header}
      entering={!isWeb ? FadeInDown.duration(800) : undefined}
    >
      <Pressable 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons 
          name="arrow-back" 
          size={24} 
          color={isDesktop && !isDark ? theme.colors.gray[900] : theme.colors.white} 
        />
      </Pressable>
      <View style={styles.headerContent}>
        <View style={styles.logoSmall}>
          <Text style={styles.logoSmallText}>VA</Text>
        </View>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue to AIVA Marketplace</Text>
      </View>
    </Animated.View>
  );

  // Desktop layout
  if (isDesktop) {
    return (
      <View style={styles.container}>
        <View style={styles.splitContainer}>
          {/* Left side - Branding */}
          <LinearGradient
            colors={isDark 
              ? ['#1E3A8A', '#312E81', '#0F172A'] 
              : ['#3B82F6', '#8B5CF6', '#DBEAFE']
            }
            style={styles.brandingSide}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.brandingContent}>
              <View style={styles.brandingLogo}>
                <Text style={styles.brandingLogoText}>VA</Text>
              </View>
              <Text style={styles.brandingTitle}>AIVA Marketplace</Text>
              <Text style={styles.brandingSubtitle}>
                Connect with top-rated virtual assistants
              </Text>
              
              <View style={styles.brandingFeatures}>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={24} color="#FFF" />
                  <Text style={styles.featureText}>Secure authentication</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="people" size={24} color="#FFF" />
                  <Text style={styles.featureText}>Trusted by thousands</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="lock-closed" size={24} color="#FFF" />
                  <Text style={styles.featureText}>Your data is protected</Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Right side - Form */}
          <View style={styles.formSide}>
            <SafeAreaView style={styles.formSafeArea}>
              <ScrollView 
                contentContainerStyle={styles.formScrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.formWrapper}>
                  <Pressable 
                    style={styles.desktopBackButton}
                    onPress={() => navigation.goBack()}
                  >
                    <Ionicons name="arrow-back" size={20} color={theme.colors.gray[600]} />
                    <Text style={styles.desktopBackText}>Back</Text>
                  </Pressable>
                  
                  <Text style={styles.formTitle}>Sign In</Text>
                  <Text style={styles.formSubtitle}>Welcome back! Please enter your details.</Text>
                  
                  {renderForm()}
                </View>
              </ScrollView>
            </SafeAreaView>
          </View>
        </View>
      </View>
    );
  }

  // Mobile/Tablet layout
  return (
    <LinearGradient
      colors={isDark 
        ? ['#1E3A8A', '#312E81', '#0F172A'] 
        : ['#3B82F6', '#8B5CF6', '#DBEAFE']
      }
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ResponsiveContainer maxWidth={isTablet ? 'sm' : 'full'} scroll={true}>
            {renderHeader()}
            {renderForm()}
          </ResponsiveContainer>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const createStyles = (isDark: boolean, isDesktop: boolean, isTablet: boolean, isWeb: boolean) => StyleSheet.create({
  container: {
    flex: 1,
  },
  
  // Desktop styles
  splitContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  brandingSide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing[6],
  },
  brandingContent: {
    alignItems: 'center',
    maxWidth: 400,
  },
  brandingLogo: {
    width: 100,
    height: 100,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[4],
    ...theme.shadows.xl,
  },
  brandingLogoText: {
    fontSize: 42,
    fontWeight: '800',
    color: '#3B82F6',
  },
  brandingTitle: {
    fontSize: theme.fontSize['3xl'],
    fontWeight: '800',
    color: '#FFF',
    marginBottom: theme.spacing[2],
  },
  brandingSubtitle: {
    fontSize: theme.fontSize.lg,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: theme.spacing[8],
  },
  brandingFeatures: {
    gap: theme.spacing[3],
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  featureText: {
    fontSize: theme.fontSize.base,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  formSide: {
    flex: 1,
    backgroundColor: isDark ? theme.colors.dark.background : theme.colors.white,
  },
  formSafeArea: {
    flex: 1,
  },
  formScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing[6],
  },
  formWrapper: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  desktopBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
    marginBottom: theme.spacing[6],
  },
  desktopBackText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
  },
  formTitle: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: '700',
    color: isDark ? theme.colors.white : theme.colors.gray[900],
    marginBottom: theme.spacing[2],
  },
  formSubtitle: {
    fontSize: theme.fontSize.base,
    color: isDark ? theme.colors.gray[300] : theme.colors.gray[600],
    marginBottom: theme.spacing[6],
  },
  
  // Mobile/Tablet styles
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingTop: theme.spacing[2],
    paddingBottom: theme.spacing[6],
  },
  backButton: {
    padding: theme.spacing[2],
    marginBottom: theme.spacing[4],
  },
  headerContent: {
    alignItems: 'center',
  },
  logoSmall: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[3],
    ...theme.shadows.md,
  },
  logoSmallText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#3B82F6',
  },
  title: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    color: isDesktop && !isDark ? theme.colors.gray[900] : '#FFF',
    marginBottom: theme.spacing[1],
  },
  subtitle: {
    fontSize: theme.fontSize.base,
    color: isDesktop && !isDark ? theme.colors.gray[600] : 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
  },
  
  // Form styles
  formContainer: {
    paddingBottom: theme.spacing[4],
  },
  formCard: {
    padding: theme.spacing[4],
    marginBottom: theme.spacing[4],
    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1,
    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing[3],
  },
  forgotPasswordText: {
    fontSize: theme.fontSize.sm,
    color: isDesktop && !isDark ? theme.colors.primary.main : '#FFF',
    fontWeight: '500',
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
    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.2)' : theme.colors.gray[300],
  },
  dividerText: {
    paddingHorizontal: theme.spacing[2],
    fontSize: theme.fontSize.sm,
    color: isDark ? 'rgba(255, 255, 255, 0.7)' : theme.colors.gray[600],
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
    color: isDesktop && !isDark ? theme.colors.gray[600] : 'rgba(255, 255, 255, 0.85)',
  },
  footerLink: {
    fontSize: theme.fontSize.base,
    color: isDesktop && !isDark ? theme.colors.primary.main : '#FFF',
    fontWeight: theme.fontWeight.medium,
    textDecorationLine: 'underline',
  },
});