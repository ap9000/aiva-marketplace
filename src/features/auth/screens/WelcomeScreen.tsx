import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Pressable,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../navigation/types';
import { useTheme } from '../../../theme/ThemeContext';
import { theme } from '../../../theme';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  interpolate,
  Easing,
  withTiming,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch } from '../../../store';
import { setGuestMode } from '../store/authSlice';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'Welcome'>;
};

const { width, height } = Dimensions.get('window');
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function WelcomeScreen({ navigation }: Props) {
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();
  const styles = createStyles(isDark);
  
  const floatingAnimation = useSharedValue(0);
  const scaleAnimation = useSharedValue(0);
  const gradientRotation = useSharedValue(0);

  useEffect(() => {
    floatingAnimation.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1
    );
    
    scaleAnimation.value = withSpring(1, {
      damping: 12,
      stiffness: 100,
    });
    
    gradientRotation.value = withRepeat(
      withTiming(360, { duration: 20000, easing: Easing.linear }),
      -1
    );
  }, []);

  const floatingStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(floatingAnimation.value, [0, 1], [0, -20]) },
    ],
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnimation.value }],
  }));

  const handleGoogleSignIn = () => {
    navigation.navigate('AuthMethod', { method: 'google' });
  };

  const handleAppleSignIn = () => {
    navigation.navigate('AuthMethod', { method: 'apple' });
  };

  const handleGuestBrowse = () => {
    dispatch(setGuestMode(true));
  };

  const handleEmailSignIn = () => {
    navigation.navigate('Login');
  };

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
        <View style={styles.content}>
          <Animated.View 
            entering={FadeInUp.duration(800).springify()}
            style={styles.logoSection}
          >
            <Animated.View style={[styles.logoContainer, floatingStyle]}>
              <Animated.View style={[styles.logoGradient, logoStyle]}>
                <Text style={styles.logoText}>VA</Text>
              </Animated.View>
              <View style={styles.sparkles}>
                {[...Array(3)].map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.sparkle,
                      {
                        top: Math.random() * 100,
                        left: Math.random() * 100,
                      }
                    ]}
                  />
                ))}
              </View>
            </Animated.View>
            
            <Animated.Text 
              style={styles.title}
              entering={FadeInUp.delay(200).duration(800)}
            >
              Find Your Perfect{'\n'}Virtual Assistant
            </Animated.Text>
            <Animated.Text 
              style={styles.subtitle}
              entering={FadeInUp.delay(400).duration(800)}
            >
              AI-powered matching for your business needs
            </Animated.Text>
          </Animated.View>

          <Animated.View 
            style={styles.authContainer}
            entering={FadeInDown.delay(600).duration(800).springify()}
          >
            <AnimatedPressable
              style={[styles.primaryButton, styles.ssoButton]}
              onPress={handleGoogleSignIn}
            >
              <Ionicons name="logo-google" size={20} color="#FFF" />
              <Text style={styles.primaryButtonText}>Continue with Google</Text>
            </AnimatedPressable>

            {Platform.OS === 'ios' && (
              <AnimatedPressable
                style={[styles.primaryButton, styles.ssoButton, styles.appleButton]}
                onPress={handleAppleSignIn}
              >
                <Ionicons name="logo-apple" size={20} color="#FFF" />
                <Text style={styles.primaryButtonText}>Continue with Apple</Text>
              </AnimatedPressable>
            )}

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.divider} />
            </View>

            <AnimatedPressable
              style={styles.guestButton}
              onPress={handleGuestBrowse}
            >
              <Ionicons name="eye-outline" size={20} color={isDark ? '#FFF' : '#1E3A8A'} />
              <Text style={styles.guestButtonText}>Browse as Guest</Text>
            </AnimatedPressable>

            <AnimatedPressable
              style={styles.textButton}
              onPress={handleEmailSignIn}
            >
              <Text style={styles.textButtonText}>Sign in with email</Text>
            </AnimatedPressable>
          </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const createStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing[3],
    justifyContent: 'space-between',
  },
  logoSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: height * 0.05,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: theme.spacing[6],
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  logoText: {
    fontSize: 42,
    fontWeight: '800',
    color: '#3B82F6',
  },
  sparkles: {
    position: 'absolute',
    width: 140,
    height: 140,
    top: -20,
    left: -20,
  },
  sparkle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: theme.fontSize['3xl'],
    fontWeight: '800',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: theme.spacing[2],
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: theme.fontSize.lg,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    paddingHorizontal: theme.spacing[4],
  },
  authContainer: {
    paddingBottom: theme.spacing[5],
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    paddingVertical: theme.spacing[2],
    paddingHorizontal: theme.spacing[3],
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing[2],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  ssoButton: {
    backgroundColor: isDark ? '#1F2937' : '#FFF',
  },
  appleButton: {
    backgroundColor: '#000',
  },
  primaryButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: '600',
    color: isDark ? '#FFF' : '#1E293B',
    marginLeft: theme.spacing[1],
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing[3],
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dividerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: theme.spacing[2],
    fontSize: theme.fontSize.sm,
  },
  guestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: theme.spacing[2],
    paddingHorizontal: theme.spacing[3],
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing[2],
    backdropFilter: 'blur(10px)',
  },
  guestButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: '600',
    color: '#FFF',
    marginLeft: theme.spacing[1],
  },
  textButton: {
    alignItems: 'center',
    paddingVertical: theme.spacing[2],
  },
  textButtonText: {
    fontSize: theme.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    textDecorationLine: 'underline',
  },
});