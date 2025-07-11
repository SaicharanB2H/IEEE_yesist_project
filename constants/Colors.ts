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
    secondary: DesignSystem.colors.neutral[100],
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
    
    // Border colors
    border: DesignSystem.colors.neutral[200],
    borderSecondary: DesignSystem.colors.neutral[100],
    
    // Text variations
    textPrimary: DesignSystem.colors.text.primary,
    textSecondary: DesignSystem.colors.text.secondary,
    textTertiary: DesignSystem.colors.text.tertiary,
    textQuaternary: DesignSystem.colors.text.quaternary,
  },
  dark: {
    text: DesignSystem.colors.neutral[0],
    background: DesignSystem.colors.neutral[950],
    tint: tintColorDark,
    icon: DesignSystem.colors.neutral[400],
    tabIconDefault: DesignSystem.colors.neutral[500],
    tabIconSelected: tintColorDark,
    
    // Premium semantic colors (adjusted for dark mode)
    primary: DesignSystem.colors.primary[600],
    secondary: DesignSystem.colors.neutral[800],
    accent: DesignSystem.colors.system.blue,
    success: DesignSystem.colors.semantic.success,
    warning: DesignSystem.colors.semantic.warning,
    error: DesignSystem.colors.semantic.error,
    info: DesignSystem.colors.semantic.info,
    
    // Surface colors (dark mode)
    surface: DesignSystem.colors.neutral[900],
    surfaceSecondary: DesignSystem.colors.neutral[800],
    surfaceTertiary: DesignSystem.colors.neutral[700],
    elevated: DesignSystem.colors.neutral[800],
    
    // Border colors (dark mode)
    border: DesignSystem.colors.neutral[700],
    borderSecondary: DesignSystem.colors.neutral[800],
    
    // Text variations (dark mode)
    textPrimary: DesignSystem.colors.neutral[0],
    textSecondary: DesignSystem.colors.neutral[300],
    textTertiary: DesignSystem.colors.neutral[400],
    textQuaternary: DesignSystem.colors.neutral[500],
  },
};
