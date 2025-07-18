import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from './ThemeContext';

interface HybridThemeContextType {
  isDark: boolean;
  theme: 'light' | 'dark';
  colors: {
    primary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
    warning: string;
  };
}

const HybridThemeContext = createContext<HybridThemeContextType | undefined>(undefined);

export const useHybridTheme = () => {
  const context = useContext(HybridThemeContext);
  if (!context) {
    throw new Error('useHybridTheme must be used within HybridThemeProvider');
  }
  return context;
};

interface HybridThemeProviderProps {
  children: ReactNode;
}

export const HybridThemeProvider: React.FC<HybridThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const colors = {
    primary: isDark ? '#60A5FA' : '#3B82F6',
    background: isDark ? '#111827' : '#FFFFFF',
    surface: isDark ? '#1F2937' : '#F9FAFB',
    text: isDark ? '#F9FAFB' : '#111827',
    textSecondary: isDark ? '#9CA3AF' : '#6B7280',
    border: isDark ? '#374151' : '#E5E7EB',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
  };

  const value: HybridThemeContextType = {
    isDark,
    theme: isDark ? 'dark' : 'light',
    colors,
  };

  return (
    <HybridThemeContext.Provider value={value}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </HybridThemeContext.Provider>
  );
};