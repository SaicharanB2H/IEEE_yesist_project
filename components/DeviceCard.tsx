import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Device } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useRef } from 'react';
import { ActivityIndicator, Animated, Text, TouchableOpacity, View } from 'react-native';

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
  const scale = useRef(new Animated.Value(1)).current;

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
      case 'on': return '#10B981'; // green
      case 'off': return '#EF4444'; // red
      case 'idle': return '#6B7280'; // gray
      default: return '#6B7280';
    }
  };

  const getWifiStrengthIcon = (strength: number) => {
    if (strength >= 75) return 'wifi';
    if (strength >= 50) return 'wifi-outline';
    if (strength >= 25) return 'cellular-outline';
    return 'cellular';
  };

  const handlePress = async () => {
    // Haptic feedback
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Scale animation
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Handle device toggle
    onToggle(device.id);
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        onPress={() => onPress?.(device)}
        style={{
          padding: 16,
          marginBottom: 12,
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 12,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: colorScheme === 'dark' ? 0.3 : 0.1,
          shadowRadius: 4,
          elevation: 3
        }}
        activeOpacity={0.7}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Device Info */}
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              marginRight: 12,
              backgroundColor: colors.surfaceSecondary,
              borderRadius: 24
            }}>
              <Ionicons 
                name={getDeviceIcon(device.type) as any} 
                size={24} 
                color={getStatusColor(device.status)} 
              />
            </View>
            
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: colors.textPrimary,
                marginBottom: 2
              }}>
                {device.name}
              </Text>
              <Text style={{
                fontSize: 14,
                color: colors.textSecondary,
                textTransform: 'capitalize'
              }}>
                {device.room} • {device.type}
              </Text>
              
              {/* Power Usage */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: colors.textPrimary
                }}>
                  {device.powerUsage}W
                </Text>
                <Text style={{
                  marginLeft: 8,
                  fontSize: 12,
                  color: colors.textSecondary
                }}>
                  ${device.estimatedCost.toFixed(2)}/day
                </Text>
              </View>
            </View>
          </View>

          {/* Status Indicators */}
          <View style={{ alignItems: 'flex-end' }}>
            {/* WiFi Status */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Ionicons 
                name={getWifiStrengthIcon(device.wifiStrength)} 
                size={16} 
                color={device.isOnline ? colors.success : colors.error} 
              />
              <Text style={{
                marginLeft: 4,
                fontSize: 12,
                color: colors.textSecondary
              }}>
                {device.wifiStrength}%
              </Text>
            </View>

            {/* Toggle Switch */}
            <TouchableOpacity
              onPress={handlePress}
              disabled={isLoading || !device.isOnline}
              className={`w-14 h-8 rounded-full flex-row items-center px-1 ${
                device.status === 'on' 
                  ? 'bg-green-500' 
                  : 'bg-gray-300 dark:bg-gray-600'
              } ${!device.isOnline ? 'opacity-50' : ''}`}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <View
                  className={`w-6 h-6 rounded-full bg-white shadow-sm transform transition-transform ${
                    device.status === 'on' ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Power Usage Bar */}
        <View style={{ marginTop: 12 }}>
          <View style={{
            height: 8,
            overflow: 'hidden',
            backgroundColor: colors.surfaceSecondary,
            borderRadius: 4
          }}>
            <View 
              style={{ 
                height: '100%',
                backgroundColor: colors.primary,
                borderRadius: 4,
                width: `${Math.min((device.powerUsage / 1000) * 100, 100)}%` 
              }}
            />
          </View>
          <Text style={{
            marginTop: 4,
            fontSize: 12,
            color: colors.textSecondary
          }}>
            Last updated: {new Date(device.lastUpdated).toLocaleTimeString()}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default DeviceCard;
