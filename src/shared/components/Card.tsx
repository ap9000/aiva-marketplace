import React, { memo } from 'react';
import {
  ViewProps,
  PressableProps,
} from 'react-native';
import { Card as TamaguiCard, CardProps as TamaguiCardProps } from 'tamagui';

export interface CardProps extends TamaguiCardProps {
  elevated?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = memo(({
  elevated = true,
  padding = 'md',
  children,
  onPress,
  ...props
}) => {
  const paddingValues = {
    none: '$0',
    sm: '$2',
    md: '$4',
    lg: '$6',
  };

  return (
    <TamaguiCard
      elevate={elevated}
      padding={paddingValues[padding]}
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      animation="quick"
      pressStyle={onPress ? { scale: 0.99, opacity: 0.95 } : undefined}
      onPress={onPress}
      {...props}
    >
      {children}
    </TamaguiCard>
  );
});

Card.displayName = 'Card';