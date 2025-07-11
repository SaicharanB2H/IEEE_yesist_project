import { Device } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

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

  return (
    <TouchableOpacity
      onPress={() => onPress?.(device)}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-3"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center justify-between">
        {/* Device Info */}
        <View className="flex-row items-center flex-1">
          <View className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 items-center justify-center mr-3">
            <Ionicons 
              name={getDeviceIcon(device.type) as any} 
              size={24} 
              color={getStatusColor(device.status)} 
            />
          </View>
          
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white">
              {device.name}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {device.room} • {device.type}
            </Text>
            
            {/* Power Usage */}
            <View className="flex-row items-center mt-1">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {device.powerUsage}W
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                ${device.estimatedCost.toFixed(2)}/day
              </Text>
            </View>
          </View>
        </View>

        {/* Status Indicators */}
        <View className="items-end">
          {/* WiFi Status */}
          <View className="flex-row items-center mb-2">
            <Ionicons 
              name={getWifiStrengthIcon(device.wifiStrength)} 
              size={16} 
              color={device.isOnline ? '#10B981' : '#EF4444'} 
            />
            <Text className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              {device.wifiStrength}%
            </Text>
          </View>

          {/* Toggle Switch */}
          <TouchableOpacity
            onPress={() => onToggle(device.id)}
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
      <View className="mt-3">
        <View className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <View 
            className="h-full bg-blue-500 rounded-full"
            style={{ 
              width: `${Math.min((device.powerUsage / 1000) * 100, 100)}%` 
            }}
          />
        </View>
        <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Last updated: {new Date(device.lastUpdated).toLocaleTimeString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DeviceCard;
