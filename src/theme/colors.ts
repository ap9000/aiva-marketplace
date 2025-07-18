export const colors = {
  // Primary Colors
  primary: {
    main: '#2563EB',      // Trust, professionalism
    dark: '#1E3A8A',      // Headers, CTAs
    light: '#DBEAFE',     // Backgrounds, hover states
  },
  
  // Secondary Colors  
  success: '#10B981',     // Positive actions, online status
  warning: '#F59E0B',     // Alerts, attention
  error: '#EF4444',       // Errors, offline status
  
  // Neutral Colors
  gray: {
    900: '#111827',       // Primary text
    700: '#374151',       // Secondary text
    600: '#4B5563',       // Tertiary text
    500: '#6B7280',       // Disabled states
    400: '#9CA3AF',       // Placeholder text
    300: '#D1D5DB',       // Borders
    200: '#E5E7EB',       // Light borders
    100: '#F3F4F6',       // Backgrounds
    50: '#F9FAFB',        // Light backgrounds
  },
  
  // Dark Mode
  dark: {
    background: '#0F172A',
    surface: '#1E293B',
    border: '#334155',
  },
  
  // Common
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export type ColorScheme = typeof colors;