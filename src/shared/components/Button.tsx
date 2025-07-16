import React, { memo } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  PressableProps,
  Platform,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { theme } from '../../theme';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = memo(({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  title,
  style,
  textStyle,
  onPress,
  ...props
}) => {
  const { isDark } = useTheme();

  const handlePress = () => {
    if (!loading && !disabled && onPress) {
      onPress(null as any);
    }
  };

  const styles = createStyles(isDark);
  
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    (disabled || loading) && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    textStyle,
  ];

  return (
    <Pressable
      style={({ pressed }) => [
        buttonStyle,
        pressed && !disabled && !loading && styles.pressed,
      ]}
      onPress={handlePress}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? theme.colors.white : theme.colors.primary.main}
          size={size === 'sm' ? 'small' : 'small'}
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </Pressable>
  );
});

const createStyles = (isDark: boolean) => StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing[3],
    ...Platform.select({
      ios: theme.shadows.sm,
      android: {},
    }),
  },
  
  // Variants
  primary: {
    backgroundColor: theme.colors.primary.main,
    ...Platform.select({
      android: theme.shadows.sm,
    }),
  },
  secondary: {
    backgroundColor: isDark ? theme.colors.dark.surface : theme.colors.gray[100],
    borderWidth: 1,
    borderColor: isDark ? theme.colors.dark.border : theme.colors.gray[300],
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: theme.colors.error,
  },
  
  // Sizes
  sm: {
    height: theme.layout.buttonHeight.sm,
    paddingHorizontal: theme.spacing[2],
  },
  md: {
    height: theme.layout.buttonHeight.md,
  },
  lg: {
    height: theme.layout.buttonHeight.lg,
    paddingHorizontal: theme.spacing[4],
  },
  
  // States
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  
  // Text styles
  text: {
    fontFamily: theme.fontFamily.primary,
    fontWeight: theme.fontWeight.medium,
  },
  primaryText: {
    color: theme.colors.white,
  },
  secondaryText: {
    color: isDark ? theme.colors.white : theme.colors.gray[900],
  },
  ghostText: {
    color: theme.colors.primary.main,
  },
  dangerText: {
    color: theme.colors.white,
  },
  
  // Text sizes
  smText: {
    fontSize: theme.fontSize.sm,
  },
  mdText: {
    fontSize: theme.fontSize.base,
  },
  lgText: {
    fontSize: theme.fontSize.lg,
  },
});

Button.displayName = 'Button';