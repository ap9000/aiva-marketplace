import React from 'react';
import { View, Text, Pressable, ViewProps, TextProps, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { shadows } from '../../theme/shadows';

export interface CardProps extends ViewProps {
  variant?: 'default' | 'elevated' | 'outline';
  padding?: 'none' | 'sm' | 'default' | 'lg';
  onPress?: () => void;
}

export const Card = React.forwardRef<View, CardProps>(
  ({ variant = 'default', padding = 'default', onPress, children, style, ...props }, ref) => {
    const variantStyle = getVariantStyles(variant);
    const paddingStyle = getPaddingStyles(padding);
    
    const content = (
      <View
        ref={ref}
        style={[styles.base, variantStyle, paddingStyle, style]}
        {...props}
      >
        {children}
      </View>
    );

    if (onPress) {
      return (
        <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
          {content}
        </Pressable>
      );
    }

    return content;
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<View, ViewProps>(
  ({ style, ...props }, ref) => (
    <View ref={ref} style={[styles.header, style]} {...props} />
  )
);

CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  Text,
  TextProps & { children: React.ReactNode }
>(({ children, style, ...props }, ref) => (
  <Text
    ref={ref}
    style={[styles.title, style]}
    {...props}
  >
    {children}
  </Text>
));

CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  Text,
  TextProps & { children: React.ReactNode }
>(({ children, style, ...props }, ref) => (
  <Text
    ref={ref}
    style={[styles.description, style]}
    {...props}
  >
    {children}
  </Text>
));

CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<View, ViewProps>(
  ({ style, ...props }, ref) => (
    <View ref={ref} style={style} {...props} />
  )
);

CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<View, ViewProps>(
  ({ style, ...props }, ref) => (
    <View ref={ref} style={[styles.footer, style]} {...props} />
  )
);

CardFooter.displayName = 'CardFooter';

const getVariantStyles = (variant: CardProps['variant']) => {
  const variants = {
    default: {
      borderWidth: 1,
      borderColor: colors.gray[300],
      ...shadows.sm,
    },
    elevated: {
      ...shadows.md,
    },
    outline: {
      borderWidth: 2,
      borderColor: colors.gray[300],
    },
  };
  
  return variants[variant || 'default'];
};

const getPaddingStyles = (padding: CardProps['padding']) => {
  const paddings = {
    none: { padding: 0 },
    sm: { padding: 12 },
    default: { padding: 16 },
    lg: { padding: 24 },
  };
  
  return paddings[padding || 'default'];
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  pressed: {
    opacity: 0.9,
  },
  header: {
    paddingBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.gray[900],
  },
  description: {
    marginTop: 4,
    fontSize: 14,
    color: colors.gray[500],
  },
  footer: {
    paddingTop: 16,
  },
});