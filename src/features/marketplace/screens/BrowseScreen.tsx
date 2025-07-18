import React, { useEffect } from 'react';
import { ScrollView, FlatList, RefreshControl, Pressable } from 'react-native';
import { YStack, XStack, Text, H1, H2, H3, Paragraph, Image } from 'tamagui';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../../navigation/types';
import { Loading } from '../../../shared/components';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import { 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Bell,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Award,
  Briefcase,
  Laptop,
  Smartphone,
  PenTool,
  BarChart3,
  Palette,
  Phone,
  ShoppingCart,
  Microscope,
  Hand,
  TestTube
} from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '../../../store';
import { fetchFeaturedVAs, fetchCategories } from '../store/marketplaceSlice';
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'Browse'>;

// Enhanced VA Card Component with Laboratory Theme
const EnhancedVACard = ({ va, onPress, index }: { va: any; onPress: () => void; index: number }) => {
  const pressScale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  const handlePressIn = () => {
    pressScale.value = withSpring(0.96);
  };

  const handlePressOut = () => {
    pressScale.value = withSpring(1);
  };

  return (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).duration(600)}
      style={{ marginRight: 16, width: 280 }}
    >
      <Animated.View style={animatedStyle}>
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
        <Card
          backgroundColor="$whiteCoat"
          borderWidth={2}
          borderColor="$titanium"
          borderRadius="$6"
          padding="$0"
          overflow="hidden"
          shadowColor="$labPurple"
          shadowOpacity={0.1}
          shadowRadius={12}
          elevation={8}
          position="relative"
        >
          {/* Gradient Background */}
          <YStack
            position="absolute"
            top={0}
            left={0}
            right={0}
            height="100%"
            backgroundColor="$whiteCoat"
            opacity={0.95}
          />
          
          <CardContent padding="$5">
            {/* Header with Avatar and Status */}
            <XStack alignItems="flex-start" marginBottom="$4">
              <YStack position="relative">
                <Image
                  source={{ uri: va.avatarUrl || 'https://i.pravatar.cc/150?img=' + index }}
                  width={64}
                  height={64}
                  borderRadius={32}
                  backgroundColor="$backgroundSoft"
                />
                {va.availability === 'available' && (
                  <YStack
                    position="absolute"
                    bottom={2}
                    right={2}
                    width={18}
                    height={18}
                    backgroundColor="$plasmaGreen"
                    borderRadius={9}
                    borderWidth={3}
                    borderColor="$whiteCoat"
                  />
                )}
              </YStack>
              
              <YStack flex={1} marginLeft="$3">
                <XStack alignItems="center" gap="$2" marginBottom="$1">
                  <H3 fontSize="$5" fontWeight="700" color="$carbonBlack" numberOfLines={1}>
                    {va.displayName || 'VA Specialist'}
                  </H3>
                  {va.verified && (
                    <CheckCircle size={16} color="#10B981" fill="#10B981" />
                  )}
                </XStack>
                
                <Text 
                  fontSize="$3" 
                  color="$silver" 
                  numberOfLines={2}
                  lineHeight="$4"
                  marginBottom="$2"
                >
                  {va.title || 'Virtual Assistant Specialist'}
                </Text>
                
                {/* Rating */}
                <XStack alignItems="center" gap="$2">
                  <XStack alignItems="center" gap="$1">
                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    <Text fontSize="$3" fontWeight="600" color="$carbonBlack">
                      {va.rating || '4.8'}
                    </Text>
                  </XStack>
                  <Text fontSize="$2" color="$silver">
                    ({va.reviewCount || '127'} reviews)
                  </Text>
                </XStack>
              </YStack>
            </XStack>

            {/* Skills Pills */}
            <XStack flexWrap="wrap" gap="$2" marginBottom="$4">
              {(va.skills || ['Admin', 'Email', 'Scheduling']).slice(0, 3).map((skill: string, idx: number) => (
                <Badge 
                  key={idx} 
                  backgroundColor="$labPurple" 
                  color="$whiteCoat" 
                  size="sm"
                  fontWeight="500"
                >
                  {skill}
                </Badge>
              ))}
            </XStack>

            {/* Price and Availability */}
            <XStack alignItems="center" justifyContent="space-between">
              <YStack>
                <Text fontSize="$6" fontWeight="bold" color="$labPurple">
                  ${va.hourlyRateMin || 35}-${va.hourlyRateMax || 55}/hr
                </Text>
                <XStack alignItems="center" gap="$1">
                  <Clock size={12} color="#6B7280" />
                  <Text fontSize="$2" color="$silver">
                    Usually responds in 15min
                  </Text>
                </XStack>
              </YStack>
              
              <Button 
                size="$3" 
                backgroundColor="$labPurple"
                borderRadius="$10"
                paddingHorizontal="$4"
                pressStyle={{ backgroundColor: '$primaryPress' }}
              >
                <Text color="$whiteCoat" fontWeight="600">View</Text>
              </Button>
            </XStack>
          </CardContent>
        </Card>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

// Enhanced Category Card Component
const CategoryCard = ({ category, onPress, index }: { category: any; onPress: () => void; index: number }) => {
  const iconComponents = [Briefcase, Laptop, Smartphone, PenTool, BarChart3, Palette, Phone, ShoppingCart];
  
  return (
    <Animated.View entering={FadeInDown.delay(index * 50).duration(500)}>
      <Pressable onPress={onPress} style={{ flex: 1, marginBottom: 16 }}>
        <Card
          backgroundColor="$whiteCoat"
          borderWidth={2}
          borderColor="$titanium"
          borderRadius="$5"
          padding="$5"
          alignItems="center"
          minHeight={120}
          justifyContent="center"
          pressStyle={{ 
            borderColor: '$labPurple',
            backgroundColor: '$backgroundSoft',
            scale: 0.98 
          }}
          hoverStyle={{
            borderColor: '$labPurple',
            shadowColor: '$labPurple',
            shadowOpacity: 0.2,
            shadowRadius: 15,
          }}
          animation="quick"
        >
          <YStack width={32} height={32} alignItems="center" justifyContent="center" marginBottom="$3">
            {React.createElement(iconComponents[index % iconComponents.length], {
              size: 32,
              color: '#6B46E5'
            })}
          </YStack>
          <Text 
            fontSize="$4" 
            fontWeight="600" 
            color="$carbonBlack" 
            textAlign="center"
            numberOfLines={2}
          >
            {category.name || 'Category'}
          </Text>
          <Text fontSize="$2" color="$silver" marginTop="$1">
            {category.count || Math.floor(Math.random() * 50) + 10} VAs
          </Text>
        </Card>
      </Pressable>
    </Animated.View>
  );
};

export default function BrowseScreen() {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const { featuredVAs, categories, isLoading } = useAppSelector((state) => state.marketplace);
  const { user } = useAppSelector((state) => state.auth);
  const { isMobile } = useResponsive();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    dispatch(fetchFeaturedVAs());
    dispatch(fetchCategories());
  };

  // Mock data for better presentation
  const mockVAs = featuredVAs.length > 0 ? featuredVAs : [
    { id: '1', displayName: 'Sarah Johnson', title: 'Executive Assistant', rating: 4.9, verified: true, availability: 'available' },
    { id: '2', displayName: 'Mike Chen', title: 'Social Media Manager', rating: 4.8, verified: true, availability: 'available' },
    { id: '3', displayName: 'Emma Davis', title: 'Data Analyst', rating: 4.7, verified: false, availability: 'available' },
  ];

  const mockCategories = categories.length > 0 ? categories : [
    { id: '1', name: 'Administrative Support' },
    { id: '2', name: 'Technical Support' },
    { id: '3', name: 'Social Media' },
    { id: '4', name: 'Content Writing' },
    { id: '5', name: 'Data Analysis' },
    { id: '6', name: 'Design & Creative' },
  ];

  if (isLoading && featuredVAs.length === 0) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center" backgroundColor="$backgroundSoft">
        <Loading fullScreen />
      </YStack>
    );
  }

  return (
    <YStack flex={1} backgroundColor="$backgroundSoft">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadData} />
        }
      >
        {/* Header */}
        <Animated.View entering={FadeIn.duration(800)}>
          <YStack
            backgroundColor="$background"
            paddingHorizontal="$4"
            paddingTop="$4"
            paddingBottom="$5"
          >
            <XStack alignItems="center" justifyContent="space-between" marginBottom="$5">
              <YStack flex={1}>
                <XStack alignItems="center" gap="$2">
                  <Text fontSize="$7" fontWeight="bold" color="$carbonBlack">
                    Welcome back!
                  </Text>
                  <Hand size={24} color="#0A0E1A" />
                </XStack>
                <Text fontSize="$4" color="$silver" marginTop="$1">
                  {user?.displayName || 'Ready to find your perfect VA?'}
                </Text>
              </YStack>
              
              <Pressable
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: '#F8FAFC',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: '#E1E8ED',
                }}
              >
                <Bell size={20} color="#6B46E5" />
              </Pressable>
            </XStack>

            {/* Quick Stats */}
            <XStack gap="$3" marginBottom="$2">
              <Card flex={1} backgroundColor="$labPurple" borderRadius="$4" padding="$3">
                <XStack alignItems="center" gap="$2">
                  <Users size={16} color="#FFFFFF" />
                  <YStack>
                    <Text fontSize="$5" fontWeight="bold" color="$whiteCoat">500+</Text>
                    <Text fontSize="$2" color="$whiteCoat" opacity={0.8}>Verified VAs</Text>
                  </YStack>
                </XStack>
              </Card>
              
              <Card flex={1} backgroundColor="$plasmaGreen" borderRadius="$4" padding="$3">
                <XStack alignItems="center" gap="$2">
                  <Award size={16} color="#0A0E1A" />
                  <YStack>
                    <Text fontSize="$5" fontWeight="bold" color="$carbonBlack">4.8★</Text>
                    <Text fontSize="$2" color="$carbonBlack" opacity={0.7}>Avg Rating</Text>
                  </YStack>
                </XStack>
              </Card>
            </XStack>
          </YStack>
        </Animated.View>

        {/* Featured VAs */}
        <YStack paddingTop="$4" paddingBottom="$2">
          <Animated.View entering={FadeInDown.delay(200).duration(600)}>
            <XStack 
              alignItems="center" 
              justifyContent="space-between" 
              paddingHorizontal="$4" 
              marginBottom="$4"
            >
              <XStack alignItems="center" gap="$2">
                <Microscope size={24} color="#6B46E5" />
                <H2 fontSize="$6" fontWeight="bold" color="$carbonBlack">
                  Lab Specialists
                </H2>
              </XStack>
              <Pressable onPress={() => {/* Navigate to all VAs */}}>
                <XStack alignItems="center" gap="$2">
                  <Text fontSize="$3" color="$labPurple" fontWeight="600">See All</Text>
                  <ArrowRight size={16} color="#6B46E5" />
                </XStack>
              </Pressable>
            </XStack>
          </Animated.View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {mockVAs.map((va, index) => (
              <EnhancedVACard
                key={va.id}
                va={va}
                index={index}
                onPress={() => navigation.navigate('VAProfile', { vaId: va.id })}
              />
            ))}
          </ScrollView>
        </YStack>

        {/* Categories */}
        <YStack paddingTop="$4" paddingHorizontal="$4">
          <Animated.View entering={FadeInDown.delay(400).duration(600)}>
            <XStack alignItems="center" gap="$2" marginBottom="$4">
              <TestTube size={24} color="#6B46E5" />
              <H2 fontSize="$6" fontWeight="bold" color="$carbonBlack">
                Experiment Categories
              </H2>
            </XStack>
          </Animated.View>
          
          <XStack flexWrap="wrap" gap="$3" justifyContent="space-between">
            {mockCategories.map((category, index) => (
              <YStack key={category.id} width="48%">
                <CategoryCard
                  category={category}
                  index={index}
                  onPress={() => navigation.navigate('Category', { 
                    categoryId: category.id, 
                    categoryName: category.name 
                  })}
                />
              </YStack>
            ))}
          </XStack>
        </YStack>

        {/* Top Rated Section */}
        <YStack paddingTop="$6" paddingHorizontal="$4" paddingBottom="$8">
          <Animated.View entering={FadeInDown.delay(600).duration(600)}>
            <XStack 
              alignItems="center" 
              justifyContent="space-between" 
              marginBottom="$4"
            >
              <XStack alignItems="center" gap="$2">
                <Star size={24} color="#F59E0B" fill="#F59E0B" />
                <H2 fontSize="$6" fontWeight="bold" color="$carbonBlack">
                  Top Performers
                </H2>
              </XStack>
              <Pressable>
                <XStack alignItems="center" gap="$2">
                  <Text fontSize="$3" color="$labPurple" fontWeight="600">View Rankings</Text>
                  <TrendingUp size={16} color="#6B46E5" />
                </XStack>
              </Pressable>
            </XStack>
          </Animated.View>

          {mockVAs.slice(0, 3).map((va, index) => (
            <Animated.View 
              key={va.id}
              entering={FadeInDown.delay(700 + index * 100).duration(500)}
            >
              <Pressable 
                onPress={() => navigation.navigate('VAProfile', { vaId: va.id })}
                style={{ marginBottom: 12 }}
              >
                <Card
                  backgroundColor="$whiteCoat"
                  borderWidth={1}
                  borderColor="$titanium"
                  borderRadius="$4"
                  padding="$4"
                  pressStyle={{ 
                    backgroundColor: '$backgroundSoft',
                    borderColor: '$labPurple',
                    scale: 0.99 
                  }}
                  animation="quick"
                >
                  <XStack alignItems="center" gap="$3">
                    <YStack alignItems="center" minWidth={32}>
                      <Text fontSize="$5" fontWeight="bold" color="$labPurple">
                        #{index + 1}
                      </Text>
                    </YStack>
                    
                    <Image
                      source={{ uri: va.avatarUrl || `https://i.pravatar.cc/150?img=${index + 1}` }}
                      width={48}
                      height={48}
                      borderRadius={24}
                      backgroundColor="$backgroundSoft"
                    />
                    
                    <YStack flex={1}>
                      <XStack alignItems="center" gap="$2">
                        <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
                          {va.displayName}
                        </Text>
                        {va.verified && (
                          <CheckCircle size={14} color="#10B981" fill="#10B981" />
                        )}
                      </XStack>
                      <Text fontSize="$3" color="$silver" numberOfLines={1}>
                        {va.title}
                      </Text>
                    </YStack>
                    
                    <YStack alignItems="flex-end">
                      <XStack alignItems="center" gap="$1">
                        <Star size={14} color="#F59E0B" fill="#F59E0B" />
                        <Text fontSize="$3" fontWeight="600" color="$carbonBlack">
                          {va.rating}
                        </Text>
                      </XStack>
                      <Text fontSize="$2" color="$silver">
                        Weekly #1
                      </Text>
                    </YStack>
                  </XStack>
                </Card>
              </Pressable>
            </Animated.View>
          ))}
        </YStack>
      </ScrollView>
    </YStack>
  );
}

