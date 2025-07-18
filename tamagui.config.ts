import { createTamagui } from 'tamagui'
import { config as defaultConfig } from '@tamagui/config'

// Custom theme configuration based on your existing colors
const customTheme = {
  ...defaultConfig.themes.light,
  background: '#FFFFFF',
  backgroundStrong: '#F8FAFC',
  backgroundSoft: '#E1E8ED',
  color: '#0A0E1A',
  colorHover: '#6B7280',
  colorPress: '#0A0E1A',
  colorFocus: '#0A0E1A',
  borderColor: '#E1E8ED',
  borderColorHover: '#6B7280',
  borderColorPress: '#6B7280',
  borderColorFocus: '#6B46E5',
  placeholderColor: '#6B7280',

  // Custom colors from your theme
  labPurple: '#6B46E5',
  plasmaGreen: '#10F4B1',
  whiteCoat: '#F8FAFC',
  titanium: '#E1E8ED',
  carbonBlack: '#0A0E1A',
  silver: '#6B7280',
  
  // Brand colors
  primary: '#6B46E5',
  primaryHover: '#5A3CC4',
  primaryPress: '#4B32A3',
  
  secondary: '#10F4B1',
  secondaryHover: '#0DD39A',
  secondaryPress: '#0AB283',
  
  // Status colors
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
}

const customDarkTheme = {
  ...defaultConfig.themes.dark,
  background: '#0A0E1A',
  backgroundStrong: '#000000',
  backgroundSoft: '#1A1E2A',
  color: '#F8FAFC',
  colorHover: '#E1E8ED',
  colorPress: '#F8FAFC',
  colorFocus: '#F8FAFC',
  borderColor: '#1A1E2A',
  borderColorHover: '#6B7280',
  borderColorPress: '#6B7280',
  borderColorFocus: '#6B46E5',
  placeholderColor: '#6B7280',

  // Custom colors from your theme
  labPurple: '#6B46E5',
  plasmaGreen: '#10F4B1',
  whiteCoat: '#F8FAFC',
  titanium: '#E1E8ED',
  carbonBlack: '#0A0E1A',
  silver: '#6B7280',
  
  // Brand colors
  primary: '#6B46E5',
  primaryHover: '#7B56F5',
  primaryPress: '#8B66FF',
  
  secondary: '#10F4B1',
  secondaryHover: '#20FFC1',
  secondaryPress: '#30FFD1',
  
  // Status colors
  error: '#F87171',
  success: '#34D399',
  warning: '#FBBF24',
  info: '#60A5FA',
}

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  themes: {
    light: customTheme,
    dark: customDarkTheme,
  },
  tokens: {
    ...defaultConfig.tokens,
    color: {
      ...defaultConfig.tokens.color,
      labPurple: '#6B46E5',
      plasmaGreen: '#10F4B1',
      whiteCoat: '#F8FAFC',
      titanium: '#E1E8ED',
      carbonBlack: '#0A0E1A',
      silver: '#6B7280',
    },
  },
})

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}