import React from 'react';
import { ScrollView, Pressable } from 'react-native';
import { YStack, XStack, Text, H1, H2, H3 } from 'tamagui';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import { 
  User,
  Camera,
  Settings,
  CreditCard,
  Users,
  FolderOpen,
  MessageCircle,
  HelpCircle,
  Star,
  DollarSign,
  Clock,
  TrendingUp,
  CheckCircle,
  Calendar,
  Briefcase,
  Award,
  ArrowRight
} from 'lucide-react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight
} from 'react-native-reanimated';

interface UserStats {
  activeProjects: number;
  totalSpent: number;
  teamSize: number;
  avgRating: number;
  completedProjects: number;
  memberSince: string;
}

interface ActivityItem {
  id: string;
  type: 'project_completed' | 'va_hired' | 'payment_made' | 'review_given';
  title: string;
  description: string;
  timestamp: Date;
  icon: React.ComponentType<any>;
  iconColor: string;
}

const mockUser = {
  name: 'Alex Pelletier',
  company: 'TechCorp Inc.',
  role: 'CTO',
  email: 'alex@techcorp.com',
  avatar: null,
  isVerified: true,
  joinDate: new Date('2023-06-15')
};

const mockStats: UserStats = {
  activeProjects: 3,
  totalSpent: 12450,
  teamSize: 5,
  avgRating: 4.8,
  completedProjects: 12,
  memberSince: 'June 2023'
};

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'project_completed',
    title: 'Website Redesign Completed',
    description: 'Sarah Chen delivered the final design files',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    icon: CheckCircle,
    iconColor: '#10F4B1'
  },
  {
    id: '2',
    type: 'va_hired',
    title: 'New VA Added to Team',
    description: 'Marcus Johnson joined for content writing',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    icon: Users,
    iconColor: '#6B46E5'
  },
  {
    id: '3',
    type: 'payment_made',
    title: 'Payment Processed',
    description: '$840 paid to Lisa Rodriguez for social media campaign',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    icon: DollarSign,
    iconColor: '#10F4B1'
  },
  {
    id: '4',
    type: 'review_given',
    title: 'Review Submitted',
    description: 'Rated David Kim 5 stars for logo design',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    icon: Star,
    iconColor: '#F59E0B'
  }
];

const StatusAvatar = ({ 
  name, 
  size = 96,
  showEditButton = false
}: { 
  name: string; 
  size?: number; 
  showEditButton?: boolean;
}) => (
  <YStack position="relative">
    <XStack
      width={size}
      height={size}
      borderRadius={size / 2}
      backgroundColor="$labPurple"
      alignItems="center"
      justifyContent="center"
    >
      <Text 
        color="$whiteCoat" 
        fontSize={size / 3}
        fontWeight="700"
      >
        {name.split(' ').map(n => n[0]).join('')}
      </Text>
    </XStack>
    {showEditButton && (
      <Pressable
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          backgroundColor: '#6B46E5',
          borderRadius: 20,
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 3,
          borderColor: '#FFFFFF'
        }}
      >
        <Camera size={20} color="#FFFFFF" />
      </Pressable>
    )}
  </YStack>
);

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color = '$labPurple',
  subtitle,
  delay = 0
}: {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color?: string;
  subtitle?: string;
  delay?: number;
}) => (
  <Animated.View entering={FadeInDown.delay(delay).duration(600)}>
    <Card
      backgroundColor="$whiteCoat"
      borderColor="$titanium"
      borderWidth={1}
      padding="$5"
      borderRadius="$4"
      flex={1}
      hoverStyle={{
        borderColor: color,
        shadowColor: color,
        shadowOpacity: 0.1,
        shadowRadius: 10
      }}
      animation="quick"
    >
      <XStack alignItems="center" gap="$3">
        <XStack
          width={48}
          height={48}
          borderRadius={24}
          backgroundColor={`${color}10`}
          alignItems="center"
          justifyContent="center"
        >
          <Icon size={24} color={color} />
        </XStack>
        
        <YStack flex={1}>
          <Text fontSize="$2" color="$silver" textTransform="uppercase" letterSpacing={1}>
            {title}
          </Text>
          <Text fontSize="$6" fontWeight="700" color="$carbonBlack">
            {value}
          </Text>
          {subtitle && (
            <Text fontSize="$2" color="$silver">
              {subtitle}
            </Text>
          )}
        </YStack>
      </XStack>
    </Card>
  </Animated.View>
);

const QuickActionCard = ({ 
  title, 
  description, 
  icon: Icon, 
  onPress,
  delay = 0
}: {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  onPress?: () => void;
  delay?: number;
}) => (
  <Animated.View entering={FadeInRight.delay(delay).duration(600)}>
    <Card
      backgroundColor="$whiteCoat"
      borderColor="$titanium"
      borderWidth={1}
      padding="$4"
      borderRadius="$4"
      pressStyle={{ backgroundColor: '$backgroundSoft' }}
      hoverStyle={{
        borderColor: '$labPurple',
        shadowColor: '$labPurple',
        shadowOpacity: 0.1,
        shadowRadius: 10
      }}
      animation="quick"
      onPress={onPress}
    >
      <XStack alignItems="center" gap="$3">
        <XStack
          width={40}
          height={40}
          borderRadius={20}
          backgroundColor="rgba(107, 70, 229, 0.1)"
          alignItems="center"
          justifyContent="center"
        >
          <Icon size={20} color="#6B46E5" />
        </XStack>
        
        <YStack flex={1}>
          <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
            {title}
          </Text>
          <Text fontSize="$3" color="$silver">
            {description}
          </Text>
        </YStack>
        
        <ArrowRight size={20} color="#6B7280" />
      </XStack>
    </Card>
  </Animated.View>
);

const ActivityItem = ({ 
  activity, 
  index 
}: { 
  activity: ActivityItem; 
  index: number; 
}) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(500)}>
      <XStack alignItems="flex-start" gap="$3" paddingVertical="$3">
        <XStack
          width={32}
          height={32}
          borderRadius={16}
          backgroundColor={`${activity.iconColor}20`}
          alignItems="center"
          justifyContent="center"
        >
          <activity.icon size={16} color={activity.iconColor} />
        </XStack>
        
        <YStack flex={1}>
          <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
            {activity.title}
          </Text>
          <Text fontSize="$3" color="$silver" marginTop="$1">
            {activity.description}
          </Text>
          <Text fontSize="$2" color="$silver" marginTop="$1">
            {formatTime(activity.timestamp)}
          </Text>
        </YStack>
      </XStack>
    </Animated.View>
  );
};

export default function ProfileScreen() {
  const { isDesktop } = useResponsive();

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
          <Animated.View entering={FadeIn.duration(800)}>
            <Card backgroundColor="$whiteCoat" padding="$6" borderRadius="$4">
              <XStack gap="$4" alignItems="center">
                <StatusAvatar 
                  name={mockUser.name}
                  showEditButton={true}
                />
                
                <YStack flex={1}>
                  <XStack alignItems="center" gap="$2" marginBottom="$1">
                    <H2 fontSize="$7" fontWeight="700" color="$carbonBlack">
                      {mockUser.name}
                    </H2>
                    {mockUser.isVerified && (
                      <XStack alignItems="center" gap="$1">
                        <CheckCircle size={14} color="#10F4B1" />
                        <Badge backgroundColor="$plasmaGreen" color="$carbonBlack">
                          Verified
                        </Badge>
                      </XStack>
                    )}
                  </XStack>
                  
                  <Text fontSize="$4" color="$silver" marginBottom="$2">
                    {mockUser.company} • {mockUser.role}
                  </Text>
                  
                  <XStack alignItems="center" gap="$3">
                    <XStack alignItems="center" gap="$1">
                      <Calendar size={16} color="#6B7280" />
                      <Text fontSize="$3" color="$silver">
                        Member since {mockStats.memberSince}
                      </Text>
                    </XStack>
                    <XStack alignItems="center" gap="$1">
                      <Star size={16} color="#F59E0B" />
                      <Text fontSize="$3" color="$silver">
                        {mockStats.avgRating} rating
                      </Text>
                    </XStack>
                  </XStack>
                </YStack>
                
                <Button 
                  backgroundColor="$labPurple" 
                  color="$whiteCoat"
                  size="$4"
                  borderRadius="$3"
                >
                  <Settings size={20} />
                  Edit Profile
                </Button>
              </XStack>
            </Card>
          </Animated.View>
        </YStack>

        {/* Stats Dashboard */}
        <YStack
          paddingHorizontal={isDesktop ? '$8' : '$4'}
          paddingTop="$6"
        >
          <Animated.View entering={FadeInDown.delay(200).duration(600)}>
            <H3 fontSize="$6" color="$carbonBlack" marginBottom="$4">
              Your Dashboard
            </H3>
          </Animated.View>
          
          <XStack 
            flexWrap="wrap" 
            gap="$4" 
            justifyContent="space-between"
            marginBottom="$6"
          >
            <YStack flex={isDesktop ? 0.24 : 0.48} minWidth={isDesktop ? 200 : 150}>
              <StatCard
                title="Active Projects"
                value={mockStats.activeProjects}
                icon={FolderOpen}
                color="#6B46E5"
                delay={100}
              />
            </YStack>
            
            <YStack flex={isDesktop ? 0.24 : 0.48} minWidth={isDesktop ? 200 : 150}>
              <StatCard
                title="Total Spent"
                value={`$${mockStats.totalSpent.toLocaleString()}`}
                icon={DollarSign}
                color="#10F4B1"
                delay={200}
              />
            </YStack>
            
            <YStack flex={isDesktop ? 0.24 : 0.48} minWidth={isDesktop ? 200 : 150}>
              <StatCard
                title="Team Size"
                value={mockStats.teamSize}
                icon={Users}
                color="#F59E0B"
                subtitle="Active VAs"
                delay={300}
              />
            </YStack>
            
            <YStack flex={isDesktop ? 0.24 : 0.48} minWidth={isDesktop ? 200 : 150}>
              <StatCard
                title="Completed"
                value={mockStats.completedProjects}
                icon={CheckCircle}
                color="#10B981"
                subtitle="Projects"
                delay={400}
              />
            </YStack>
          </XStack>
        </YStack>

        {/* Quick Actions */}
        <YStack
          paddingHorizontal={isDesktop ? '$8' : '$4'}
          marginBottom="$6"
        >
          <Animated.View entering={FadeInDown.delay(600).duration(600)}>
            <H3 fontSize="$6" color="$carbonBlack" marginBottom="$4">
              Quick Actions
            </H3>
          </Animated.View>
          
          <XStack 
            flexWrap="wrap" 
            gap="$4"
          >
            <YStack flex={isDesktop ? 0.48 : 1}>
              <QuickActionCard
                title="Manage Team"
                description="View and manage your VAs"
                icon={Users}
                delay={100}
              />
            </YStack>
            
            <YStack flex={isDesktop ? 0.48 : 1}>
              <QuickActionCard
                title="View Projects"
                description="Track active and completed work"
                icon={FolderOpen}
                delay={200}
              />
            </YStack>
            
            <YStack flex={isDesktop ? 0.48 : 1}>
              <QuickActionCard
                title="Billing & Payments"
                description="Manage payment methods and invoices"
                icon={CreditCard}
                delay={300}
              />
            </YStack>
            
            <YStack flex={isDesktop ? 0.48 : 1}>
              <QuickActionCard
                title="Help & Support"
                description="Get help and contact support"
                icon={HelpCircle}
                delay={400}
              />
            </YStack>
          </XStack>
        </YStack>

        {/* Recent Activity */}
        <YStack
          paddingHorizontal={isDesktop ? '$8' : '$4'}
        >
          <Animated.View entering={FadeInDown.delay(800).duration(600)}>
            <H3 fontSize="$6" color="$carbonBlack" marginBottom="$4">
              Recent Activity
            </H3>
          </Animated.View>
          
          <Card
            backgroundColor="$whiteCoat"
            borderColor="$titanium"
            borderWidth={1}
            padding="$5"
            borderRadius="$4"
          >
            <YStack divider={<YStack height={1} backgroundColor="$titanium" />}>
              {mockActivities.map((activity, index) => (
                <ActivityItem key={activity.id} activity={activity} index={index} />
              ))}
            </YStack>
            
            <Animated.View entering={FadeInDown.delay(1200).duration(600)}>
              <XStack justifyContent="center" marginTop="$4">
                <Button variant="outline" borderColor="$titanium" color="$labPurple">
                  View All Activity
                  <ArrowRight size={16} />
                </Button>
              </XStack>
            </Animated.View>
          </Card>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
