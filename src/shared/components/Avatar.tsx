import React, { memo } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { theme } from '../../theme';

export interface AvatarProps {
  source?: ImageSourcePropType | string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy';
  verified?: boolean;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = memo(({
  source,
  name,
  size = 'md',
  status,
  verified,
  style,
}) => {
  const { isDark } = useTheme();
  const styles = createStyles(isDark);

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const imageSource = typeof source === 'string' ? { uri: source } : source;

  return (
    <View style={[styles[size], style]}>
      {source ? (
        <Image source={imageSource} style={[styles.image, styles[size]]} />
      ) : (
        <View style={[styles.placeholder, styles[size]]}>
          <Text style={[styles.initials, styles[`${size}Text`]]}>
            {name ? getInitials(name) : '?'}
          </Text>
        </View>
      )}

      {status && (
        <View style={[styles.status, styles[`${size}Status`], styles[`${status}Status`]]} />
      )}

      {verified && (
        <View style={[styles.verifiedBadge, styles[`${size}Badge`]]}>
          <MaterialIcons 
            name="verified" 
            size={size === 'sm' ? 12 : size === 'md' ? 16 : size === 'lg' ? 20 : 24} 
            color={theme.colors.white} 
          />
        </View>
      )}
    </View>
  );
});

const createStyles = (isDark: boolean) => StyleSheet.create({
  image: {
    borderRadius: 9999,
    backgroundColor: theme.colors.gray[100],
  },
  
  placeholder: {
    borderRadius: 9999,
    backgroundColor: theme.colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  initials: {
    color: theme.colors.white,
    fontWeight: theme.fontWeight.semibold,
  },
  
  // Sizes
  sm: {
    width: 32,
    height: 32,
  },
  md: {
    width: 48,
    height: 48,
  },
  lg: {
    width: 64,
    height: 64,
  },
  xl: {
    width: 96,
    height: 96,
  },
  
  // Text sizes
  smText: {
    fontSize: theme.fontSize.xs,
  },
  mdText: {
    fontSize: theme.fontSize.sm,
  },
  lgText: {
    fontSize: theme.fontSize.lg,
  },
  xlText: {
    fontSize: theme.fontSize['2xl'],
  },
  
  // Status indicator
  status: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: isDark ? theme.colors.dark.background : theme.colors.white,
    borderRadius: 9999,
  },
  
  // Status sizes
  smStatus: {
    width: 8,
    height: 8,
    bottom: 0,
    right: 0,
  },
  mdStatus: {
    width: 12,
    height: 12,
    bottom: 0,
    right: 0,
  },
  lgStatus: {
    width: 16,
    height: 16,
    bottom: 2,
    right: 2,
  },
  xlStatus: {
    width: 20,
    height: 20,
    bottom: 4,
    right: 4,
  },
  
  // Status colors
  onlineStatus: {
    backgroundColor: theme.colors.success,
  },
  offlineStatus: {
    backgroundColor: theme.colors.gray[500],
  },
  busyStatus: {
    backgroundColor: theme.colors.warning,
  },
  
  // Verified badge
  verifiedBadge: {
    position: 'absolute',
    backgroundColor: theme.colors.primary.main,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Badge sizes
  smBadge: {
    width: 16,
    height: 16,
    bottom: -2,
    right: -2,
  },
  mdBadge: {
    width: 20,
    height: 20,
    bottom: -2,
    right: -2,
  },
  lgBadge: {
    width: 24,
    height: 24,
    bottom: -2,
    right: -2,
  },
  xlBadge: {
    width: 32,
    height: 32,
    bottom: -4,
    right: -4,
  },
});

Avatar.displayName = 'Avatar';