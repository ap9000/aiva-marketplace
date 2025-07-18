import React, { useEffect, useRef } from 'react';
import { ScrollView, View, Text, Pressable, useWindowDimensions } from 'react-native';
import { YStack, XStack, Text as TamaguiText, H1, H2, H3, Paragraph } from 'tamagui';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { useNavigation } from '@react-navigation/native';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import { TestTube, Settings, Microscope, BarChart3, Rocket } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  FadeIn,
  FadeInDown,
} from 'react-native-reanimated';

interface ExperimentStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<any>;
}

const experimentSteps: ExperimentStep[] = [
  {
    id: 1,
    title: 'Hypothesis',
    subtitle: 'Define Your Needs',
    description: 'Tell us about your project requirements and ideal VA specifications',
    icon: TestTube,
  },
  {
    id: 2,
    title: 'Setup',
    subtitle: 'Configure Requirements',
    description: 'Set your budget, timeline, and specific skill requirements',
    icon: Settings,
  },
  {
    id: 3,
    title: 'Test',
    subtitle: 'Try Candidates',
    description: 'Review matched VAs and start trial collaborations',
    icon: Microscope,
  },
  {
    id: 4,
    title: 'Analyze',
    subtitle: 'Review Matches',
    description: 'Compare performance metrics and choose your perfect match',
    icon: BarChart3,
  },
  {
    id: 5,
    title: 'Deploy',
    subtitle: 'Start Working',
    description: 'Onboard your VA and begin your productive partnership',
    icon: Rocket,
  },
];

const FloatingMolecule = ({ delay = 0 }: { delay?: number }) => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 2000 + delay, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000 + delay, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    translateX.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 3000 + delay, easing: Easing.inOut(Easing.ease) }),
        withTiming(-10, { duration: 3000 + delay, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1500 + delay, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1500 + delay, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { scale: scale.value },
    ],
  }));

  return animatedStyle;
};

const TrustSignal = ({ text, delay }: { text: string; delay: number }) => {
  const floatingStyle = FloatingMolecule({ delay });

  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(800)}>
      <Animated.View style={[floatingStyle]}>
        <Card
          backgroundColor="$whiteCoat"
          borderColor="$labPurple"
          borderWidth={2}
          borderRadius="$4"
          padding="$3"
          shadowColor="$labPurple"
          shadowOpacity={0.2}
          shadowRadius={8}
        >
          <TamaguiText color="$labPurple" fontWeight="600" fontSize="$4">
            {text}
          </TamaguiText>
        </Card>
      </Animated.View>
    </Animated.View>
  );
};

export default function HowItWorksScreen() {
  const navigation = useNavigation();
  const { isDesktop } = useResponsive();
  const { width } = useWindowDimensions();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <YStack flex={1} paddingBottom="$8">
        {/* Hero Section */}
        <YStack
          backgroundColor="$background"
          paddingHorizontal={isDesktop ? '$8' : '$4'}
          paddingTop="$8"
          paddingBottom="$6"
          alignItems="center"
        >
          <Animated.View entering={FadeIn.duration(1000)}>
            <H1
              fontSize={isDesktop ? '$10' : '$8'}
              textAlign="center"
              color="$carbonBlack"
              marginBottom="$4"
            >
              The Experiment Flow
            </H1>
            <Paragraph
              fontSize={isDesktop ? '$6' : '$5'}
              textAlign="center"
              color="$silver"
              maxWidth={600}
              marginBottom="$6"
            >
              Our scientific approach to finding your perfect Virtual Assistant match
            </Paragraph>
          </Animated.View>

          {/* Floating Trust Signals */}
          <XStack
            flexWrap="wrap"
            gap="$4"
            justifyContent="center"
            marginTop="$4"
            width="100%"
            maxWidth={800}
          >
            <TrustSignal text="500+ Verified VAs" delay={0} />
            <TrustSignal text="15-min Average Match" delay={200} />
            <TrustSignal text="AI-Powered Matching" delay={400} />
          </XStack>
        </YStack>

        {/* Experiment Steps */}
        <YStack
          paddingHorizontal={isDesktop ? '$8' : '$4'}
          paddingTop="$8"
          alignItems="center"
        >
          <H2
            fontSize={isDesktop ? '$8' : '$6'}
            textAlign="center"
            color="$carbonBlack"
            marginBottom="$2"
          >
            Your Journey to the Perfect VA
          </H2>
          <Paragraph
            fontSize="$5"
            textAlign="center"
            color="$silver"
            marginBottom="$8"
            maxWidth={600}
          >
            Follow our proven 5-step process to find, test, and deploy your ideal virtual assistant
          </Paragraph>

          {/* Steps Timeline */}
          <YStack
            width="100%"
            maxWidth={1000}
            gap="$6"
            position="relative"
          >
            {/* Connecting Line */}
            {isDesktop && (
              <View
                style={{
                  position: 'absolute',
                  left: 40,
                  top: 40,
                  bottom: 40,
                  width: 2,
                  backgroundColor: '#E1E8ED',
                }}
              />
            )}

            {experimentSteps.map((step, index) => (
              <Animated.View
                key={step.id}
                entering={FadeInDown.delay(index * 100).duration(600)}
              >
                <XStack
                  gap="$4"
                  alignItems="flex-start"
                  paddingLeft={isDesktop ? '$0' : '$0'}
                >
                  {/* Step Number Circle */}
                  <YStack
                    width={80}
                    height={80}
                    borderRadius={40}
                    backgroundColor="$labPurple"
                    alignItems="center"
                    justifyContent="center"
                    shadowColor="$labPurple"
                    shadowOpacity={0.3}
                    shadowRadius={12}
                    zIndex={2}
                  >
                    <step.icon size={32} color="#FFFFFF" />
                  </YStack>

                  {/* Step Content */}
                  <Card
                    flex={1}
                    backgroundColor="$whiteCoat"
                    borderColor="$titanium"
                    borderWidth={1}
                    padding="$5"
                    hoverStyle={{
                      borderColor: '$labPurple',
                      shadowColor: '$labPurple',
                      shadowOpacity: 0.15,
                      shadowRadius: 20,
                      scale: 1.02,
                    }}
                    animation="quick"
                    pressStyle={{ scale: 0.98 }}
                  >
                    <CardContent>
                      <XStack alignItems="center" marginBottom="$2">
                        <TamaguiText
                          fontSize="$3"
                          color="$labPurple"
                          fontWeight="600"
                          textTransform="uppercase"
                          letterSpacing={1}
                        >
                          Step {step.id}
                        </TamaguiText>
                        <TamaguiText color="$silver" marginHorizontal="$2">•</TamaguiText>
                        <TamaguiText fontSize="$3" color="$silver">
                          {step.subtitle}
                        </TamaguiText>
                      </XStack>
                      <H3 fontSize="$6" color="$carbonBlack" marginBottom="$2">
                        {step.title}
                      </H3>
                      <Paragraph fontSize="$4" color="$silver" lineHeight="$6">
                        {step.description}
                      </Paragraph>
                    </CardContent>
                  </Card>
                </XStack>
              </Animated.View>
            ))}
          </YStack>

          {/* CTA Section */}
          <Animated.View
            entering={FadeInDown.delay(600).duration(800)}
            style={{ marginTop: 64, alignItems: 'center' }}
          >
            <Card
              backgroundColor="$background"
              borderColor="$labPurple"
              borderWidth={2}
              borderStyle="dashed"
              padding="$8"
              alignItems="center"
              maxWidth={600}
            >
              <H3 fontSize="$6" color="$carbonBlack" marginBottom="$3" textAlign="center">
                Ready to Start Your Experiment?
              </H3>
              <Paragraph fontSize="$4" color="$silver" marginBottom="$5" textAlign="center">
                Join thousands of businesses who've found their perfect VA match through our scientific approach
              </Paragraph>
              <XStack gap="$3">
                <Button
                  size="$5"
                  backgroundColor="$labPurple"
                  color="$whiteCoat"
                  pressStyle={{ backgroundColor: '$primaryPress' }}
                  hoverStyle={{ backgroundColor: '$primaryHover' }}
                  onPress={() => navigation.navigate('Browse' as never)}
                >
                  Browse VAs
                </Button>
                <Button
                  size="$5"
                  variant="outline"
                  borderColor="$labPurple"
                  color="$labPurple"
                  onPress={() => navigation.navigate('Search' as never)}
                >
                  Use AI Concierge
                </Button>
              </XStack>
            </Card>
          </Animated.View>
        </YStack>
      </YStack>
    </ScrollView>
  );
}