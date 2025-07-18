import React, { useState } from 'react';
import { ScrollView, View, Pressable } from 'react-native';
import { YStack, XStack, Text, H1, H2, H3, Paragraph } from 'tamagui';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { StatusAvatar } from '../../../components/ui/status-avatar';
import { ProgressBar } from '../../../components/ui/progress-bar';
import { useNavigation } from '@react-navigation/native';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import { 
  Star, 
  Clock, 
  CheckCircle, 
  MessageCircle, 
  TrendingUp, 
  Filter,
  Search,
  MoreHorizontal,
  Award,
  Calendar,
  TestTube,
  Users,
  UserPlus,
  Heart,
  MapPin,
  Globe,
  DollarSign,
  Briefcase
} from 'lucide-react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInRight,
} from 'react-native-reanimated';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'active' | 'inactive' | 'on-break';
  rating: number;
  totalHours: number;
  projectsCompleted: number;
  responseTime: string;
  skills: string[];
  joinedDate: string;
  lastActive: string;
  hourlyRate: number;
  performance: number;
  currentProjects: string[];
  totalEarned: number;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Executive Assistant',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'active',
    rating: 4.9,
    totalHours: 420,
    projectsCompleted: 15,
    responseTime: '< 15 mins',
    skills: ['Calendar Management', 'Email Handling', 'Travel Planning', 'CRM'],
    joinedDate: '2024-08-15',
    lastActive: '2 hours ago',
    hourlyRate: 35,
    performance: 98,
    currentProjects: ['Q4 Marketing Campaign', 'Executive Support'],
    totalEarned: 14700,
  },
  {
    id: '2',
    name: 'Mike Chen',
    role: 'Social Media Manager',
    avatar: 'https://i.pravatar.cc/150?img=3',
    status: 'active',
    rating: 4.8,
    totalHours: 380,
    projectsCompleted: 12,
    responseTime: '< 30 mins',
    skills: ['Content Creation', 'Analytics', 'Strategy', 'Paid Ads'],
    joinedDate: '2024-09-01',
    lastActive: '1 hour ago',
    hourlyRate: 45,
    performance: 95,
    currentProjects: ['Social Media Overhaul'],
    totalEarned: 17100,
  },
  {
    id: '3',
    name: 'Emma Davis',
    role: 'Data Analyst',
    avatar: 'https://i.pravatar.cc/150?img=8',
    status: 'on-break',
    rating: 4.7,
    totalHours: 290,
    projectsCompleted: 8,
    responseTime: '< 1 hour',
    skills: ['Excel', 'Power BI', 'Python', 'SQL'],
    joinedDate: '2024-10-10',
    lastActive: '3 days ago',
    hourlyRate: 50,
    performance: 92,
    currentProjects: [],
    totalEarned: 14500,
  },
  {
    id: '4',
    name: 'James Wilson',
    role: 'Content Writer',
    avatar: 'https://i.pravatar.cc/150?img=18',
    status: 'inactive',
    rating: 4.6,
    totalHours: 180,
    projectsCompleted: 6,
    responseTime: '< 2 hours',
    skills: ['Copywriting', 'SEO', 'Blog Writing', 'Research'],
    joinedDate: '2024-11-01',
    lastActive: '1 week ago',
    hourlyRate: 40,
    performance: 88,
    currentProjects: [],
    totalEarned: 7200,
  },
];

type FilterType = 'all' | 'active' | 'inactive' | 'on-break';

const StatusBadge = ({ status }: { status: TeamMember['status'] }) => {
  const colors = {
    active: { bg: '$success', color: '$whiteCoat' },
    inactive: { bg: '$silver', color: '$whiteCoat' },
    'on-break': { bg: '$warning', color: '$carbonBlack' },
  };

  return (
    <Badge 
      backgroundColor={colors[status].bg}
      color={colors[status].color}
      size="sm"
    >
      {status.replace('-', ' ')}
    </Badge>
  );
};

const PerformanceChart = ({ performance }: { performance: number }) => {
  const circumference = 2 * Math.PI * 20;
  const strokeDasharray = `${(performance / 100) * circumference} ${circumference}`;

  return (
    <View style={{ width: 50, height: 50, position: 'relative' }}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          borderWidth: 4,
          borderColor: '#E1E8ED',
          position: 'absolute',
          top: 5,
          left: 5,
        }}
      />
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          borderWidth: 4,
          borderColor: performance >= 95 ? '#10F4B1' : performance >= 85 ? '#6B46E5' : '#F59E0B',
          position: 'absolute',
          top: 5,
          left: 5,
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent',
          transform: [{ rotate: `${(performance / 100) * 360}deg` }],
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text fontSize="$2" fontWeight="600" color="$carbonBlack">
          {performance}%
        </Text>
      </View>
    </View>
  );
};

const TeamMemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const navigation = useNavigation();
  const { isDesktop } = useResponsive();

  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(600)}>
      <Card
        backgroundColor="$whiteCoat"
        borderColor="$titanium"
        borderWidth={1}
        padding="$4"
        marginBottom="$4"
        hoverStyle={{
          borderColor: '$labPurple',
          shadowColor: '$labPurple',
          shadowOpacity: 0.1,
          shadowRadius: 15,
        }}
        animation="quick"
      >
        {/* Header with photo and status */}
        <XStack gap="$3" alignItems="center" marginBottom="$3">
          <StatusAvatar 
            name={member.name}
            source={member.avatar ? { uri: member.avatar } : null}
            size={64}
            isOnline={member.status === 'active'}
          />
          
          <YStack flex={1}>
            <XStack alignItems="center" justifyContent="space-between">
              <Text fontSize="$5" fontWeight="600" color="$carbonBlack">
                {member.name}
              </Text>
              <XStack alignItems="center" gap="$2">
                <StatusBadge status={member.status} />
                <Pressable>
                  <Heart 
                    size={20} 
                    color="#6B7280"
                    fill="transparent"
                  />
                </Pressable>
                <Pressable
                  style={{
                    padding: 4,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <MoreHorizontal size={20} color="#6B7280" />
                </Pressable>
              </XStack>
            </XStack>
            
            <Text fontSize="$3" color="$silver" marginBottom="$1">
              {member.role}
            </Text>
            
            <XStack alignItems="center" gap="$4">
              <XStack alignItems="center" gap="$1">
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <Text fontSize="$3" fontWeight="500" color="$carbonBlack">
                  {member.rating.toFixed(1)}
                </Text>
                <Text fontSize="$3" color="$silver">
                  (reviews)
                </Text>
              </XStack>
              
              <XStack alignItems="center" gap="$1">
                <Clock size={14} color="#6B7280" />
                <Text fontSize="$3" color="$silver">
                  {member.responseTime}
                </Text>
              </XStack>
              
              <XStack alignItems="center" gap="$1">
                <CheckCircle size={14} color="#10B981" />
                <Text fontSize="$3" color="$silver">
                  {member.projectsCompleted} projects
                </Text>
              </XStack>
            </XStack>
          </YStack>
        </XStack>

        {/* Performance Metrics */}
        <Card backgroundColor="$backgroundSoft" padding="$3" marginBottom="$3">
          <XStack justifyContent="space-around">
            <YStack alignItems="center">
              <Text fontSize="$2" color="$silver">Performance</Text>
              <Text fontSize="$4" fontWeight="600" color="$labPurple">
                {member.performance}%
              </Text>
            </YStack>
            <YStack alignItems="center">
              <Text fontSize="$2" color="$silver">Total Hours</Text>
              <Text fontSize="$4" fontWeight="600" color="$labPurple">
                {member.totalHours}
              </Text>
            </YStack>
            <YStack alignItems="center">
              <Text fontSize="$2" color="$silver">Hourly Rate</Text>
              <Text fontSize="$4" fontWeight="600" color="$labPurple">
                ${member.hourlyRate}
              </Text>
            </YStack>
            <YStack alignItems="center">
              <Text fontSize="$2" color="$silver">Total Earned</Text>
              <Text fontSize="$4" fontWeight="600" color="$labPurple">
                ${member.totalEarned.toLocaleString()}
              </Text>
            </YStack>
            <YStack alignItems="center">
              <Text fontSize="$2" color="$silver">Active Projects</Text>
              <Text fontSize="$4" fontWeight="600" color="$labPurple">
                {member.currentProjects.length}
              </Text>
            </YStack>
          </XStack>
        </Card>

          {/* Skills */}
          <YStack marginBottom="$4">
            <Text fontSize="$3" color="$silver" marginBottom="$2">Skills:</Text>
            <XStack flexWrap="wrap" gap="$2">
              {member.skills.slice(0, 4).map((skill, idx) => (
                <Badge key={idx} variant="secondary" size="sm">
                  {skill}
                </Badge>
              ))}
              {member.skills.length > 4 && (
                <Badge variant="outline" size="sm">
                  +{member.skills.length - 4} more
                </Badge>
              )}
            </XStack>
          </YStack>

        {/* Current Projects */}
        {member.currentProjects.length > 0 && (
          <YStack marginBottom="$3">
            <Text fontSize="$3" color="$silver" marginBottom="$2">Current Projects:</Text>
            {member.currentProjects.map((project, idx) => (
              <Card
                key={idx}
                backgroundColor="rgba(16, 244, 177, 0.05)"
                borderColor="$plasmaGreen"
                borderWidth={1}
                padding="$3"
                borderRadius="$3"
                marginBottom="$2"
              >
                <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
                  <Text fontSize="$4" fontWeight="500" color="$carbonBlack">
                    {project}
                  </Text>
                  <Badge backgroundColor="$plasmaGreen" color="$carbonBlack" size="sm">
                    Active
                  </Badge>
                </XStack>
                <ProgressBar
                  progress={85}
                  color="#10F4B1"
                  height={4}
                />
              </Card>
            ))}
          </YStack>
        )}

        {/* Actions */}
        <XStack gap="$2">
          <Button flex={1} variant="outline" size="$3" borderColor="$titanium">
            <MessageCircle size={16} />
            Message
          </Button>
          {member.status === 'active' ? (
            <Button flex={1} backgroundColor="$labPurple" size="$3">
              View Profile
            </Button>
          ) : (
            <Button flex={1} backgroundColor="$plasmaGreen" color="$carbonBlack" size="$3">
              Rehire
            </Button>
          )}
        </XStack>
      </Card>
    </Animated.View>
  );
};

export default function TeamManagementScreen() {
  const navigation = useNavigation();
  const { isDesktop } = useResponsive();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = mockTeamMembers.filter(member => {
    const matchesFilter = selectedFilter === 'all' || member.status === selectedFilter;
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const totalStats = {
    totalMembers: mockTeamMembers.length,
    activeMembers: mockTeamMembers.filter(m => m.status === 'active').length,
    totalHours: mockTeamMembers.reduce((sum, m) => sum + m.totalHours, 0),
    avgPerformance: Math.round(mockTeamMembers.reduce((sum, m) => sum + m.performance, 0) / mockTeamMembers.length),
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <YStack flex={1} paddingBottom="$8">
        {/* Header */}
        <YStack
          backgroundColor="$background"
          paddingHorizontal={isDesktop ? '$8' : '$4'}
          paddingTop="$6"
          paddingBottom="$6"
        >
          <Animated.View entering={FadeIn.duration(600)}>
            <XStack alignItems="center" justifyContent="space-between" marginBottom="$6">
              <YStack>
                <H1 fontSize={isDesktop ? '$8' : '$6'} color="$carbonBlack">
                  <XStack alignItems="center" gap="$2">
                    <TestTube size={24} color="#6B46E5" />
                    <Text>Your Laboratory Team</Text>
                  </XStack>
                </H1>
                <Paragraph fontSize="$4" color="$silver">
                  Manage your virtual assistant specialists and track their performance
                </Paragraph>
              </YStack>
              <Button
                backgroundColor="$labPurple"
                color="$whiteCoat"
                onPress={() => navigation.navigate('Browse' as never)}
              >
                Find New Talent
              </Button>
            </XStack>

            {/* Stats Grid */}
            <XStack gap="$4" marginBottom="$6" flexWrap="wrap">
              <Card flex={1} minWidth={150} backgroundColor="$whiteCoat" padding="$4">
                <CardContent>
                  <XStack alignItems="center" gap="$3">
                    <Award size={24} color="#6B46E5" />
                    <YStack>
                      <Text fontSize="$6" fontWeight="bold" color="$carbonBlack">
                        {totalStats.totalMembers}
                      </Text>
                      <Text fontSize="$3" color="$silver">Total Team Members</Text>
                    </YStack>
                  </XStack>
                </CardContent>
              </Card>

              <Card flex={1} minWidth={150} backgroundColor="$whiteCoat" padding="$4">
                <CardContent>
                  <XStack alignItems="center" gap="$3">
                    <CheckCircle size={24} color="#10B981" />
                    <YStack>
                      <Text fontSize="$6" fontWeight="bold" color="$success">
                        {totalStats.activeMembers}
                      </Text>
                      <Text fontSize="$3" color="$silver">Active Members</Text>
                    </YStack>
                  </XStack>
                </CardContent>
              </Card>

              <Card flex={1} minWidth={150} backgroundColor="$whiteCoat" padding="$4">
                <CardContent>
                  <XStack alignItems="center" gap="$3">
                    <Clock size={24} color="#6B46E5" />
                    <YStack>
                      <Text fontSize="$6" fontWeight="bold" color="$labPurple">
                        {totalStats.totalHours}h
                      </Text>
                      <Text fontSize="$3" color="$silver">Total Hours Worked</Text>
                    </YStack>
                  </XStack>
                </CardContent>
              </Card>

              <Card flex={1} minWidth={150} backgroundColor="$whiteCoat" padding="$4">
                <CardContent>
                  <XStack alignItems="center" gap="$3">
                    <TrendingUp size={24} color="#10F4B1" />
                    <YStack>
                      <Text fontSize="$6" fontWeight="bold" color="$plasmaGreen">
                        {totalStats.avgPerformance}%
                      </Text>
                      <Text fontSize="$3" color="$silver">Avg Performance</Text>
                    </YStack>
                  </XStack>
                </CardContent>
              </Card>
            </XStack>

            {/* Filters and Search */}
            <XStack gap="$4" alignItems="center" flexWrap="wrap">
              {/* Search */}
              <XStack
                flex={1}
                minWidth={250}
                backgroundColor="$whiteCoat"
                borderColor="$titanium"
                borderWidth={1}
                borderRadius="$3"
                paddingHorizontal="$3"
                paddingVertical="$2"
                alignItems="center"
                gap="$2"
              >
                <Search size={20} color="#6B7280" />
                <Text
                  flex={1}
                  fontSize="$4"
                  color={searchQuery ? '$carbonBlack' : '$silver'}
                  onChangeText={setSearchQuery}
                  placeholder="Search team members..."
                />
              </XStack>

              {/* Filter Buttons */}
              <XStack gap="$2" alignItems="center">
                <Filter size={20} color="#6B7280" />
                {(['all', 'active', 'inactive', 'on-break'] as FilterType[]).map((filter) => (
                  <Pressable
                    key={filter}
                    onPress={() => setSelectedFilter(filter)}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      backgroundColor: selectedFilter === filter ? '#6B46E5' : '#FFFFFF',
                      borderWidth: 1,
                      borderColor: selectedFilter === filter ? '#6B46E5' : '#E1E8ED',
                    }}
                  >
                    <Text
                      fontSize="$3"
                      color={selectedFilter === filter ? '$whiteCoat' : '$silver'}
                      fontWeight="500"
                      textTransform="capitalize"
                    >
                      {filter.replace('-', ' ')}
                    </Text>
                  </Pressable>
                ))}
              </XStack>
            </XStack>
          </Animated.View>
        </YStack>

        {/* Team Members List */}
        <YStack paddingHorizontal={isDesktop ? '$8' : '$4'}>
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))
          ) : (
            <Animated.View entering={FadeIn.delay(300).duration(600)}>
              <Card backgroundColor="$whiteCoat" padding="$8" alignItems="center">
                <Award size={48} color="#E1E8ED" />
                <H3 fontSize="$5" color="$carbonBlack" marginTop="$3" marginBottom="$2">
                  No team members found
                </H3>
                <Paragraph fontSize="$4" color="$silver" textAlign="center" marginBottom="$4">
                  {searchQuery || selectedFilter !== 'all' 
                    ? "Try adjusting your search or filter criteria"
                    : "Start building your dream team by finding talented VAs"}
                </Paragraph>
                <Button
                  backgroundColor="$labPurple"
                  color="$whiteCoat"
                  onPress={() => navigation.navigate('Browse' as never)}
                >
                  Browse Virtual Assistants
                </Button>
              </Card>
            </Animated.View>
          )}
        </YStack>
      </YStack>
    </ScrollView>
  );
}