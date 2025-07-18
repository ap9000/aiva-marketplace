import { useState, useEffect } from 'react';
import { Dimensions, Platform } from 'react-native';
import { breakpoints } from '../constants/breakpoints';

interface ResponsiveInfo {
  width: number;
  height: number;
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isExtraLarge: boolean;
  is2XLarge: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWeb: boolean;
  orientation: 'portrait' | 'landscape';
}

export const useResponsive = (): ResponsiveInfo => {
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get('window');
    return { width, height };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
    });

    return () => subscription?.remove();
  }, []);

  const { width, height } = dimensions;
  const isWeb = Platform.OS === 'web';

  // Breakpoint checks
  const isSmall = width >= breakpoints.sm;
  const isMedium = width >= breakpoints.md;
  const isLarge = width >= breakpoints.lg;
  const isExtraLarge = width >= breakpoints.xl;
  const is2XLarge = width >= breakpoints['2xl'];

  // Device type checks
  const isMobile = width < breakpoints.md;
  const isTablet = width >= breakpoints.md && width < breakpoints.lg;
  const isDesktop = width >= breakpoints.lg;

  // Orientation
  const orientation = width > height ? 'landscape' : 'portrait';

  return {
    width,
    height,
    isSmall,
    isMedium,
    isLarge,
    isExtraLarge,
    is2XLarge,
    isMobile,
    isTablet,
    isDesktop,
    isWeb,
    orientation,
  };
};

// Hook for responsive values
export function useResponsiveValue<T>(values: {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}): T {
  const responsive = useResponsive();

  if (responsive.is2XLarge && values['2xl'] !== undefined) return values['2xl'];
  if (responsive.isExtraLarge && values.xl !== undefined) return values.xl;
  if (responsive.isLarge && values.lg !== undefined) return values.lg;
  if (responsive.isMedium && values.md !== undefined) return values.md;
  if (responsive.isSmall && values.sm !== undefined) return values.sm;
  
  return values.base;
}