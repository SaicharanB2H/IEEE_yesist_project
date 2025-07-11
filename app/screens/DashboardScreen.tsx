import DeviceList from '@/components/DeviceList';
import { Device } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DashboardScreen: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<Device['status'] | undefined>();

  const rooms = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office'];
  const statusOptions: { key: Device['status']; label: string; color: string }[] = [
    { key: 'on', label: 'Active', color: '#10B981' },
    { key: 'off', label: 'Off', color: '#EF4444' },
    { key: 'idle', label: 'Idle', color: '#6B7280' },
  ];

  const handleDevicePress = (device: Device) => {
    Alert.alert(
      device.name,
      `Status: ${device.status}\nPower: ${device.powerUsage}W\nRoom: ${device.room}\nCost: $${device.estimatedCost.toFixed(2)}/day`,
      [{ text: 'OK' }]
    );
  };

  const clearFilters = () => {
    setSelectedRoom(undefined);
    setSelectedStatus(undefined);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="px-4 py-4 bg-white dark:bg-gray-800 shadow-sm">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Smart Power Dashboard
        </Text>
        <Text className="text-gray-600 dark:text-gray-400">
          Monitor and control your devices
        </Text>
      </View>

      {/* Filters */}
      <View className="px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Filters
        </Text>
        
        {/* Room Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
          <TouchableOpacity
            onPress={() => setSelectedRoom(undefined)}
            className={`px-3 py-2 rounded-full mr-2 ${
              !selectedRoom 
                ? 'bg-blue-500' 
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <Text className={`text-sm ${
              !selectedRoom 
                ? 'text-white font-medium' 
                : 'text-gray-700 dark:text-gray-300'
            }`}>
              All Rooms
            </Text>
          </TouchableOpacity>
          
          {rooms.map((room) => (
            <TouchableOpacity
              key={room}
              onPress={() => setSelectedRoom(room)}
              className={`px-3 py-2 rounded-full mr-2 ${
                selectedRoom === room 
                  ? 'bg-blue-500' 
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <Text className={`text-sm ${
                selectedRoom === room 
                  ? 'text-white font-medium' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                {room}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Status Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => setSelectedStatus(undefined)}
            className={`px-3 py-2 rounded-full mr-2 ${
              !selectedStatus 
                ? 'bg-green-500' 
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <Text className={`text-sm ${
              !selectedStatus 
                ? 'text-white font-medium' 
                : 'text-gray-700 dark:text-gray-300'
            }`}>
              All Status
            </Text>
          </TouchableOpacity>
          
          {statusOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              onPress={() => setSelectedStatus(option.key)}
              className={`px-3 py-2 rounded-full mr-2 flex-row items-center ${
                selectedStatus === option.key 
                  ? 'bg-green-500' 
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <View 
                className="w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: option.color }}
              />
              <Text className={`text-sm ${
                selectedStatus === option.key 
                  ? 'text-white font-medium' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Clear Filters */}
        {(selectedRoom || selectedStatus) && (
          <TouchableOpacity
            onPress={clearFilters}
            className="flex-row items-center mt-2"
          >
            <Ionicons name="close-circle" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              Clear filters
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Device List */}
      <DeviceList
        onDevicePress={handleDevicePress}
        filterByRoom={selectedRoom}
        filterByStatus={selectedStatus}
      />
    </SafeAreaView>
  );
};

export default DashboardScreen;
