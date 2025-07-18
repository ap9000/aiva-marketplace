import React from 'react';
import { View, Text, ViewProps, StyleSheet } from 'react-native';

export interface SeparatorProps extends ViewProps {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  children?: React.ReactNode;
}

export const Separator = React.forwardRef<View, SeparatorProps>(
  (
    {
      orientation = 'horizontal',
      decorative = true,
      children,
      style,
      ...props
    },
    ref
  ) => {
    if (children) {
      return (
        <View style={styles.container}>
          <View style={styles.line} />
          <Text style={styles.text}>{children}</Text>
          <View style={styles.line} />
        </View>
      );
    }

    return (
      <View
        ref={ref}
        style={[
          styles.separator,
          orientation === 'horizontal' ? styles.horizontal : styles.vertical,
          style
        ]}
        accessibilityRole={decorative ? 'none' : undefined}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  text: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#6B7280',
  },
  separator: {
    backgroundColor: '#E5E7EB',
  },
  horizontal: {
    height: 1,
    width: '100%',
  },
  vertical: {
    width: 1,
    height: '100%',
  },
});