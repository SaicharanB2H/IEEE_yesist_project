/**
 * WePower IoT - Premium Color System
 * Following Apple Human Interface Guidelines and Samsung One UI design principles
 */

import { DesignSystem } from './DesignSystem';

const tintColorLight = DesignSystem.colors.system.blue;
const tintColorDark = DesignSystem.colors.neutral[0];

export const Colors = {
  light: {
    text: DesignSystem.colors.text.primary,
    background: DesignSystem.colors.background.primary,
    tint: tintColorLight,
    icon: DesignSystem.colors.text.secondary,
    tabIconDefault: DesignSystem.colors.text.tertiary,
    tabIconSelected: tintColorLight,
    
    // Premium semantic colors
    primary: DesignSystem.colors.primary[500],
    secondary: DesignSystem.colors.neutral[50],
    accent: DesignSystem.colors.system.blue,
    success: DesignSystem.colors.semantic.success,
    warning: DesignSystem.colors.semantic.warning,
    error: DesignSystem.colors.semantic.error,
    info: DesignSystem.colors.semantic.info,
    
    // Surface colors
    surface: DesignSystem.colors.background.primary,
    surfaceSecondary: DesignSystem.colors.background.secondary,
    surfaceTertiary: DesignSystem.colors.background.tertiary,
    elevated: DesignSystem.colors.background.elevated,
    
    // Card and component colors
    card: '#FFFFFF',
    cardSecondary: '#F8FAFC',
    overlay: 'rgba(0, 0, 0, 0.1)',
    
    // Border colors
    border: DesignSystem.colors.neutral[200],
    borderSecondary: DesignSystem.colors.neutral[100],
    borderLight: DesignSystem.colors.neutral[50],
    
    // Text variations
    textPrimary: DesignSystem.colors.text.primary,
    textSecondary: DesignSystem.colors.text.secondary,
    textTertiary: DesignSystem.colors.text.tertiary,
    textQuaternary: DesignSystem.colors.text.quaternary,
    textInverse: '#FFFFFF',
  },
  dark: {
    text: DesignSystem.colors.neutral[50],
    background: DesignSystem.colors.neutral[950],
    tint: tintColorDark,
    icon: DesignSystem.colors.neutral[300],
    tabIconDefault: DesignSystem.colors.neutral[500],
    tabIconSelected: tintColorDark,
    
    // Premium semantic colors (adjusted for dark mode)
    primary: DesignSystem.colors.primary[500],
    secondary: DesignSystem.colors.neutral[800],
    accent: DesignSystem.colors.system.blue,
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    
    // Surface colors (dark mode)
    surface: DesignSystem.colors.neutral[900],
    surfaceSecondary: DesignSystem.colors.neutral[800],
    surfaceTertiary: DesignSystem.colors.neutral[700],
    elevated: DesignSystem.colors.neutral[800],
    
    // Card and component colors
    card: DesignSystem.colors.neutral[900],
    cardSecondary: DesignSystem.colors.neutral[800],
    overlay: 'rgba(0, 0, 0, 0.4)',
    
    // Border colors (dark mode)
    border: DesignSystem.colors.neutral[700],
    borderSecondary: DesignSystem.colors.neutral[800],
    borderLight: DesignSystem.colors.neutral[600],
    
    // Text variations (dark mode)
    textPrimary: DesignSystem.colors.neutral[50],
    textSecondary: DesignSystem.colors.neutral[300],
    textTertiary: DesignSystem.colors.neutral[400],
    textQuaternary: DesignSystem.colors.neutral[500],
    textInverse: DesignSystem.colors.neutral[900],
  },
};
