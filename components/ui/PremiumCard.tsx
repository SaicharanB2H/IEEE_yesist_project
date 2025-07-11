import { Colors } from '@/constants/Colors';
import { DesignSystem, createShadow } from '@/constants/DesignSystem';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { View, ViewStyle } from 'react-native';

export interface PremiumCardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: keyof typeof DesignSystem.spacing;
  borderRadius?: keyof typeof DesignSystem.borderRadius;
  style?: ViewStyle;
  onPress?: () => void;
}

export function PremiumCard({
  children,
  variant = 'elevated',
  padding = 'md',
  borderRadius = 'xl',
  style,
  onPress,
}: PremiumCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      padding: DesignSystem.spacing[padding],
      borderRadius: DesignSystem.borderRadius[borderRadius],
      minHeight: DesignSystem.components.card.minHeight,
    };

    switch (variant) {
      case 'elevated':
        return {
          ...baseStyle,
          backgroundColor: colors.elevated,
          ...createShadow('lg'),
        };
      case 'outlined':
        return {
          ...baseStyle,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        };
      case 'filled':
        return {
          ...baseStyle,
          backgroundColor: colors.surfaceSecondary,
        };
      default:
        return baseStyle;
    }
  };

  const cardStyle = getCardStyle();

  if (onPress) {
    return (
      <View style={[cardStyle, style]}>
        {children}
      </View>
    );
  }

  return (
    <View style={[cardStyle, style]}>
      {children}
    </View>
  );
}
