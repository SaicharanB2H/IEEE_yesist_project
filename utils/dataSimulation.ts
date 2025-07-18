import { store } from '@/store';
import { updateDevice } from '@/store/slices/devicesSlice';
import { Device } from '@/types';

export class DataSimulationEngine {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private isRunning = false;

  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    
    // Update devices every 5 seconds
    this.intervalId = setInterval(() => {
      this.simulateDeviceUpdates();
    }, 5000);

    console.log('📊 Data simulation engine started');
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log('📊 Data simulation engine stopped');
  }

  private simulateDeviceUpdates() {
    const state = store.getState();
    const devices = state.devices.devices;

    devices.forEach(device => {
      // Simulate realistic power usage fluctuations
      const updatedDevice = this.simulateDeviceData(device);
      store.dispatch(updateDevice(updatedDevice));
    });
  }

  private simulateDeviceData(device: Device): Device {
    const baseUsage = this.getBaseUsage(device.type);
    const variation = this.getUsageVariation();
    
    // Simulate status changes occasionally
    const shouldChangeStatus = Math.random() < 0.05; // 5% chance
    let newStatus = device.status;
    
    if (shouldChangeStatus) {
      const statuses: Device['status'][] = ['on', 'off', 'idle'];
      newStatus = statuses[Math.floor(Math.random() * statuses.length)];
    }

    // Calculate new power usage based on status
    let newPowerUsage = 0;
    if (newStatus === 'on') {
      newPowerUsage = baseUsage + variation;
    } else if (newStatus === 'idle') {
      newPowerUsage = baseUsage * 0.1; // 10% of base usage when idle
    }

    // Simulate wifi strength fluctuations
    const wifiVariation = (Math.random() - 0.5) * 20; // ±10 points
    const newWifiStrength = Math.max(0, Math.min(100, device.wifiStrength + wifiVariation));

    // Calculate estimated cost (assuming $0.12 per kWh)
    const costPerHour = (newPowerUsage / 1000) * 0.12;
    const estimatedCost = costPerHour * 24; // Daily cost

    return {
      ...device,
      status: newStatus,
      powerUsage: Math.round(newPowerUsage * 10) / 10,
      wifiStrength: Math.round(newWifiStrength),
      estimatedCost: Math.round(estimatedCost * 100) / 100,
      lastUpdated: new Date(),
      isOnline: newWifiStrength > 10, // Offline if wifi too weak
    };
  }

  private getBaseUsage(deviceType: Device['type']): number {
    const baseUsages = {
      light: 15,    // 15W for LED lights
      fan: 75,      // 75W for ceiling fan
      plug: 50,     // 50W average for plugged devices
      ac: 1500,     // 1500W for air conditioner
      heater: 1200, // 1200W for heater
      other: 25,    // 25W for other devices
    };
    
    return baseUsages[deviceType] || 25;
  }

  private getUsageVariation(): number {
    // Random variation ±20% of base usage
    return (Math.random() - 0.5) * 0.4;
  }

  // Generate realistic analytics data
  generateAnalyticsData() {
    const state = store.getState();
    const devices = state.devices.devices;
    
    const totalUsage = devices.reduce((sum, device) => sum + device.powerUsage, 0);
    const totalCost = devices.reduce((sum, device) => sum + device.estimatedCost, 0);
    
    return {
      period: 'daily' as const,
      deviceUsage: devices.map(device => ({
        deviceId: device.id,
        deviceName: device.name,
        usage: device.powerUsage,
        cost: device.estimatedCost,
        percentage: Math.round((device.powerUsage / totalUsage) * 100),
      })),
      totalCost,
      totalUsage: Math.round(totalUsage * 10) / 10,
      carbonFootprint: Math.round(totalUsage * 0.5 * 10) / 10, // 0.5kg CO2 per kWh
      predictions: this.generatePredictions(devices),
    };
  }

  private generatePredictions(devices: Device[]) {
    return devices.slice(0, 3).map(device => ({
      deviceId: device.id,
      predictedUsage: device.powerUsage * 1.1, // 10% increase prediction
      confidence: 0.75 + Math.random() * 0.2, // 75-95% confidence
      suggestion: this.getSuggestion(device),
    }));
  }

  private getSuggestion(device: Device): string {
    const suggestions = {
      light: 'Consider using smart dimming to save 30% energy',
      fan: 'Schedule auto-off during sleep hours for better efficiency',
      plug: 'Unplug when not in use to eliminate phantom loads',
      ac: 'Increase temperature by 2°C to save 20% energy',
      heater: 'Use timer to reduce heating costs by 25%',
      other: 'Monitor usage patterns to optimize efficiency',
    };
    
    return suggestions[device.type] || suggestions.other;
  }
}

// Singleton instance
export const dataSimulator = new DataSimulationEngine();
