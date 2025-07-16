import React, { memo } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Pressable,
  PressableProps,
  Platform,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { theme } from '../../theme';

export interface CardProps extends Omit<PressableProps, 'style'> {
  elevated?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = memo(({
  elevated = true,
  padding = 'md',
  style,
  children,
  onPress,
  ...props
}) => {
  const { isDark } = useTheme();
  const styles = createStyles(isDark);

  const cardStyle = [
    styles.card,
    elevated && styles.elevated,
    styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        style={({ pressed }) => [
          cardStyle,
          pressed && styles.pressed,
        ]}
        onPress={onPress}
        {...props}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
});

const createStyles = (isDark: boolean) => StyleSheet.create({
  card: {
    backgroundColor: isDark ? theme.colors.dark.surface : theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: isDark ? 1 : 0,
    borderColor: isDark ? theme.colors.dark.border : 'transparent',
  },
  
  elevated: {
    ...Platform.select({
      ios: theme.shadows.md,
      android: theme.shadows.md,
      web: {
        ...theme.shadows.md,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
    }),
  },
  
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.99 }],
  },
  
  paddingNone: {
    padding: 0,
  },
  
  paddingSm: {
    padding: theme.padding.sm,
  },
  
  paddingMd: {
    padding: theme.padding.md,
  },
  
  paddingLg: {
    padding: theme.padding.lg,
  },
});

Card.displayName = 'Card';