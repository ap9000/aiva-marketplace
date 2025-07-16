import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { theme } from '../../../theme';

export default function ProfileScreen() {
  const { isDark } = useTheme();
  const styles = createStyles(isDark);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ProfileScreen</Text>
    </View>
  );
}

const createStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? theme.colors.dark.background : theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: theme.fontSize.xl,
    color: isDark ? theme.colors.white : theme.colors.gray[900],
  },
});
