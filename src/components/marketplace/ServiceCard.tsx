import React from 'react';
import { YStack, XStack, Text, Image } from 'tamagui';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Clock, DollarSign, Star, TrendingUp } from 'lucide-react-native';

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    provider: {
      id: string;
      name: string;
      avatar: string;
      rating: number;
      isVerified: boolean;
    };
    price: number;
    priceType: 'fixed' | 'hourly';
    deliveryTime: string;
    category: string;
    thumbnail?: string;
    popularityScore: number;
    completedCount: number;
  };
  onPress?: () => void;
  onProviderPress?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  onPress, 
  onProviderPress 
}) => {
  return (
    <Card
      onPress={onPress}
      animation="quick"
      pressStyle={{ scale: 0.98 }}
    >
      <CardContent padding="$0">
        {/* Thumbnail if available */}
        {service.thumbnail && (
          <Image
            source={{ uri: service.thumbnail }}
            width="100%"
            height={128}
            borderTopLeftRadius="$4"
            borderTopRightRadius="$4"
            resizeMode="cover"
          />
        )}
        
        <YStack padding="$4">
          {/* Category Badge */}
          <Badge variant="secondary" size="sm" alignSelf="flex-start" marginBottom="$2">
            {service.category}
          </Badge>
          
          {/* Service Title */}
          <Text fontSize="$5" fontWeight="600" color="$color" marginBottom="$2">
            {service.title}
          </Text>
          
          {/* Description */}
          <Text fontSize="$3" color="$colorHover" marginBottom="$3" numberOfLines={2}>
            {service.description}
          </Text>
          
          {/* Provider Info */}
          <XStack 
            alignItems="center" 
            marginBottom="$3"
            pressStyle={{ opacity: 0.8 }}
            onPress={onProviderPress}
          >
            <Image
              source={{ uri: service.provider.avatar }}
              width={32}
              height={32}
              borderRadius={16}
              backgroundColor="$backgroundSoft"
            />
            <YStack marginLeft="$2" flex={1}>
              <XStack alignItems="center">
                <Text fontSize="$3" fontWeight="500" color="$color">
                  {service.provider.name}
                </Text>
                {service.provider.isVerified && (
                  <Badge variant="verified" size="sm" marginLeft="$2">
                    Verified
                  </Badge>
                )}
              </XStack>
              <XStack alignItems="center">
                <Star size={12} color="#F59E0B" fill="#F59E0B" />
                <Text fontSize="$2" color="$colorHover" marginLeft="$1">
                  {service.provider.rating}
                </Text>
              </XStack>
            </YStack>
          </XStack>
          
          {/* Service Details */}
          <XStack alignItems="center" justifyContent="space-between" marginBottom="$3">
            <XStack alignItems="center">
              <Clock size={16} color="#6B7280" />
              <Text fontSize="$3" color="$colorHover" marginLeft="$1">
                {service.deliveryTime}
              </Text>
            </XStack>
            
            <XStack alignItems="center">
              <TrendingUp size={16} color="#10B981" />
              <Text fontSize="$3" color="$colorHover" marginLeft="$1">
                {service.completedCount} completed
              </Text>
            </XStack>
          </XStack>
          
          {/* Price and Action */}
          <XStack alignItems="center" justifyContent="space-between">
            <XStack alignItems="center">
              <DollarSign size={20} color="#3B82F6" />
              <Text fontSize="$7" fontWeight="bold" color="$primary">
                {service.price}
              </Text>
              <Text fontSize="$3" color="$colorHover" marginLeft="$1">
                /{service.priceType === 'hourly' ? 'hr' : 'project'}
              </Text>
            </XStack>
            
            <Button size="sm" onPress={onPress}>
              View Details
            </Button>
          </XStack>
        </YStack>
      </CardContent>
    </Card>
  );
};