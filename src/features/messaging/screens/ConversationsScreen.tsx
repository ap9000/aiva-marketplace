import React, { useState } from 'react';
import { ScrollView, Pressable, TextInput } from 'react-native';
import { YStack, XStack, Text, H1, H2 } from 'tamagui';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import { 
  Search, 
  MessageCircle, 
  Filter,
  Archive,
  MoreHorizontal,
  Clock,
  CheckCircle,
  User
} from 'lucide-react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInRight
} from 'react-native-reanimated';

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: {
    content: string;
    timestamp: Date;
    isFromUser: boolean;
  };
  unreadCount: number;
  isOnline: boolean;
  project?: {
    title: string;
    id: string;
  };
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    lastMessage: {
      content: 'Hi! I\'ve completed the first draft of your website design. Would you like to review it?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isFromUser: false
    },
    unreadCount: 2,
    isOnline: true,
    project: {
      title: 'Website Redesign',
      id: 'proj-1'
    }
  },
  {
    id: '2', 
    name: 'Marcus Johnson',
    lastMessage: {
      content: 'Thanks for the feedback! I\'ll implement those changes by tomorrow.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      isFromUser: false
    },
    unreadCount: 0,
    isOnline: false,
    project: {
      title: 'Content Writing',
      id: 'proj-2'
    }
  },
  {
    id: '3',
    name: 'Lisa Rodriguez',
    lastMessage: {
      content: 'I have some questions about the project requirements. Can we schedule a call?',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isFromUser: false
    },
    unreadCount: 1,
    isOnline: true
  },
  {
    id: '4',
    name: 'David Kim',
    lastMessage: {
      content: 'Perfect! The social media campaign is ready to launch.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      isFromUser: false
    },
    unreadCount: 0,
    isOnline: false,
    project: {
      title: 'Social Media Campaign',
      id: 'proj-3'
    }
  }
];

const StatusAvatar = ({ 
  name, 
  size = 48, 
  isOnline = false 
}: { 
  name: string; 
  size?: number; 
  isOnline?: boolean; 
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
        fontWeight="600"
      >
        {name.split(' ').map(n => n[0]).join('')}
      </Text>
    </XStack>
    {isOnline && (
      <XStack
        position="absolute"
        bottom={0}
        right={0}
        width={size / 3}
        height={size / 3}
        borderRadius={size / 6}
        backgroundColor="$plasmaGreen"
        borderWidth={2}
        borderColor="$background"
      />
    )}
  </YStack>
);

const formatTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  return `${days}d`;
};

export default function ConversationsScreen() {
  const { isDesktop } = useResponsive();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');

  const filteredConversations = mockConversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'unread') return matchesSearch && conv.unreadCount > 0;
    if (filter === 'archived') return false; // No archived conversations in mock data
    return matchesSearch;
  });

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
              Messages
            </H1>
            <Button
              size="$4"
              backgroundColor="$labPurple"
              color="$whiteCoat"
              borderRadius="$4"
            >
              <MessageCircle size={20} />
              New Chat
            </Button>
          </XStack>
          
          {/* Search and Filter */}
          <XStack gap="$3" alignItems="center">
            <XStack
              flex={1}
              backgroundColor="$whiteCoat"
              borderColor="$titanium"
              borderWidth={1}
              borderRadius="$6"
              paddingHorizontal="$4"
              paddingVertical="$3"
              alignItems="center"
              gap="$3"
            >
              <Search size={20} color="#6B7280" />
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: '#0A0E1A',
                  outlineStyle: 'none'
                }}
                placeholder="Search conversations..."
                placeholderTextColor="#6B7280"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </XStack>
            
            <Button
              size="$4"
              variant="outline"
              borderColor="$titanium"
              color="$carbonBlack"
            >
              <Filter size={20} />
            </Button>
          </XStack>
        </Animated.View>
      </YStack>

      {/* Filter Pills */}
      <Animated.View entering={FadeInDown.delay(200).duration(600)}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: isDesktop ? 32 : 16, paddingVertical: 16 }}
        >
          <XStack gap="$3">
            {[
              { key: 'all', label: 'All', count: mockConversations.length },
              { key: 'unread', label: 'Unread', count: mockConversations.filter(c => c.unreadCount > 0).length },
              { key: 'archived', label: 'Archived', count: 0 }
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
                    color={filter === filterOption.key ? '$whiteCoat' : '$whiteCoat'}
                    fontSize="$2"
                    paddingHorizontal="$2"
                    paddingVertical="$1"
                  >
                    {filterOption.count}
                  </Badge>
                )}
              </Pressable>
            ))}
          </XStack>
        </ScrollView>
      </Animated.View>

      {/* Conversations List */}
      <ScrollView
        flex={1}
        paddingHorizontal={isDesktop ? '$8' : '$4'}
        showsVerticalScrollIndicator={false}
      >
        <YStack gap="$3" paddingBottom="$8">
          {filteredConversations.map((conversation, index) => (
            <Animated.View
              key={conversation.id}
              entering={FadeInDown.delay(index * 100).duration(500)}
            >
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
              >
                <XStack alignItems="center" gap="$3">
                  <StatusAvatar 
                    name={conversation.name}
                    isOnline={conversation.isOnline}
                  />
                  
                  <YStack flex={1}>
                    <XStack justifyContent="space-between" alignItems="center" marginBottom="$1">
                      <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
                        {conversation.name}
                      </Text>
                      <XStack alignItems="center" gap="$2">
                        <Text fontSize="$2" color="$silver">
                          {formatTime(conversation.lastMessage.timestamp)}
                        </Text>
                        {conversation.unreadCount > 0 && (
                          <XStack
                            backgroundColor="$labPurple"
                            borderRadius={12}
                            paddingHorizontal="$2"
                            paddingVertical="$1"
                            minWidth={24}
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Text color="$whiteCoat" fontSize="$2" fontWeight="600">
                              {conversation.unreadCount}
                            </Text>
                          </XStack>
                        )}
                      </XStack>
                    </XStack>
                    
                    <Text 
                      fontSize="$3" 
                      color="$silver" 
                      numberOfLines={1}
                      marginBottom={conversation.project ? '$2' : 0}
                    >
                      {conversation.lastMessage.content}
                    </Text>
                    
                    {conversation.project && (
                      <XStack alignItems="center" gap="$2">
                        <Badge 
                          backgroundColor="rgba(107, 70, 229, 0.1)"
                          color="$labPurple"
                          fontSize="$2"
                          paddingHorizontal="$2"
                          paddingVertical="$1"
                        >
                          📁 {conversation.project.title}
                        </Badge>
                      </XStack>
                    )}
                  </YStack>
                  
                  <Pressable
                    style={{
                      padding: 8,
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <MoreHorizontal size={20} color="#6B7280" />
                  </Pressable>
                </XStack>
              </Card>
            </Animated.View>
          ))}
        </YStack>
      </ScrollView>
    </YStack>
  );
}
