import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../navigation/types';
import { useTheme } from '../../../theme/ThemeContext';
import { theme } from '../../../theme';
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../../store';
import { setUserType, updateUserProfile } from '../store/authSlice';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'UserTypeSelection'>;
};

const { width, height } = Dimensions.get('window');
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface UserTypeOption {
  type: 'client' | 'va';
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  benefits: string[];
  gradient: string[];
}

const userTypes: UserTypeOption[] = [
  {
    type: 'client',
    title: "I'm hiring a VA",
    subtitle: 'Find skilled professionals for your business',
    icon: 'business-outline',
    benefits: [
      'AI-powered VA matching',
      'Verified professionals',
      'Secure payments',
      'Project management tools',
    ],
    gradient: ['#3B82F6', '#2563EB'],
  },
  {
    type: 'va',
    title: "I'm a Virtual Assistant",
    subtitle: 'Grow your freelance business',
    icon: 'person-outline',
    benefits: [
      'Access to quality clients',
      'Set your own rates',
      'Flexible schedule',
      'Growth opportunities',
    ],
    gradient: ['#8B5CF6', '#7C3AED'],
  },
];

export default function UserTypeSelectionScreen({ navigation }: Props) {
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const styles = createStyles(isDark);
  
  const [selectedType, setSelectedType] = useState<'client' | 'va' | null>(null);
  const clientScale = useSharedValue(1);
  const vaScale = useSharedValue(1);

  const handleSelection = async (type: 'client' | 'va') => {
    setSelectedType(type);
    
    // Animate selection
    if (type === 'client') {
      clientScale.value = withSpring(0.95, { damping: 15 });
      setTimeout(() => {
        clientScale.value = withSpring(1, { damping: 15 });
      }, 100);
    } else {
      vaScale.value = withSpring(0.95, { damping: 15 });
      setTimeout(() => {
        vaScale.value = withSpring(1, { damping: 15 });
      }, 100);
    }

    // Update user type in store
    await dispatch(setUserType(type));
    await dispatch(updateUserProfile({ 
      userType: type,
      onboardingStep: 'profile-setup',
    }));

    // Navigate to appropriate onboarding
    setTimeout(() => {
      if (type === 'client') {
        navigation.navigate('ClientOnboarding');
      } else {
        navigation.navigate('VAApplication');
      }
    }, 300);
  };

  const clientAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: clientScale.value }],
  }));

  const vaAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: vaScale.value }],
  }));

  const renderUserTypeCard = (option: UserTypeOption, index: number) => {
    const isSelected = selectedType === option.type;
    const animatedStyle = option.type === 'client' ? clientAnimatedStyle : vaAnimatedStyle;

    return (
      <Animated.View
        key={option.type}
        entering={FadeInDown.delay(index * 200).springify()}
        style={styles.card}
      >
        <AnimatedPressable
          style={animatedStyle}
          onPress={() => handleSelection(option.type)}
        >
        <LinearGradient
          colors={isSelected ? option.gradient as [string, string] : ['transparent', 'transparent']}
          style={[
            styles.cardGradient,
            !isSelected && styles.cardBorder,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, isSelected && styles.iconContainerSelected]}>
              <Ionicons 
                name={option.icon} 
                size={32} 
                color={isSelected ? '#FFF' : option.gradient[0]} 
              />
            </View>
            <View style={styles.cardTitleContainer}>
              <Text style={[styles.cardTitle, isSelected && styles.cardTitleSelected]}>
                {option.title}
              </Text>
              <Text style={[styles.cardSubtitle, isSelected && styles.cardSubtitleSelected]}>
                {option.subtitle}
              </Text>
            </View>
          </View>
          
          <View style={styles.benefitsList}>
            {option.benefits.map((benefit, idx) => (
              <View key={idx} style={styles.benefitItem}>
                <Ionicons 
                  name="checkmark-circle" 
                  size={16} 
                  color={isSelected ? '#FFF' : option.gradient[0]} 
                />
                <Text style={[styles.benefitText, isSelected && styles.benefitTextSelected]}>
                  {benefit}
                </Text>
              </View>
            ))}
          </View>
        </LinearGradient>
      </AnimatedPressable>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View 
          style={styles.header}
          entering={FadeInUp.duration(600).springify()}
        >
          <Text style={styles.welcomeText}>
            Welcome{user?.displayName ? `, ${user.displayName}` : ''}!
          </Text>
          <Text style={styles.title}>How would you like to use AIVA?</Text>
          <Text style={styles.subtitle}>
            Choose your path to get started with a personalized experience
          </Text>
        </Animated.View>

        <View style={styles.cardsContainer}>
          {userTypes.map((type, index) => renderUserTypeCard(type, index))}
        </View>

        <Animated.Text 
          style={styles.footer}
          entering={FadeInDown.delay(600).duration(600)}
        >
          You can always switch later in settings
        </Animated.Text>
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
    paddingHorizontal: theme.spacing[3],
    paddingTop: theme.spacing[4],
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing[6],
  },
  welcomeText: {
    fontSize: theme.fontSize.lg,
    color: isDark ? theme.colors.gray[300] : theme.colors.gray[700],
    marginBottom: theme.spacing[1],
  },
  title: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: '700',
    color: isDark ? theme.colors.white : theme.colors.gray[900],
    textAlign: 'center',
    marginBottom: theme.spacing[2],
  },
  subtitle: {
    fontSize: theme.fontSize.base,
    color: isDark ? theme.colors.gray[300] : theme.colors.gray[500],
    textAlign: 'center',
    paddingHorizontal: theme.spacing[4],
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: theme.spacing[3],
  },
  card: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    marginHorizontal: theme.spacing[2],
  },
  cardGradient: {
    padding: theme.spacing[4],
  },
  cardBorder: {
    borderWidth: 2,
    borderColor: isDark ? theme.colors.dark.border : theme.colors.gray[300],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing[4],
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: isDark ? theme.colors.dark.surface : theme.colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing[3],
  },
  iconContainerSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: isDark ? theme.colors.white : theme.colors.gray[900],
    marginBottom: theme.spacing[1],
  },
  cardTitleSelected: {
    color: theme.colors.white,
  },
  cardSubtitle: {
    fontSize: theme.fontSize.sm,
    color: isDark ? theme.colors.gray[300] : theme.colors.gray[600],
  },
  cardSubtitleSelected: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  benefitsList: {
    gap: theme.spacing[2],
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  benefitText: {
    fontSize: theme.fontSize.base,
    color: isDark ? theme.colors.gray[300] : theme.colors.gray[700],
  },
  benefitTextSelected: {
    color: theme.colors.white,
  },
  footer: {
    textAlign: 'center',
    fontSize: theme.fontSize.sm,
    color: isDark ? theme.colors.gray[400] : theme.colors.gray[500],
    paddingVertical: theme.spacing[4],
  },
});