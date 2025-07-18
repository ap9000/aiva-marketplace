import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Pressable,
  Platform,
  ScrollView,
  Image,
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
import { 
  ResponsiveContainer, 
  ResponsiveRow, 
  ResponsiveColumn,
  Button,
} from '../../../shared/components';
import { useResponsive } from '../../../shared/hooks/useResponsive';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'Welcome'>;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function WelcomeScreen({ navigation }: Props) {
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();
  const { isDesktop, isTablet, isMobile, isWeb } = useResponsive();
  const styles = createStyles(isDark, isDesktop, isTablet, isWeb);
  
  const floatingAnimation = useSharedValue(0);
  const scaleAnimation = useSharedValue(0);

  useEffect(() => {
    // Reduce animations on web for better performance
    if (!isWeb || isMobile) {
      floatingAnimation.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
        ),
        -1
      );
    }
    
    scaleAnimation.value = withSpring(1, {
      damping: 12,
      stiffness: 100,
    });
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

  const renderLogo = () => (
    <Animated.View 
      entering={!isWeb || isMobile ? FadeInUp.duration(800).springify() : undefined}
      style={styles.logoSection}
    >
      <View style={styles.logoContainer}>
        <Animated.View style={[styles.logoGradient, logoStyle, (!isWeb || isMobile) && floatingStyle]}>
          <Text style={styles.logoText}>VA</Text>
        </Animated.View>
        {!isWeb && (
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
        )}
      </View>
      
      <Animated.Text 
        style={styles.title}
        entering={!isWeb || isMobile ? FadeInUp.delay(200).duration(800) : undefined}
      >
        Find Your Perfect{isDesktop ? ' ' : '\n'}Virtual Assistant
      </Animated.Text>
      <Animated.Text 
        style={styles.subtitle}
        entering={!isWeb || isMobile ? FadeInUp.delay(400).duration(800) : undefined}
      >
        AI-powered matching for your business needs
      </Animated.Text>

      {isDesktop && (
        <Animated.View 
          style={styles.desktopFeatures}
          entering={FadeInUp.delay(600).duration(800)}
        >
          <View style={styles.featureItem}>
            <Ionicons name="shield-checkmark" size={24} color={theme.colors.success} />
            <Text style={styles.featureText}>Verified Professionals</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="flash" size={24} color={theme.colors.warning} />
            <Text style={styles.featureText}>Instant Matching</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="star" size={24} color={theme.colors.primary.main} />
            <Text style={styles.featureText}>Top Rated VAs</Text>
          </View>
        </Animated.View>
      )}
    </Animated.View>
  );

  const renderAuthOptions = () => (
    <Animated.View 
      style={styles.authContainer}
      entering={!isWeb || isMobile ? FadeInDown.delay(600).duration(800).springify() : undefined}
    >
      <Button
        variant="primary"
        size={isDesktop ? 'lg' : 'md'}
        fullWidth={!isDesktop}
        onPress={handleGoogleSignIn}
        style={styles.authButton}
        title="Continue with Google"
      />

      {Platform.OS === 'ios' && (
        <Button
          variant="primary"
          size={isDesktop ? 'lg' : 'md'}
          fullWidth={!isDesktop}
          onPress={handleAppleSignIn}
          style={[styles.authButton, styles.appleButton]}
          title="Continue with Apple"
        />
      )}

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.divider} />
      </View>

      <Button
        variant="ghost"
        size={isDesktop ? 'lg' : 'md'}
        fullWidth={!isDesktop}
        onPress={handleGuestBrowse}
        style={[styles.authButton, styles.guestButton]}
        title="Browse as Guest"
      />

      <Pressable
        style={styles.textButton}
        onPress={handleEmailSignIn}
      >
        <Text style={styles.textButtonText}>Sign in with email</Text>
      </Pressable>
    </Animated.View>
  );

  // Desktop layout - split screen
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
              {renderLogo()}
            </View>
          </LinearGradient>

          {/* Right side - Auth */}
          <View style={styles.authSide}>
            <SafeAreaView style={styles.authSafeArea}>
              <ScrollView 
                contentContainerStyle={styles.authScrollContent}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.authFormContainer}>
                  <Text style={styles.authTitle}>Get Started</Text>
                  <Text style={styles.authSubtitle}>Choose your preferred sign-in method</Text>
                  {renderAuthOptions()}
                </View>
              </ScrollView>
            </SafeAreaView>
          </View>
        </View>
      </View>
    );
  }

  // Mobile/Tablet layout - vertical
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
        <ResponsiveContainer maxWidth={isTablet ? 'md' : 'full'} padding={true}>
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              {renderLogo()}
              {renderAuthOptions()}
            </View>
          </ScrollView>
        </ResponsiveContainer>
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
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing[6],
  },
  brandingContent: {
    width: '100%',
    maxWidth: 500,
  },
  authSide: {
    flex: 1,
    backgroundColor: isDark ? theme.colors.dark.background : theme.colors.white,
  },
  authSafeArea: {
    flex: 1,
  },
  authScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing[6],
  },
  authFormContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  authTitle: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: '700',
    color: isDark ? theme.colors.white : theme.colors.gray[900],
    marginBottom: theme.spacing[2],
  },
  authSubtitle: {
    fontSize: theme.fontSize.base,
    color: isDark ? theme.colors.gray[300] : theme.colors.gray[600],
    marginBottom: theme.spacing[6],
  },
  
  // Mobile/Tablet styles
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: theme.spacing[4],
    minHeight: Dimensions.get('window').height - 100,
  },
  
  // Logo section
  logoSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing[4],
  },
  logoContainer: {
    position: 'relative',
    marginBottom: theme.spacing[6],
  },
  logoGradient: {
    width: isDesktop ? 120 : 100,
    height: isDesktop ? 120 : 100,
    borderRadius: isDesktop ? 30 : 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.xl,
  },
  logoText: {
    fontSize: isDesktop ? 48 : 42,
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
    fontSize: isDesktop ? theme.fontSize['4xl'] : theme.fontSize['3xl'],
    fontWeight: '800',
    color: isDesktop && !isDark ? theme.colors.gray[900] : '#FFF',
    textAlign: 'center',
    marginBottom: theme.spacing[2],
    letterSpacing: -0.5,
    lineHeight: isDesktop ? 48 : 40,
  },
  subtitle: {
    fontSize: isDesktop ? theme.fontSize.xl : theme.fontSize.lg,
    color: isDesktop && !isDark ? theme.colors.gray[600] : 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    paddingHorizontal: isDesktop ? 0 : theme.spacing[4],
  },
  
  // Desktop features
  desktopFeatures: {
    marginTop: theme.spacing[8],
    gap: theme.spacing[4],
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
  
  // Auth container
  authContainer: {
    paddingBottom: theme.spacing[5],
    width: '100%',
  },
  authButton: {
    marginBottom: theme.spacing[3],
    ...(isDesktop && {
      minWidth: 300,
    }),
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  buttonText: {
    fontSize: theme.fontSize.base,
    fontWeight: '600',
    color: '#FFF',
  },
  appleButton: {
    backgroundColor: '#000',
  },
  appleButtonText: {
    color: '#FFF',
  },
  guestButton: {
    backgroundColor: isDesktop ? 'transparent' : 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: isDesktop ? theme.colors.gray[300] : 'rgba(255, 255, 255, 0.3)',
  },
  guestButtonText: {
    color: isDesktop ? theme.colors.primary.main : '#FFF',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing[4],
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: isDesktop ? theme.colors.gray[300] : 'rgba(255, 255, 255, 0.3)',
  },
  dividerText: {
    color: isDesktop ? theme.colors.gray[500] : 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: theme.spacing[2],
    fontSize: theme.fontSize.sm,
  },
  textButton: {
    alignItems: 'center',
    paddingVertical: theme.spacing[2],
  },
  textButtonText: {
    fontSize: theme.fontSize.sm,
    color: isDesktop ? theme.colors.primary.main : 'rgba(255, 255, 255, 0.8)',
    textDecorationLine: 'underline',
  },
});