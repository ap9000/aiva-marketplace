import React, { useState } from 'react';
import { ScrollView, Pressable } from 'react-native';
import { YStack, XStack, Text, H1, H2, H3, View } from 'tamagui';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { StatusAvatar } from '../../../components/ui/status-avatar';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import { useNavigation } from '@react-navigation/native';
import { 
  Bell,
  MessageCircle,
  Briefcase,
  DollarSign,
  Calendar,
  Star,
  CheckCircle,
  AlertCircle,
  UserPlus,
  FileText,
  Clock,
  Filter,
  MoreVertical,
  ArrowRight,
  Eye,
  Trash2
} from 'lucide-react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInRight
} from 'react-native-reanimated';

interface Notification {
  id: string;
  type: 'message' | 'project' | 'payment' | 'system' | 'team';
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
  avatar?: string;
  senderName?: string;
  priority: 'low' | 'medium' | 'high';
  actionButtons?: {
    label: string;
    action: string;
    variant: 'primary' | 'secondary' | 'success' | 'danger';
  }[];
  metadata?: {
    projectId?: string;
    projectName?: string;
    amount?: number;
    vaId?: string;
    vaName?: string;
  };
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'New Message from Sarah Chen',
    description: 'Hi! I have a question about the website redesign project. Can we schedule a quick call?',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    isRead: false,
    avatar: 'https://i.pravatar.cc/150?img=1',
    senderName: 'Sarah Chen',
    priority: 'medium',
    actionButtons: [
      { label: 'Reply', action: 'reply', variant: 'primary' },
      { label: 'View Conversation', action: 'view_chat', variant: 'secondary' }
    ],
    metadata: {
      vaId: '1',
      vaName: 'Sarah Chen'
    }
  },
  {
    id: '2',
    type: 'project',
    title: 'Milestone Completed',
    description: 'Marcus Johnson completed "Content Strategy Phase 1" for the Q4 Marketing Campaign',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: false,
    avatar: 'https://i.pravatar.cc/150?img=2',
    senderName: 'Marcus Johnson',
    priority: 'high',
    actionButtons: [
      { label: 'Review Work', action: 'review_milestone', variant: 'primary' },
      { label: 'Release Payment', action: 'release_payment', variant: 'success' }
    ],
    metadata: {
      projectId: '1',
      projectName: 'Q4 Marketing Campaign',
      vaId: '2',
      vaName: 'Marcus Johnson'
    }
  },
  {
    id: '3',
    type: 'payment',
    title: 'Payment Processed',
    description: 'Your payment of $540.00 to Lisa Rodriguez has been processed successfully',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    isRead: true,
    priority: 'low',
    actionButtons: [
      { label: 'View Receipt', action: 'view_receipt', variant: 'secondary' }
    ],
    metadata: {
      amount: 540.00,
      vaId: '3',
      vaName: 'Lisa Rodriguez'
    }
  },
  {
    id: '4',
    type: 'team',
    title: 'New VA Application',
    description: 'Emma Wilson applied to join your team. Review her profile and portfolio.',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    isRead: false,
    avatar: 'https://i.pravatar.cc/150?img=4',
    senderName: 'Emma Wilson',
    priority: 'medium',
    actionButtons: [
      { label: 'View Profile', action: 'view_profile', variant: 'primary' },
      { label: 'Accept', action: 'accept_application', variant: 'success' },
      { label: 'Decline', action: 'decline_application', variant: 'danger' }
    ],
    metadata: {
      vaId: '4',
      vaName: 'Emma Wilson'
    }
  },
  {
    id: '5',
    type: 'system',
    title: 'Weekly Report Available',
    description: 'Your team performance report for the week of Jan 15-21 is now available',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: true,
    priority: 'low',
    actionButtons: [
      { label: 'View Report', action: 'view_report', variant: 'primary' }
    ]
  },
  {
    id: '6',
    type: 'project',
    title: 'Project Deadline Reminder',
    description: 'Website Redesign project is due in 3 days. Current progress: 75%',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isRead: false,
    priority: 'high',
    actionButtons: [
      { label: 'View Project', action: 'view_project', variant: 'primary' },
      { label: 'Message Team', action: 'message_team', variant: 'secondary' }
    ],
    metadata: {
      projectId: '2',
      projectName: 'Website Redesign'
    }
  }
];

const getNotificationIcon = (type: Notification['type'], priority: Notification['priority']) => {
  const iconColor = priority === 'high' ? '#EF4444' : priority === 'medium' ? '#F59E0B' : '#6B7280';
  
  switch (type) {
    case 'message':
      return <MessageCircle size={20} color={iconColor} />;
    case 'project':
      return <Briefcase size={20} color={iconColor} />;
    case 'payment':
      return <DollarSign size={20} color={iconColor} />;
    case 'team':
      return <UserPlus size={20} color={iconColor} />;
    case 'system':
      return <Bell size={20} color={iconColor} />;
    default:
      return <Bell size={20} color={iconColor} />;
  }
};

const getPriorityColor = (priority: Notification['priority']) => {
  switch (priority) {
    case 'high': return '#EF4444';
    case 'medium': return '#F59E0B';
    case 'low': return '#10B981';
    default: return '#6B7280';
  }
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const { isDesktop } = useResponsive();
  const [filter, setFilter] = useState<'all' | 'unread' | 'messages' | 'projects'>('all');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

  const filteredNotifications = mockNotifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.isRead;
      case 'messages':
        return notification.type === 'message';
      case 'projects':
        return notification.type === 'project';
      default:
        return true;
    }
  });

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    // In a real app, this would update the backend
    console.log('Marking all notifications as read');
  };

  const handleNotificationAction = (notificationId: string, action: string) => {
    console.log('Notification action:', notificationId, action);
    // Handle different actions based on the action type
    switch (action) {
      case 'reply':
      case 'view_chat':
        navigation.navigate('Chat' as never, { vaId: notificationId });
        break;
      case 'view_project':
        navigation.navigate('ProjectDashboard' as never);
        break;
      case 'view_profile':
        navigation.navigate('VAProfile' as never, { vaId: notificationId });
        break;
      // Add more action handlers as needed
    }
  };

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color,
    delay = 0
  }: {
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    color: string;
    delay?: number;
  }) => (
    <Animated.View entering={FadeInDown.delay(delay).duration(600)}>
      <Card
        backgroundColor="$whiteCoat"
        borderColor="$titanium"
        borderWidth={1}
        padding="$4"
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
          <View
            width={40}
            height={40}
            borderRadius={20}
            backgroundColor={`${color}15`}
            alignItems="center"
            justifyContent="center"
          >
            <Icon size={20} color={color} />
          </View>
          
          <YStack flex={1}>
            <Text fontSize="$2" color="$silver" textTransform="uppercase" letterSpacing={1}>
              {title}
            </Text>
            <Text fontSize="$5" fontWeight="700" color="$carbonBlack">
              {value}
            </Text>
          </YStack>
        </XStack>
      </Card>
    </Animated.View>
  );

  const NotificationCard = ({ notification, index }: { notification: Notification; index: number }) => (
    <Animated.View entering={FadeInDown.delay(index * 50).duration(500)}>
      <Card
        backgroundColor={notification.isRead ? '$whiteCoat' : 'rgba(107, 70, 229, 0.02)'}
        borderColor={notification.isRead ? '$titanium' : '$labPurple'}
        borderWidth={1}
        padding="$4"
        borderRadius="$4"
        marginBottom="$3"
        hoverStyle={{
          borderColor: '$labPurple',
          shadowColor: '$labPurple',
          shadowOpacity: 0.1,
          shadowRadius: 10
        }}
        animation="quick"
      >
        <XStack gap="$3" alignItems="flex-start">
          {/* Priority indicator */}
          <View
            width={4}
            height="100%"
            backgroundColor={getPriorityColor(notification.priority)}
            borderRadius={2}
            marginRight="$2"
          />
          
          {/* Icon or Avatar */}
          <View
            width={40}
            height={40}
            borderRadius={20}
            backgroundColor="$backgroundSoft"
            alignItems="center"
            justifyContent="center"
            borderWidth={1}
            borderColor="$titanium"
          >
            {notification.avatar ? (
              <StatusAvatar 
                name={notification.senderName || 'User'}
                source={{ uri: notification.avatar }}
                size={36}
                showStatus={false}
              />
            ) : (
              getNotificationIcon(notification.type, notification.priority)
            )}
          </View>
          
          {/* Content */}
          <YStack flex={1}>
            <XStack alignItems="center" justifyContent="space-between" marginBottom="$2">
              <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
                {notification.title}
              </Text>
              <XStack alignItems="center" gap="$2">
                {!notification.isRead && (
                  <View
                    width={8}
                    height={8}
                    borderRadius={4}
                    backgroundColor="$labPurple"
                  />
                )}
                <Text fontSize="$2" color="$silver">
                  {formatTimeAgo(notification.timestamp)}
                </Text>
                <Pressable
                  style={{
                    padding: 4,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <MoreVertical size={16} color="#6B7280" />
                </Pressable>
              </XStack>
            </XStack>
            
            <Text fontSize="$3" color="$carbonBlack" lineHeight="$5" marginBottom="$3">
              {notification.description}
            </Text>
            
            {/* Metadata */}
            {notification.metadata && (
              <XStack flexWrap="wrap" gap="$2" marginBottom="$3">
                {notification.metadata.projectName && (
                  <Badge backgroundColor="rgba(107, 70, 229, 0.1)" color="$labPurple" size="sm">
                    📁 {notification.metadata.projectName}
                  </Badge>
                )}
                {notification.metadata.amount && (
                  <Badge backgroundColor="rgba(16, 244, 177, 0.1)" color="$plasmaGreen" size="sm">
                    ${notification.metadata.amount.toFixed(2)}
                  </Badge>
                )}
              </XStack>
            )}
            
            {/* Action Buttons */}
            {notification.actionButtons && notification.actionButtons.length > 0 && (
              <XStack gap="$2" flexWrap="wrap">
                {notification.actionButtons.map((button, idx) => (
                  <Button
                    key={idx}
                    size="$3"
                    backgroundColor={
                      button.variant === 'primary' ? '$labPurple' :
                      button.variant === 'success' ? '$plasmaGreen' :
                      button.variant === 'danger' ? '#EF4444' :
                      'transparent'
                    }
                    color={
                      button.variant === 'success' ? '$carbonBlack' :
                      button.variant === 'secondary' ? '$labPurple' :
                      '$whiteCoat'
                    }
                    borderColor={button.variant === 'secondary' ? '$labPurple' : 'transparent'}
                    borderWidth={button.variant === 'secondary' ? 1 : 0}
                    onPress={() => handleNotificationAction(notification.id, button.action)}
                  >
                    {button.label}
                  </Button>
                ))}
              </XStack>
            )}
          </YStack>
        </XStack>
      </Card>
    </Animated.View>
  );

  return (
    <YStack flex={1} backgroundColor="$backgroundSoft">
      {/* Header */}
      <YStack
        backgroundColor="$background"
        paddingHorizontal={isDesktop ? '$8' : '$4'}
        paddingTop="$6"
        paddingBottom="$4"
      >
        <Animated.View entering={FadeIn.duration(600)}>
          <XStack alignItems="center" justifyContent="space-between" marginBottom="$4">
            <H1 fontSize={isDesktop ? '$8' : '$6'} color="$carbonBlack">
              Notifications
            </H1>
            <Button
              backgroundColor="$labPurple"
              color="$whiteCoat"
              size="$4"
              borderRadius="$4"
              onPress={markAllAsRead}
              disabled={unreadCount === 0}
              opacity={unreadCount === 0 ? 0.5 : 1}
            >
              <CheckCircle size={20} />
              Mark All Read
            </Button>
          </XStack>
        </Animated.View>
      </YStack>

      {/* Stats */}
      <YStack paddingHorizontal={isDesktop ? '$8' : '$4'} marginBottom="$4">
        <XStack gap="$3" marginBottom="$4">
          <YStack flex={1}>
            <StatCard
              title="Total"
              value={mockNotifications.length}
              icon={Bell}
              color="#6B46E5"
              delay={100}
            />
          </YStack>
          
          <YStack flex={1}>
            <StatCard
              title="Unread"
              value={unreadCount}
              icon={AlertCircle}
              color="#F59E0B"
              delay={200}
            />
          </YStack>
          
          <YStack flex={1}>
            <StatCard
              title="High Priority"
              value={mockNotifications.filter(n => n.priority === 'high').length}
              icon={Star}
              color="#EF4444"
              delay={300}
            />
          </YStack>
        </XStack>
      </YStack>

      {/* Filters */}
      <YStack paddingHorizontal={isDesktop ? '$8' : '$4'} marginBottom="$4">
        <Animated.View entering={FadeInDown.delay(400).duration(600)}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <XStack gap="$2" paddingHorizontal="$1">
              {[
                { key: 'all', label: 'All', count: mockNotifications.length },
                { key: 'unread', label: 'Unread', count: unreadCount },
                { key: 'messages', label: 'Messages', count: mockNotifications.filter(n => n.type === 'message').length },
                { key: 'projects', label: 'Projects', count: mockNotifications.filter(n => n.type === 'project').length }
              ].map((filterOption) => (
                <Pressable
                  key={filterOption.key}
                  onPress={() => setFilter(filterOption.key as any)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    backgroundColor: filter === filterOption.key ? '#6B46E5' : '#FFFFFF',
                    borderWidth: 1,
                    borderColor: filter === filterOption.key ? '#6B46E5' : '#E1E8ED',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  <Text 
                    fontSize="$3" 
                    color={filter === filterOption.key ? '$whiteCoat' : '$carbonBlack'}
                    fontWeight="500"
                  >
                    {filterOption.label}
                  </Text>
                  {filterOption.count > 0 && (
                    <Badge
                      backgroundColor={filter === filterOption.key ? 'rgba(255,255,255,0.3)' : '$labPurple'}
                      color="$whiteCoat"
                      fontSize="$1"
                      paddingHorizontal="$1.5"
                      paddingVertical="$0.5"
                    >
                      {filterOption.count}
                    </Badge>
                  )}
                </Pressable>
              ))}
            </XStack>
          </ScrollView>
        </Animated.View>
      </YStack>

      {/* Notifications List */}
      <ScrollView
        flex={1}
        paddingHorizontal={isDesktop ? '$8' : '$4'}
        showsVerticalScrollIndicator={false}
      >
        <YStack paddingBottom="$8">
          {filteredNotifications.length === 0 ? (
            <Animated.View entering={FadeIn.duration(600)}>
              <Card
                backgroundColor="$whiteCoat"
                padding="$8"
                borderRadius="$4"
                alignItems="center"
              >
                <Bell size={48} color="#6B7280" />
                <Text fontSize="$5" fontWeight="600" color="$carbonBlack" marginTop="$3">
                  No notifications found
                </Text>
                <Text fontSize="$3" color="$silver" textAlign="center" marginTop="$1">
                  {filter === 'all' 
                    ? "You're all caught up! No new notifications." 
                    : `No ${filter} notifications at the moment`
                  }
                </Text>
              </Card>
            </Animated.View>
          ) : (
            filteredNotifications.map((notification, index) => (
              <NotificationCard key={notification.id} notification={notification} index={index} />
            ))
          )}
        </YStack>
      </ScrollView>
    </YStack>
  );
}