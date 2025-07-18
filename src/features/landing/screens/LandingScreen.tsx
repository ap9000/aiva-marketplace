import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../theme/ThemeContext';
import { theme } from '../../../theme';
import { Button, ResponsiveContainer } from '../../../shared/components';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import { useAppDispatch } from '../../../store';
import { setGuestMode } from '../../auth/store/authSlice';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

export default function LandingScreen() {
  const navigation = useNavigation();
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();
  const { isDesktop, isTablet } = useResponsive();
  const styles = createStyles(isDark, isDesktop, isTablet);

  const handleBrowseAsGuest = () => {
    dispatch(setGuestMode(true));
    navigation.navigate('Browse' as never);
  };

  const features = [
    {
      icon: 'shield-checkmark',
      title: 'Verified Professionals',
      description: 'All VAs undergo thorough background checks and skill assessments',
      color: theme.colors.success,
    },
    {
      icon: 'flash',
      title: 'AI-Powered Matching',
      description: 'Find your perfect VA match in seconds with our smart algorithm',
      color: theme.colors.warning,
    },
    {
      icon: 'lock-closed',
      title: 'Secure Payments',
      description: 'Protected transactions with escrow and dispute resolution',
      color: theme.colors.primary.main,
    },
    {
      icon: 'star',
      title: 'Top Rated VAs',
      description: 'Access to the top 5% of virtual assistants worldwide',
      color: theme.colors.error,
    },
    {
      icon: 'chatbubbles',
      title: 'Real-time Chat',
      description: 'Instant messaging and video calls with your VA',
      color: theme.colors.primary.dark,
    },
    {
      icon: 'analytics',
      title: 'Track Progress',
      description: 'Monitor tasks, hours, and productivity in real-time',
      color: theme.colors.success,
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStartup Inc.',
      avatar: 'https://i.pravatar.cc/150?img=1',
      content: 'AIVA helped me find the perfect VA in just 2 days. My productivity has increased 10x!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Freelance Designer',
      avatar: 'https://i.pravatar.cc/150?img=3',
      content: 'The quality of VAs on this platform is exceptional. Worth every penny.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Small Business Owner',
      avatar: 'https://i.pravatar.cc/150?img=5',
      content: 'Finally, a platform that makes hiring VAs simple and secure. Highly recommend!',
      rating: 5,
    },
  ];

  const renderHeroSection = () => (
    <LinearGradient
      colors={isDark 
        ? ['#1E3A8A', '#312E81', '#0F172A'] 
        : ['#3B82F6', '#8B5CF6', '#DBEAFE']
      }
      style={styles.heroSection}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ResponsiveContainer maxWidth="xl" padding={true}>
        <Animated.View 
          style={styles.heroContent}
          entering={FadeInUp.duration(800).springify()}
        >
          <Text style={styles.heroTitle}>
            Find Your Perfect{'\n'}Virtual Assistant
          </Text>
          <Text style={styles.heroSubtitle}>
            Connect with top-rated professionals to delegate tasks,{'\n'}
            save time, and grow your business
          </Text>
          
          <View style={styles.heroButtons}>
            <Button
              title="Browse Virtual Assistants"
              variant="primary"
              size="lg"
              onPress={handleBrowseAsGuest}
              style={styles.heroPrimaryButton}
            />
            <Button
              title="Sign Up Free"
              variant="secondary"
              size="lg"
              onPress={() => navigation.navigate('Auth' as never)}
              style={styles.heroSecondaryButton}
            />
          </View>

          <View style={styles.heroStats}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>10,000+</Text>
              <Text style={styles.statLabel}>Verified VAs</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNumber}>50,000+</Text>
              <Text style={styles.statLabel}>Happy Clients</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNumber}>4.9/5</Text>
              <Text style={styles.statLabel}>Average Rating</Text>
            </View>
          </View>
        </Animated.View>

        {isDesktop && (
          <Animated.View 
            style={styles.heroImage}
            entering={FadeInUp.delay(200).duration(800)}
          >
            {/* Placeholder for hero illustration */}
            <View style={styles.heroImagePlaceholder}>
              <Ionicons name="people" size={200} color="rgba(255,255,255,0.3)" />
            </View>
          </Animated.View>
        )}
      </ResponsiveContainer>
    </LinearGradient>
  );

  const renderFeaturesSection = () => (
    <View style={styles.featuresSection}>
      <ResponsiveContainer maxWidth="xl" padding={true}>
        <Animated.View entering={FadeInUp.duration(600)}>
          <Text style={styles.sectionTitle}>Why Choose AIVA Marketplace?</Text>
          <Text style={styles.sectionSubtitle}>
            Everything you need to find and manage your perfect virtual assistant
          </Text>
        </Animated.View>

        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <Animated.View
              key={feature.title}
              style={styles.featureCard}
              entering={FadeInUp.delay(index * 100).duration(600)}
            >
              <View style={[styles.featureIcon, { backgroundColor: `${feature.color}15` }]}>
                <Ionicons name={feature.icon as any} size={32} color={feature.color} />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </Animated.View>
          ))}
        </View>
      </ResponsiveContainer>
    </View>
  );

  const renderTestimonialsSection = () => (
    <View style={styles.testimonialsSection}>
      <ResponsiveContainer maxWidth="xl" padding={true}>
        <Animated.View entering={FadeInUp.duration(600)}>
          <Text style={styles.sectionTitle}>What Our Clients Say</Text>
          <Text style={styles.sectionSubtitle}>
            Join thousands of satisfied businesses and entrepreneurs
          </Text>
        </Animated.View>

        <ScrollView 
          horizontal={isDesktop}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.testimonialsScroll}
        >
          {testimonials.map((testimonial, index) => (
            <Animated.View
              key={testimonial.name}
              style={[
                styles.testimonialCard,
                isDesktop && { width: 350 }
              ]}
              entering={FadeInUp.delay(index * 100).duration(600)}
            >
              <View style={styles.testimonialHeader}>
                <Image 
                  source={{ uri: testimonial.avatar }}
                  style={styles.testimonialAvatar}
                />
                <View style={styles.testimonialInfo}>
                  <Text style={styles.testimonialName}>{testimonial.name}</Text>
                  <Text style={styles.testimonialRole}>{testimonial.role}</Text>
                </View>
              </View>
              <View style={styles.testimonialRating}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons 
                    key={i}
                    name="star" 
                    size={16} 
                    color={theme.colors.warning}
                  />
                ))}
              </View>
              <Text style={styles.testimonialContent}>{testimonial.content}</Text>
            </Animated.View>
          ))}
        </ScrollView>
      </ResponsiveContainer>
    </View>
  );

  const renderCTASection = () => (
    <LinearGradient
      colors={['#3B82F6', '#8B5CF6']}
      style={styles.ctaSection}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <ResponsiveContainer maxWidth="xl" padding={true}>
        <Animated.View 
          style={styles.ctaContent}
          entering={FadeInUp.duration(600)}
        >
          <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
          <Text style={styles.ctaSubtitle}>
            Join thousands of businesses saving time and money with AIVA
          </Text>
          <View style={styles.ctaButtons}>
            <Button
              title="Start Free Trial"
              variant="primary"
              size="lg"
              onPress={() => navigation.navigate('Auth' as never)}
              style={styles.ctaButton}
            />
            <Button
              title="Schedule Demo"
              variant="ghost"
              size="lg"
              onPress={() => {}}
              style={[styles.ctaButton, styles.ctaGhostButton]}
            />
          </View>
        </Animated.View>
      </ResponsiveContainer>
    </LinearGradient>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {renderHeroSection()}
      {renderFeaturesSection()}
      {renderTestimonialsSection()}
      {renderCTASection()}
    </ScrollView>
  );
}

const createStyles = (isDark: boolean, isDesktop: boolean, isTablet: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? theme.colors.dark.background : theme.colors.white,
  },
  heroSection: {
    paddingVertical: isDesktop ? theme.spacing[8] * 2 : theme.spacing[8],
  },
  heroContent: {
    flex: 1,
    alignItems: isDesktop ? 'flex-start' : 'center',
    textAlign: isDesktop ? 'left' : 'center',
  },
  heroTitle: {
    fontSize: isDesktop ? 56 : isTablet ? 48 : 40,
    fontWeight: '800',
    color: theme.colors.white,
    marginBottom: theme.spacing[4],
    lineHeight: isDesktop ? 64 : 48,
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: isDesktop ? theme.fontSize.xl : theme.fontSize.lg,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: theme.spacing[6],
    lineHeight: 28,
  },
  heroButtons: {
    flexDirection: isDesktop ? 'row' : 'column',
    gap: theme.spacing[3],
    marginBottom: theme.spacing[8],
  },
  heroPrimaryButton: {
    backgroundColor: theme.colors.white,
    minWidth: isDesktop ? 200 : '100%',
  },
  heroSecondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: theme.colors.white,
    minWidth: isDesktop ? 200 : '100%',
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[6],
  },
  stat: {
    alignItems: isDesktop ? 'flex-start' : 'center',
  },
  statNumber: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: '700',
    color: theme.colors.white,
  },
  statLabel: {
    fontSize: theme.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  heroImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
  },
  heroImagePlaceholder: {
    width: 400,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: theme.borderRadius.xl,
  },
  featuresSection: {
    paddingVertical: isDesktop ? theme.spacing[8] * 2 : theme.spacing[8],
    backgroundColor: isDark ? theme.colors.dark.surface : theme.colors.gray[50],
  },
  sectionTitle: {
    fontSize: isDesktop ? 40 : 32,
    fontWeight: '800',
    color: isDark ? theme.colors.white : theme.colors.gray[900],
    textAlign: 'center',
    marginBottom: theme.spacing[2],
  },
  sectionSubtitle: {
    fontSize: theme.fontSize.lg,
    color: isDark ? theme.colors.gray[300] : theme.colors.gray[600],
    textAlign: 'center',
    marginBottom: theme.spacing[8],
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing[4],
    justifyContent: 'center',
  },
  featureCard: {
    backgroundColor: isDark ? theme.colors.dark.background : theme.colors.white,
    padding: theme.spacing[6],
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    width: isDesktop ? 350 : isTablet ? '48%' : '100%',
    ...theme.shadows.md,
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[4],
  },
  featureTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: isDark ? theme.colors.white : theme.colors.gray[900],
    marginBottom: theme.spacing[2],
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: theme.fontSize.base,
    color: isDark ? theme.colors.gray[300] : theme.colors.gray[600],
    textAlign: 'center',
    lineHeight: 24,
  },
  testimonialsSection: {
    paddingVertical: isDesktop ? theme.spacing[8] * 2 : theme.spacing[8],
  },
  testimonialsScroll: {
    gap: theme.spacing[4],
    paddingHorizontal: !isDesktop ? theme.spacing[4] : 0,
  },
  testimonialCard: {
    backgroundColor: isDark ? theme.colors.dark.surface : theme.colors.white,
    padding: theme.spacing[6],
    borderRadius: theme.borderRadius.xl,
    marginBottom: isDesktop ? 0 : theme.spacing[4],
    ...theme.shadows.lg,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing[3],
  },
  testimonialAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: theme.spacing[3],
  },
  testimonialInfo: {
    flex: 1,
  },
  testimonialName: {
    fontSize: theme.fontSize.base,
    fontWeight: '600',
    color: isDark ? theme.colors.white : theme.colors.gray[900],
  },
  testimonialRole: {
    fontSize: theme.fontSize.sm,
    color: isDark ? theme.colors.gray[400] : theme.colors.gray[600],
  },
  testimonialRating: {
    flexDirection: 'row',
    marginBottom: theme.spacing[3],
  },
  testimonialContent: {
    fontSize: theme.fontSize.base,
    color: isDark ? theme.colors.gray[300] : theme.colors.gray[700],
    lineHeight: 24,
    fontStyle: 'italic',
  },
  ctaSection: {
    paddingVertical: isDesktop ? theme.spacing[8] * 2 : theme.spacing[8],
  },
  ctaContent: {
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: isDesktop ? 40 : 32,
    fontWeight: '800',
    color: theme.colors.white,
    marginBottom: theme.spacing[2],
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: theme.fontSize.lg,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: theme.spacing[6],
    textAlign: 'center',
  },
  ctaButtons: {
    flexDirection: isDesktop ? 'row' : 'column',
    gap: theme.spacing[3],
  },
  ctaButton: {
    backgroundColor: theme.colors.white,
    minWidth: isDesktop ? 180 : 200,
  },
  ctaGhostButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
});