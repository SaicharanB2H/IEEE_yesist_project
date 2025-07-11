import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { PremiumCard } from '@/components/ui/PremiumCard';
import { PremiumInput } from '@/components/ui/PremiumInput';
import { Colors } from '@/constants/Colors';
import { DesignSystem } from '@/constants/DesignSystem';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function DesignShowcaseScreen() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleButtonPress = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="largeTitle" style={styles.title}>
            Premium UI Showcase
          </ThemedText>
          <ThemedText type="body" style={{ color: colors.textSecondary }}>
            Apple & Samsung-level design standards
          </ThemedText>
        </View>

        {/* Typography Section */}
        <PremiumCard variant="elevated" style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>
            Typography System
          </ThemedText>
          <View style={styles.typographyGrid}>
            <ThemedText type="largeTitle">Large Title</ThemedText>
            <ThemedText type="title">Title</ThemedText>
            <ThemedText type="headline">Headline</ThemedText>
            <ThemedText type="body">Body Text</ThemedText>
            <ThemedText type="subhead">Subhead</ThemedText>
            <ThemedText type="footnote">Footnote</ThemedText>
            <ThemedText type="caption">Caption</ThemedText>
          </View>
        </PremiumCard>

        {/* Button Variants */}
        <PremiumCard variant="elevated" style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>
            Premium Buttons
          </ThemedText>
          <View style={styles.buttonGrid}>
            <PremiumButton
              title="Primary"
              variant="primary"
              onPress={handleButtonPress}
              loading={loading}
            />
            <PremiumButton
              title="Secondary"
              variant="secondary"
              onPress={handleButtonPress}
            />
            <PremiumButton
              title="Tertiary"
              variant="tertiary"
              onPress={handleButtonPress}
            />
            <PremiumButton
              title="Destructive"
              variant="destructive"
              onPress={handleButtonPress}
            />
            <PremiumButton
              title="With Icon"
              variant="primary"
              onPress={handleButtonPress}
              leftIcon={<Ionicons name="star" size={16} color="white" />}
            />
          </View>
        </PremiumCard>

        {/* Card Variants */}
        <PremiumCard variant="elevated" style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>
            Card Variants
          </ThemedText>
          <View style={styles.cardGrid}>
            <PremiumCard variant="elevated" padding="md" style={styles.demoCard}>
              <ThemedText type="headline">Elevated Card</ThemedText>
              <ThemedText type="body" style={{ color: colors.textSecondary }}>
                With shadow and depth
              </ThemedText>
            </PremiumCard>
            
            <PremiumCard variant="outlined" padding="md" style={styles.demoCard}>
              <ThemedText type="headline">Outlined Card</ThemedText>
              <ThemedText type="body" style={{ color: colors.textSecondary }}>
                With border
              </ThemedText>
            </PremiumCard>
            
            <PremiumCard variant="filled" padding="md" style={styles.demoCard}>
              <ThemedText type="headline">Filled Card</ThemedText>
              <ThemedText type="body" style={{ color: colors.textSecondary }}>
                With background
              </ThemedText>
            </PremiumCard>
          </View>
        </PremiumCard>

        {/* Input Components */}
        <PremiumCard variant="elevated" style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>
            Premium Inputs
          </ThemedText>
          <View style={styles.inputGrid}>
            <PremiumInput
              label="Device Name"
              placeholder="Enter device name"
              value={inputValue}
              onChangeText={setInputValue}
              leftIcon={<Ionicons name="bulb-outline" size={16} color={colors.textTertiary} />}
            />
            
            <PremiumInput
              label="Search Devices"
              placeholder="Search..."
              variant="filled"
              rightIcon={<Ionicons name="search" size={16} color={colors.textTertiary} />}
            />
            
            <PremiumInput
              label="Password"
              placeholder="Enter password"
              secureTextEntry
              error="Password must be at least 8 characters"
            />
          </View>
        </PremiumCard>

        {/* Color System */}
        <PremiumCard variant="elevated" style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>
            Color System
          </ThemedText>
          <View style={styles.colorGrid}>
            <View style={[styles.colorSwatch, { backgroundColor: colors.primary }]}>
              <ThemedText type="caption" style={{ color: 'white' }}>Primary</ThemedText>
            </View>
            <View style={[styles.colorSwatch, { backgroundColor: colors.success }]}>
              <ThemedText type="caption" style={{ color: 'white' }}>Success</ThemedText>
            </View>
            <View style={[styles.colorSwatch, { backgroundColor: colors.warning }]}>
              <ThemedText type="caption" style={{ color: 'white' }}>Warning</ThemedText>
            </View>
            <View style={[styles.colorSwatch, { backgroundColor: colors.error }]}>
              <ThemedText type="caption" style={{ color: 'white' }}>Error</ThemedText>
            </View>
          </View>
        </PremiumCard>

        {/* Quality Metrics */}
        <PremiumCard variant="filled" style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>
            Quality Standards
          </ThemedText>
          <View style={styles.metricsGrid}>
            <View style={styles.metric}>
              <ThemedText type="headline" style={{ color: colors.success }}>✓</ThemedText>
              <ThemedText type="subhead">Apple HIG Compliant</ThemedText>
            </View>
            <View style={styles.metric}>
              <ThemedText type="headline" style={{ color: colors.success }}>✓</ThemedText>
              <ThemedText type="subhead">WCAG 2.1 AA</ThemedText>
            </View>
            <View style={styles.metric}>
              <ThemedText type="headline" style={{ color: colors.success }}>✓</ThemedText>
              <ThemedText type="subhead">44px Touch Targets</ThemedText>
            </View>
            <View style={styles.metric}>
              <ThemedText type="headline" style={{ color: colors.success }}>✓</ThemedText>
              <ThemedText type="subhead">8pt Grid System</ThemedText>
            </View>
          </View>
        </PremiumCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: DesignSystem.spacing.md,
  },
  header: {
    marginBottom: DesignSystem.spacing.xl,
    alignItems: 'center',
  },
  title: {
    marginBottom: DesignSystem.spacing.xs,
    textAlign: 'center',
  },
  section: {
    marginBottom: DesignSystem.spacing.lg,
  },
  sectionTitle: {
    marginBottom: DesignSystem.spacing.md,
  },
  typographyGrid: {
    gap: DesignSystem.spacing.sm,
  },
  buttonGrid: {
    gap: DesignSystem.spacing.sm,
  },
  cardGrid: {
    gap: DesignSystem.spacing.md,
  },
  demoCard: {
    minHeight: 80,
  },
  inputGrid: {
    gap: DesignSystem.spacing.md,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DesignSystem.spacing.sm,
  },
  colorSwatch: {
    width: 80,
    height: 60,
    borderRadius: DesignSystem.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DesignSystem.spacing.md,
  },
  metric: {
    alignItems: 'center',
    minWidth: 120,
  },
});
