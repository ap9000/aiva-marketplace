import React from 'react';
import { Pressable, Text, ActivityIndicator, ViewStyle, TextStyle, StyleSheet, PressableProps } from 'react-native';
import { colors } from '../../theme/colors';

export interface ButtonProps extends PressableProps {
  children?: React.ReactNode;
  loading?: boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  textStyle?: TextStyle;
}

export const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(
  (
    {
      variant = 'default',
      size = 'default',
      children,
      loading,
      disabled,
      style,
      textStyle,
      ...props
    },
    ref
  ) => {
    const variantStyles = getVariantStyles(variant);
    const sizeStyles = getSizeStyles(size);
    const textVariantStyles = getTextVariantStyles(variant);
    const textSizeStyles = getTextSizeStyles(size);

    return (
      <Pressable
        ref={ref}
        style={({ pressed }) => [
          styles.base,
          variantStyles.default,
          sizeStyles,
          pressed && variantStyles.pressed,
          disabled && styles.disabled,
          style as ViewStyle,
        ]}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'default' || variant === 'destructive' ? 'white' : colors.gray[700]}
          />
        ) : typeof children === 'string' ? (
          <Text
            style={[
              styles.text,
              textVariantStyles,
              textSizeStyles,
              textStyle,
            ]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';

const getVariantStyles = (variant: ButtonProps['variant']) => {
  const variants = {
    default: {
      default: { backgroundColor: colors.primary.main },
      pressed: { backgroundColor: colors.primary.dark },
    },
    destructive: {
      default: { backgroundColor: colors.error },
      pressed: { backgroundColor: '#DC2626' },
    },
    outline: {
      default: { 
        borderWidth: 1, 
        borderColor: colors.gray[300], 
        backgroundColor: 'transparent' 
      },
      pressed: { backgroundColor: colors.gray[100] },
    },
    secondary: {
      default: { backgroundColor: colors.gray[100] },
      pressed: { backgroundColor: colors.gray[200] },
    },
    ghost: {
      default: { backgroundColor: 'transparent' },
      pressed: { backgroundColor: colors.gray[100] },
    },
    link: {
      default: { backgroundColor: 'transparent' },
      pressed: { opacity: 0.7 },
    },
  };
  
  return variants[variant || 'default'];
};

const getSizeStyles = (size: ButtonProps['size']) => {
  const sizes = {
    default: { height: 48, paddingHorizontal: 16 },
    sm: { height: 36, paddingHorizontal: 12 },
    lg: { height: 56, paddingHorizontal: 24 },
    icon: { height: 40, width: 40 },
  };
  
  return sizes[size || 'default'];
};

const getTextVariantStyles = (variant: ButtonProps['variant']) => {
  const variants = {
    default: { color: colors.white },
    destructive: { color: colors.white },
    outline: { color: colors.gray[900] },
    secondary: { color: colors.gray[900] },
    ghost: { color: colors.gray[900] },
    link: { color: colors.primary.main, textDecorationLine: 'underline' as const },
  };
  
  return variants[variant || 'default'];
};

const getTextSizeStyles = (size: ButtonProps['size']) => {
  const sizes = {
    default: { fontSize: 16 },
    sm: { fontSize: 14 },
    lg: { fontSize: 18 },
    icon: {},
  };
  
  return sizes[size || 'default'];
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
  },
  disabled: {
    opacity: 0.5,
  },
});