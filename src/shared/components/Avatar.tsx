import React, { memo } from 'react';
import {
  View,
  ImageSourcePropType,
} from 'react-native';
import { YStack, Image, Text, XStack } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';

export interface AvatarProps {
  source?: ImageSourcePropType | string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy';
  verified?: boolean;
}

export const Avatar: React.FC<AvatarProps> = memo(({
  source,
  name,
  size = 'md',
  status,
  verified,
}) => {
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const imageSource = typeof source === 'string' ? { uri: source } : source;
  
  const sizes = {
    sm: { width: 32, height: 32, fontSize: '$2', iconSize: 12, badgeSize: 16 },
    md: { width: 48, height: 48, fontSize: '$3', iconSize: 16, badgeSize: 20 },
    lg: { width: 64, height: 64, fontSize: '$5', iconSize: 20, badgeSize: 24 },
    xl: { width: 96, height: 96, fontSize: '$7', iconSize: 24, badgeSize: 32 },
  };

  const statusColors = {
    online: '$success',
    offline: '$silver',
    busy: '$warning',
  };

  const currentSize = sizes[size];

  return (
    <YStack 
      position="relative" 
      width={currentSize.width} 
      height={currentSize.height}
      borderRadius={currentSize.width / 2}
      backgroundColor="$backgroundSoft"
      overflow="hidden"
    >
      {source ? (
        <Image 
          source={imageSource} 
          width="100%"
          height="100%"
          borderRadius={currentSize.width / 2}
          resizeMode="cover"
        />
      ) : (
        <YStack 
          width="100%"
          height="100%"
          backgroundColor="$labPurple"
          alignItems="center"
          justifyContent="center"
          borderRadius={currentSize.width / 2}
        >
          <Text fontSize={currentSize.fontSize} fontWeight="600" color="$whiteCoat">
            {name ? getInitials(name) : '?'}
          </Text>
        </YStack>
      )}

      {status && (
        <YStack
          position="absolute"
          bottom={0}
          right={0}
          width={size === 'sm' ? 8 : size === 'md' ? 12 : size === 'lg' ? 16 : 20}
          height={size === 'sm' ? 8 : size === 'md' ? 12 : size === 'lg' ? 16 : 20}
          backgroundColor={statusColors[status]}
          borderRadius={10}
          borderWidth={2}
          borderColor="$background"
        />
      )}

      {verified && (
        <YStack
          position="absolute"
          bottom={size === 'sm' || size === 'md' ? -2 : -4}
          right={size === 'sm' || size === 'md' ? -2 : -4}
          width={currentSize.badgeSize}
          height={currentSize.badgeSize}
          backgroundColor="$labPurple"
          borderRadius={currentSize.badgeSize / 2}
          alignItems="center"
          justifyContent="center"
        >
          <MaterialIcons 
            name="verified" 
            size={currentSize.iconSize} 
            color="white" 
          />
        </YStack>
      )}
    </YStack>
  );
});

Avatar.displayName = 'Avatar';