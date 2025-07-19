import { config } from '@tamagui/config/v3';
import { createTamagui } from 'tamagui';

// Create the Tamagui configuration with default config
export const tamaguiConfig = createTamagui({
  ...config,
  // Add custom theme tokens to match your existing design system
  themes: {
    ...config.themes,
    light: {
      ...config.themes.light,
      // Custom color tokens that match your existing theme
      labPurple: '#6B46E5',
      plasmaGreen: '#10F4B1',
      carbonBlack: '#1A1D29',
      silver: '#6B7280',
      titanium: '#E1E8ED',
      whiteCoat: '#FFFFFF',
      backgroundSoft: '#F8FAFC',
      background: '#FFFFFF',
    },
    dark: {
      ...config.themes.dark,
      // Custom color tokens for dark theme
      labPurple: '#6B46E5',
      plasmaGreen: '#10F4B1',
      carbonBlack: '#FFFFFF',
      silver: '#9CA3AF',
      titanium: '#374151',
      whiteCoat: '#1F2937',
      backgroundSoft: '#111827',
      background: '#0F172A',
    },
  },
});

export default tamaguiConfig;

// TypeScript configuration for Tamagui
export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}