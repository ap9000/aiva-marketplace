import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../theme/ThemeContext';
import { theme } from '../../../theme';
import { Button, Input } from '../../../shared/components';
import { useAppDispatch } from '../../../store';
import { login, register } from '../store/authSlice';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface AuthModalProps {
  visible: boolean;
  mode: 'signin' | 'signup';
  onClose: () => void;
  onSwitchMode: (mode: 'signin' | 'signup') => void;
}

export default function AuthModal({ visible, mode, onClose, onSwitchMode }: AuthModalProps) {
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();
  const styles = createStyles(isDark);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (mode === 'signup') {
      if (!name) {
        Alert.alert('Error', 'Please enter your name');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
    }

    setLoading(true);
    try {
      if (mode === 'signin') {
        await dispatch(login({ email, password })).unwrap();
      } else {
        await dispatch(register({ email, password, name })).unwrap();
      }
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = (provider: 'google' | 'apple') => {
    // TODO: Implement social auth
    Alert.alert('Coming Soon', `${provider} authentication will be available soon!`);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
            <Animated.View 
              style={styles.modal}
              entering={FadeIn.duration(300)}
              exiting={FadeOut.duration(300)}
            >
              <View style={styles.header}>
                <Text style={styles.title}>
                  {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
                </Text>
                <Pressable style={styles.closeButton} onPress={onClose}>
                  <Ionicons name="close" size={24} color={theme.colors.gray[600]} />
                </Pressable>
              </View>

              <ScrollView 
                style={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {/* Social Auth Buttons */}
                <View style={styles.socialButtons}>
                  <Button
                    title="Continue with Google"
                    variant="secondary"
                    size="lg"
                    fullWidth
                    onPress={() => handleSocialAuth('google')}
                    style={styles.socialButton}
                  />
                  {Platform.OS === 'ios' && (
                    <Button
                      title="Continue with Apple"
                      variant="secondary"
                      size="lg"
                      fullWidth
                      onPress={() => handleSocialAuth('apple')}
                      style={[styles.socialButton, styles.appleButton]}
                    />
                  )}
                </View>

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>OR</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Form Fields */}
                {mode === 'signup' && (
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={name}
                    onChangeText={setName}
                    icon="person"
                    size="lg"
                  />
                )}

                <Input
                  label="Email"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  icon="email"
                  size="lg"
                />

                <Input
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  icon="lock"
                  size="lg"
                />

                {mode === 'signup' && (
                  <Input
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    icon="lock"
                    size="lg"
                  />
                )}

                {mode === 'signin' && (
                  <Pressable style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </Pressable>
                )}

                <Button
                  title={mode === 'signin' ? 'Sign In' : 'Create Account'}
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={loading}
                  onPress={handleSubmit}
                  style={styles.submitButton}
                />

                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                  </Text>
                  <Pressable onPress={() => onSwitchMode(mode === 'signin' ? 'signup' : 'signin')}>
                    <Text style={styles.footerLink}>
                      {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                    </Text>
                  </Pressable>
                </View>
              </ScrollView>
            </Animated.View>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}

const createStyles = (isDark: boolean) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardView: {
    width: '100%',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 440,
  },
  modal: {
    backgroundColor: isDark ? theme.colors.dark.surface : theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows['2xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing[6],
    paddingBottom: 0,
  },
  title: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: '700',
    color: isDark ? theme.colors.white : theme.colors.gray[900],
  },
  closeButton: {
    padding: theme.spacing[1],
  },
  content: {
    padding: theme.spacing[6],
    maxHeight: '80vh',
  },
  socialButtons: {
    gap: theme.spacing[3],
    marginBottom: theme.spacing[4],
  },
  socialButton: {
    marginBottom: theme.spacing[2],
  },
  appleButton: {
    backgroundColor: '#000',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing[4],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: isDark ? theme.colors.dark.border : theme.colors.gray[300],
  },
  dividerText: {
    paddingHorizontal: theme.spacing[2],
    fontSize: theme.fontSize.sm,
    color: isDark ? theme.colors.gray[400] : theme.colors.gray[600],
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing[4],
    marginTop: -theme.spacing[2],
  },
  forgotPasswordText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary.main,
    fontWeight: '500',
  },
  submitButton: {
    marginTop: theme.spacing[2],
    marginBottom: theme.spacing[4],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: theme.fontSize.base,
    color: isDark ? theme.colors.gray[400] : theme.colors.gray[600],
  },
  footerLink: {
    fontSize: theme.fontSize.base,
    color: theme.colors.primary.main,
    fontWeight: '600',
  },
});