import { colors } from './colors';
import { typography, fontSize, fontWeight, lineHeight, fontFamily } from './typography';
import { spacing, padding, margin, borderRadius, layout } from './spacing';
import { shadows } from './shadows';

export const theme = {
  colors,
  typography,
  fontSize,
  fontWeight,
  lineHeight,
  fontFamily,
  spacing,
  padding,
  margin,
  borderRadius,
  layout,
  shadows,
};

export type Theme = typeof theme;

// Export individual modules for convenience
export { colors } from './colors';
export { typography, fontSize, fontWeight, lineHeight, fontFamily } from './typography';
export { spacing, padding, margin, borderRadius, layout } from './spacing';
export { shadows } from './shadows';