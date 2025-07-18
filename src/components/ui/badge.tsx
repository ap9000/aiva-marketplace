import React from 'react';
import { YStack, Text, YStackProps } from 'tamagui';

export interface BadgeProps extends YStackProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'success' | 'destructive' | 'warning' | 'outline' | 'verified' | 'premium';
  size?: 'default' | 'sm' | 'lg';
}

export const Badge = React.forwardRef<any, BadgeProps>(
  ({ variant = 'default', size = 'default', children, ...props }, ref) => {
    const variantStyles = {
      default: {
        backgroundColor: 'rgba(107, 70, 229, 0.1)',
        color: '$labPurple',
      },
      secondary: {
        backgroundColor: '$backgroundSoft',
        color: '$color',
      },
      success: {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        color: '$success',
      },
      destructive: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        color: '$error',
      },
      warning: {
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        color: '$warning',
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
        color: '$color',
      },
      verified: {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        color: '$success',
      },
      premium: {
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        color: '#8B5CF6',
      },
    };

    const sizeStyles = {
      default: {
        paddingHorizontal: '$2.5',
        paddingVertical: '$0.5',
        fontSize: '$2',
      },
      sm: {
        paddingHorizontal: '$2',
        paddingVertical: '$0.5',
        fontSize: '$1',
      },
      lg: {
        paddingHorizontal: '$3',
        paddingVertical: '$1',
        fontSize: '$3',
      },
    };
    
    const currentVariant = variantStyles[variant];
    const currentSize = sizeStyles[size];
    
    return (
      <YStack
        ref={ref}
        flexDirection="row"
        alignItems="center"
        borderRadius={9999}
        {...currentVariant}
        paddingHorizontal={currentSize.paddingHorizontal}
        paddingVertical={currentSize.paddingVertical}
        {...props}
      >
        <Text 
          fontSize={currentSize.fontSize} 
          fontWeight="500" 
          color={currentVariant.color}
        >
          {children}
        </Text>
      </YStack>
    );
  }
);

Badge.displayName = 'Badge';