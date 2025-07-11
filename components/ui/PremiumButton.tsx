import { Colors } from '@/constants/Colors';
import { DesignSystem, createShadow } from '@/constants/DesignSystem';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import {
    ActivityIndicator,
    Text as RNText,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

export interface PremiumButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function PremiumButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}: PremiumButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      height: DesignSystem.components.button.height[size],
      paddingHorizontal: DesignSystem.components.button.padding[size].horizontal,
      borderRadius: DesignSystem.borderRadius.lg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: fullWidth ? '100%' : undefined,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? colors.textTertiary : colors.primary,
          ...createShadow('md'),
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: colors.surfaceSecondary,
          borderWidth: 1,
          borderColor: colors.border,
        };
      case 'tertiary':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.primary,
        };
      case 'destructive':
        return {
          ...baseStyle,
          backgroundColor: disabled ? colors.textTertiary : colors.error,
          ...createShadow('md'),
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontSize: DesignSystem.typography.fontSize.headline,
      fontWeight: '600',
      letterSpacing: DesignSystem.typography.letterSpacing.headline,
    };

    switch (variant) {
      case 'primary':
      case 'destructive':
        return {
          ...baseTextStyle,
          color: DesignSystem.colors.neutral[0],
        };
      case 'secondary':
        return {
          ...baseTextStyle,
          color: colors.textPrimary,
        };
      case 'tertiary':
        return {
          ...baseTextStyle,
          color: colors.primary,
        };
      case 'ghost':
        return {
          ...baseTextStyle,
          color: colors.primary,
        };
      default:
        return baseTextStyle;
    }
  };

  const buttonStyle = getButtonStyle();
  const buttonTextStyle = getTextStyle();

  return (
    <TouchableOpacity
      style={[
        buttonStyle,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'destructive' ? '#FFFFFF' : colors.primary}
        />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <RNText style={[buttonTextStyle, textStyle]}>{title}</RNText>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    marginRight: DesignSystem.spacing.sm,
  },
  rightIcon: {
    marginLeft: DesignSystem.spacing.sm,
  },
});
