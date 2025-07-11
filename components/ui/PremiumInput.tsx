import { Colors } from '@/constants/Colors';
import { DesignSystem } from '@/constants/DesignSystem';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useState } from 'react';
import {
    Text as RNText,
    StyleSheet,
    TextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

export interface PremiumInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

export function PremiumInput({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  variant = 'outlined',
  size = 'md',
  style,
  inputStyle,
  ...props
}: PremiumInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      height: DesignSystem.components.input.height,
      paddingHorizontal: DesignSystem.components.input.padding.horizontal,
      borderRadius: DesignSystem.components.input.borderRadius,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: DesignSystem.components.input.borderWidth,
    };

    const focusedStyle = isFocused ? { borderColor: colors.primary, borderWidth: 2 } : {};
    const errorStyle = error ? { borderColor: colors.error, borderWidth: 2 } : {};

    switch (variant) {
      case 'outlined':
        return {
          ...baseStyle,
          backgroundColor: colors.surface,
          borderColor: error ? colors.error : isFocused ? colors.primary : colors.border,
          ...focusedStyle,
          ...errorStyle,
        };
      case 'filled':
        return {
          ...baseStyle,
          backgroundColor: colors.surfaceSecondary,
          borderColor: 'transparent',
          ...focusedStyle,
          ...errorStyle,
        };
      default:
        return baseStyle;
    }
  };

  const getInputStyle = (): TextStyle => {
    return {
      flex: 1,
      fontSize: DesignSystem.typography.fontSize.body,
      lineHeight: DesignSystem.typography.lineHeight.body,
      color: colors.textPrimary,
      paddingVertical: 0, // Remove default padding for better control
    };
  };

  const getLabelStyle = (): TextStyle => {
    return {
      fontSize: DesignSystem.typography.fontSize.subhead,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: DesignSystem.spacing.xs,
    };
  };

  const getHelperTextStyle = (isError: boolean): TextStyle => {
    return {
      fontSize: DesignSystem.typography.fontSize.caption1,
      color: isError ? colors.error : colors.textTertiary,
      marginTop: DesignSystem.spacing.xs,
    };
  };

  return (
    <View style={style}>
      {label && <RNText style={getLabelStyle()}>{label}</RNText>}
      
      <View style={getContainerStyle()}>
        {leftIcon && (
          <View style={styles.leftIcon}>{leftIcon}</View>
        )}
        
        <TextInput
          {...props}
          style={[getInputStyle(), inputStyle]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={colors.textTertiary}
        />
        
        {rightIcon && (
          <View style={styles.rightIcon}>{rightIcon}</View>
        )}
      </View>
      
      {(error || hint) && (
        <RNText style={getHelperTextStyle(!!error)}>
          {error || hint}
        </RNText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  leftIcon: {
    marginRight: DesignSystem.spacing.sm,
  },
  rightIcon: {
    marginLeft: DesignSystem.spacing.sm,
  },
});
