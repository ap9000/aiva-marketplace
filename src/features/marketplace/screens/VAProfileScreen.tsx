import React, { useState } from 'react';
import { ScrollView, Pressable } from 'react-native';
import { YStack, XStack, Text, H1, H2, H3, Paragraph, Image, View } from 'tamagui';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { ProgressBar } from '../../../components/ui/progress-bar';
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
  Share,
  Globe,
  Briefcase,
  FileText,
  Camera,
  Play,
  ExternalLink,
  ThumbsUp,
  Shield,
  Zap
} from 'lucide-react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInRight,
} from 'react-native-reanimated';

export default function VAProfileScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { isMobile, isDesktop } = useResponsive();
  const { vaId } = route.params as { vaId: string };
  const [activeTab, setActiveTab] = useState<'overview' | 'experience' | 'portfolio' | 'reviews' | 'certifications'>('overview');

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
    bio: 'Experienced executive assistant with 8+ years supporting C-level executives. Specialized in calendar management, travel coordination, and project oversight. Fluent in English and Spanish. I pride myself on attention to detail and proactive communication.',
    skills: [
      { name: 'Calendar Management', level: 95 },
      { name: 'Email Handling', level: 90 },
      { name: 'Travel Planning', level: 88 },
      { name: 'Project Coordination', level: 92 },
      { name: 'Data Entry', level: 85 },
      { name: 'Customer Service', level: 93 },
      { name: 'CRM Management', level: 87 },
      { name: 'Meeting Coordination', level: 91 },
    ],
    languages: ['English (Native)', 'Spanish (Fluent)', 'French (Basic)'],
    experience: '8+ years',
    completedProjects: 234,
    clientRetention: '95%',
    totalEarned: '$285,000',
    workHistory: [
      {
        id: '1',
        company: 'TechCorp Inc.',
        role: 'Executive Assistant to CEO',
        duration: '2021 - Present',
        description: 'Managing complex calendars, coordinating international travel, and overseeing board meeting preparations.',
        achievements: ['Reduced CEO meeting conflicts by 40%', 'Streamlined travel process saving $50k annually']
      },
      {
        id: '2',
        company: 'StartupVentures',
        role: 'Operations Coordinator',
        duration: '2019 - 2021',
        description: 'Supported leadership team across multiple departments and projects.',
        achievements: ['Implemented new project tracking system', 'Coordinated 50+ investor meetings']
      }
    ],
    portfolio: [
      {
        id: '1',
        title: 'Executive Dashboard Creation',
        type: 'document',
        description: 'Created comprehensive dashboard for C-level reporting',
        thumbnail: 'https://via.placeholder.com/200x150?text=Dashboard'
      },
      {
        id: '2',
        title: 'Travel Coordination System',
        type: 'document',
        description: 'Streamlined travel booking and expense tracking process',
        thumbnail: 'https://via.placeholder.com/200x150?text=Travel+System'
      },
      {
        id: '3',
        title: 'Client Testimonial Video',
        type: 'video',
        description: 'Video testimonial from previous client',
        thumbnail: 'https://via.placeholder.com/200x150?text=Video'
      }
    ],
    certifications: [
      {
        id: '1',
        name: 'Certified Administrative Professional (CAP)',
        issuer: 'International Association of Administrative Professionals',
        date: '2022',
        verified: true
      },
      {
        id: '2',
        name: 'Google Workspace Administration',
        issuer: 'Google Cloud',
        date: '2023',
        verified: true
      },
      {
        id: '3',
        name: 'Project Management Fundamentals',
        issuer: 'PMI',
        date: '2021',
        verified: true
      }
    ],
    availability_calendar: {
      timezone: 'EST',
      weeklyHours: 40,
      availableSlots: ['9 AM - 5 PM EST', 'Weekdays only', 'Flexible for urgent matters']
    },
    reviews: [
      {
        id: '1',
        clientName: 'Michael Chen',
        clientAvatar: 'https://i.pravatar.cc/40?img=5',
        rating: 5,
        comment: 'Outstanding work! Sarah managed my entire calendar and travel seamlessly. Highly recommend.',
        date: '2 weeks ago',
        projectType: 'Executive Support'
      },
      {
        id: '2',
        clientName: 'Lisa Anderson',
        clientAvatar: 'https://i.pravatar.cc/40?img=10',
        rating: 5,
        comment: 'Professional, reliable, and extremely efficient. Made my life so much easier.',
        date: '1 month ago',
        projectType: 'Calendar Management'
      },
      {
        id: '3',
        clientName: 'David Wilson',
        clientAvatar: 'https://i.pravatar.cc/40?img=12',
        rating: 4,
        comment: 'Great communication and attention to detail. Would work with again.',
        date: '2 months ago',
        projectType: 'Travel Coordination'
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

        {/* Tab Navigation */}
        <YStack paddingHorizontal="$4" marginBottom="$4">
          <Animated.View entering={FadeInDown.delay(500).duration(600)}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <XStack gap="$1" backgroundColor="$backgroundSoft" borderRadius="$4" padding="$1">
                {[
                  { key: 'overview', label: 'Overview' },
                  { key: 'experience', label: 'Experience' },
                  { key: 'portfolio', label: 'Portfolio' },
                  { key: 'reviews', label: 'Reviews' },
                  { key: 'certifications', label: 'Certs' }
                ].map((tab) => (
                  <Pressable
                    key={tab.key}
                    onPress={() => setActiveTab(tab.key as any)}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 12,
                      backgroundColor: activeTab === tab.key ? '#6B46E5' : 'transparent',
                      minWidth: 80,
                      alignItems: 'center'
                    }}
                  >
                    <Text
                      fontSize="$3"
                      fontWeight="500"
                      color={activeTab === tab.key ? '$whiteCoat' : '$carbonBlack'}
                    >
                      {tab.label}
                    </Text>
                  </Pressable>
                ))}
              </XStack>
            </ScrollView>
          </Animated.View>
        </YStack>

        {/* Tab Content */}
        <YStack paddingHorizontal="$4" marginBottom="$8">
          {activeTab === 'overview' && (
            <Animated.View entering={FadeIn.duration(400)}>
              <YStack gap="$4">
                {/* About Section */}
                <Card backgroundColor="$whiteCoat" padding="$5">
                  <H3 fontSize="$5" fontWeight="bold" color="$carbonBlack" marginBottom="$3">
                    About
                  </H3>
                  <Paragraph fontSize="$4" color="$color" lineHeight="$6" marginBottom="$4">
                    {va.bio}
                  </Paragraph>
                  
                  {/* Languages */}
                  <YStack marginBottom="$4">
                    <Text fontSize="$4" fontWeight="600" color="$carbonBlack" marginBottom="$2">
                      Languages
                    </Text>
                    <XStack flexWrap="wrap" gap="$2">
                      {va.languages.map((language, index) => (
                        <XStack key={index} alignItems="center" gap="$1">
                          <Badge
                            backgroundColor="rgba(107, 70, 229, 0.1)"
                            color="$labPurple"
                            size="md"
                          >
                            {language}
                          </Badge>
                        </XStack>
                      ))}
                    </XStack>
                  </YStack>

                  {/* Availability */}
                  <YStack>
                    <Text fontSize="$4" fontWeight="600" color="$carbonBlack" marginBottom="$2">
                      Availability
                    </Text>
                    <XStack flexWrap="wrap" gap="$2">
                      {va.availability_calendar.availableSlots.map((slot, index) => (
                        <XStack key={index} alignItems="center" gap="$1">
                          <Badge
                            backgroundColor="rgba(16, 244, 177, 0.1)"
                            color="$plasmaGreen"
                            size="md"
                          >
                            {slot}
                          </Badge>
                        </XStack>
                      ))}
                    </XStack>
                  </YStack>
                </Card>

                {/* Skills with Progress */}
                <Card backgroundColor="$whiteCoat" padding="$5">
                  <H3 fontSize="$5" fontWeight="bold" color="$carbonBlack" marginBottom="$4">
                    Skills & Expertise
                  </H3>
                  <YStack gap="$3">
                    {va.skills.map((skill, index) => (
                      <YStack key={index} gap="$2">
                        <XStack justifyContent="space-between" alignItems="center">
                          <Text fontSize="$3" fontWeight="500" color="$carbonBlack">
                            {skill.name}
                          </Text>
                          <Text fontSize="$3" color="$silver">
                            {skill.level}%
                          </Text>
                        </XStack>
                        <ProgressBar
                          progress={skill.level}
                          color="#6B46E5"
                          height={6}
                        />
                      </YStack>
                    ))}
                  </YStack>
                </Card>
              </YStack>
            </Animated.View>
          )}

          {activeTab === 'experience' && (
            <Animated.View entering={FadeIn.duration(400)}>
              <Card backgroundColor="$whiteCoat" padding="$5">
                <H3 fontSize="$5" fontWeight="bold" color="$carbonBlack" marginBottom="$4">
                  Work Experience
                </H3>
                <YStack gap="$5">
                  {va.workHistory.map((work, index) => (
                    <YStack key={work.id} gap="$3">
                      <XStack alignItems="center" gap="$3">
                        <View
                          width={40}
                          height={40}
                          borderRadius={20}
                          backgroundColor="rgba(107, 70, 229, 0.1)"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Briefcase size={20} color="#6B46E5" />
                        </View>
                        <YStack flex={1}>
                          <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
                            {work.role}
                          </Text>
                          <Text fontSize="$3" color="$labPurple" fontWeight="500">
                            {work.company}
                          </Text>
                          <Text fontSize="$2" color="$silver">
                            {work.duration}
                          </Text>
                        </YStack>
                      </XStack>
                      
                      <Paragraph fontSize="$3" color="$color" lineHeight="$5">
                        {work.description}
                      </Paragraph>
                      
                      <YStack gap="$2">
                        <Text fontSize="$3" fontWeight="600" color="$carbonBlack">
                          Key Achievements:
                        </Text>
                        {work.achievements.map((achievement, idx) => (
                          <XStack key={idx} alignItems="flex-start" gap="$2">
                            <CheckCircle size={16} color="#10B981" style={{ marginTop: 2 }} />
                            <Text fontSize="$3" color="$color" flex={1}>
                              {achievement}
                            </Text>
                          </XStack>
                        ))}
                      </YStack>
                      
                      {index < va.workHistory.length - 1 && (
                        <View height={1} backgroundColor="$titanium" marginTop="$2" />
                      )}
                    </YStack>
                  ))}
                </YStack>
              </Card>
            </Animated.View>
          )}

          {activeTab === 'portfolio' && (
            <Animated.View entering={FadeIn.duration(400)}>
              <Card backgroundColor="$whiteCoat" padding="$5">
                <H3 fontSize="$5" fontWeight="bold" color="$carbonBlack" marginBottom="$4">
                  Portfolio & Work Samples
                </H3>
                <YStack gap="$4">
                  {va.portfolio.map((item, index) => (
                    <Card
                      key={item.id}
                      backgroundColor="$backgroundSoft"
                      borderColor="$titanium"
                      borderWidth={1}
                      padding="$4"
                      borderRadius="$3"
                      pressStyle={{ backgroundColor: '$titanium' }}
                    >
                      <XStack gap="$3" alignItems="flex-start">
                        <View
                          width={60}
                          height={60}
                          borderRadius="$3"
                          backgroundColor="$background"
                          alignItems="center"
                          justifyContent="center"
                          borderWidth={1}
                          borderColor="$titanium"
                        >
                          {item.type === 'video' ? (
                            <Play size={24} color="#6B46E5" />
                          ) : (
                            <FileText size={24} color="#6B46E5" />
                          )}
                        </View>
                        
                        <YStack flex={1}>
                          <Text fontSize="$4" fontWeight="600" color="$carbonBlack" marginBottom="$1">
                            {item.title}
                          </Text>
                          <Text fontSize="$3" color="$silver" marginBottom="$2">
                            {item.description}
                          </Text>
                          <XStack alignItems="center" gap="$1">
                            <ExternalLink size={14} color="#6B46E5" />
                            <Text fontSize="$3" color="$labPurple" fontWeight="500">
                              View {item.type === 'video' ? 'Video' : 'Document'}
                            </Text>
                          </XStack>
                        </YStack>
                      </XStack>
                    </Card>
                  ))}
                </YStack>
              </Card>
            </Animated.View>
          )}

          {activeTab === 'reviews' && (
            <Animated.View entering={FadeIn.duration(400)}>
              <Card backgroundColor="$whiteCoat" padding="$5">
                <XStack alignItems="center" justifyContent="space-between" marginBottom="$4">
                  <H3 fontSize="$5" fontWeight="bold" color="$carbonBlack">
                    Client Reviews
                  </H3>
                  <XStack alignItems="center" gap="$1">
                    <Star size={20} color="#F59E0B" fill="#F59E0B" />
                    <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
                      {va.rating}
                    </Text>
                    <Text fontSize="$3" color="$silver">
                      ({va.reviewCount} reviews)
                    </Text>
                  </XStack>
                </XStack>
                
                <YStack gap="$4">
                  {va.reviews.map((review, index) => (
                    <YStack
                      key={review.id}
                      paddingBottom="$4"
                      borderBottomWidth={index < va.reviews.length - 1 ? 1 : 0}
                      borderBottomColor="$titanium"
                    >
                      <XStack alignItems="flex-start" gap="$3" marginBottom="$2">
                        <Image
                          source={{ uri: review.clientAvatar }}
                          width={40}
                          height={40}
                          borderRadius={20}
                          backgroundColor="$backgroundSoft"
                        />
                        <YStack flex={1}>
                          <XStack alignItems="center" justifyContent="space-between" marginBottom="$1">
                            <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
                              {review.clientName}
                            </Text>
                            <XStack alignItems="center" gap="$1">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} size={14} color="#F59E0B" fill="#F59E0B" />
                              ))}
                            </XStack>
                          </XStack>
                          
                          <Badge
                            backgroundColor="rgba(107, 70, 229, 0.1)"
                            color="$labPurple"
                            size="sm"
                            alignSelf="flex-start"
                            marginBottom="$2"
                          >
                            {review.projectType}
                          </Badge>
                        </YStack>
                      </XStack>
                      
                      <Paragraph fontSize="$3" color="$color" lineHeight="$5" marginBottom="$2">
                        "{review.comment}"
                      </Paragraph>
                      
                      <XStack alignItems="center" justifyContent="space-between">
                        <Text fontSize="$2" color="$silver">
                          {review.date}
                        </Text>
                        <XStack alignItems="center" gap="$1">
                          <ThumbsUp size={14} color="#6B7280" />
                          <Text fontSize="$2" color="$silver">
                            Helpful
                          </Text>
                        </XStack>
                      </XStack>
                    </YStack>
                  ))}
                </YStack>
              </Card>
            </Animated.View>
          )}

          {activeTab === 'certifications' && (
            <Animated.View entering={FadeIn.duration(400)}>
              <Card backgroundColor="$whiteCoat" padding="$5">
                <H3 fontSize="$5" fontWeight="bold" color="$carbonBlack" marginBottom="$4">
                  Certifications & Credentials
                </H3>
                <YStack gap="$4">
                  {va.certifications.map((cert, index) => (
                    <Card
                      key={cert.id}
                      backgroundColor="$backgroundSoft"
                      borderColor="$titanium"
                      borderWidth={1}
                      padding="$4"
                      borderRadius="$3"
                    >
                      <XStack alignItems="center" gap="$3">
                        <View
                          width={48}
                          height={48}
                          borderRadius={24}
                          backgroundColor="rgba(107, 70, 229, 0.1)"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Award size={24} color="#6B46E5" />
                        </View>
                        
                        <YStack flex={1}>
                          <XStack alignItems="center" gap="$2" marginBottom="$1">
                            <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
                              {cert.name}
                            </Text>
                            {cert.verified && (
                              <XStack alignItems="center" gap="$1">
                                <Shield size={12} color="#10F4B1" />
                                <Badge backgroundColor="$plasmaGreen" color="$carbonBlack" size="sm">
                                  Verified
                                </Badge>
                              </XStack>
                            )}
                          </XStack>
                          <Text fontSize="$3" color="$labPurple" fontWeight="500" marginBottom="$1">
                            {cert.issuer}
                          </Text>
                          <Text fontSize="$2" color="$silver">
                            Earned in {cert.date}
                          </Text>
                        </YStack>
                      </XStack>
                    </Card>
                  ))}
                </YStack>
              </Card>
            </Animated.View>
          )}
        </YStack>
      </ScrollView>
    </YStack>
  );
}