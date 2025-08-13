import RelayToggle from '@/components/RelayToggle';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { StyleSheet } from 'react-native';

// Example of how to use RelayToggle in any screen
export default function SimpleRelayExample() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Simple Relay Control</ThemedText>
      
      {/* Basic usage */}
      <RelayToggle />
      
      {/* Custom device ID */}
      <RelayToggle 
        deviceId="esp32-2" 
        title="Kitchen Relay"
      />
      
      {/* Without status badge */}
      <RelayToggle 
        deviceId="esp32-3" 
        title="Garage Door"
        showStatus={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
