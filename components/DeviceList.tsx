import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Device } from '@/types';
import { mockDevices } from '@/utils/mockData';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
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
    <View style={{ 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center', 
      paddingVertical: 48 
    }}>
      <ThemedText style={{
        fontSize: 18,
        fontWeight: '600',
        color: colors.textSecondary,
        marginBottom: 8
      }}>
        No devices found
      </ThemedText>
      <ThemedText style={{
        color: colors.textTertiary,
        textAlign: 'center',
        paddingHorizontal: 32,
        lineHeight: 20
      }}>
        {filterByRoom || filterByStatus 
          ? 'No devices match your current filters'
          : 'Add your first device to get started'
        }
      </ThemedText>
    </View>
  );

  const renderLoadingState = () => (
    <View style={{ 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center', 
      paddingVertical: 48 
    }}>
      <ActivityIndicator size="large" color={colors.primary} />
      <ThemedText style={{
        color: colors.textSecondary,
        marginTop: 16
      }}>
        Loading devices...
      </ThemedText>
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
