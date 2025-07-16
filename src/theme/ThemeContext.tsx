import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from './index';

type ColorMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: typeof theme;
  colorMode: ColorMode;
  isDark: boolean;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const COLOR_MODE_KEY = '@color_mode';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [colorMode, setColorModeState] = useState<ColorMode>('system');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadColorMode();
  }, []);

  const loadColorMode = async () => {
    try {
      const savedMode = await AsyncStorage.getItem(COLOR_MODE_KEY);
      if (savedMode) {
        setColorModeState(savedMode as ColorMode);
      }
    } catch (error) {
      console.error('Error loading color mode:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setColorMode = async (mode: ColorMode) => {
    try {
      await AsyncStorage.setItem(COLOR_MODE_KEY, mode);
      setColorModeState(mode);
    } catch (error) {
      console.error('Error saving color mode:', error);
    }
  };

  const toggleColorMode = () => {
    const nextMode = colorMode === 'light' ? 'dark' : 
                     colorMode === 'dark' ? 'system' : 'light';
    setColorMode(nextMode);
  };

  const isDark = colorMode === 'dark' || 
                 (colorMode === 'system' && systemColorScheme === 'dark');

  const value: ThemeContextType = {
    theme,
    colorMode,
    isDark,
    setColorMode,
    toggleColorMode,
  };

  if (isLoading) {
    return null; // Or a loading component
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};