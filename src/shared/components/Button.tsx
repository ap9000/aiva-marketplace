import React, { memo } from 'react';
import {
  ActivityIndicator,
  PressableProps,
} from 'react-native';
import { Button as TamaguiButton, ButtonProps as TamaguiButtonProps, Text } from 'tamagui';
import { theme } from '../../theme';

export interface ButtonProps extends Omit<TamaguiButtonProps, 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  title: string;
}

export const Button: React.FC<ButtonProps> = memo(({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  title,
  onPress,
  ...props
}) => {
  const handlePress = () => {
    if (!loading && !disabled && onPress) {
      onPress();
    }
  };

  const variantStyles = {
    primary: {
      backgroundColor: '$labPurple',
      color: '$whiteCoat',
      hoverStyle: { backgroundColor: '$primaryHover' },
      pressStyle: { backgroundColor: '$primaryPress' },
    },
    secondary: {
      backgroundColor: '$backgroundSoft',
      color: '$color',
      borderWidth: 1,
      borderColor: '$borderColor',
      hoverStyle: { backgroundColor: '$gray4' },
      pressStyle: { backgroundColor: '$gray5' },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '$labPurple',
      hoverStyle: { backgroundColor: '$backgroundSoft' },
      pressStyle: { backgroundColor: '$backgroundSoft' },
    },
    danger: {
      backgroundColor: '$error',
      color: '$whiteCoat',
      hoverStyle: { backgroundColor: '$red10' },
      pressStyle: { backgroundColor: '$red11' },
    },
  };

  const sizeStyles = {
    sm: { height: 36, paddingHorizontal: '$2', fontSize: '$3' },
    md: { height: 44, paddingHorizontal: '$3', fontSize: '$4' },
    lg: { height: 48, paddingHorizontal: '$4', fontSize: '$5' },
  };

  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];

  return (
    <TamaguiButton
      {...currentVariant}
      height={currentSize.height}
      paddingHorizontal={currentSize.paddingHorizontal}
      width={fullWidth ? '100%' : undefined}
      opacity={disabled || loading ? 0.6 : 1}
      onPress={handlePress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' || variant === 'danger' ? theme.colors.white : theme.colors.primary.main}
          size="small"
        />
      ) : (
        <Text fontSize={currentSize.fontSize} fontWeight="500" color={currentVariant.color}>
          {title}
        </Text>
      )}
    </TamaguiButton>
  );
});

Button.displayName = 'Button';