import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useMemo } from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

/**
 * Custom hook for generating themed styles with consistent design patterns
 */
export const useThemedStyles = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const styles = useMemo(() => StyleSheet.create({
    // Container styles
    container: {
      flex: 1,
      backgroundColor: colors.background,
    } as ViewStyle,
    
    surface: {
      backgroundColor: colors.surface,
    } as ViewStyle,
    
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    } as ViewStyle,
    
    cardSecondary: {
      backgroundColor: colors.cardSecondary,
      borderRadius: 8,
      padding: 16,
    } as ViewStyle,
    
    // Header styles
    header: {
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
      paddingHorizontal: 16,
      paddingVertical: 16,
    } as ViewStyle,
    
    headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.textPrimary,
      marginBottom: 4,
    } as TextStyle,
    
    headerSubtitle: {
      fontSize: 16,
      color: colors.textSecondary,
    } as TextStyle,
    
    // Section styles
    sectionHeader: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 8,
    } as TextStyle,
    
    // Button styles
    primaryButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      alignItems: 'center',
    } as ViewStyle,
    
    secondaryButton: {
      backgroundColor: colors.surfaceSecondary,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    } as ViewStyle,
    
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textInverse,
    } as TextStyle,
    
    secondaryButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textPrimary,
    } as TextStyle,
    
    // Input styles
    input: {
      backgroundColor: colors.surfaceSecondary,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 12,
      fontSize: 16,
      color: colors.textPrimary,
    } as ViewStyle,
    
    // Text styles
    primaryText: {
      color: colors.textPrimary,
      fontSize: 16,
    } as TextStyle,
    
    secondaryText: {
      color: colors.textSecondary,
      fontSize: 14,
    } as TextStyle,
    
    captionText: {
      color: colors.textTertiary,
      fontSize: 12,
    } as TextStyle,
    
    // Layout styles
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    } as ViewStyle,
    
    spaceBetween: {
      justifyContent: 'space-between',
    } as ViewStyle,
    
    centered: {
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    
    // Spacing
    marginSmall: {
      margin: 8,
    } as ViewStyle,
    
    marginMedium: {
      margin: 16,
    } as ViewStyle,
    
    paddingSmall: {
      padding: 8,
    } as ViewStyle,
    
    paddingMedium: {
      padding: 16,
    } as ViewStyle,
    
    // Borders
    borderBottom: {
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    } as ViewStyle,
    
    // Icon container
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: `${colors.primary}15`,
    } as ViewStyle,
    
    // Filter chip
    filterChip: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 8,
    } as ViewStyle,
    
    activeFilterChip: {
      backgroundColor: colors.primary,
    } as ViewStyle,
    
    inactiveFilterChip: {
      backgroundColor: colors.surfaceSecondary,
    } as ViewStyle,
    
    activeFilterText: {
      color: colors.textInverse,
      fontWeight: '500',
    } as TextStyle,
    
    inactiveFilterText: {
      color: colors.textPrimary,
    } as TextStyle,
  }), [colors, colorScheme]);

  return {
    styles,
    colors,
    colorScheme,
  };
};
