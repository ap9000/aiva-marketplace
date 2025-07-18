import React from 'react';
import { View, Text, ViewProps, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../theme/colors';

export interface BadgeProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'success' | 'destructive' | 'warning' | 'outline' | 'verified' | 'premium';
  size?: 'default' | 'sm' | 'lg';
}

export const Badge = React.forwardRef<View, BadgeProps>(
  ({ variant = 'default', size = 'default', children, style, ...props }, ref) => {
    const variantStyle = getVariantStyles(variant);
    const sizeStyle = getSizeStyles(size);
    
    return (
      <View
        ref={ref}
        style={[styles.base, variantStyle.container, sizeStyle.container, style]}
        {...props}
      >
        <Text style={[styles.text, variantStyle.text, sizeStyle.text]}>{children}</Text>
      </View>
    );
  }
);

Badge.displayName = 'Badge';

const getVariantStyles = (variant: BadgeProps['variant']) => {
  const variants = {
    default: {
      container: { backgroundColor: colors.primary.light },
      text: { color: colors.primary.dark },
    },
    secondary: {
      container: { backgroundColor: colors.gray[100] },
      text: { color: colors.gray[700] },
    },
    success: {
      container: { backgroundColor: '#D1FAE5' },
      text: { color: '#047857' },
    },
    destructive: {
      container: { backgroundColor: '#FEE2E2' },
      text: { color: '#B91C1C' },
    },
    warning: {
      container: { backgroundColor: '#FEF3C7' },
      text: { color: '#92400E' },
    },
    outline: {
      container: { borderWidth: 1, borderColor: colors.gray[300], backgroundColor: 'transparent' },
      text: { color: colors.gray[700] },
    },
    verified: {
      container: { backgroundColor: 'rgba(16, 185, 129, 0.1)' },
      text: { color: colors.success },
    },
    premium: {
      container: { backgroundColor: 'rgba(139, 92, 246, 0.1)' },
      text: { color: '#8B5CF6' },
    },
  };
  
  return variants[variant || 'default'];
};

const getSizeStyles = (size: BadgeProps['size']) => {
  const sizes = {
    default: {
      container: { paddingHorizontal: 10, paddingVertical: 2 },
      text: { fontSize: 12 },
    },
    sm: {
      container: { paddingHorizontal: 8, paddingVertical: 2 },
      text: { fontSize: 10 },
    },
    lg: {
      container: { paddingHorizontal: 12, paddingVertical: 4 },
      text: { fontSize: 14 },
    },
  };
  
  return sizes[size || 'default'];
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 9999,
  },
  text: {
    fontWeight: '500',
  },
});