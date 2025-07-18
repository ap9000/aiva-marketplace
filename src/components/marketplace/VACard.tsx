import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
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
      variant="elevated"
      className="mb-4"
      onPress={onPress}
    >
      <CardContent className="p-4">
        {/* Header Section */}
        <View className="flex-row items-start mb-3">
          <View className="relative">
            <Image
              source={{ uri: va.avatar }}
              className="w-16 h-16 rounded-full bg-gray-200"
            />
            {va.isOnline && (
              <View className="absolute bottom-0 right-0 w-4 h-4 bg-success rounded-full border-2 border-white" />
            )}
          </View>
          
          <View className="flex-1 ml-3">
            <View className="flex-row items-center gap-2">
              <Text className="text-lg font-semibold text-gray-900">{va.name}</Text>
              {va.isVerified && (
                <CheckCircle size={16} color="#10B981" />
              )}
              {va.isPremium && (
                <Badge variant="premium" size="sm">PRO</Badge>
              )}
            </View>
            <Text className="text-sm text-gray-600">{va.title}</Text>
            
            {/* Rating and Location */}
            <View className="flex-row items-center mt-1 gap-3">
              <View className="flex-row items-center">
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <Text className="text-sm font-medium ml-1">{va.rating}</Text>
                <Text className="text-sm text-gray-500 ml-1">({va.reviewCount})</Text>
              </View>
              
              <View className="flex-row items-center">
                <MapPin size={14} color="#6B7280" />
                <Text className="text-sm text-gray-500 ml-1">{va.location}</Text>
              </View>
            </View>
          </View>
          
          {/* Hourly Rate */}
          <View className="items-end">
            <Text className="text-xl font-bold text-primary-600">${va.hourlyRate}</Text>
            <Text className="text-xs text-gray-500">/hour</Text>
          </View>
        </View>

        {/* Bio */}
        <Text className="text-sm text-gray-700 mb-3 leading-5" numberOfLines={2}>
          {va.bio}
        </Text>

        {/* Skills */}
        <View className="flex-row flex-wrap gap-2 mb-3">
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
        </View>

        {/* Response Time */}
        <View className="flex-row items-center">
          <Clock size={14} color="#6B7280" />
          <Text className="text-sm text-gray-500 ml-1">
            Typically responds in {va.responseTime}
          </Text>
        </View>
      </CardContent>

      {/* Action Buttons */}
      <CardFooter className="px-4 pb-4 pt-0">
        <View className="flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onPress={onMessage}
          >
            Message
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onPress={onBook}
          >
            Book Now
          </Button>
        </View>
      </CardFooter>
    </Card>
  );
};