import React, { useState, useEffect } from 'react';
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
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../../navigation/types';
import { Button, Input, Card } from '../../../shared/components';
import { useTheme } from '../../../theme/ThemeContext';
import { theme } from '../../../theme';
import { useAppDispatch, useAppSelector } from '../../../store';
import { register, setUserType } from '../store/authSlice';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'Register'>;
  route: RouteProp<AuthStackParamList, 'Register'>;
};

export default function RegisterScreen({ navigation, route }: Props) {
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();
  const { isLoading, error, userType } = useAppSelector((state) => state.auth);
  const styles = createStyles(isDark);

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [displayNameError, setDisplayNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    if (route.params?.userType) {
      dispatch(setUserType(route.params.userType));
    }
  }, [route.params?.userType, dispatch]);

  const validateForm = () => {
    let isValid = true;
    
    if (!displayName) {
      setDisplayNameError('Name is required');
      isValid = false;
    } else {
      setDisplayNameError('');
    }

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!phone) {
      setPhoneError('Phone number is required');
      isValid = false;
    } else if (!/^\+?[1-9]\d{1,14}$/.test(phone.replace(/\s/g, ''))) {
      setPhoneError('Invalid phone number');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setPasswordError('Must contain uppercase, lowercase, and number');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    if (!userType) {
      Alert.alert('Error', 'Please select user type');
      return;
    }

    try {
      await dispatch(register({
        email,
        phone,
        password,
        userType,
        displayName,
      })).unwrap();
      navigation.navigate('Onboarding');
    } catch (err) {
      Alert.alert('Registration Failed', error || 'Please try again.');
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
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join as a {userType === 'va' ? 'Virtual Assistant' : 'Client'}
            </Text>
          </View>

          {!userType && (
            <Card style={styles.userTypeCard}>
              <Text style={styles.userTypeTitle}>I want to:</Text>
              <Button
                title="Hire a Virtual Assistant"
                variant="secondary"
                size="lg"
                fullWidth
                onPress={() => dispatch(setUserType('client'))}
                style={styles.userTypeButton}
              />
              <Button
                title="Work as a Virtual Assistant"
                variant="secondary"
                size="lg"
                fullWidth
                onPress={() => dispatch(setUserType('va'))}
              />
            </Card>
          )}

          {userType && (
            <Card style={styles.formCard}>
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={displayName}
                onChangeText={setDisplayName}
                error={displayNameError}
                icon="person"
              />

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
                label="Phone Number"
                placeholder="+1 234 567 8900"
                value={phone}
                onChangeText={setPhone}
                error={phoneError}
                keyboardType="phone-pad"
                icon="phone"
              />

              <Input
                label="Password"
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                error={passwordError}
                secureTextEntry
                icon="lock"
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                error={confirmPasswordError}
                secureTextEntry
                icon="lock"
              />

              <Button
                title="Create Account"
                variant="primary"
                size="lg"
                fullWidth
                loading={isLoading}
                onPress={handleRegister}
                style={styles.registerButton}
              />

              <Text style={styles.terms}>
                By creating an account, you agree to our{' '}
                <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </Card>
          )}

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Sign In</Text>
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
    paddingTop: theme.spacing[6],
    paddingBottom: theme.spacing[4],
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing[4],
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
  userTypeCard: {
    padding: theme.spacing[4],
    marginBottom: theme.spacing[4],
  },
  userTypeTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: isDark ? theme.colors.white : theme.colors.gray[900],
    marginBottom: theme.spacing[3],
  },
  userTypeButton: {
    marginBottom: theme.spacing[2],
  },
  formCard: {
    padding: theme.spacing[4],
    marginBottom: theme.spacing[4],
  },
  registerButton: {
    marginTop: theme.spacing[3],
    marginBottom: theme.spacing[3],
  },
  terms: {
    fontSize: theme.fontSize.sm,
    color: isDark ? theme.colors.gray[300] : theme.colors.gray[700],
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    color: theme.colors.primary.main,
    fontWeight: theme.fontWeight.medium,
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