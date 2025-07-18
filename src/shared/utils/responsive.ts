import { Platform, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { breakpoints } from '../constants/breakpoints';

type Style = ViewStyle | TextStyle | ImageStyle;

// Utility to apply styles conditionally based on platform
export const platformSelect = <T extends Style>(styles: {
  default: T;
  web?: Partial<T>;
  ios?: Partial<T>;
  android?: Partial<T>;
}): T => {
  const platformStyles = Platform.select({
    web: styles.web,
    ios: styles.ios,
    android: styles.android,
  });

  return {
    ...styles.default,
    ...platformStyles,
  } as T;
};

// Utility to create responsive styles
export const responsiveStyle = <T extends Style>(
  baseStyle: T,
  responsiveStyles?: {
    sm?: Partial<T>;
    md?: Partial<T>;
    lg?: Partial<T>;
    xl?: Partial<T>;
    '2xl'?: Partial<T>;
  }
): (width: number) => T => {
  return (width: number) => {
    let style = { ...baseStyle };

    if (responsiveStyles) {
      if (width >= breakpoints.sm && responsiveStyles.sm) {
        style = { ...style, ...responsiveStyles.sm };
      }
      if (width >= breakpoints.md && responsiveStyles.md) {
        style = { ...style, ...responsiveStyles.md };
      }
      if (width >= breakpoints.lg && responsiveStyles.lg) {
        style = { ...style, ...responsiveStyles.lg };
      }
      if (width >= breakpoints.xl && responsiveStyles.xl) {
        style = { ...style, ...responsiveStyles.xl };
      }
      if (width >= breakpoints['2xl'] && responsiveStyles['2xl']) {
        style = { ...style, ...responsiveStyles['2xl'] };
      }
    }

    return style;
  };
};

// Get container padding based on screen size
export const getContainerPadding = (width: number): number => {
  if (width < breakpoints.sm) return 16;
  if (width < breakpoints.md) return 24;
  if (width < breakpoints.lg) return 32;
  if (width < breakpoints.xl) return 48;
  return 64;
};

// Get responsive font scale
export const getResponsiveFontScale = (width: number): number => {
  if (width < breakpoints.sm) return 1;
  if (width < breakpoints.md) return 1.05;
  if (width < breakpoints.lg) return 1.1;
  return 1.15;
};