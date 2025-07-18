import React from 'react';
import { View, ViewStyle, ScrollView, Platform } from 'react-native';
import { useResponsive } from '../hooks/useResponsive';
import { theme } from '../../theme';
import { getContainerPadding } from '../utils/responsive';

export interface ResponsiveContainerProps {
  children: React.ReactNode;
  maxWidth?: keyof typeof theme.maxContainerWidths | 'full';
  padding?: boolean;
  center?: boolean;
  scroll?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  maxWidth = 'xl',
  padding = true,
  center = true,
  scroll = false,
  style,
  contentContainerStyle,
}) => {
  const { width, isWeb } = useResponsive();
  
  const containerPadding = padding ? getContainerPadding(width) : 0;
  const maxContainerWidth = maxWidth === 'full' ? '100%' : theme.maxContainerWidths[maxWidth];

  const containerStyle: ViewStyle = {
    flex: 1,
    width: '100%',
    ...(isWeb && center && {
      alignSelf: 'center',
      maxWidth: maxContainerWidth,
    }),
    ...style,
  };

  const contentStyle: ViewStyle = {
    flex: 1,
    paddingHorizontal: containerPadding,
    ...contentContainerStyle,
  };

  if (scroll) {
    return (
      <ScrollView
        style={containerStyle}
        contentContainerStyle={[{ flexGrow: 1 }, contentStyle]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={containerStyle}>
      <View style={contentStyle}>
        {children}
      </View>
    </View>
  );
};

// Responsive Row component for split layouts
interface ResponsiveRowProps {
  children: React.ReactNode;
  breakpoint?: keyof typeof theme.breakpoints;
  gap?: number;
  style?: ViewStyle;
}

export const ResponsiveRow: React.FC<ResponsiveRowProps> = ({
  children,
  breakpoint = 'md',
  gap = theme.spacing[3],
  style,
}) => {
  const { width } = useResponsive();
  const shouldStack = width < theme.breakpoints[breakpoint];

  const rowStyle: ViewStyle = {
    flexDirection: shouldStack ? 'column' : 'row',
    gap,
    ...style,
  };

  return <View style={rowStyle}>{children}</View>;
};

// Responsive Column component for flexible layouts
interface ResponsiveColumnProps {
  children: React.ReactNode;
  flex?: number;
  minWidth?: number;
  style?: ViewStyle;
}

export const ResponsiveColumn: React.FC<ResponsiveColumnProps> = ({
  children,
  flex = 1,
  minWidth,
  style,
}) => {
  const columnStyle: ViewStyle = {
    flex,
    ...(minWidth && { minWidth }),
    ...style,
  };

  return <View style={columnStyle}>{children}</View>;
};