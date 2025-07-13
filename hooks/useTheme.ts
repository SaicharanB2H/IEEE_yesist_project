import { RootState } from '@/types';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import { useSelector } from 'react-redux';

type ColorScheme = 'light' | 'dark';
type ThemePreference = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  colorScheme: ColorScheme;
  themePreference: ThemePreference;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useSystemColorScheme();
  const userPreferences = useSelector((state: RootState) => state.user.user?.preferences);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  const themePreference = userPreferences?.theme || 'auto';

  useEffect(() => {
    let newColorScheme: ColorScheme;
    
    switch (themePreference) {
      case 'light':
        newColorScheme = 'light';
        break;
      case 'dark':
        newColorScheme = 'dark';
        break;
      case 'auto':
      default:
        newColorScheme = systemColorScheme === 'dark' ? 'dark' : 'light';
        break;
    }
    
    setColorScheme(newColorScheme);
  }, [themePreference, systemColorScheme]);

  const contextValue: ThemeContextType = {
    colorScheme,
    themePreference,
  };

  return React.createElement(
    ThemeContext.Provider,
    { value: contextValue },
    children
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// For backward compatibility, provide a hook that returns the current color scheme
export function useColorScheme(): ColorScheme {
  const systemColorScheme = useSystemColorScheme();
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    // Fallback to system color scheme if not in theme context
    return systemColorScheme === 'dark' ? 'dark' : 'light';
  }
  return context.colorScheme;
}
