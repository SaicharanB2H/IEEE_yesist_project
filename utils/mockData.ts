// Mock data for development and testing
import { AnalyticsData, AutomationRule, Device, User } from '@/types';

export const mockDevices: Device[] = [
  {
    id: 'device_1',
    name: 'Living Room Light',
    type: 'light',
    status: 'on',
    powerUsage: 45,
    isOnline: true,
    wifiStrength: 85,
    room: 'Living Room',
    lastUpdated: new Date(),
    estimatedCost: 2.15,
  },
  {
    id: 'device_2',
    name: 'Bedroom Fan',
    type: 'fan',
    status: 'on',
    powerUsage: 75,
    isOnline: true,
    wifiStrength: 72,
    room: 'Bedroom',
    lastUpdated: new Date(),
    estimatedCost: 3.60,
  },
  {
    id: 'device_3',
    name: 'Kitchen AC',
    type: 'ac',
    status: 'off',
    powerUsage: 0,
    isOnline: true,
    wifiStrength: 90,
    room: 'Kitchen',
    lastUpdated: new Date(),
    estimatedCost: 0,
  },
  {
    id: 'device_4',
    name: 'Office Heater',
    type: 'heater',
    status: 'idle',
    powerUsage: 25,
    isOnline: false,
    wifiStrength: 45,
    room: 'Office',
    lastUpdated: new Date(),
    estimatedCost: 1.20,
  },
  {
    id: 'device_5',
    name: 'Garage Power Outlet',
    type: 'plug',
    status: 'on',
    powerUsage: 120,
    isOnline: true,
    wifiStrength: 60,
    room: 'Garage',
    lastUpdated: new Date(),
    estimatedCost: 5.76,
  },
];

export const mockAutomationRules: AutomationRule[] = [
  {
    id: 'rule_1',
    name: 'Night Time Energy Saver',
    deviceId: 'device_1',
    conditions: [
      {
        type: 'time',
        operator: 'greater',
        value: '22:00',
      },
    ],
    actions: [
      {
        type: 'toggle',
        value: 'off',
      },
    ],
    isActive: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'rule_2',
    name: 'High Usage Alert',
    deviceId: 'device_5',
    conditions: [
      {
        type: 'usage',
        operator: 'greater',
        value: 100,
        unit: 'W',
      },
    ],
    actions: [
      {
        type: 'notify',
        value: 'High power usage detected',
      },
    ],
    isActive: true,
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'rule_3',
    name: 'Cost Control',
    deviceId: 'device_2',
    conditions: [
      {
        type: 'cost',
        operator: 'greater',
        value: 5,
      },
    ],
    actions: [
      {
        type: 'toggle',
        value: 'off',
      },
      {
        type: 'notify',
        value: 'Device turned off due to high cost',
      },
    ],
    isActive: false,
    createdAt: new Date('2024-01-25'),
  },
];

export const mockAnalyticsData: AnalyticsData = {
  period: 'daily',
  deviceUsage: [
    {
      deviceId: 'device_1',
      deviceName: 'Living Room Light',
      usage: 1.2,
      cost: 2.15,
      percentage: 15,
    },
    {
      deviceId: 'device_2',
      deviceName: 'Bedroom Fan',
      usage: 1.8,
      cost: 3.60,
      percentage: 22,
    },
    {
      deviceId: 'device_5',
      deviceName: 'Garage Power Outlet',
      usage: 2.88,
      cost: 5.76,
      percentage: 35,
    },
    {
      deviceId: 'device_4',
      deviceName: 'Office Heater',
      usage: 0.6,
      cost: 1.20,
      percentage: 7,
    },
  ],
  totalCost: 12.71,
  totalUsage: 6.48,
  carbonFootprint: 3.24,
  predictions: [
    {
      deviceId: 'device_1',
      predictedUsage: 1.5,
      confidence: 0.85,
      suggestion: 'Consider using LED bulbs for 60% energy savings',
    },
    {
      deviceId: 'device_2',
      predictedUsage: 2.2,
      confidence: 0.78,
      suggestion: 'Schedule auto-off during sleep hours',
    },
  ],
};

export const mockUser: User = {
  id: 'user_1',
  email: 'john.doe@example.com',
  name: 'John Doe',
  preferences: {
    theme: 'auto',
    currency: 'USD',
    notifications: {
      pushEnabled: true,
      emailEnabled: true,
      unusualActivity: true,
      usageSpikes: true,
      costAlerts: true,
      deviceOffline: false,
    },
    energyGoals: {
      dailyUsageLimit: 10, // kWh
      monthlyCostLimit: 150,
      carbonReductionTarget: 20, // percentage
    },
  },
  createdAt: new Date('2024-01-01'),
};

// Mock API responses
export const createMockApiResponse = <T>(data: T, delay: number = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data,
        message: 'Success',
      });
    }, delay);
  });
};

export const createMockErrorResponse = (error: string, delay: number = 1000) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject({
        success: false,
        error,
      });
    }, delay);
  });
};

// Mock device metrics over time for charts
export const generateMockUsageData = (days: number = 7) => {
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      usage: Math.random() * 100 + 20, // 20-120 kWh
      cost: Math.random() * 30 + 10,   // $10-40
      devices: Math.floor(Math.random() * 3) + 3, // 3-5 active devices
    });
  }
  
  return data;
};

export const generateMockHourlyData = () => {
  const data = [];
  for (let hour = 0; hour < 24; hour++) {
    data.push({
      hour: `${hour.toString().padStart(2, '0')}:00`,
      usage: Math.random() * 15 + 5, // 5-20 kWh per hour
      cost: Math.random() * 5 + 2,   // $2-7 per hour
    });
  }
  return data;
};

export const MOCK_ECO_TIPS = [
  {
    id: 'tip_1',
    title: 'LED Lighting',
    description: 'Replace incandescent bulbs with LED bulbs to save up to 80% energy',
    savings: '80%',
    difficulty: 'Easy',
    icon: 'bulb',
  },
  {
    id: 'tip_2',
    title: 'Smart Thermostat',
    description: 'Use programmable thermostats to reduce heating and cooling costs',
    savings: '23%',
    difficulty: 'Medium',
    icon: 'thermometer',
  },
  {
    id: 'tip_3',
    title: 'Unplug Devices',
    description: 'Unplug electronics when not in use to eliminate phantom loads',
    savings: '15%',
    difficulty: 'Easy',
    icon: 'power',
  },
  {
    id: 'tip_4',
    title: 'Energy Star Appliances',
    description: 'Choose ENERGY STAR certified appliances for maximum efficiency',
    savings: '30%',
    difficulty: 'Hard',
    icon: 'star',
  },
];
