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
      className="p-4 mb-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center justify-between">
        {/* Device Info */}
        <View className="flex-row items-center flex-1">
          <View className="items-center justify-center w-12 h-12 mr-3 bg-gray-100 rounded-full dark:bg-gray-700">
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
            <Text className="text-sm text-gray-500 capitalize dark:text-gray-400">
              {device.room} • {device.type}
            </Text>
            
            {/* Power Usage */}
            <View className="flex-row items-center mt-1">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {device.powerUsage}W
              </Text>
              <Text className="ml-2 text-xs text-gray-500 dark:text-gray-400">
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
            <Text className="ml-1 text-xs text-gray-500 dark:text-gray-400">
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
        <View className="h-2 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700">
          <View 
            className="h-full bg-blue-500 rounded-full"
            style={{ 
              width: `${Math.min((device.powerUsage / 1000) * 100, 100)}%` 
            }}
          />
        </View>
        <Text className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Last updated: {new Date(device.lastUpdated).toLocaleTimeString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DeviceCard;
