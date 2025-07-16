import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { theme } from '../../theme';

interface LoadingProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  fullScreen?: boolean;
  style?: ViewStyle;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'large',
  color,
  text,
  fullScreen = false,
  style,
}) => {
  const { isDark } = useTheme();
  const styles = createStyles(isDark);

  const indicatorColor = color || theme.colors.primary.main;

  const content = (
    <>
      <ActivityIndicator size={size} color={indicatorColor} />
      {text && <Text style={styles.text}>{text}</Text>}
    </>
  );

  if (fullScreen) {
    return (
      <View style={[styles.fullScreen, style]}>
        {content}
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      {content}
    </View>
  );
};

const createStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    padding: theme.spacing[4],
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDark ? theme.colors.dark.background : theme.colors.white,
  },
  
  text: {
    marginTop: theme.spacing[2],
    fontSize: theme.fontSize.base,
    color: isDark ? theme.colors.gray[300] : theme.colors.gray[700],
  },
});