import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
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
      variant="default"
      className="mb-3"
      onPress={onPress}
    >
      <CardContent className="p-0">
        {/* Thumbnail if available */}
        {service.thumbnail && (
          <Image
            source={{ uri: service.thumbnail }}
            className="w-full h-32 rounded-t-lg"
            resizeMode="cover"
          />
        )}
        
        <View className="p-4">
          {/* Category Badge */}
          <Badge variant="secondary" size="sm" className="self-start mb-2">
            {service.category}
          </Badge>
          
          {/* Service Title */}
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            {service.title}
          </Text>
          
          {/* Description */}
          <Text className="text-sm text-gray-600 mb-3" numberOfLines={2}>
            {service.description}
          </Text>
          
          {/* Provider Info */}
          <Pressable 
            onPress={onProviderPress}
            className="flex-row items-center mb-3"
          >
            <Image
              source={{ uri: service.provider.avatar }}
              className="w-8 h-8 rounded-full bg-gray-200"
            />
            <View className="ml-2 flex-1">
              <View className="flex-row items-center">
                <Text className="text-sm font-medium text-gray-900">
                  {service.provider.name}
                </Text>
                {service.provider.isVerified && (
                  <Badge variant="verified" size="sm" className="ml-2">
                    Verified
                  </Badge>
                )}
              </View>
              <View className="flex-row items-center">
                <Star size={12} color="#F59E0B" fill="#F59E0B" />
                <Text className="text-xs text-gray-500 ml-1">
                  {service.provider.rating}
                </Text>
              </View>
            </View>
          </Pressable>
          
          {/* Service Details */}
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <Clock size={16} color="#6B7280" />
              <Text className="text-sm text-gray-600 ml-1">
                {service.deliveryTime}
              </Text>
            </View>
            
            <View className="flex-row items-center">
              <TrendingUp size={16} color="#10B981" />
              <Text className="text-sm text-gray-600 ml-1">
                {service.completedCount} completed
              </Text>
            </View>
          </View>
          
          {/* Price and Action */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <DollarSign size={20} color="#3B82F6" />
              <Text className="text-xl font-bold text-primary-600">
                {service.price}
              </Text>
              <Text className="text-sm text-gray-500 ml-1">
                /{service.priceType === 'hourly' ? 'hr' : 'project'}
              </Text>
            </View>
            
            <Button size="sm" onPress={onPress}>
              View Details
            </Button>
          </View>
        </View>
      </CardContent>
    </Card>
  );
};