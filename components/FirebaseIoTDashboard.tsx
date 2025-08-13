import RelayToggle from '@/components/RelayToggle';
import { ThemedText } from '@/components/ThemedText';
import { firebaseService, useRealtimeData } from '@/hooks/useFirebase';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SensorData {
  temperature: number;
  humidity: number;
  timestamp: number;
}

interface DeviceStatus {
  led: boolean;
  fan: boolean;
  pump: boolean;
  lastUpdate: number;
}

export default function FirebaseIoTDashboard() {
  // Listen to sensor data
  const { data: sensorData, loading: sensorLoading, error: sensorError } = 
    useRealtimeData<SensorData>('sensors/current');
  
  // Listen to device status
  const { data: deviceStatus, loading: deviceLoading, error: deviceError } = 
    useRealtimeData<DeviceStatus>('device/status');

  // Send command to device
  const sendCommand = async (device: string, state: boolean) => {
    const result = await firebaseService.writeData(`device/commands/${device}`, {
      state,
      timestamp: Date.now()
    });

    if (result.success) {
      Alert.alert('Success', `${device} command sent successfully`);
    } else {
      Alert.alert('Error', result.error || 'Failed to send command');
    }
  };

  // Log sensor data
  const logSensorReading = async () => {
    if (sensorData) {
      const result = await firebaseService.pushData('sensors/history', {
        ...sensorData,
        loggedAt: Date.now()
      });

      if (result.success) {
        Alert.alert('Success', 'Sensor data logged');
      } else {
        Alert.alert('Error', result.error || 'Failed to log data');
      }
    }
  };

  if (sensorLoading || deviceLoading) {
    return (
      <ScrollView style={styles.container}>
        <ThemedText style={styles.title}>IoT Dashboard</ThemedText>
        <ThemedText>Loading Firebase data...</ThemedText>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ThemedText style={styles.title}>Firebase IoT Dashboard</ThemedText>

      {/* Relay Control Section */}
      <RelayToggle 
        deviceId="esp32-1" 
        title="Main Relay Control" 
        showStatus={true} 
      />

      {/* Sensor Data Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Sensor Data</ThemedText>
        {sensorError ? (
          <ThemedText style={styles.error}>Sensor Error: {sensorError}</ThemedText>
        ) : sensorData ? (
          <View style={styles.dataContainer}>
            <ThemedText>🌡️ Temperature: {sensorData.temperature}°C</ThemedText>
            <ThemedText>💧 Humidity: {sensorData.humidity}%</ThemedText>
            <ThemedText>⏰ Last Update: {new Date(sensorData.timestamp).toLocaleString()}</ThemedText>
            <TouchableOpacity 
              style={styles.button} 
              onPress={logSensorReading}
            >
              <Text style={styles.buttonText}>Log Reading</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ThemedText>No sensor data available</ThemedText>
        )}
      </View>

      {/* Device Control Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Device Control</ThemedText>
        {deviceError ? (
          <ThemedText style={styles.error}>Device Error: {deviceError}</ThemedText>
        ) : deviceStatus ? (
          <View style={styles.controlContainer}>
            <View style={styles.deviceRow}>
              <ThemedText>💡 LED: {deviceStatus.led ? 'ON' : 'OFF'}</ThemedText>
              <TouchableOpacity 
                style={[styles.controlButton, deviceStatus.led ? styles.onButton : styles.offButton]}
                onPress={() => sendCommand('led', !deviceStatus.led)}
              >
                <Text style={styles.buttonText}>Toggle</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.deviceRow}>
              <ThemedText>🌀 Fan: {deviceStatus.fan ? 'ON' : 'OFF'}</ThemedText>
              <TouchableOpacity 
                style={[styles.controlButton, deviceStatus.fan ? styles.onButton : styles.offButton]}
                onPress={() => sendCommand('fan', !deviceStatus.fan)}
              >
                <Text style={styles.buttonText}>Toggle</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.deviceRow}>
              <ThemedText>💧 Pump: {deviceStatus.pump ? 'ON' : 'OFF'}</ThemedText>
              <TouchableOpacity 
                style={[styles.controlButton, deviceStatus.pump ? styles.onButton : styles.offButton]}
                onPress={() => sendCommand('pump', !deviceStatus.pump)}
              >
                <Text style={styles.buttonText}>Toggle</Text>
              </TouchableOpacity>
            </View>
            
            <ThemedText style={styles.updateTime}>
              Last Device Update: {new Date(deviceStatus.lastUpdate).toLocaleString()}
            </ThemedText>
          </View>
        ) : (
          <ThemedText>No device status available</ThemedText>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  dataContainer: {
    gap: 10,
  },
  controlContainer: {
    gap: 15,
  },
  deviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  controlButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 70,
  },
  onButton: {
    backgroundColor: '#34C759',
  },
  offButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    color: '#FF3B30',
    fontStyle: 'italic',
  },
  updateTime: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 10,
  },
});
