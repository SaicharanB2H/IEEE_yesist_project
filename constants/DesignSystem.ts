import { Platform } from 'react-native';

/**
 * WePower IoT Design System
 * Premium UI standards inspired by Apple Human Interface Guidelines and Samsung One UI
 */

export const DesignSystem = {
  // COLORS - Following Apple and Samsung color standards
  colors: {
    // Primary Brand Colors
    primary: {
      50: '#F0F9FF',
      100: '#E0F2FE', 
      500: '#0EA5E9', // Primary brand blue
      600: '#0284C7',
      700: '#0369A1',
      900: '#0C4A6E',
    },
    
    // System Colors (Apple-inspired)
    system: {
      blue: '#007AFF',
      green: '#34C759',
      indigo: '#5856D6',
      orange: '#FF9500',
      pink: '#FF2D92',
      purple: '#AF52DE',
      red: '#FF3B30',
      teal: '#5AC8FA',
      yellow: '#FFCC00',
    },
    
    // Semantic Colors
    semantic: {
      success: '#34C759',
      warning: '#FF9500',
      error: '#FF3B30',
      info: '#007AFF',
    },
    
    // Neutral Colors (Samsung One UI inspired)
    neutral: {
      0: '#FFFFFF',
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
      950: '#020617',
    },
    
    // Background Colors
    background: {
      primary: '#FFFFFF',
      secondary: '#F8FAFC',
      tertiary: '#F1F5F9',
      elevated: '#FFFFFF',
      grouped: '#F2F2F7',
    },
    
    // Text Colors
    text: {
      primary: '#000000',
      secondary: '#3C3C43',
      tertiary: '#3C3C4399',
      quaternary: '#3C3C434D',
    },
  },
  
  // TYPOGRAPHY - Apple San Francisco Pro and Samsung One UI inspired
  typography: {
    // Font Weights
    fontWeight: {
      thin: '100',
      ultraLight: '200',
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      heavy: '800',
      black: '900',
    },
    
    // Font Sizes following iOS Human Interface Guidelines
    fontSize: {
      largeTitle: 34,
      title1: 28,
      title2: 22,
      title3: 20,
      headline: 17,
      body: 17,
      callout: 16,
      subhead: 15,
      footnote: 13,
      caption1: 12,
      caption2: 11,
    },
    
    // Line Heights
    lineHeight: {
      largeTitle: 41,
      title1: 34,
      title2: 28,
      title3: 25,
      headline: 22,
      body: 22,
      callout: 21,
      subhead: 20,
      footnote: 18,
      caption1: 16,
      caption2: 13,
    },
    
    // Letter Spacing (Apple-specific)
    letterSpacing: {
      largeTitle: 0.35,
      title1: 0.35,
      title2: 0.35,
      title3: 0.25,
      headline: -0.4,
      body: -0.4,
      callout: -0.3,
      subhead: -0.2,
      footnote: -0.1,
      caption1: 0,
      caption2: 0.1,
    },
  },
  
  // SPACING - 8-point grid system (Apple/Material Design standard)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 40,
    '3xl': 48,
    '4xl': 64,
    '5xl': 80,
    '6xl': 96,
  },
  
  // BORDER RADIUS - Modern rounded corners
  borderRadius: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    '3xl': 24,
    full: 9999,
  },
  
  // SHADOWS - Elevation system (Web-compatible)
  shadows: {
    sm: {
      // Web-compatible boxShadow
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      // React Native fallback
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    lg: {
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 15,
      elevation: 6,
    },
    xl: {
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.2,
      shadowRadius: 25,
      elevation: 10,
    },
  },
  
  // ANIMATION - Smooth and natural (Apple-inspired)
  animation: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
      verySlow: 800,
    },
    easing: {
      easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      easeIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      easeInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
  },
  
  // COMPONENT SPECIFICATIONS
  components: {
    // Button specifications
    button: {
      height: {
        sm: 32,
        md: 44, // Apple standard touch target
        lg: 56,
      },
      padding: {
        sm: { horizontal: 12, vertical: 6 },
        md: { horizontal: 16, vertical: 12 },
        lg: { horizontal: 24, vertical: 16 },
      },
    },
    
    // Card specifications
    card: {
      padding: 16,
      borderRadius: 12,
      minHeight: 60,
    },
    
    // Input specifications  
    input: {
      height: 44,
      padding: { horizontal: 16, vertical: 12 },
      borderRadius: 8,
      borderWidth: 1,
    },
  },
  
  // LAYOUT GUIDELINES
  layout: {
    // Screen margins (Apple HIG standard)
    screenMargin: 16,
    
    // Safe area insets
    safeArea: {
      top: 44,
      bottom: 34,
    },
    
    // Content width constraints
    maxContentWidth: 428, // iPhone Pro Max width
    
    // Grid system
    grid: {
      columns: 12,
      gutter: 16,
    },
  },
};

// UTILITY FUNCTIONS
export const createShadow = (elevation: keyof typeof DesignSystem.shadows) => {
  const shadow = DesignSystem.shadows[elevation];
  
  // Platform-aware shadow handling
  if (Platform.OS === 'web') {
    return { boxShadow: shadow.boxShadow };
  } else {
    const { boxShadow, ...nativeShadow } = shadow;
    return nativeShadow;
  }
};

export const createWebShadow = (elevation: keyof typeof DesignSystem.shadows) => {
  const shadow = DesignSystem.shadows[elevation];
  
  // Return only web shadow properties (boxShadow)
  return {
    boxShadow: shadow.boxShadow,
  };
};

export const getSpacing = (...values: (keyof typeof DesignSystem.spacing)[]) => {
  return values.map(value => DesignSystem.spacing[value]);
};

export const getTypography = (style: keyof typeof DesignSystem.typography.fontSize) => {
  return {
    fontSize: DesignSystem.typography.fontSize[style],
    lineHeight: DesignSystem.typography.lineHeight[style],
    letterSpacing: DesignSystem.typography.letterSpacing[style],
  };
};
