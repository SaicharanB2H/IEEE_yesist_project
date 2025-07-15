import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Device } from '@/types';
import { mockDevices } from '@/utils/mockData';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
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
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
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

  const renderItem = ({ item }: { item: Device }) => (
    <DeviceCard
      device={item}
      onPress={() => onDevicePress?.(item)}
      isLoading={toggleLoading === item.id}
      onToggle={() => handleToggleDevice(item.id)}
    />
  );

  const renderLoadingItems = () => (
    <FlatList
      data={[1, 2, 3]}
      renderItem={({ index }) => (
        <DeviceCard
          key={index}
          isLoading={true}
          onToggle={() => {}}
          device={{
            id: `loading-${index}`,
            name: 'Loading...',
            status: 'off',
            type: 'other',
            room: '',
            powerUsage: 0,
            isOnline: false,
            wifiStrength: 0,
            lastUpdated: new Date(),
            estimatedCost: 0
          }}
        />
      )}
      keyExtractor={(_, index) => `loading-${index}`}
    />
  );

  if (loading) {
    return renderLoadingItems();
  }

  const filteredDevices = devices.filter(device => {
    if (filterByRoom && device.room !== filterByRoom) return false;
    if (filterByStatus && device.status !== filterByStatus) return false;
    return true;
  });

  return (
    <FlatList
      data={filteredDevices}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.text}
        />
      }
      ListEmptyComponent={
        <ThemedText className="text-center py-4">
          No devices found
        </ThemedText>
      }
    />
  );
};

export default DeviceList;
