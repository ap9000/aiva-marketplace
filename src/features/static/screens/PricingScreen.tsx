import React from 'react';
import { ScrollView, View, Pressable } from 'react-native';
import { YStack, XStack, Text, H1, H2, H3, Paragraph } from 'tamagui';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useNavigation } from '@react-navigation/native';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import { Check, X, TestTube, Microscope, Rocket } from 'lucide-react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

interface PricingTier {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  notIncluded?: string[];
  popular?: boolean;
  icon: React.ComponentType<any>;
  color: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter Lab',
    subtitle: 'For small experiments',
    price: '$0',
    period: 'per month',
    description: 'Perfect for testing the waters with virtual assistants',
    features: [
      'Browse all verified VAs',
      'Send up to 5 messages/month',
      'Basic search filters',
      'Standard support',
      'Single project at a time',
    ],
    notIncluded: [
      'AI Concierge matching',
      'Priority support',
      'Team collaboration',
      'Advanced analytics',
    ],
    icon: TestTube,
    color: '#6B7280',
  },
  {
    id: 'growth',
    name: 'Growth Chamber',
    subtitle: 'Most popular choice',
    price: '$49',
    period: 'per month',
    description: 'Scale your operations with dedicated VA support',
    features: [
      'Everything in Starter Lab',
      'Unlimited messages',
      'AI Concierge matching',
      'Up to 5 active projects',
      'Team collaboration (3 seats)',
      'Priority support',
      'Performance analytics',
      'Skill assessments',
    ],
    popular: true,
    icon: Microscope,
    color: '#6B46E5',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Lab',
    subtitle: 'For large teams',
    price: '$199',
    period: 'per month',
    description: 'Complete VA management solution for enterprises',
    features: [
      'Everything in Growth Chamber',
      'Unlimited projects',
      'Unlimited team seats',
      'Dedicated account manager',
      'Custom integrations',
      'White-label options',
      'SLA guarantees',
      'Advanced security features',
      'Custom reporting',
      'API access',
    ],
    icon: Rocket,
    color: '#10F4B1',
  },
];

const PricingCard = ({ tier, index }: { tier: PricingTier; index: number }) => {
  const navigation = useNavigation();
  const scale = useSharedValue(1);
  const { isDesktop } = useResponsive();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    // Navigate to appropriate screen based on tier
    if (tier.id === 'starter') {
      navigation.navigate('Browse' as never);
    } else {
      // Would typically go to signup/payment
      navigation.navigate('Browse' as never);
    }
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).duration(600)}
      style={{ flex: isDesktop ? 1 : undefined, width: isDesktop ? undefined : '100%' }}
    >
      <Animated.View style={animatedStyle}>
      <Card
        backgroundColor="$whiteCoat"
        borderColor={tier.popular ? '$labPurple' : '$titanium'}
        borderWidth={tier.popular ? 2 : 1}
        padding="$0"
        height="100%"
        position="relative"
        overflow="hidden"
        shadowColor={tier.popular ? '$labPurple' : '$shadowColor'}
        shadowOpacity={tier.popular ? 0.2 : 0.1}
        shadowRadius={tier.popular ? 20 : 10}
        hoverStyle={{
          shadowOpacity: tier.popular ? 0.3 : 0.15,
          shadowRadius: tier.popular ? 30 : 15,
          borderColor: tier.popular ? '$labPurple' : '$silver',
        }}
        animation="quick"
      >
        {tier.popular && (
          <YStack
            position="absolute"
            top={0}
            right={0}
            backgroundColor="$labPurple"
            paddingHorizontal="$4"
            paddingVertical="$2"
            borderBottomLeftRadius="$3"
          >
            <Text color="$whiteCoat" fontSize="$2" fontWeight="600">
              MOST POPULAR
            </Text>
          </YStack>
        )}

        <CardHeader padding="$6" paddingTop={tier.popular ? '$8' : '$6'}>
          <XStack alignItems="center" gap="$3" marginBottom="$3">
            <tier.icon size={32} color={tier.color} />
            <YStack flex={1}>
              <CardTitle fontSize="$6" color="$carbonBlack">
                {tier.name}
              </CardTitle>
              <Text fontSize="$3" color="$silver">
                {tier.subtitle}
              </Text>
            </YStack>
          </XStack>

          <XStack alignItems="baseline" marginBottom="$2">
            <Text fontSize="$9" fontWeight="bold" color={tier.color}>
              {tier.price}
            </Text>
            <Text fontSize="$4" color="$silver" marginLeft="$2">
              {tier.period}
            </Text>
          </XStack>

          <Paragraph fontSize="$3" color="$silver">
            {tier.description}
          </Paragraph>
        </CardHeader>

        <CardContent padding="$6" paddingTop="$0" flex={1}>
          <YStack gap="$3" flex={1}>
            {tier.features.map((feature, idx) => (
              <XStack key={idx} gap="$3" alignItems="center">
                <Check size={20} color="#10B981" />
                <Text fontSize="$3" color="$color" flex={1}>
                  {feature}
                </Text>
              </XStack>
            ))}

            {tier.notIncluded && tier.notIncluded.map((feature, idx) => (
              <XStack key={`not-${idx}`} gap="$3" alignItems="center" opacity={0.5}>
                <X size={20} color="#6B7280" />
                <Text fontSize="$3" color="$silver" flex={1} textDecorationLine="line-through">
                  {feature}
                </Text>
              </XStack>
            ))}
          </YStack>

          <Button
            size="$5"
            backgroundColor={tier.popular ? '$labPurple' : '$background'}
            borderColor={tier.popular ? '$labPurple' : '$titanium'}
            borderWidth={tier.popular ? 0 : 1}
            color={tier.popular ? '$whiteCoat' : '$labPurple'}
            marginTop="$6"
            onPress={handlePress}
            pressStyle={{
              backgroundColor: tier.popular ? '$primaryPress' : '$backgroundSoft',
            }}
            hoverStyle={{
              backgroundColor: tier.popular ? '$primaryHover' : '$backgroundSoft',
            }}
          >
            {tier.id === 'starter' ? 'Start Free' : 'Get Started'}
          </Button>
        </CardContent>
      </Card>
      </Animated.View>
    </Animated.View>
  );
};

const ComparisonTable = () => {
  const features = [
    { name: 'VA Browsing', starter: true, growth: true, enterprise: true },
    { name: 'Messages per month', starter: '5', growth: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Active projects', starter: '1', growth: '5', enterprise: 'Unlimited' },
    { name: 'Team seats', starter: '1', growth: '3', enterprise: 'Unlimited' },
    { name: 'AI Concierge', starter: false, growth: true, enterprise: true },
    { name: 'Priority support', starter: false, growth: true, enterprise: true },
    { name: 'Analytics', starter: false, growth: true, enterprise: true },
    { name: 'Custom integrations', starter: false, growth: false, enterprise: true },
    { name: 'API access', starter: false, growth: false, enterprise: true },
    { name: 'Dedicated manager', starter: false, growth: false, enterprise: true },
  ];

  return (
    <Animated.View entering={FadeInDown.delay(400).duration(800)}>
      <Card backgroundColor="$whiteCoat" padding="$6">
        <H3 fontSize="$6" color="$carbonBlack" marginBottom="$4">
          Feature Comparison
        </H3>
        <YStack gap="$3">
          {features.map((feature, idx) => (
            <XStack
              key={idx}
              paddingVertical="$3"
              borderBottomWidth={idx < features.length - 1 ? 1 : 0}
              borderBottomColor="$titanium"
            >
              <Text fontSize="$4" color="$color" flex={1}>
                {feature.name}
              </Text>
              <XStack flex={2} justifyContent="space-around">
                <YStack alignItems="center" flex={1}>
                  {typeof feature.starter === 'boolean' ? (
                    feature.starter ? (
                      <Check size={20} color="#10B981" />
                    ) : (
                      <X size={20} color="#EF4444" />
                    )
                  ) : (
                    <Text fontSize="$3" color="$silver">
                      {feature.starter}
                    </Text>
                  )}
                </YStack>
                <YStack alignItems="center" flex={1}>
                  {typeof feature.growth === 'boolean' ? (
                    feature.growth ? (
                      <Check size={20} color="#10B981" />
                    ) : (
                      <X size={20} color="#EF4444" />
                    )
                  ) : (
                    <Text fontSize="$3" color="$labPurple" fontWeight="600">
                      {feature.growth}
                    </Text>
                  )}
                </YStack>
                <YStack alignItems="center" flex={1}>
                  {typeof feature.enterprise === 'boolean' ? (
                    feature.enterprise ? (
                      <Check size={20} color="#10B981" />
                    ) : (
                      <X size={20} color="#EF4444" />
                    )
                  ) : (
                    <Text fontSize="$3" color="$plasmaGreen" fontWeight="600">
                      {feature.enterprise}
                    </Text>
                  )}
                </YStack>
              </XStack>
            </XStack>
          ))}
        </YStack>
      </Card>
    </Animated.View>
  );
};

export default function PricingScreen() {
  const { isDesktop } = useResponsive();

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
              Choose Your Laboratory
            </H1>
            <Paragraph
              fontSize={isDesktop ? '$6' : '$5'}
              textAlign="center"
              color="$silver"
              maxWidth={600}
              marginBottom="$6"
            >
              Select the perfect plan to power your virtual assistant experiments
            </Paragraph>
          </Animated.View>

          {/* Pricing Cards */}
          <XStack
            flexWrap={isDesktop ? 'nowrap' : 'wrap'}
            gap="$6"
            justifyContent="center"
            width="100%"
            maxWidth={1200}
            marginBottom="$8"
          >
            {pricingTiers.map((tier, index) => (
              <PricingCard key={tier.id} tier={tier} index={index} />
            ))}
          </XStack>
        </YStack>

        {/* Comparison Table */}
        <YStack
          paddingHorizontal={isDesktop ? '$8' : '$4'}
          alignItems="center"
          marginTop="$8"
        >
          <YStack width="100%" maxWidth={1000}>
            <ComparisonTable />
          </YStack>
        </YStack>

        {/* FAQ Section */}
        <YStack
          paddingHorizontal={isDesktop ? '$8' : '$4'}
          alignItems="center"
          marginTop="$8"
        >
          <Animated.View entering={FadeInDown.delay(600).duration(800)}>
            <Card
              backgroundColor="$background"
              borderColor="$labPurple"
              borderWidth={2}
              borderStyle="dashed"
              padding="$8"
              alignItems="center"
              maxWidth={800}
            >
              <H3 fontSize="$6" color="$carbonBlack" marginBottom="$3" textAlign="center">
                Need a Custom Solution?
              </H3>
              <Paragraph fontSize="$4" color="$silver" marginBottom="$5" textAlign="center">
                Our Enterprise Lab can be tailored to your specific needs. Get in touch to discuss custom pricing, 
                features, and integrations for your organization.
              </Paragraph>
              <Button
                size="$5"
                backgroundColor="$labPurple"
                color="$whiteCoat"
                pressStyle={{ backgroundColor: '$primaryPress' }}
                hoverStyle={{ backgroundColor: '$primaryHover' }}
              >
                Contact Sales
              </Button>
            </Card>
          </Animated.View>
        </YStack>
      </YStack>
    </ScrollView>
  );
}