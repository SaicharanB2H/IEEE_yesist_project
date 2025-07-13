import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Switch, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { PremiumCard } from '@/components/ui/PremiumCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { logout, updatePreferences } from '@/store/slices/userSlice';
import { RootState } from '@/types';
import { mockUser } from '@/utils/mockData';

interface SettingsItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
}

function SettingsItem({ icon, title, subtitle, onPress, rightElement, showChevron = true }: SettingsItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View className="flex-row items-center p-4 border-b" style={{ 
        backgroundColor: colors.surface,
        borderBottomColor: colors.borderLight 
      }}>
        <View className="items-center justify-center w-10 h-10 mr-3 rounded-full" style={{
          backgroundColor: colorScheme === 'dark' ? `${colors.primary}20` : `${colors.primary}15`
        }}>
          <IconSymbol size={20} name={icon as any} color={colors.primary} />
        </View>
        
        <View className="flex-1">
          <ThemedText type="defaultSemiBold" style={{ color: colors.textPrimary }}>
            {title}
          </ThemedText>
          {subtitle && (
            <ThemedText type="caption" style={{ color: colors.textSecondary, marginTop: 2 }}>
              {subtitle}
            </ThemedText>
          )}
        </View>
        
        {rightElement || (showChevron && onPress && (
          <IconSymbol size={16} name="chevron.right" color={colors.textTertiary} />
        ))}
      </View>
    </TouchableOpacity>
  );
}

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

function SettingsSection({ title, children }: SettingsSectionProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <View className="mb-6">
      <ThemedText type="defaultSemiBold" style={{ 
        color: colors.textSecondary,
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        marginLeft: 16,
        marginBottom: 8
      }}>
        {title}
      </ThemedText>
      <PremiumCard variant="elevated" padding="sm" style={{ marginHorizontal: 16, overflow: 'hidden' }}>
        {children}
      </PremiumCard>
    </View>
  );
}

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const dispatch = useDispatch();
  
  // For demo purposes, use mock user. In real app, get from Redux store
  const user = useSelector((state: RootState) => state.user.user) || mockUser;
  const [localPreferences, setLocalPreferences] = useState(user.preferences);

  const handleThemeChange = () => {
    const themes = ['light', 'dark', 'auto'] as const;
    const currentIndex = themes.indexOf(localPreferences.theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    const updatedPrefs = { ...localPreferences, theme: nextTheme };
    setLocalPreferences(updatedPrefs);
    dispatch(updatePreferences(updatedPrefs));
  };

  const handleNotificationToggle = (key: keyof typeof localPreferences.notifications) => {
    const updatedNotifications = {
      ...localPreferences.notifications,
      [key]: !localPreferences.notifications[key]
    };
    const updatedPrefs = { ...localPreferences, notifications: updatedNotifications };
    setLocalPreferences(updatedPrefs);
    dispatch(updatePreferences(updatedPrefs));
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => dispatch(logout())
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            // Handle account deletion
            Alert.alert('Account Deletion', 'This feature will be implemented when connected to backend.');
          }
        },
      ]
    );
  };

  const getThemeDisplayText = () => {
    switch (localPreferences.theme) {
      case 'light': return 'Light';
      case 'dark': return 'Dark';
      case 'auto': return 'System';
      default: return 'System';
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ 
          paddingHorizontal: 16, 
          paddingVertical: 24, 
          backgroundColor: colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderLight
        }}>
          <ThemedText type="title" style={{ 
            color: colors.textPrimary, 
            fontSize: 28,
            fontWeight: '700',
            marginBottom: 4
          }}>
            Settings
          </ThemedText>
          <ThemedText type="body" style={{ color: colors.textSecondary }}>
            Manage your account and app preferences
          </ThemedText>
        </View>

        {/* User Profile Section */}
        <SettingsSection title="Account">
          <SettingsItem
            icon="person.fill"
            title={user.name}
            subtitle={user.email}
            onPress={() => Alert.alert('Edit Profile', 'Profile editing will be implemented when connected to backend.')}
          />
          <SettingsItem
            icon="lock.fill"
            title="Change Password"
            subtitle="Update your account password"
            onPress={() => Alert.alert('Change Password', 'Password change will be implemented when connected to backend.')}
          />
        </SettingsSection>

        {/* App Preferences */}
        <SettingsSection title="Preferences">
          <SettingsItem
            icon="paintbrush.fill"
            title="Appearance"
            subtitle={`${getThemeDisplayText()} mode`}
            onPress={handleThemeChange}
          />
          <SettingsItem
            icon="dollarsign.circle.fill"
            title="Currency"
            subtitle={localPreferences.currency}
            onPress={() => Alert.alert('Currency', 'Currency selection will be implemented.')}
          />
          <SettingsItem
            icon="chart.bar.fill"
            title="Energy Goals"
            subtitle={`Daily limit: ${localPreferences.energyGoals.dailyUsageLimit} kWh`}
            onPress={() => Alert.alert('Energy Goals', 'Goal setting will be implemented.')}
          />
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection title="Notifications">
          <SettingsItem
            icon="bell.fill"
            title="Push Notifications"
            subtitle="Receive push notifications on your device"
            rightElement={
              <Switch
                value={localPreferences.notifications.pushEnabled}
                onValueChange={() => handleNotificationToggle('pushEnabled')}
                trackColor={{ false: '#767577', true: colors.primary }}
                thumbColor={localPreferences.notifications.pushEnabled ? '#fff' : '#f4f3f4'}
              />
            }
            showChevron={false}
          />
          <SettingsItem
            icon="envelope.fill"
            title="Email Notifications"
            subtitle="Receive notifications via email"
            rightElement={
              <Switch
                value={localPreferences.notifications.emailEnabled}
                onValueChange={() => handleNotificationToggle('emailEnabled')}
                trackColor={{ false: '#767577', true: colors.primary }}
                thumbColor={localPreferences.notifications.emailEnabled ? '#fff' : '#f4f3f4'}
              />
            }
            showChevron={false}
          />
          <SettingsItem
            icon="exclamationmark.triangle.fill"
            title="Usage Spike Alerts"
            subtitle="Get notified of unusual energy usage"
            rightElement={
              <Switch
                value={localPreferences.notifications.usageSpikes}
                onValueChange={() => handleNotificationToggle('usageSpikes')}
                trackColor={{ false: '#767577', true: colors.primary }}
                thumbColor={localPreferences.notifications.usageSpikes ? '#fff' : '#f4f3f4'}
              />
            }
            showChevron={false}
          />
          <SettingsItem
            icon="dollarsign.circle.fill"
            title="Cost Alerts"
            subtitle="Notifications when costs exceed limits"
            rightElement={
              <Switch
                value={localPreferences.notifications.costAlerts}
                onValueChange={() => handleNotificationToggle('costAlerts')}
                trackColor={{ false: '#767577', true: colors.primary }}
                thumbColor={localPreferences.notifications.costAlerts ? '#fff' : '#f4f3f4'}
              />
            }
            showChevron={false}
          />
        </SettingsSection>

        {/* Device Management */}
        <SettingsSection title="Device Management">
          <SettingsItem
            icon="plus.circle.fill"
            title="Add New Device"
            subtitle="Connect a new smart device"
            onPress={() => Alert.alert('Add Device', 'Device pairing will be implemented when hardware is ready.')}
          />
          <SettingsItem
            icon="house.fill"
            title="Manage Rooms"
            subtitle="Organize devices by room"
            onPress={() => Alert.alert('Room Management', 'Room management will be implemented.')}
          />
          <SettingsItem
            icon="wifi"
            title="Network Settings"
            subtitle="Configure WiFi and network preferences"
            onPress={() => Alert.alert('Network Settings', 'Network configuration will be implemented.')}
          />
        </SettingsSection>

        {/* Data & Privacy */}
        <SettingsSection title="Data & Privacy">
          <SettingsItem
            icon="arrow.down.doc.fill"
            title="Export Data"
            subtitle="Download your usage data"
            onPress={() => Alert.alert('Export Data', 'Data export will be implemented.')}
          />
          <SettingsItem
            icon="shield.fill"
            title="Privacy Policy"
            subtitle="Learn how we protect your data"
            onPress={() => Alert.alert('Privacy Policy', 'Privacy policy content will be added.')}
          />
          <SettingsItem
            icon="doc.text.fill"
            title="Terms of Service"
            subtitle="Read our terms and conditions"
            onPress={() => Alert.alert('Terms of Service', 'Terms of service content will be added.')}
          />
        </SettingsSection>

        {/* Support */}
        <SettingsSection title="Support">
          <SettingsItem
            icon="questionmark.circle.fill"
            title="Help & FAQ"
            subtitle="Get answers to common questions"
            onPress={() => Alert.alert('Help & FAQ', 'FAQ section will be implemented.')}
          />
          <SettingsItem
            icon="envelope.fill"
            title="Contact Support"
            subtitle="Get help from our support team"
            onPress={() => Alert.alert('Contact Support', 'Support contact will be implemented.')}
          />
          <SettingsItem
            icon="star.fill"
            title="Rate App"
            subtitle="Share your experience on the App Store"
            onPress={() => Alert.alert('Rate App', 'App store rating will be implemented.')}
          />
          
          {/* Premium UI Showcase Link */}
          <SettingsItem
            icon="paintbrush"
            title="Premium UI Showcase"
            subtitle="View all premium components and design system"
            onPress={() => router.push('/design-showcase')}
          />
        </SettingsSection>

        {/* Account Actions */}
        <View className="px-4 pb-8">
          <PremiumButton
            title="Logout"
            variant="secondary"
            onPress={handleLogout}
            fullWidth
            leftIcon={<IconSymbol size={16} name="arrow.right.square" color={colors.text} />}
            style={{ marginBottom: 12 }}
          />
          
          <PremiumButton
            title="Delete Account"
            variant="destructive"
            onPress={handleDeleteAccount}
            fullWidth
            leftIcon={<IconSymbol size={16} name="trash" color="#fff" />}
          />
        </View>

        {/* App Version */}
        <View className="px-4 pb-8">
          <ThemedText type="caption" className="text-center text-gray-400 dark:text-gray-500">
            WePower IoT v1.0.0{'\n'}
            Build 2025.07.12
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
