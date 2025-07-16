import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from './Button';
import { useTheme } from '../../theme/ThemeContext';
import { theme } from '../../theme';

interface EmptyStateProps {
  icon?: keyof typeof MaterialIcons.glyphMap;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'inbox',
  title,
  description,
  actionLabel,
  onAction,
  style,
}) => {
  const { isDark } = useTheme();
  const styles = createStyles(isDark);

  return (
    <View style={[styles.container, style]}>
      <MaterialIcons
        name={icon}
        size={64}
        color={theme.colors.gray[400]}
        style={styles.icon}
      />
      <Text style={styles.title}>{title}</Text>
      {description && (
        <Text style={styles.description}>{description}</Text>
      )}
      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          onPress={onAction}
          variant="primary"
          style={styles.button}
        />
      )}
    </View>
  );
};

const createStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing[4],
  },
  
  icon: {
    marginBottom: theme.spacing[3],
  },
  
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: isDark ? theme.colors.white : theme.colors.gray[900],
    textAlign: 'center',
    marginBottom: theme.spacing[1],
  },
  
  description: {
    fontSize: theme.fontSize.base,
    color: isDark ? theme.colors.gray[300] : theme.colors.gray[700],
    textAlign: 'center',
    marginBottom: theme.spacing[4],
    paddingHorizontal: theme.spacing[4],
  },
  
  button: {
    marginTop: theme.spacing[2],
  },
});