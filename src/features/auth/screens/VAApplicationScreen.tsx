import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../navigation/types';
import { Button, Card } from '../../../shared/components';
import { useTheme } from '../../../theme/ThemeContext';
import { theme } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'VAApplication'>;
};

interface RequirementItem {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

const requirements: RequirementItem[] = [
  {
    icon: 'checkmark-circle-outline',
    title: 'Professional Experience',
    description: 'Minimum 1 year of virtual assistant or relevant experience',
  },
  {
    icon: 'language-outline',
    title: 'English Proficiency',
    description: 'Strong written and verbal communication skills',
  },
  {
    icon: 'time-outline',
    title: 'Availability',
    description: 'Minimum 20 hours per week commitment',
  },
  {
    icon: 'desktop-outline',
    title: 'Technical Setup',
    description: 'Reliable internet and computer with webcam',
  },
];

export default function VAApplicationScreen({ navigation }: Props) {
  const { isDark } = useTheme();
  const styles = createStyles(isDark);

  const handleStartApplication = () => {
    // Navigate to detailed VA profile setup
    // For now, we'll just complete the onboarding
    navigation.navigate('Onboarding');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          style={styles.header}
          entering={FadeInDown.duration(600).springify()}
        >
          <View style={styles.iconContainer}>
            <Ionicons 
              name="briefcase-outline" 
              size={48} 
              color={theme.colors.primary.main} 
            />
          </View>
          <Text style={styles.title}>Become a Virtual Assistant</Text>
          <Text style={styles.subtitle}>
            Join thousands of VAs earning on AIVA Marketplace
          </Text>
        </Animated.View>

        <Animated.View 
          style={styles.benefitsCard}
          entering={FadeInDown.delay(200).duration(600).springify()}
        >
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Why join AIVA?</Text>
            <View style={styles.benefitsList}>
              <View style={styles.benefitItem}>
                <Ionicons name="trending-up" size={20} color={theme.colors.success} />
                <Text style={styles.benefitText}>Set your own rates & schedule</Text>
              </View>
              <View style={styles.benefitItem}>
                <Ionicons name="shield-checkmark" size={20} color={theme.colors.success} />
                <Text style={styles.benefitText}>Secure payments guaranteed</Text>
              </View>
              <View style={styles.benefitItem}>
                <Ionicons name="people" size={20} color={theme.colors.success} />
                <Text style={styles.benefitText}>Access to quality clients</Text>
              </View>
              <View style={styles.benefitItem}>
                <Ionicons name="school" size={20} color={theme.colors.success} />
                <Text style={styles.benefitText}>Free training & resources</Text>
              </View>
            </View>
          </Card>
        </Animated.View>

        <Animated.View 
          style={styles.requirementsSection}
          entering={FadeInDown.delay(400).duration(600).springify()}
        >
          <Text style={styles.sectionTitle}>Requirements</Text>
          {requirements.map((req, index) => (
            <View key={index} style={styles.requirementItem}>
              <View style={styles.requirementIcon}>
                <Ionicons 
                  name={req.icon} 
                  size={24} 
                  color={theme.colors.primary.main} 
                />
              </View>
              <View style={styles.requirementContent}>
                <Text style={styles.requirementTitle}>{req.title}</Text>
                <Text style={styles.requirementDescription}>{req.description}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View 
          style={styles.footer}
          entering={FadeInDown.delay(600).duration(600).springify()}
        >
          <Button
            title="Start Application"
            variant="primary"
            size="lg"
            fullWidth
            onPress={handleStartApplication}
          />
          <Text style={styles.disclaimer}>
            By applying, you agree to our Terms of Service and background check requirements
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? theme.colors.dark.background : theme.colors.gray[50],
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[4],
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing[6],
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.full,
    backgroundColor: isDark ? theme.colors.dark.surface : theme.colors.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[3],
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
    color: isDark ? theme.colors.gray[300] : theme.colors.gray[600],
    textAlign: 'center',
  },
  benefitsCard: {
    marginBottom: theme.spacing[6],
  },
  card: {
    padding: theme.spacing[4],
  },
  cardTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: isDark ? theme.colors.white : theme.colors.gray[900],
    marginBottom: theme.spacing[3],
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
  requirementsSection: {
    marginBottom: theme.spacing[6],
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: isDark ? theme.colors.white : theme.colors.gray[900],
    marginBottom: theme.spacing[3],
  },
  requirementItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing[3],
  },
  requirementIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: isDark ? theme.colors.dark.surface : theme.colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing[3],
  },
  requirementContent: {
    flex: 1,
  },
  requirementTitle: {
    fontSize: theme.fontSize.base,
    fontWeight: '600',
    color: isDark ? theme.colors.white : theme.colors.gray[900],
    marginBottom: theme.spacing[1],
  },
  requirementDescription: {
    fontSize: theme.fontSize.sm,
    color: isDark ? theme.colors.gray[300] : theme.colors.gray[600],
  },
  footer: {
    gap: theme.spacing[2],
  },
  disclaimer: {
    fontSize: theme.fontSize.xs,
    color: isDark ? theme.colors.gray[400] : theme.colors.gray[500],
    textAlign: 'center',
    marginTop: theme.spacing[2],
  },
});