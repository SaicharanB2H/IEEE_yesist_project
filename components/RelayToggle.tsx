import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRelayControl } from '@/hooks/useFirebase';
import React from 'react';
import { Alert, StyleSheet, Switch, Text, View } from 'react-native';

interface RelayToggleProps {
  deviceId?: string;
  title?: string;
  showStatus?: boolean;
}

export default function RelayToggle({ 
  deviceId = 'esp32-1', 
  title = 'Relay Control',
  showStatus = true 
}: RelayToggleProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { relayOn, loading, error, toggleRelay } = useRelayControl(deviceId);

  const handleToggle = async (value: boolean) => {
    const result = await toggleRelay(value);
    
    if (!result.success) {
      Alert.alert(
        'Error', 
        `Failed to ${value ? 'turn on' : 'turn off'} relay: ${result.error}`
      );
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading relay status...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={[styles.error, { color: colors.error }]}>
          Error: {error}
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <ThemedText style={[styles.title, { color: colors.textPrimary }]}>
          {title}
        </ThemedText>
        {showStatus && (
          <View style={[
            styles.statusBadge, 
            { backgroundColor: relayOn ? colors.success : colors.error }
          ]}>
            <Text style={[styles.statusText, { color: colors.textInverse }]}>
              {relayOn ? 'ON' : 'OFF'}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.toggleContainer}>
        <ThemedText style={[styles.label, { color: colors.textSecondary }]}>
          {relayOn ? '🔌 Relay is ON' : '⭕ Relay is OFF'}
        </ThemedText>
        <Switch
          value={relayOn}
          onValueChange={handleToggle}
          trackColor={{ 
            false: colors.borderLight, 
            true: colors.primary 
          }}
          thumbColor={relayOn ? colors.textInverse : colors.textTertiary}
          ios_backgroundColor={colors.borderLight}
        />
      </View>

      <ThemedText style={[styles.deviceInfo, { color: colors.textTertiary }]}>
        Device: {deviceId}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    margin: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  deviceInfo: {
    fontSize: 12,
    textAlign: 'center',
  },
  error: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
