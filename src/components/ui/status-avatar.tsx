import React from 'react';
import { YStack, XStack, Text, View, Image } from 'tamagui';

interface StatusAvatarProps {
  name?: string;
  source?: { uri: string } | null;
  size?: number;
  isOnline?: boolean;
  showStatus?: boolean;
}

export const StatusAvatar = ({ 
  name, 
  source = null,
  size = 48, 
  isOnline = false,
  showStatus = true 
}: StatusAvatarProps) => {
  const statusSize = size > 80 ? 20 : size > 48 ? 16 : 12;
  const statusBorder = size > 80 ? 3 : 2;
  
  return (
    <YStack position="relative">
      {source?.uri ? (
        <Image
          source={source}
          width={size}
          height={size}
          borderRadius={size / 2}
          backgroundColor="$backgroundSoft"
        />
      ) : (
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
            {name ? name.split(' ').map(n => n[0]).join('') : '?'}
          </Text>
        </XStack>
      )}
      
      {showStatus && (
        <View
          position="absolute"
          bottom={0}
          right={0}
          width={statusSize}
          height={statusSize}
          borderRadius={statusSize / 2}
          backgroundColor={isOnline ? '$plasmaGreen' : '$silver'}
          borderWidth={statusBorder}
          borderColor="$background"
        />
      )}
    </YStack>
  );
};

export default StatusAvatar;