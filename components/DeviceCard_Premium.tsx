import { Colors } from '@/constants/Colors';
import { DesignSystem, createShadow } from '@/constants/DesignSystem';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Device } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { PremiumCard } from './ui/PremiumCard';

interface DeviceCardProps {
  device: Device;
  onToggle: (deviceId: string) => void;
  onPress?: (device: Device) => void;
  isLoading?: boolean;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ 
  device, 
  onToggle, 
  onPress, 
  isLoading = false 
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getDeviceIcon = (type: Device['type']) => {
    switch (type) {
      case 'light': return 'bulb';
      case 'fan': return 'fan';
      case 'plug': return 'power';
      case 'ac': return 'snow';
      case 'heater': return 'flame';
      default: return 'hardware-chip';
    }
  };

  const getStatusColor = (status: Device['status']) => {
    switch (status) {
      case 'on': return colors.success;
      case 'off': return colors.error;
      case 'idle': return colors.warning;
      default: return colors.textTertiary;
    }
  };

  const getWifiStrength = (strength: number) => {
    if (strength >= 80) return 'wifi';
    if (strength >= 60) return 'wifi-outline';
    if (strength >= 40) return 'cellular';
    return 'cellular-outline';
  };

  const calculateDailyCost = (powerUsage: number) => {
    const costPerKWh = 0.12; // Example rate
    const dailyUsageKWh = (powerUsage / 1000) * 24;
    return (dailyUsageKWh * costPerKWh).toFixed(2);
  };

  return (
    <TouchableOpacity
      onPress={() => onPress?.(device)}
      activeOpacity={0.8}
      style={styles.container}
    >
      <PremiumCard variant="elevated" style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.deviceInfo}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <Ionicons 
                name={getDeviceIcon(device.type) as any} 
                size={24} 
                color={colors.primary} 
              />
            </View>
            <View style={styles.nameContainer}>
              <ThemedText type="headline" style={styles.deviceName}>
                {device.name}
              </ThemedText>
              <ThemedText type="caption" style={[styles.deviceType, { color: colors.textSecondary }]}>
                {device.type} • {device.room}
              </ThemedText>
            </View>
          </View>
          
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(device.status) }]} />
            <ThemedText type="caption" style={{ color: colors.textTertiary }}>
              {device.isOnline ? device.status : 'offline'}
            </ThemedText>
          </View>
        </View>

        {/* Power Usage */}
        <View style={styles.powerSection}>
          <View style={styles.powerRow}>
            <ThemedText type="subhead" style={{ color: colors.textSecondary }}>
              Power Usage
            </ThemedText>
            <ThemedText type="body" style={styles.powerValue}>
              {device.powerUsage}W
            </ThemedText>
          </View>
          <ThemedText type="footnote" style={{ color: colors.textTertiary }}>
            ~${calculateDailyCost(device.powerUsage)} daily cost
          </ThemedText>
        </View>

        {/* WiFi Strength */}
        <View style={styles.wifiSection}>
          <Ionicons 
            name={getWifiStrength(device.wifiStrength) as any} 
            size={16} 
            color={colors.textTertiary} 
          />
          <ThemedText type="footnote" style={{ color: colors.textTertiary, marginLeft: 4 }}>
            {device.wifiStrength}%
          </ThemedText>
        </View>

        {/* Toggle Button */}
        <View style={styles.toggleSection}>
          <TouchableOpacity
            onPress={() => onToggle(device.id)}
            disabled={isLoading || !device.isOnline}
            style={[
              styles.toggleButton,
              { 
                backgroundColor: device.status === 'on' ? colors.primary : colors.surfaceSecondary,
                opacity: !device.isOnline ? 0.5 : 1
              }
            ]}
            activeOpacity={0.7}
          >
            {isLoading ? (
              <ActivityIndicator 
                size="small" 
                color={device.status === 'on' ? colors.surface : colors.primary} 
              />
            ) : (
              <ThemedText 
                type="subhead" 
                style={{ 
                  color: device.status === 'on' ? colors.surface : colors.textSecondary,
                  fontWeight: '600'
                }}
              >
                {device.status === 'on' ? 'ON' : 'OFF'}
              </ThemedText>
            )}
          </TouchableOpacity>
        </View>
      </PremiumCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: DesignSystem.spacing.md,
  },
  card: {
    padding: DesignSystem.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: DesignSystem.spacing.md,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: DesignSystem.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: DesignSystem.spacing.sm,
  },
  nameContainer: {
    flex: 1,
  },
  deviceName: {
    marginBottom: 2,
  },
  deviceType: {
    textTransform: 'capitalize',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  powerSection: {
    marginBottom: DesignSystem.spacing.sm,
  },
  powerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  powerValue: {
    fontWeight: '600',
  },
  wifiSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DesignSystem.spacing.md,
  },
  toggleSection: {
    alignItems: 'flex-end',
  },
  toggleButton: {
    paddingHorizontal: DesignSystem.spacing.lg,
    paddingVertical: DesignSystem.spacing.sm,
    borderRadius: DesignSystem.borderRadius.lg,
    minWidth: 80,
    alignItems: 'center',
    ...createShadow('sm'),
  },
});

export default DeviceCard;
