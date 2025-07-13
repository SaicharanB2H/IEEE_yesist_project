import DeviceList from '@/components/DeviceList';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Device } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';

const DashboardScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
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
    <ThemedView style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ 
        paddingHorizontal: 16, 
        paddingVertical: 16, 
        backgroundColor: colors.surface,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3
      }}>
        <ThemedText type="title" style={{ 
          fontSize: 24, 
          fontWeight: 'bold', 
          color: colors.textPrimary,
          marginBottom: 4
        }}>
          Smart Power Dashboard
        </ThemedText>
        <ThemedText type="body" style={{ color: colors.textSecondary }}>
          Monitor and control your devices
        </ThemedText>
      </View>

      {/* Filters */}
      <View style={{ 
        paddingHorizontal: 16, 
        paddingVertical: 12, 
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight
      }}>
        <ThemedText type="defaultSemiBold" style={{ 
          fontSize: 14, 
          fontWeight: '500', 
          color: colors.textSecondary,
          marginBottom: 8
        }}>
          Filters
        </ThemedText>
        
        {/* Room Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
          <TouchableOpacity
            onPress={() => setSelectedRoom(undefined)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
              marginRight: 8,
              backgroundColor: !selectedRoom ? colors.primary : colors.surfaceSecondary
            }}
          >
            <ThemedText type="body" style={{
              fontSize: 14,
              color: !selectedRoom ? colors.textInverse : colors.textPrimary,
              fontWeight: !selectedRoom ? '500' : '400'
            }}>
              All Rooms
            </ThemedText>
          </TouchableOpacity>
          
          {rooms.map((room) => (
            <TouchableOpacity
              key={room}
              onPress={() => setSelectedRoom(room)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 20,
                marginRight: 8,
                backgroundColor: selectedRoom === room ? colors.primary : colors.surfaceSecondary
              }}
            >
              <ThemedText type="body" style={{
                fontSize: 14,
                color: selectedRoom === room ? colors.textInverse : colors.textPrimary,
                fontWeight: selectedRoom === room ? '500' : '400'
              }}>
                {room}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Status Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => setSelectedStatus(undefined)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
              marginRight: 8,
              backgroundColor: !selectedStatus ? colors.success : colors.surfaceSecondary
            }}
          >
            <ThemedText style={{
              fontSize: 14,
              color: !selectedStatus ? colors.textInverse : colors.textPrimary,
              fontWeight: !selectedStatus ? '500' : '400'
            }}>
              All Status
            </ThemedText>
          </TouchableOpacity>
          
          {statusOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              onPress={() => setSelectedStatus(option.key)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 20,
                marginRight: 8,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: selectedStatus === option.key ? colors.success : colors.surfaceSecondary
              }}
            >
              <View 
                style={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: 4, 
                  marginRight: 8,
                  backgroundColor: option.color 
                }}
              />
              <ThemedText style={{
                fontSize: 14,
                color: selectedStatus === option.key ? colors.textInverse : colors.textPrimary,
                fontWeight: selectedStatus === option.key ? '500' : '400'
              }}>
                {option.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Clear Filters */}
        {(selectedRoom || selectedStatus) && (
          <TouchableOpacity
            onPress={clearFilters}
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}
          >
            <Ionicons name="close-circle" size={16} color={colors.textTertiary} />
            <ThemedText style={{ 
              fontSize: 14, 
              color: colors.textSecondary, 
              marginLeft: 4 
            }}>
              Clear filters
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>

      {/* Device List */}
      <DeviceList
        onDevicePress={handleDevicePress}
        filterByRoom={selectedRoom}
        filterByStatus={selectedStatus}
      />
    </ThemedView>
  );
};

export default DashboardScreen;
