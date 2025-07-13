import React, { useState } from 'react';
import { ScrollView, Switch, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { PremiumCard } from '@/components/ui/PremiumCard';
import { PremiumInput } from '@/components/ui/PremiumInput';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { updatePreferences } from '@/store/slices/userSlice';
import { RootState } from '@/types';

interface EnergyGoalsScreenProps {
  onSave: () => void;
  onCancel: () => void;
}

export function EnergyGoalsScreen({ onSave, onCancel }: EnergyGoalsScreenProps) {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [goals, setGoals] = useState(user?.preferences.energyGoals || {
    dailyUsageLimit: 10,
    monthlyCostLimit: 150,
    carbonReductionTarget: 20
  });

  const handleSave = () => {
    if (user) {
      dispatch(updatePreferences({
        energyGoals: goals
      }));
      onSave();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-row items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <TouchableOpacity onPress={onCancel}>
          <ThemedText type="body" className="text-blue-500">Cancel</ThemedText>
        </TouchableOpacity>
        <ThemedText type="defaultSemiBold" className="text-gray-900 dark:text-white">
          Energy Goals
        </ThemedText>
        <TouchableOpacity onPress={handleSave}>
          <ThemedText type="body" className="text-blue-500 font-semibold">Save</ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        <PremiumCard variant="elevated" style={{ marginBottom: 16 }}>
          <View className="space-y-4">
            <View>
              <ThemedText type="defaultSemiBold" className="mb-2 text-gray-900 dark:text-white">
                Daily Usage Limit (kWh)
              </ThemedText>
              <PremiumInput
                placeholder="Enter daily usage limit"
                value={goals.dailyUsageLimit.toString()}
                onChangeText={(text) => setGoals({ ...goals, dailyUsageLimit: parseFloat(text) || 0 })}
                keyboardType="numeric"
              />
              <ThemedText type="caption" className="mt-1 text-gray-500 dark:text-gray-400">
                Recommended: 8-12 kWh for average household
              </ThemedText>
            </View>

            <View>
              <ThemedText type="defaultSemiBold" className="mb-2 text-gray-900 dark:text-white">
                Monthly Cost Limit ($)
              </ThemedText>
              <PremiumInput
                placeholder="Enter monthly cost limit"
                value={goals.monthlyCostLimit.toString()}
                onChangeText={(text) => setGoals({ ...goals, monthlyCostLimit: parseFloat(text) || 0 })}
                keyboardType="numeric"
              />
              <ThemedText type="caption" className="mt-1 text-gray-500 dark:text-gray-400">
                Average US household: $120-180/month
              </ThemedText>
            </View>

            <View>
              <ThemedText type="defaultSemiBold" className="mb-2 text-gray-900 dark:text-white">
                Carbon Reduction Target (%)
              </ThemedText>
              <PremiumInput
                placeholder="Enter reduction target"
                value={goals.carbonReductionTarget.toString()}
                onChangeText={(text) => setGoals({ ...goals, carbonReductionTarget: parseFloat(text) || 0 })}
                keyboardType="numeric"
              />
              <ThemedText type="caption" className="mt-1 text-gray-500 dark:text-gray-400">
                Aim for 15-30% reduction from baseline
              </ThemedText>
            </View>
          </View>
        </PremiumCard>

        <PremiumCard variant="outlined" style={{ marginBottom: 16 }}>
          <View className="items-center">
            <IconSymbol size={48} name="leaf.fill" color="#22C55E" />
            <ThemedText type="defaultSemiBold" className="mt-2 text-gray-900 dark:text-white text-center">
              Environmental Impact
            </ThemedText>
            <ThemedText type="body" className="mt-1 text-gray-500 dark:text-gray-400 text-center">
              Your goals could save approximately{'\n'}
              <ThemedText type="body" className="font-semibold text-green-600">
                {(goals.carbonReductionTarget * 0.5).toFixed(1)} tons CO₂/year
              </ThemedText>
            </ThemedText>
          </View>
        </PremiumCard>
      </ScrollView>
    </SafeAreaView>
  );
}

interface NotificationSettingsScreenProps {
  onSave: () => void;
  onCancel: () => void;
}

export function NotificationSettingsScreen({ onSave, onCancel }: NotificationSettingsScreenProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState(user?.preferences.notifications || {
    pushEnabled: true,
    emailEnabled: true,
    unusualActivity: true,
    usageSpikes: true,
    costAlerts: true,
    deviceOffline: false
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handleSave = () => {
    if (user) {
      dispatch(updatePreferences({
        notifications
      }));
      onSave();
    }
  };

  const NotificationRow = ({ 
    title, 
    subtitle, 
    value, 
    onToggle 
  }: { 
    title: string; 
    subtitle: string; 
    value: boolean; 
    onToggle: () => void;
  }) => (
    <View className="flex-row items-center justify-between py-3">
      <View className="flex-1 mr-4">
        <ThemedText type="defaultSemiBold" className="text-gray-900 dark:text-white">
          {title}
        </ThemedText>
        <ThemedText type="caption" className="text-gray-500 dark:text-gray-400 mt-1">
          {subtitle}
        </ThemedText>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#767577', true: colors.primary }}
        thumbColor={value ? '#fff' : '#f4f3f4'}
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-row items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <TouchableOpacity onPress={onCancel}>
          <ThemedText type="body" className="text-blue-500">Cancel</ThemedText>
        </TouchableOpacity>
        <ThemedText type="defaultSemiBold" className="text-gray-900 dark:text-white">
          Notifications
        </ThemedText>
        <TouchableOpacity onPress={handleSave}>
          <ThemedText type="body" className="text-blue-500 font-semibold">Save</ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        <PremiumCard variant="elevated" style={{ marginBottom: 16 }}>
          <View className="space-y-1">
            <NotificationRow
              title="Push Notifications"
              subtitle="Receive notifications on your device"
              value={notifications.pushEnabled}
              onToggle={() => handleToggle('pushEnabled')}
            />
            
            <View className="h-px bg-gray-200 dark:bg-gray-700 mx-4" />
            
            <NotificationRow
              title="Email Notifications"
              subtitle="Get updates via email"
              value={notifications.emailEnabled}
              onToggle={() => handleToggle('emailEnabled')}
            />
          </View>
        </PremiumCard>

        <PremiumCard variant="elevated" style={{ marginBottom: 16 }}>
          <ThemedText type="defaultSemiBold" className="mb-3 text-gray-900 dark:text-white">
            Alert Types
          </ThemedText>
          
          <View className="space-y-1">
            <NotificationRow
              title="Unusual Activity"
              subtitle="Alerts for unexpected device behavior"
              value={notifications.unusualActivity}
              onToggle={() => handleToggle('unusualActivity')}
            />
            
            <View className="h-px bg-gray-200 dark:bg-gray-700 mx-4" />
            
            <NotificationRow
              title="Usage Spikes"
              subtitle="Notifications when usage exceeds normal levels"
              value={notifications.usageSpikes}
              onToggle={() => handleToggle('usageSpikes')}
            />
            
            <View className="h-px bg-gray-200 dark:bg-gray-700 mx-4" />
            
            <NotificationRow
              title="Cost Alerts"
              subtitle="Warnings when costs approach your limits"
              value={notifications.costAlerts}
              onToggle={() => handleToggle('costAlerts')}
            />
            
            <View className="h-px bg-gray-200 dark:bg-gray-700 mx-4" />
            
            <NotificationRow
              title="Device Offline"
              subtitle="Alerts when devices disconnect"
              value={notifications.deviceOffline}
              onToggle={() => handleToggle('deviceOffline')}
            />
          </View>
        </PremiumCard>

        <PremiumCard variant="outlined">
          <View className="items-center">
            <IconSymbol size={48} name="bell.badge" color={colors.primary} />
            <ThemedText type="defaultSemiBold" className="mt-2 text-gray-900 dark:text-white text-center">
              Stay Informed
            </ThemedText>
            <ThemedText type="body" className="mt-1 text-gray-500 dark:text-gray-400 text-center">
              Get notified about important events and potential energy savings opportunities
            </ThemedText>
          </View>
        </PremiumCard>
      </ScrollView>
    </SafeAreaView>
  );
}
