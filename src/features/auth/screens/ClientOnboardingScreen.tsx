import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../navigation/types';
import { Button, Input } from '../../../shared/components';
import { useTheme } from '../../../theme/ThemeContext';
import { theme } from '../../../theme';
import { useAppDispatch, useAppSelector } from '../../../store';
import { setOnboardingStep } from '../store/authSlice';
import Animated, { FadeInDown } from 'react-native-reanimated';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'ClientOnboarding'>;
};

export default function ClientOnboardingScreen({ navigation }: Props) {
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const styles = createStyles(isDark);

  const handleComplete = async () => {
    // In a real app, save the client profile data
    await dispatch(setOnboardingStep('completed'));
    // Navigation to main app will be handled by RootNavigator
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View 
            style={styles.header}
            entering={FadeInDown.duration(600).springify()}
          >
            <Text style={styles.title}>Tell us about your business</Text>
            <Text style={styles.subtitle}>
              This helps us match you with the perfect VAs
            </Text>
          </Animated.View>

          <Animated.View 
            style={styles.form}
            entering={FadeInDown.delay(200).duration(600).springify()}
          >
            <Input
              label="Company Name"
              placeholder="Enter your company name"
              iconName="business"
            />

            <Input
              label="Industry"
              placeholder="e.g., Technology, Healthcare, E-commerce"
              iconName="briefcase"
            />

            <Input
              label="Team Size"
              placeholder="e.g., 1-10, 11-50, 50+"
              iconName="people"
              keyboardType="numeric"
            />

            <Input
              label="What tasks do you need help with?"
              placeholder="e.g., Customer support, Social media, Data entry"
              iconName="list"
              multiline
              numberOfLines={3}
            />

            <Input
              label="Preferred Timezone"
              placeholder="e.g., PST, EST, GMT"
              iconName="globe"
            />
          </Animated.View>

          <Animated.View 
            style={styles.footer}
            entering={FadeInDown.delay(400).duration(600).springify()}
          >
            <Button
              title="Complete Profile"
              variant="primary"
              size="lg"
              fullWidth
              onPress={handleComplete}
            />
            <Text style={styles.skipText}>
              You can update this information later
            </Text>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? theme.colors.dark.background : theme.colors.white,
  },
  keyboardAvoid: {
    flex: 1,
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
  form: {
    gap: theme.spacing[4],
    marginBottom: theme.spacing[6],
  },
  footer: {
    gap: theme.spacing[2],
  },
  skipText: {
    textAlign: 'center',
    fontSize: theme.fontSize.sm,
    color: isDark ? theme.colors.gray[400] : theme.colors.gray[500],
    marginTop: theme.spacing[2],
  },
});