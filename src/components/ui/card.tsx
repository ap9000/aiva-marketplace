import React from 'react';
import { Card as TamaguiCard, YStack, XStack, Text, CardProps as TamaguiCardProps, YStackProps, XStackProps, TextProps } from 'tamagui';

export interface CardProps extends TamaguiCardProps {
  variant?: 'default' | 'elevated' | 'outline';
  padding?: 'none' | 'sm' | 'default' | 'lg';
  onPress?: () => void;
}

export const Card = React.forwardRef<any, CardProps>(
  ({ variant = 'default', padding = 'default', onPress, children, ...props }, ref) => {
    const variantStyles = {
      default: {
        borderWidth: 1,
        borderColor: '$borderColor',
        shadowColor: '$shadowColor',
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      elevated: {
        shadowColor: '$shadowColor',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      },
      outline: {
        borderWidth: 2,
        borderColor: '$borderColor',
      },
    };

    const paddingValues = {
      none: '$0',
      sm: '$3',
      default: '$4',
      lg: '$6',
    };
    
    return (
      <TamaguiCard
        ref={ref}
        padding={paddingValues[padding]}
        borderRadius="$3"
        backgroundColor="$background"
        onPress={onPress}
        pressStyle={onPress ? { opacity: 0.9 } : undefined}
        {...variantStyles[variant]}
        {...props}
      >
        {children}
      </TamaguiCard>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<any, YStackProps>(
  ({ ...props }, ref) => (
    <YStack ref={ref} paddingBottom="$4" {...props} />
  )
);

CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<any, TextProps>(
  ({ children, ...props }, ref) => (
    <Text
      ref={ref}
      fontSize="$6"
      fontWeight="600"
      color="$color"
      {...props}
    >
      {children}
    </Text>
  )
);

CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<any, TextProps>(
  ({ children, ...props }, ref) => (
    <Text
      ref={ref}
      marginTop="$1"
      fontSize="$3"
      color="$colorHover"
      {...props}
    >
      {children}
    </Text>
  )
);

CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<any, YStackProps>(
  ({ ...props }, ref) => (
    <YStack ref={ref} {...props} />
  )
);

CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<any, XStackProps>(
  ({ ...props }, ref) => (
    <XStack ref={ref} paddingTop="$4" {...props} />
  )
);

CardFooter.displayName = 'CardFooter';