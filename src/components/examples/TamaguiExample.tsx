import React from 'react';
import { YStack, XStack, Text, Image, ScrollView } from 'tamagui';
import { Button } from '../reusables/primitives/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../reusables/primitives/card';
import { Input } from '../reusables/primitives/input';
import { Star, Clock, MapPin, CheckCircle } from 'lucide-react-native';

// Example of a VA Card using Tamagui
export const TamaguiVACard = () => {
  const [searchText, setSearchText] = React.useState('');
  
  const va = {
    name: 'Sarah Johnson',
    title: 'Executive Virtual Assistant',
    avatar: 'https://example.com/avatar.jpg',
    rating: 4.8,
    reviewCount: 156,
    hourlyRate: 45,
    isOnline: true,
    isVerified: true,
    location: 'New York, USA',
    responseTime: '< 1 hour',
    skills: ['Admin Support', 'Calendar Management', 'Email Management'],
    bio: 'Professional VA with 5+ years of experience'
  };

  return (
    <ScrollView>
      <YStack padding="$4" gap="$4">
        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle>Find Your Perfect VA</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Search virtual assistants..."
              value={searchText}
              onChangeText={setSearchText}
            />
          </CardContent>
        </Card>

        {/* VA Card Example */}
        <Card
          pressStyle={{ scale: 0.98 }}
          animation="quick"
          hoverStyle={{ borderColor: '$labPurple' }}
        >
          <CardContent>
            {/* Header Section */}
            <XStack alignItems="flex-start" marginBottom="$3">
              <YStack position="relative">
                <Image
                  source={{ uri: va.avatar }}
                  width={64}
                  height={64}
                  borderRadius={32}
                  backgroundColor="$backgroundSoft"
                />
                {va.isOnline && (
                  <YStack
                    position="absolute"
                    bottom={0}
                    right={0}
                    width={16}
                    height={16}
                    backgroundColor="$success"
                    borderRadius={8}
                    borderWidth={2}
                    borderColor="$background"
                  />
                )}
              </YStack>
              
              <YStack flex={1} marginLeft="$3">
                <XStack alignItems="center" gap="$2">
                  <Text fontSize="$5" fontWeight="600">{va.name}</Text>
                  {va.isVerified && (
                    <CheckCircle size={16} color="$labPurple" />
                  )}
                </XStack>
                <Text fontSize="$3" color="$colorHover">{va.title}</Text>
                
                <XStack alignItems="center" gap="$3" marginTop="$1">
                  <XStack alignItems="center" gap="$1">
                    <Star size={14} color="$warning" fill="$warning" />
                    <Text fontSize="$2" fontWeight="500">{va.rating}</Text>
                    <Text fontSize="$2" color="$colorHover">({va.reviewCount})</Text>
                  </XStack>
                  
                  <XStack alignItems="center" gap="$1">
                    <MapPin size={14} color="$colorHover" />
                    <Text fontSize="$2" color="$colorHover">{va.location}</Text>
                  </XStack>
                </XStack>
              </YStack>
              
              <YStack alignItems="flex-end">
                <Text fontSize="$6" fontWeight="600" color="$labPurple">
                  ${va.hourlyRate}
                </Text>
                <Text fontSize="$2" color="$colorHover">/hour</Text>
              </YStack>
            </XStack>

            {/* Bio Section */}
            <Text fontSize="$3" color="$color" marginBottom="$3">
              {va.bio}
            </Text>

            {/* Skills Section */}
            <XStack flexWrap="wrap" gap="$2" marginBottom="$3">
              {va.skills.map((skill, index) => (
                <YStack
                  key={index}
                  backgroundColor="$backgroundSoft"
                  paddingHorizontal="$3"
                  paddingVertical="$1.5"
                  borderRadius="$2"
                >
                  <Text fontSize="$2" color="$color">{skill}</Text>
                </YStack>
              ))}
            </XStack>

            {/* Response Time */}
            <XStack alignItems="center" gap="$1">
              <Clock size={14} color="$colorHover" />
              <Text fontSize="$2" color="$colorHover">
                Responds in {va.responseTime}
              </Text>
            </XStack>
          </CardContent>

          <CardFooter>
            <XStack flex={1} gap="$2">
              <Button
                variant="outline"
                size="$3"
                flex={1}
                onPress={() => console.log('Message')}
              >
                Message
              </Button>
              <Button
                variant="default"
                size="$3"
                flex={1}
                onPress={() => console.log('Book Now')}
              >
                Book Now
              </Button>
            </XStack>
          </CardFooter>
        </Card>

        {/* Example of Different Button Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
          </CardHeader>
          <CardContent>
            <YStack gap="$2">
              <Button variant="default">Default Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="destructive">Destructive Button</Button>
              <Button variant="link">Link Button</Button>
            </YStack>
          </CardContent>
        </Card>
      </YStack>
    </ScrollView>
  );
};