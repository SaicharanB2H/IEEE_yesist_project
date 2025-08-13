import RelayToggle from '@/components/RelayToggle';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function RelayControlScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={{ flex: 1 }}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <ThemedText style={[styles.title, { color: colors.textPrimary }]}>
          🔌 Relay Control Center
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
          Control your ESP32 devices remotely
        </ThemedText>
      </View>

      <ScrollView style={styles.content}>
        {/* Main Relay */}
        <RelayToggle 
          deviceId="esp32-1" 
          title="Main Relay" 
          showStatus={true} 
        />

        {/* Additional Relays */}
        <RelayToggle 
          deviceId="esp32-2" 
          title="Secondary Relay" 
          showStatus={true} 
        />

        <RelayToggle 
          deviceId="esp32-3" 
          title="Backup Relay" 
          showStatus={true} 
        />

        {/* Information Section */}
        <View style={[styles.infoSection, { backgroundColor: colors.surface }]}>
          <ThemedText style={[styles.infoTitle, { color: colors.textPrimary }]}>
            📋 How It Works
          </ThemedText>
          <ThemedText style={[styles.infoText, { color: colors.textSecondary }]}>
            • Toggle switches update Firebase Realtime Database instantly{'\n'}
            • Your ESP32 devices listen for changes and respond in real-time{'\n'}
            • Django backend can also monitor and control these relays{'\n'}
            • All changes are synced across all connected devices
          </ThemedText>
        </View>

        {/* Status Section */}
        <View style={[styles.infoSection, { backgroundColor: colors.surface }]}>
          <ThemedText style={[styles.infoTitle, { color: colors.textPrimary }]}>
            🔗 Firebase Path
          </ThemedText>
          <ThemedText style={[styles.infoText, { color: colors.textSecondary, fontFamily: 'monospace' }]}>
            devices/esp32-1/relayOn{'\n'}
            devices/esp32-2/relayOn{'\n'}
            devices/esp32-3/relayOn
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  infoSection: {
    marginVertical: 16,
    padding: 16,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
