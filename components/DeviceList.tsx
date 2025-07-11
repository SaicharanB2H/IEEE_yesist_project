import { Device } from '@/types';
import { mockDevices } from '@/utils/mockData';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text as RNText, View } from 'react-native';
import DeviceCard from './DeviceCard';

interface DeviceListProps {
  onDevicePress?: (device: Device) => void;
  filterByRoom?: string;
  filterByStatus?: Device['status'];
}

const DeviceList: React.FC<DeviceListProps> = ({ 
  onDevicePress,
  filterByRoom,
  filterByStatus 
}) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [toggleLoading, setToggleLoading] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      setDevices(mockDevices);
      setLoading(false);
    }, 1000);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setDevices([...mockDevices]);
      setRefreshing(false);
    }, 1000);
  };

  const handleToggleDevice = async (deviceId: string) => {
    setToggleLoading(deviceId);
    
    // Simulate API call
    setTimeout(() => {
      setDevices(prevDevices => 
        prevDevices.map(device => 
          device.id === deviceId 
            ? { 
                ...device, 
                status: device.status === 'on' ? 'off' : 'on',
                powerUsage: device.status === 'on' ? 0 : device.powerUsage || 50,
                lastUpdated: new Date()
              }
            : device
        )
      );
      setToggleLoading(null);
    }, 500);
  };

  const filteredDevices = devices.filter(device => {
    if (filterByRoom && device.room !== filterByRoom) return false;
    if (filterByStatus && device.status !== filterByStatus) return false;
    return true;
  });

  const renderDeviceCard = ({ item }: { item: Device }) => (
    <DeviceCard
      device={item}
      onToggle={handleToggleDevice}
      onPress={onDevicePress}
      isLoading={toggleLoading === item.id}
    />
  );

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center py-12">
      <RNText className="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-2">
        No devices found
      </RNText>
      <RNText className="text-gray-400 dark:text-gray-500 text-center px-8">
        {filterByRoom || filterByStatus 
          ? 'No devices match your current filters'
          : 'Add your first device to get started'
        }
      </RNText>
    </View>
  );

  const renderLoadingState = () => (
    <View className="flex-1 items-center justify-center py-12">
      <ActivityIndicator size="large" color="#3B82F6" />
      <RNText className="text-gray-500 dark:text-gray-400 mt-4">
        Loading devices...
      </RNText>
    </View>
  );

  if (loading && !refreshing && devices.length === 0) {
    return renderLoadingState();
  }

  return (
    <View className="flex-1">
      <FlatList
        data={filteredDevices}
        renderItem={renderDeviceCard}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ 
          paddingHorizontal: 16, 
          paddingVertical: 8,
          flexGrow: 1 
        }}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default DeviceList;
