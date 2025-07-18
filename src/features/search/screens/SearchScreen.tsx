import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, View, Pressable, TextInput, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { YStack, XStack, Text, H1, H2, H3, Paragraph } from 'tamagui';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useNavigation } from '@react-navigation/native';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import { 
  MessageCircle, 
  Send, 
  Mic, 
  Search as SearchIcon,
  Sparkles,
  ArrowRight,
  Filter,
  Clock,
  TrendingUp,
  User,
  Zap,
  Clipboard,
  Laptop,
  Smartphone,
  PenTool,
  Headphones,
  BarChart3
} from 'lucide-react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface QuickReply {
  id: string;
  text: string;
  icon: React.ComponentType<any>;
  category: string;
}

const quickReplies: QuickReply[] = [
  {
    id: '1',
    text: 'I need help with admin tasks',
    icon: Clipboard,
    category: 'Administrative',
  },
  {
    id: '2',
    text: 'Looking for technical support',
    icon: Laptop,
    category: 'Technical',
  },
  {
    id: '3',
    text: 'Social media management',
    icon: Smartphone,
    category: 'Marketing',
  },
  {
    id: '4',
    text: 'Content creation and writing',
    icon: PenTool,
    category: 'Content',
  },
  {
    id: '5',
    text: 'Customer service support',
    icon: Headphones,
    category: 'Support',
  },
  {
    id: '6',
    text: 'Data analysis and research',
    icon: BarChart3,
    category: 'Analytics',
  },
];

const recentSearches = [
  'Executive assistants in New York',
  'Social media managers under $40/hr',
  'Part-time content writers',
  'Customer service specialists',
];

const trendingSkills = [
  'Email Management',
  'Social Media',
  'Data Entry',
  'Customer Support',
  'Content Writing',
  'Virtual Administration',
];

const AIAvatar = () => {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    
    rotate.value = withRepeat(
      withTiming(360, { duration: 10000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#6B46E5',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#6B46E5',
          shadowOpacity: 0.3,
          shadowRadius: 15,
          elevation: 8,
        },
        animatedStyle,
      ]}
    >
      <Sparkles size={24} color="#FFFFFF" />
    </Animated.View>
  );
};

const MessageBubble = ({ message, index }: { message: ChatMessage; index: number }) => {
  const isUser = message.type === 'user';
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width * 0.85, 320); // Max 85% of screen or 320px
  
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).duration(500)}
      style={{
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        maxWidth: maxWidth,
        marginBottom: 16,
        paddingHorizontal: 4, // Small horizontal padding to prevent edge touching
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
            style={{
              flexWrap: 'wrap',
              wordWrap: 'break-word',
            }}
          >
            {message.content}
          </Text>
          
          {message.suggestions && (
            <YStack gap="$2" marginTop="$3">
              {message.suggestions.map((suggestion, idx) => (
                <Pressable
                  key={idx}
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    backgroundColor: isUser ? 'rgba(255,255,255,0.15)' : '#F8FAFC',
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: isUser ? 'rgba(255,255,255,0.2)' : '#E1E8ED',
                    minHeight: 44, // iOS touch target
                    justifyContent: 'center',
                  }}
                >
                  <Text 
                    fontSize="$3" 
                    color={isUser ? '$whiteCoat' : '$labPurple'}
                    fontWeight="500"
                    textAlign="center"
                  >
                    {suggestion}
                  </Text>
                </Pressable>
              ))}
            </YStack>
          )}
        </CardContent>
      </Card>
      
      <Text
        fontSize="$2"
        color="$silver"
        textAlign={isUser ? 'right' : 'left'}
        marginTop="$2"
        marginHorizontal="$2"
      >
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </Animated.View>
  );
};

export default function SearchScreen() {
  const navigation = useNavigation();
  const { isDesktop } = useResponsive();
  const [mode, setMode] = useState<'concierge' | 'manual'>('concierge');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI Concierge. I'll help you find the perfect Virtual Assistant for your needs. What type of support are you looking for?",
      timestamp: new Date(),
      suggestions: [
        "Tell me about your business",
        "Show me VA categories",
        "I have specific requirements",
      ],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const responses = [
        {
          content: "Great! Based on your needs, I can recommend several excellent VAs. Let me ask a few questions to narrow down the perfect matches for you.",
          suggestions: [
            "What's your budget range?",
            "Do you need full-time or part-time?",
            "Any specific skills required?",
          ],
        },
        {
          content: "I found 12 Virtual Assistants that match your criteria! They specialize in administrative tasks and have excellent ratings. Would you like to see their profiles?",
          suggestions: [
            "Show me the profiles",
            "Filter by availability",
            "Sort by rating",
          ],
        },
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'ai',
        content: randomResponse.content,
        timestamp: new Date(),
        suggestions: randomResponse.suggestions,
      }]);
      
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Simulate AI response
    simulateAIResponse(inputText);
  };

  const handleQuickReply = (reply: QuickReply) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: reply.text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    simulateAIResponse(reply.text);
  };

  const renderConciergeMode = () => (
    <YStack flex={1} gap="$4">
      {/* AI Avatar Header */}
      <Animated.View entering={FadeIn.duration(800)}>
        <YStack alignItems="center" paddingVertical="$3">
          <AIAvatar />
          <H2 fontSize="$5" color="$carbonBlack" marginTop="$2" textAlign="center">
            AI Concierge
          </H2>
        </YStack>
      </Animated.View>

      {/* Chat Messages */}
      <ScrollView
        ref={scrollViewRef}
        flex={1}
        paddingHorizontal="$4"
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message, index) => (
          <MessageBubble key={message.id} message={message} index={index} />
        ))}
        
        {isTyping && (
          <Animated.View entering={FadeIn.duration(300)}>
            <Card backgroundColor="$whiteCoat" alignSelf="flex-start" padding="$4" marginBottom="$4">
              <XStack alignItems="center" gap="$2">
                <YStack gap="$1">
                  <View style={{ flexDirection: 'row', gap: 4 }}>
                    {[0, 1, 2].map((i) => (
                      <Animated.View
                        key={i}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: '#6B46E5',
                          opacity: 0.6,
                        }}
                      />
                    ))}
                  </View>
                </YStack>
                <Text fontSize="$3" color="$silver">AI is typing...</Text>
              </XStack>
            </Card>
          </Animated.View>
        )}
      </ScrollView>

      {/* Quick Replies */}
      {messages.length === 1 && (
        <Animated.View entering={FadeInDown.delay(400).duration(600)}>
          <YStack paddingHorizontal="$4" marginBottom="$4">
            <Text fontSize="$4" fontWeight="600" color="$carbonBlack" marginBottom="$3">
              Quick Replies:
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <XStack gap="$3">
                {quickReplies.map((reply) => (
                  <Pressable
                    key={reply.id}
                    onPress={() => handleQuickReply(reply)}
                    style={{
                      minWidth: 200,
                      padding: 16,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 16,
                      borderWidth: 2,
                      borderColor: '#E1E8ED',
                      alignItems: 'center',
                    }}
                  >
                    <YStack marginBottom="$2">
                      <reply.icon size={24} color="#6B46E5" />
                    </YStack>
                    <Text fontSize="$4" fontWeight="500" color="$carbonBlack" textAlign="center">
                      {reply.text}
                    </Text>
                    <Text fontSize="$3" color="$silver" marginTop="$1">
                      {reply.category}
                    </Text>
                  </Pressable>
                ))}
              </XStack>
            </ScrollView>
          </YStack>
        </Animated.View>
      )}

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ 
          paddingHorizontal: 16, 
          paddingBottom: Platform.OS === 'ios' ? 34 : 16, // Account for iPhone safe area
          paddingTop: 8,
        }}
      >
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
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              color: '#0A0E1A',
              maxHeight: 120, // Prevent text from getting too tall
              minHeight: 44, // iOS minimum touch target
              paddingVertical: 8,
              lineHeight: 20,
            }}
            placeholder="Ask me about VAs..."
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
            onPress={handleSendMessage}
            disabled={!inputText.trim()}
            style={{
              width: 44, // iOS minimum touch target
              height: 44,
              borderRadius: 22,
              backgroundColor: inputText.trim() ? '#6B46E5' : '#E1E8ED',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 2, // Align with text baseline
            }}
          >
            <Send size={20} color={inputText.trim() ? '#FFFFFF' : '#6B7280'} />
          </Pressable>
        </XStack>
      </KeyboardAvoidingView>
    </YStack>
  );

  const renderManualMode = () => (
    <YStack flex={1} gap="$4">
      {/* Search Header */}
      <Animated.View entering={FadeIn.duration(600)}>
        <YStack paddingVertical="$3" alignItems="center">
          <SearchIcon size={24} color="#6B46E5" />
          <H2 fontSize="$5" color="$carbonBlack" marginBottom="$1" textAlign="center">
            Manual Search
          </H2>
          <Paragraph fontSize="$3" color="$silver" textAlign="center" maxWidth={200}>
            Advanced search with filters
          </Paragraph>
        </YStack>
      </Animated.View>

      {/* Enhanced Search Input */}
      <Animated.View entering={FadeInDown.delay(200).duration(600)}>
        <Card
          backgroundColor="$whiteCoat"
          borderColor="$titanium"
          borderWidth={2}
          borderRadius="$6"
          padding="$0"
          overflow="hidden"
          shadowColor="$labPurple"
          shadowOpacity={0.1}
          shadowRadius={12}
          elevation={6}
        >
          <XStack
            paddingHorizontal="$4"
            paddingVertical="$4"
            alignItems="center"
            gap="$3"
          >
            <SearchIcon size={24} color="#6B46E5" />
            <TextInput
              style={{ 
                flex: 1, 
                fontSize: 16, 
                color: '#0A0E1A',
                minHeight: 44,
                paddingVertical: 8,
              }}
              placeholder="Search skills, specialties, locations..."
              placeholderTextColor="#6B7280"
            />
            <Button 
              size="$5" 
              backgroundColor="$labPurple"
              borderRadius="$6"
              paddingHorizontal="$6"
              paddingVertical="$3"
              pressStyle={{ backgroundColor: '$primaryPress', scale: 0.98 }}
              hoverStyle={{ backgroundColor: '$primaryHover' }}
              shadowColor="$labPurple"
              shadowOpacity={0.2}
              shadowRadius={8}
              elevation={4}
            >
              <XStack alignItems="center" gap="$2">
                <SearchIcon size={18} color="#FFFFFF" />
                <Text color="$whiteCoat" fontWeight="600" fontSize="$4">Search</Text>
              </XStack>
            </Button>
          </XStack>
        </Card>
      </Animated.View>

      {/* Quick Filter Pills */}
      <Animated.View entering={FadeInDown.delay(300).duration(600)}>
        <YStack gap="$3">
          <Text fontSize="$4" fontWeight="600" color="$carbonBlack" paddingHorizontal="$1">
            Quick Filters
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <XStack gap="$3" paddingHorizontal="$1">
              {['Available Now', 'Top Rated', 'Under $30/hr', 'English Native', 'Full-time', 'Part-time'].map((filter, index) => (
                <Pressable
                  key={index}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: '#E1E8ED',
                    minWidth: 100,
                    alignItems: 'center',
                    minHeight: 44,
                    justifyContent: 'center',
                  }}
                >
                  <Text fontSize="$3" color="$carbonBlack" fontWeight="500">
                    {filter}
                  </Text>
                </Pressable>
              ))}
            </XStack>
          </ScrollView>
        </YStack>
      </Animated.View>

      {/* Recent Searches */}
      <Animated.View entering={FadeInDown.delay(400).duration(600)}>
        <Card backgroundColor="$whiteCoat" padding="$5" borderRadius="$5">
          <XStack alignItems="center" gap="$3" marginBottom="$4">
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: '#6B46E5',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Clock size={18} color="#FFFFFF" />
            </View>
            <H3 fontSize="$5" fontWeight="bold" color="$carbonBlack">
              Recent Searches
            </H3>
          </XStack>
          
          <YStack gap="$3">
            {recentSearches.map((search, index) => (
              <Pressable
                key={index}
                style={{
                  paddingVertical: 14,
                  paddingHorizontal: 16,
                  backgroundColor: '#F8FAFC',
                  borderRadius: 12,
                  borderLeftWidth: 4,
                  borderLeftColor: '#6B46E5',
                  minHeight: 56,
                  justifyContent: 'center',
                }}
              >
                <XStack alignItems="center" justifyContent="space-between">
                  <Text fontSize="$4" color="$carbonBlack" fontWeight="500" flex={1}>
                    {search}
                  </Text>
                  <ArrowRight size={18} color="#6B7280" />
                </XStack>
              </Pressable>
            ))}
          </YStack>
        </Card>
      </Animated.View>

      {/* Trending Skills */}
      <Animated.View entering={FadeInDown.delay(500).duration(600)}>
        <Card backgroundColor="$whiteCoat" padding="$5" borderRadius="$5">
          <XStack alignItems="center" gap="$3" marginBottom="$4">
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: '#10F4B1',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TrendingUp size={18} color="#0A0E1A" />
            </View>
            <H3 fontSize="$5" fontWeight="bold" color="$carbonBlack">
              Trending Skills
            </H3>
          </XStack>
          
          <XStack flexWrap="wrap" gap="$3">
            {trendingSkills.map((skill, index) => (
              <Pressable
                key={index}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  backgroundColor: '#6B46E5',
                  borderRadius: 20,
                  minHeight: 44,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text fontSize="$3" color="#FFFFFF" fontWeight="600">
                  {skill}
                </Text>
              </Pressable>
            ))}
          </XStack>
        </Card>
      </Animated.View>

      {/* Bottom Spacing for iOS */}
      <View style={{ height: Platform.OS === 'ios' ? 34 : 16 }} />
    </YStack>
  );

  return (
    <YStack flex={1} backgroundColor="$backgroundSoft">
      {/* Header with Mode Toggle */}
      <YStack
        backgroundColor="$background"
        paddingHorizontal={isDesktop ? '$8' : '$4'}
        paddingTop="$6"
        paddingBottom="$4"
      >
        <Animated.View entering={FadeIn.duration(600)}>
          <XStack alignItems="center" justifyContent="center" gap="$3" marginBottom="$4">
            <SearchIcon size={isDesktop ? 32 : 24} color="#6B46E5" />
            <H1 fontSize={isDesktop ? '$8' : '$6'} color="$carbonBlack" textAlign="center">
              Find Your Perfect VA
            </H1>
          </XStack>
          
          {/* Mode Toggle */}
          <XStack
            backgroundColor="$whiteCoat"
            borderRadius="$4"
            padding="$1"
            alignSelf="center"
            borderWidth={2}
            borderColor="$titanium"
          >
            <Pressable
              onPress={() => setMode('concierge')}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 12,
                borderRadius: 12,
                backgroundColor: mode === 'concierge' ? '#6B46E5' : 'transparent',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Sparkles size={20} color={mode === 'concierge' ? '#FFFFFF' : '#6B7280'} />
              <Text
                fontSize="$4"
                fontWeight="500"
                color={mode === 'concierge' ? '$whiteCoat' : '$silver'}
              >
                AI Concierge
              </Text>
            </Pressable>
            
            <Pressable
              onPress={() => setMode('manual')}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 12,
                borderRadius: 12,
                backgroundColor: mode === 'manual' ? '#6B46E5' : 'transparent',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <SearchIcon size={20} color={mode === 'manual' ? '#FFFFFF' : '#6B7280'} />
              <Text
                fontSize="$4"
                fontWeight="500"
                color={mode === 'manual' ? '$whiteCoat' : '$silver'}
              >
                Manual Search
              </Text>
            </Pressable>
          </XStack>
        </Animated.View>
      </YStack>

      {/* Content */}
      <YStack flex={1} paddingHorizontal={isDesktop ? '$8' : '$4'} paddingTop="$4">
        {mode === 'concierge' ? renderConciergeMode() : renderManualMode()}
      </YStack>
    </YStack>
  );
}
