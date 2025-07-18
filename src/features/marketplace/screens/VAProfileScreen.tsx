import React from 'react';
import { ScrollView, Pressable } from 'react-native';
import { YStack, XStack, Text, H1, H2, H3, Paragraph, Image } from 'tamagui';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import { 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle, 
  MessageCircle,
  Calendar,
  Award,
  Users,
  TrendingUp,
  ArrowLeft,
  Heart,
  Share
} from 'lucide-react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInRight,
} from 'react-native-reanimated';

export default function VAProfileScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { isMobile } = useResponsive();
  const { vaId } = route.params as { vaId: string };

  // Mock VA data - in real app this would come from API
  const va = {
    id: vaId,
    displayName: 'Sarah Johnson',
    title: 'Executive Assistant & Operations Specialist',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 45,
    location: 'New York, NY',
    responseTime: '15 minutes',
    availability: 'available',
    verified: true,
    isPremium: true,
    bio: 'Experienced executive assistant with 8+ years supporting C-level executives. Specialized in calendar management, travel coordination, and project oversight. Fluent in English and Spanish.',
    skills: [
      'Calendar Management',
      'Email Handling',
      'Travel Planning',
      'Project Coordination',
      'Data Entry',
      'Customer Service',
      'CRM Management',
      'Meeting Coordination',
    ],
    languages: ['English (Native)', 'Spanish (Fluent)', 'French (Basic)'],
    experience: '8+ years',
    completedProjects: 234,
    clientRetention: '95%',
    totalEarned: '$285,000',
    reviews: [
      {
        id: '1',
        clientName: 'Michael Chen',
        rating: 5,
        comment: 'Outstanding work! Sarah managed my entire calendar and travel seamlessly. Highly recommend.',
        date: '2 weeks ago',
      },
      {
        id: '2',
        clientName: 'Lisa Anderson',
        rating: 5,
        comment: 'Professional, reliable, and extremely efficient. Made my life so much easier.',
        date: '1 month ago',
      },
      {
        id: '3',
        clientName: 'David Wilson',
        rating: 4,
        comment: 'Great communication and attention to detail. Would work with again.',
        date: '2 months ago',
      },
    ],
  };

  return (
    <YStack flex={1} backgroundColor="$backgroundSoft">
      {/* Header */}
      <YStack
        backgroundColor="$background"
        paddingHorizontal="$4"
        paddingTop="$6"
        paddingBottom="$4"
      >
        <XStack alignItems="center" justifyContent="space-between" marginBottom="$4">
          <Pressable
            onPress={() => navigation.goBack()}
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
            <ArrowLeft size={20} color="#6B46E5" />
          </Pressable>
          
          <XStack alignItems="center" gap="$3">
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
              <Heart size={20} color="#6B46E5" />
            </Pressable>
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
              <Share size={20} color="#6B46E5" />
            </Pressable>
          </XStack>
        </XStack>
      </YStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <Animated.View entering={FadeIn.duration(800)}>
          <YStack
            backgroundColor="$background"
            paddingHorizontal="$4"
            paddingBottom="$6"
          >
            <XStack alignItems="flex-start" gap="$4">
              <YStack position="relative">
                <Image
                  source={{ uri: va.avatar }}
                  width={100}
                  height={100}
                  borderRadius={50}
                  backgroundColor="$backgroundSoft"
                />
                {va.availability === 'available' && (
                  <YStack
                    position="absolute"
                    bottom={4}
                    right={4}
                    width={24}
                    height={24}
                    backgroundColor="$plasmaGreen"
                    borderRadius={12}
                    borderWidth={4}
                    borderColor="$background"
                  />
                )}
              </YStack>
              
              <YStack flex={1}>
                <XStack alignItems="center" gap="$2" marginBottom="$2">
                  <H1 fontSize="$7" fontWeight="bold" color="$carbonBlack">
                    {va.displayName}
                  </H1>
                  {va.verified && (
                    <CheckCircle size={20} color="#10B981" fill="#10B981" />
                  )}
                  {va.isPremium && (
                    <Badge backgroundColor="$labPurple" color="$whiteCoat">PRO</Badge>
                  )}
                </XStack>
                
                <Text fontSize="$4" color="$silver" marginBottom="$3">
                  {va.title}
                </Text>
                
                <XStack alignItems="center" gap="$4" marginBottom="$3">
                  <XStack alignItems="center" gap="$1">
                    <Star size={16} color="#F59E0B" fill="#F59E0B" />
                    <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
                      {va.rating}
                    </Text>
                    <Text fontSize="$3" color="$silver">
                      ({va.reviewCount} reviews)
                    </Text>
                  </XStack>
                </XStack>
                
                <XStack alignItems="center" gap="$4">
                  <XStack alignItems="center" gap="$1">
                    <MapPin size={14} color="#6B7280" />
                    <Text fontSize="$3" color="$silver">{va.location}</Text>
                  </XStack>
                  <XStack alignItems="center" gap="$1">
                    <Clock size={14} color="#6B7280" />
                    <Text fontSize="$3" color="$silver">Responds in {va.responseTime}</Text>
                  </XStack>
                </XStack>
              </YStack>
            </XStack>
          </YStack>
        </Animated.View>

        {/* Stats Cards */}
        <YStack paddingHorizontal="$4" marginBottom="$4">
          <Animated.View entering={FadeInDown.delay(200).duration(600)}>
            <XStack gap="$3">
              <Card flex={1} backgroundColor="$whiteCoat" padding="$4">
                <YStack alignItems="center">
                  <Text fontSize="$6" fontWeight="bold" color="$labPurple">
                    ${va.hourlyRate}
                  </Text>
                  <Text fontSize="$2" color="$silver">Hourly Rate</Text>
                </YStack>
              </Card>
              
              <Card flex={1} backgroundColor="$whiteCoat" padding="$4">
                <YStack alignItems="center">
                  <Text fontSize="$6" fontWeight="bold" color="$carbonBlack">
                    {va.completedProjects}
                  </Text>
                  <Text fontSize="$2" color="$silver">Projects</Text>
                </YStack>
              </Card>
              
              <Card flex={1} backgroundColor="$whiteCoat" padding="$4">
                <YStack alignItems="center">
                  <Text fontSize="$6" fontWeight="bold" color="$plasmaGreen">
                    {va.clientRetention}
                  </Text>
                  <Text fontSize="$2" color="$silver">Retention</Text>
                </YStack>
              </Card>
            </XStack>
          </Animated.View>
        </YStack>

        {/* Action Buttons */}
        <YStack paddingHorizontal="$4" marginBottom="$6">
          <Animated.View entering={FadeInDown.delay(300).duration(600)}>
            <XStack gap="$3">
              <Button
                flex={1}
                size="$5"
                backgroundColor="$labPurple"
                color="$whiteCoat"
                pressStyle={{ backgroundColor: '$primaryPress' }}
              >
                <MessageCircle size={20} color="#FFFFFF" />
                <Text color="$whiteCoat" fontWeight="600" marginLeft="$2">
                  Message
                </Text>
              </Button>
              
              <Button
                flex={1}
                size="$5"
                variant="outline"
                borderColor="$labPurple"
                color="$labPurple"
                pressStyle={{ backgroundColor: '$backgroundSoft' }}
              >
                <Calendar size={20} color="#6B46E5" />
                <Text color="$labPurple" fontWeight="600" marginLeft="$2">
                  Book Call
                </Text>
              </Button>
            </XStack>
          </Animated.View>
        </YStack>

        {/* About Section */}
        <YStack paddingHorizontal="$4" marginBottom="$6">
          <Animated.View entering={FadeInDown.delay(400).duration(600)}>
            <Card backgroundColor="$whiteCoat" padding="$5">
              <H3 fontSize="$5" fontWeight="bold" color="$carbonBlack" marginBottom="$3">
                About
              </H3>
              <Paragraph fontSize="$4" color="$color" lineHeight="$6">
                {va.bio}
              </Paragraph>
            </Card>
          </Animated.View>
        </YStack>

        {/* Skills */}
        <YStack paddingHorizontal="$4" marginBottom="$6">
          <Animated.View entering={FadeInDown.delay(500).duration(600)}>
            <Card backgroundColor="$whiteCoat" padding="$5">
              <H3 fontSize="$5" fontWeight="bold" color="$carbonBlack" marginBottom="$3">
                Skills & Expertise
              </H3>
              <XStack flexWrap="wrap" gap="$2">
                {va.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    backgroundColor="$labPurple"
                    color="$whiteCoat"
                    size="md"
                    fontWeight="500"
                  >
                    {skill}
                  </Badge>
                ))}
              </XStack>
            </Card>
          </Animated.View>
        </YStack>

        {/* Reviews */}
        <YStack paddingHorizontal="$4" marginBottom="$8">
          <Animated.View entering={FadeInDown.delay(600).duration(600)}>
            <Card backgroundColor="$whiteCoat" padding="$5">
              <H3 fontSize="$5" fontWeight="bold" color="$carbonBlack" marginBottom="$4">
                Client Reviews
              </H3>
              
              {va.reviews.map((review, index) => (
                <YStack
                  key={review.id}
                  paddingBottom="$4"
                  marginBottom="$4"
                  borderBottomWidth={index < va.reviews.length - 1 ? 1 : 0}
                  borderBottomColor="$titanium"
                >
                  <XStack alignItems="center" justifyContent="space-between" marginBottom="$2">
                    <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
                      {review.clientName}
                    </Text>
                    <XStack alignItems="center" gap="$1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={14} color="#F59E0B" fill="#F59E0B" />
                      ))}
                    </XStack>
                  </XStack>
                  <Paragraph fontSize="$3" color="$color" lineHeight="$5" marginBottom="$2">
                    "{review.comment}"
                  </Paragraph>
                  <Text fontSize="$2" color="$silver">
                    {review.date}
                  </Text>
                </YStack>
              ))}
            </Card>
          </Animated.View>
        </YStack>
      </ScrollView>
    </YStack>
  );
}