import { colors } from './colors';
import { typography, fontSize, fontWeight, lineHeight, fontFamily } from './typography';
import { spacing, padding, margin, borderRadius, layout } from './spacing';
import { shadows } from './shadows';
import { breakpoints, maxContainerWidths } from '../shared/constants/breakpoints';

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
  breakpoints,
  maxContainerWidths,
  // Responsive spacing multipliers
  responsive: {
    spacing: {
      mobile: 1,
      tablet: 1.2,
      desktop: 1.4,
    },
    fontSize: {
      mobile: 1,
      tablet: 1.05,
      desktop: 1.1,
    },
  },
};

export type Theme = typeof theme;

// Export individual modules for convenience
export { colors } from './colors';
export { typography, fontSize, fontWeight, lineHeight, fontFamily } from './typography';
export { spacing, padding, margin, borderRadius, layout } from './spacing';
export { shadows } from './shadows';
export { breakpoints, maxContainerWidths } from '../shared/constants/breakpoints';