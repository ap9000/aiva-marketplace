import React from 'react';
import { YStack, XStack, Text, Image } from 'tamagui';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Star, Clock, MapPin, CheckCircle } from 'lucide-react-native';

interface VACardProps {
  va: {
    id: string;
    name: string;
    title: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    hourlyRate: number;
    isOnline: boolean;
    isVerified: boolean;
    isPremium: boolean;
    location: string;
    responseTime: string;
    skills: string[];
    bio: string;
  };
  onPress?: () => void;
  onMessage?: () => void;
  onBook?: () => void;
}

export const VACard: React.FC<VACardProps> = ({ va, onPress, onMessage, onBook }) => {
  return (
    <Card
      pressStyle={{ scale: 0.98 }}
      animation="quick"
      onPress={onPress}
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
              <Text fontSize="$5" fontWeight="600" color="$color">{va.name}</Text>
              {va.isVerified && (
                <CheckCircle size={16} color="#10B981" />
              )}
              {va.isPremium && (
                <Badge variant="premium" size="sm">PRO</Badge>
              )}
            </XStack>
            <Text fontSize="$3" color="$colorHover">{va.title}</Text>
            
            {/* Rating and Location */}
            <XStack alignItems="center" marginTop="$1" gap="$3">
              <XStack alignItems="center">
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <Text fontSize="$3" fontWeight="500" marginLeft="$1">{va.rating}</Text>
                <Text fontSize="$3" color="$colorHover" marginLeft="$1">({va.reviewCount})</Text>
              </XStack>
              
              <XStack alignItems="center">
                <MapPin size={14} color="#6B7280" />
                <Text fontSize="$3" color="$colorHover" marginLeft="$1">{va.location}</Text>
              </XStack>
            </XStack>
          </YStack>
          
          {/* Hourly Rate */}
          <YStack alignItems="flex-end">
            <Text fontSize="$7" fontWeight="bold" color="$labPurple">${va.hourlyRate}</Text>
            <Text fontSize="$1" color="$colorHover">/hour</Text>
          </YStack>
        </XStack>

        {/* Bio */}
        <Text 
          fontSize="$3" 
          color="$color" 
          marginBottom="$3" 
          lineHeight="$5"
          numberOfLines={2}
        >
          {va.bio}
        </Text>

        {/* Skills */}
        <XStack flexWrap="wrap" gap="$2" marginBottom="$3">
          {va.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" size="sm">
              {skill}
            </Badge>
          ))}
          {va.skills.length > 3 && (
            <Badge variant="outline" size="sm">
              +{va.skills.length - 3} more
            </Badge>
          )}
        </XStack>

        {/* Response Time */}
        <XStack alignItems="center">
          <Clock size={14} color="#6B7280" />
          <Text fontSize="$3" color="$colorHover" marginLeft="$1">
            Typically responds in {va.responseTime}
          </Text>
        </XStack>
      </CardContent>

      {/* Action Buttons */}
      <CardFooter>
        <XStack gap="$2" flex={1}>
          <Button
            variant="outline"
            size="sm"
            flex={1}
            onPress={onMessage}
          >
            Message
          </Button>
          <Button
            size="sm"
            flex={1}
            onPress={onBook}
          >
            Book Now
          </Button>
        </XStack>
      </CardFooter>
    </Card>
  );
};