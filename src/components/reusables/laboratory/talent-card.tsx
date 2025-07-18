import React from 'react';
import { Pressable } from 'react-native';
import { YStack, XStack, Text, Image } from 'tamagui';
import { Card, CardContent, CardHeader } from '../primitives/card';
import { Ionicons } from '@expo/vector-icons';

interface TalentCardProps {
  va: {
    id: string;
    name: string;
    role: string;
    rating: number;
    reviewCount: number;
    price: string;
    image?: string;
    skills: string[];
    verified: boolean;
    available: boolean;
  };
  onPress?: () => void;
}

export function TalentCard({ va, onPress }: TalentCardProps) {
  return (
    <Card 
      backgroundColor="$whiteCoat"
      borderColor="$titanium"
      hoverStyle={{ 
        borderColor: '$labPurple',
        y: -4,
        shadowColor: '$shadowColor',
        shadowOpacity: 0.2,
        shadowRadius: 8,
      }}
      animation="quick"
      cursor="pointer"
      overflow="hidden"
      onPress={onPress}
    >
      <CardHeader padding="$0">
        <YStack position="relative" aspectRatio={16/9} overflow="hidden" backgroundColor="$backgroundSoft">
          {va.image ? (
            <Image 
              source={{ uri: va.image }} 
              width="100%"
              height="100%"
              resizeMode="cover"
            />
          ) : (
            <YStack width="100%" height="100%" alignItems="center" justifyContent="center">
              <Ionicons name="person-circle-outline" size={60} color="#9CA3AF" />
            </YStack>
          )}
          <YStack 
            position="absolute" 
            top={0} 
            right={0} 
            bottom={0} 
            left={0} 
            backgroundColor="rgba(0,0,0,0.3)"
            opacity={0.5}
          />
          
          {/* Status indicators */}
          <XStack position="absolute" top="$2" right="$2" gap="$2">
            {va.verified && (
              <YStack backgroundColor="$plasmaGreen" borderRadius={20} padding="$1.5">
                <Ionicons name="checkmark" size={12} color="#0A0E1A" />
              </YStack>
            )}
            {va.available && (
              <YStack backgroundColor="$success" width={12} height={12} borderRadius={6} />
            )}
          </XStack>

          {/* Favorite button */}
          <Pressable style={{ position: 'absolute', top: 8, left: 8 }}>
            <YStack backgroundColor="rgba(255,255,255,0.9)" borderRadius={20} padding="$1.5">
              <Ionicons name="heart-outline" size={16} color="#6B46E5" />
            </YStack>
          </Pressable>
        </YStack>
      </CardHeader>
      
      <CardContent>
        <Text fontSize="$5" fontWeight="600" color="$carbonBlack">{va.name}</Text>
        <Text fontSize="$3" color="$silver" marginBottom="$2">{va.role}</Text>
        
        <XStack alignItems="center" justifyContent="space-between" marginBottom="$3">
          <XStack alignItems="center" gap="$1">
            <Ionicons name="star" size={14} color="#6B46E5" />
            <Text fontSize="$3" fontWeight="500" color="$carbonBlack">{va.rating.toFixed(1)}</Text>
            <Text fontSize="$2" color="$silver">({va.reviewCount})</Text>
          </XStack>
          <Text color="$labPurple" fontWeight="600">{va.price}</Text>
        </XStack>
        
        <XStack flexWrap="wrap" gap="$1">
          {va.skills.slice(0, 3).map((skill, i) => (
            <YStack 
              key={i} 
              backgroundColor="rgba(107, 70, 229, 0.1)" 
              paddingHorizontal="$2" 
              paddingVertical="$1" 
              borderRadius={20}
            >
              <Text fontSize="$2" color="$labPurple" fontWeight="500">{skill}</Text>
            </YStack>
          ))}
          {va.skills.length > 3 && (
            <YStack backgroundColor="$titanium" paddingHorizontal="$2" paddingVertical="$1" borderRadius={20}>
              <Text fontSize="$2" color="$silver">+{va.skills.length - 3}</Text>
            </YStack>
          )}
        </XStack>
      </CardContent>
    </Card>
  );
}