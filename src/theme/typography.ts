import { Platform, TextStyle } from 'react-native';

// Font Family
export const fontFamily = {
  primary: Platform.select({
    ios: '-apple-system',
    android: 'Roboto',
    default: 'System',
  }),
  mono: Platform.select({
    ios: 'Menlo',
    android: 'monospace',
    default: 'monospace',
  }),
};

// Font Sizes
export const fontSize = {
  xs: 12,     // Captions, labels
  sm: 14,     // Body small
  base: 16,   // Body default
  lg: 18,     // Subheadings
  xl: 20,     // H3
  '2xl': 24,  // H2
  '3xl': 30,  // H1
  '4xl': 36,  // Display
};

// Line Heights
export const lineHeight = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
};

// Font Weights
export const fontWeight = {
  normal: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
};

// Typography Presets
export const typography = {
  h1: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    lineHeight: fontSize['3xl'] * lineHeight.tight,
  },
  h2: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.semibold,
    lineHeight: fontSize['2xl'] * lineHeight.tight,
  },
  h3: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    lineHeight: fontSize.xl * lineHeight.normal,
  },
  body: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    lineHeight: fontSize.base * lineHeight.normal,
  },
  bodySmall: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.normal,
    lineHeight: fontSize.sm * lineHeight.normal,
  },
  caption: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.normal,
    lineHeight: fontSize.xs * lineHeight.normal,
  },
  button: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    lineHeight: fontSize.base * lineHeight.normal,
  },
  mono: {
    fontFamily: fontFamily.mono,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.normal,
    lineHeight: fontSize.sm * lineHeight.normal,
  },
};