import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, Pressable, TextInput, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { YStack, XStack, Text, H3, View } from 'tamagui';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import { 
  ArrowLeft,
  Send, 
  Paperclip,
  Mic,
  Phone,
  Video,
  MoreVertical,
  CheckCircle,
  Calendar,
  DollarSign,
  FileText,
  Briefcase
} from 'lucide-react-native';
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  SlideInUp
} from 'react-native-reanimated';

interface ChatMessage {
  id: string;
  type: 'user' | 'va';
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: {
    type: 'file' | 'image';
    name: string;
    url: string;
  }[];
  quickActions?: {
    label: string;
    action: string;
  }[];
}

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  isOnline: boolean;
  project?: {
    title: string;
    id: string;
  };
}

const mockContact: Contact = {
  id: '1',
  name: 'Sarah Chen',
  role: 'UI/UX Designer',
  isOnline: true,
  project: {
    title: 'Website Redesign',
    id: 'proj-1'
  }
};

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    type: 'va',
    content: 'Hi there! Thanks for reaching out about the website redesign project. I\'ve reviewed your requirements and I\'m excited to work with you.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: true,
    quickActions: [
      { label: 'Schedule Call', action: 'schedule_call' },
      { label: 'View Portfolio', action: 'view_portfolio' }
    ]
  },
  {
    id: '2',
    type: 'user',
    content: 'Great! I looked at your portfolio and your work is exactly what we\'re looking for. What would be your timeline for this project?',
    timestamp: new Date(Date.now() - 90 * 60 * 1000),
    isRead: true
  },
  {
    id: '3',
    type: 'va',
    content: 'Based on the scope you outlined, I estimate 3-4 weeks for the complete redesign. This includes wireframing, design mockups, and a clickable prototype.',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    isRead: true,
    attachments: [
      {
        type: 'file',
        name: 'Project Timeline.pdf',
        url: '#'
      }
    ]
  },
  {
    id: '4',
    type: 'va',
    content: 'I can start immediately if you\'d like to move forward. Should we schedule a call to discuss the details?',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    isRead: true,
    quickActions: [
      { label: 'Make Offer', action: 'make_offer' },
      { label: 'Schedule Call', action: 'schedule_call' }
    ]
  },
  {
    id: '5',
    type: 'user',
    content: 'That sounds perfect! Let\'s schedule a call for tomorrow at 2 PM EST.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    isRead: false
  }
];

const StatusAvatar = ({ 
  name, 
  size = 40, 
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

const MessageBubble = ({ message, index }: { message: ChatMessage; index: number }) => {
  const isUser = message.type === 'user';
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width * 0.8, 320);
  
  return (
    <Animated.View
      entering={isUser ? FadeInRight.delay(index * 50) : FadeInLeft.delay(index * 50)}
      style={{
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        maxWidth: maxWidth,
        marginBottom: 16,
        paddingHorizontal: 4,
      }}
    >
      <Card
        backgroundColor={isUser ? '$labPurple' : '$whiteCoat'}
        borderColor={isUser ? '$labPurple' : '$titanium'}
        borderWidth={1}
        padding="$0"
        borderRadius={18}
        borderBottomRightRadius={isUser ? 6 : 18}
        borderBottomLeftRadius={isUser ? 18 : 6}
        shadowColor={isUser ? '$labPurple' : '$shadowColor'}
        shadowOpacity={isUser ? 0.2 : 0.1}
        shadowRadius={8}
        elevation={4}
      >
        <CardContent padding="$4">
          <Text
            fontSize="$4"
            color={isUser ? '$whiteCoat' : '$carbonBlack'}
            lineHeight="$6"
            selectable={true}
          >
            {message.content}
          </Text>
          
          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <YStack gap="$2" marginTop="$3">
              {message.attachments.map((attachment, idx) => (
                <Card
                  key={idx}
                  backgroundColor={isUser ? 'rgba(255,255,255,0.15)' : '$backgroundSoft'}
                  borderColor={isUser ? 'rgba(255,255,255,0.2)' : '$titanium'}
                  borderWidth={1}
                  padding="$3"
                  borderRadius="$3"
                >
                  <XStack alignItems="center" gap="$2">
                    <FileText size={20} color={isUser ? '$whiteCoat' : '$labPurple'} />
                    <Text 
                      fontSize="$3" 
                      color={isUser ? '$whiteCoat' : '$carbonBlack'}
                      fontWeight="500"
                      flex={1}
                    >
                      {attachment.name}
                    </Text>
                  </XStack>
                </Card>
              ))}
            </YStack>
          )}
          
          {/* Quick Actions */}
          {message.quickActions && (
            <YStack gap="$2" marginTop="$3">
              {message.quickActions.map((action, idx) => (
                <Pressable
                  key={idx}
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    backgroundColor: isUser ? 'rgba(255,255,255,0.15)' : '#F8FAFC',
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: isUser ? 'rgba(255,255,255,0.2)' : '#E1E8ED',
                    minHeight: 44,
                    justifyContent: 'center',
                  }}
                >
                  <XStack alignItems="center" justifyContent="center" gap="$2">
                    {action.action === 'schedule_call' && <Calendar size={16} color={isUser ? '$whiteCoat' : '$labPurple'} />}
                    {action.action === 'make_offer' && <DollarSign size={16} color={isUser ? '$whiteCoat' : '$labPurple'} />}
                    {action.action === 'view_portfolio' && <Briefcase size={16} color={isUser ? '$whiteCoat' : '$labPurple'} />}
                    
                    <Text 
                      fontSize="$3" 
                      color={isUser ? '$whiteCoat' : '$labPurple'}
                      fontWeight="500"
                      textAlign="center"
                    >
                      {action.label}
                    </Text>
                  </XStack>
                </Pressable>
              ))}
            </YStack>
          )}
          
          {/* Timestamp and read status */}
          <XStack justifyContent="space-between" alignItems="center" marginTop="$2">
            <Text
              fontSize="$2"
              color={isUser ? 'rgba(255,255,255,0.8)' : '$silver'}
            >
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
            {isUser && message.isRead && (
              <CheckCircle size={16} color="$plasmaGreen" />
            )}
          </XStack>
        </CardContent>
      </Card>
    </Animated.View>
  );
};

export default function ChatScreen() {
  const { isDesktop } = useResponsive();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Simulate typing indicator
    const timer = setTimeout(() => setIsTyping(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Here you would typically send the message to your backend
    console.log('Sending message:', inputText);
    setInputText('');
    
    // Scroll to bottom after sending
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <YStack flex={1} backgroundColor="$backgroundSoft">
      {/* Header */}
      <YStack
        backgroundColor="$background"
        paddingHorizontal={isDesktop ? '$6' : '$4'}
        paddingTop="$4"
        paddingBottom="$3"
        borderBottomWidth={1}
        borderBottomColor="$titanium"
      >
        <Animated.View entering={FadeIn.duration(600)}>
          <XStack alignItems="center" gap="$3">
            <Pressable
              style={{
                padding: 8,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ArrowLeft size={24} color="#0A0E1A" />
            </Pressable>
            
            <StatusAvatar 
              name={mockContact.name}
              isOnline={mockContact.isOnline}
            />
            
            <YStack flex={1}>
              <Text fontSize="$5" fontWeight="600" color="$carbonBlack">
                {mockContact.name}
              </Text>
              <XStack alignItems="center" gap="$2">
                <Text fontSize="$3" color="$silver">
                  {mockContact.role}
                </Text>
                {mockContact.isOnline && (
                  <>
                    <Text fontSize="$3" color="$silver">•</Text>
                    <Text fontSize="$3" color="$plasmaGreen" fontWeight="500">
                      Online
                    </Text>
                  </>
                )}
              </XStack>
            </YStack>
            
            <XStack gap="$2">
              <Button size="$4" variant="outline" borderColor="$titanium">
                <Phone size={20} />
              </Button>
              <Button size="$4" variant="outline" borderColor="$titanium">
                <Video size={20} />
              </Button>
              <Button size="$4" variant="outline" borderColor="$titanium">
                <MoreVertical size={20} />
              </Button>
            </XStack>
          </XStack>
          
          {/* Project Context */}
          {mockContact.project && (
            <Card 
              backgroundColor="rgba(107, 70, 229, 0.05)"
              borderColor="rgba(107, 70, 229, 0.2)"
              borderWidth={1}
              padding="$3"
              borderRadius="$3"
              marginTop="$3"
            >
              <XStack alignItems="center" gap="$2">
                <Briefcase size={16} color="#6B46E5" />
                <Text fontSize="$3" color="$labPurple" fontWeight="500">
                  Project: {mockContact.project.title}
                </Text>
              </XStack>
            </Card>
          )}
        </Animated.View>
      </YStack>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        flex={1}
        paddingHorizontal={isDesktop ? '$6' : '$4'}
        paddingVertical="$4"
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        <YStack gap="$2">
          {mockMessages.map((message, index) => (
            <MessageBubble key={message.id} message={message} index={index} />
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <Animated.View entering={FadeIn.duration(300)}>
              <Card 
                backgroundColor="$whiteCoat" 
                alignSelf="flex-start" 
                padding="$4" 
                marginBottom="$4"
                borderRadius={18}
                borderBottomLeftRadius={6}
              >
                <XStack alignItems="center" gap="$2">
                  <YStack gap="$1">
                    <XStack gap="$1">
                      {[0, 1, 2].map((i) => (
                        <View
                          key={i}
                          width={8}
                          height={8}
                          borderRadius={4}
                          backgroundColor="$labPurple"
                          opacity={0.6}
                        />
                      ))}
                    </XStack>
                  </YStack>
                  <Text fontSize="$3" color="$silver">
                    {mockContact.name} is typing...
                  </Text>
                </XStack>
              </Card>
            </Animated.View>
          )}
        </YStack>
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ 
          paddingHorizontal: isDesktop ? 24 : 16,
          paddingBottom: Platform.OS === 'ios' ? 34 : 16,
          paddingTop: 8,
        }}
      >
        <Animated.View entering={SlideInUp.duration(400)}>
          <XStack 
            backgroundColor="$whiteCoat"
            borderColor="$titanium"
            borderWidth={2}
            borderRadius="$6"
            paddingHorizontal="$4"
            paddingVertical="$3"
            alignItems="flex-end"
            gap="$3"
            shadowColor="$labPurple"
            shadowOpacity={0.1}
            shadowRadius={8}
            elevation={4}
          >
            <Pressable
              style={{
                padding: 8,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Paperclip size={20} color="#6B7280" />
            </Pressable>
            
            <TextInput
              style={{
                flex: 1,
                fontSize: 16,
                color: '#0A0E1A',
                maxHeight: 120,
                minHeight: 44,
                paddingVertical: 8,
                lineHeight: 20,
                outlineStyle: 'none'
              }}
              placeholder="Type a message..."
              placeholderTextColor="#6B7280"
              value={inputText}
              onChangeText={setInputText}
              multiline
              textAlignVertical="center"
              onSubmitEditing={handleSendMessage}
              returnKeyType="send"
              blurOnSubmit={false}
            />
            
            <Pressable
              style={{
                padding: 8,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Mic size={20} color="#6B7280" />
            </Pressable>
            
            <Pressable
              onPress={handleSendMessage}
              disabled={!inputText.trim()}
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: inputText.trim() ? '#6B46E5' : '#E1E8ED',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 2,
              }}
            >
              <Send size={20} color={inputText.trim() ? '#FFFFFF' : '#6B7280'} />
            </Pressable>
          </XStack>
        </Animated.View>
      </KeyboardAvoidingView>
    </YStack>
  );
}
