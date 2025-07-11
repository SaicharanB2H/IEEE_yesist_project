import { Text as RNText, StyleSheet, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'caption' | 'body' | 'headline' | 'subhead' | 'footnote' | 'largeTitle';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <RNText
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'caption' ? styles.caption : undefined,
        type === 'body' ? styles.body : undefined,
        type === 'headline' ? styles.headline : undefined,
        type === 'subhead' ? styles.subhead : undefined,
        type === 'footnote' ? styles.footnote : undefined,
        type === 'largeTitle' ? styles.largeTitle : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  // Apple iOS Typography Standards
  largeTitle: {
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 41,
    letterSpacing: 0.35,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    letterSpacing: 0.35,
  },
  headline: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: -0.4,
  },
  body: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: -0.4,
  },
  subhead: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  footnote: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.1,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0,
  },
  // Legacy styles for backward compatibility
  default: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400',
    letterSpacing: -0.4,
  },
  defaultSemiBold: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: 0.35,
  },
  link: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400',
    letterSpacing: -0.4,
    color: '#007AFF', // Apple Blue
  },
});
