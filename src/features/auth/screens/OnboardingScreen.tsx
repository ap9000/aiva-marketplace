import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../navigation/types';
import { Button } from '../../../shared/components';
import { useTheme } from '../../../theme/ThemeContext';
import { theme } from '../../../theme';
import { useAppSelector } from '../../../store';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'Onboarding'>;
};

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  description: string;
}

const clientSlides: OnboardingSlide[] = [
  {
    icon: 'search',
    title: 'AI-Powered Matching',
    description: 'Our smart algorithm finds the perfect VA for your specific needs and working style.',
  },
  {
    icon: 'verified-user',
    title: 'Verified Professionals',
    description: 'All VAs undergo background checks and skill verification for your peace of mind.',
  },
  {
    icon: 'message',
    title: 'Secure Communication',
    description: 'Chat, share files, and collaborate seamlessly within our secure platform.',
  },
];

const vaSlides: OnboardingSlide[] = [
  {
    icon: 'work',
    title: 'Find Quality Clients',
    description: 'Connect with businesses that value your skills and expertise.',
  },
  {
    icon: 'attach-money',
    title: 'Fair Commission',
    description: 'Keep more of what you earn with our competitive 15% commission rate.',
  },
  {
    icon: 'schedule',
    title: 'Work Flexibly',
    description: 'Set your own hours and work with clients from anywhere in the world.',
  },
];

export default function OnboardingScreen({ navigation }: Props) {
  const { isDark } = useTheme();
  const { userType } = useAppSelector((state) => state.auth);
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const styles = createStyles(isDark);

  const slides = userType === 'va' ? vaSlides : clientSlides;

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setCurrentSlide(roundIndex);
  };

  const goToSlide = (index: number) => {
    scrollViewRef.current?.scrollTo({ x: width * index, animated: true });
    setCurrentSlide(index);
  };

  const handleGetStarted = () => {
    // In a real app, this would complete onboarding and go to main app
    // For now, we'll just navigate to main (which will trigger auth check)
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name={slide.icon}
                size={80}
                color={theme.colors.primary.main}
              />
            </View>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => goToSlide(index)}
              style={[
                styles.paginationDot,
                currentSlide === index && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          {currentSlide === slides.length - 1 ? (
            <Button
              title="Get Started"
              variant="primary"
              size="lg"
              fullWidth
              onPress={handleGetStarted}
            />
          ) : (
            <Button
              title="Next"
              variant="primary"
              size="lg"
              fullWidth
              onPress={() => goToSlide(currentSlide + 1)}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? theme.colors.dark.background : theme.colors.white,
  },
  header: {
    paddingHorizontal: theme.spacing[3],
    paddingTop: theme.spacing[2],
    alignItems: 'flex-end',
  },
  skipButton: {
    padding: theme.spacing[2],
  },
  skipText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.primary.main,
    fontWeight: theme.fontWeight.medium,
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing[4],
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[6],
  },
  title: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    color: isDark ? theme.colors.white : theme.colors.gray[900],
    textAlign: 'center',
    marginBottom: theme.spacing[2],
  },
  description: {
    fontSize: theme.fontSize.lg,
    color: isDark ? theme.colors.gray[300] : theme.colors.gray[700],
    textAlign: 'center',
    lineHeight: 28,
    paddingHorizontal: theme.spacing[2],
  },
  footer: {
    paddingHorizontal: theme.spacing[3],
    paddingBottom: theme.spacing[4],
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing[4],
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: isDark ? theme.colors.gray[500] : theme.colors.gray[300],
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 24,
    backgroundColor: theme.colors.primary.main,
  },
  buttonContainer: {
    paddingHorizontal: theme.spacing[2],
  },
});