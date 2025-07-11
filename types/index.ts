// Core types for the IoT Smart Power Regulation System

export interface Device {
  id: string;
  name: string;
  type: 'light' | 'fan' | 'plug' | 'ac' | 'heater' | 'other';
  status: 'on' | 'off' | 'idle';
  powerUsage: number; // in watts
  isOnline: boolean;
  wifiStrength: number; // 0-100
  room: string;
  lastUpdated: Date;
  estimatedCost: number; // daily cost in currency
}

export interface DeviceMetrics {
  deviceId: string;
  timestamp: Date;
  powerUsage: number;
  cost: number;
  carbonFootprint: number;
}

export interface AutomationRule {
  id: string;
  name: string;
  deviceId: string;
  conditions: RuleCondition[];
  actions: RuleAction[];
  isActive: boolean;
  createdAt: Date;
}

export interface RuleCondition {
  type: 'time' | 'usage' | 'cost' | 'sensor';
  operator: 'greater' | 'less' | 'equal' | 'between';
  value: any;
  unit?: string;
}

export interface RuleAction {
  type: 'toggle' | 'schedule' | 'notify';
  value: any;
}

export interface User {
  id: string;
  email: string;
  name: string;
  preferences: UserPreferences;
  createdAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  currency: string;
  notifications: NotificationSettings;
  energyGoals: EnergyGoals;
}

export interface NotificationSettings {
  pushEnabled: boolean;
  emailEnabled: boolean;
  unusualActivity: boolean;
  usageSpikes: boolean;
  costAlerts: boolean;
  deviceOffline: boolean;
}

export interface EnergyGoals {
  dailyUsageLimit: number; // in kWh
  monthlyCostLimit: number;
  carbonReductionTarget: number; // percentage
}

export interface AnalyticsData {
  period: 'hourly' | 'daily' | 'weekly' | 'monthly';
  deviceUsage: DeviceUsageData[];
  totalCost: number;
  totalUsage: number;
  carbonFootprint: number;
  predictions: PredictionData[];
}

export interface DeviceUsageData {
  deviceId: string;
  deviceName: string;
  usage: number;
  cost: number;
  percentage: number;
}

export interface PredictionData {
  deviceId: string;
  predictedUsage: number;
  confidence: number;
  suggestion: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Redux State Types
export interface RootState {
  devices: DevicesState;
  user: UserState;
  analytics: AnalyticsState;
  automation: AutomationState;
  notifications: NotificationsState;
}

export interface DevicesState {
  devices: Device[];
  loading: boolean;
  error: string | null;
  selectedDevice: Device | null;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface AnalyticsState {
  data: AnalyticsData | null;
  loading: boolean;
  error: string | null;
  period: 'hourly' | 'daily' | 'weekly' | 'monthly';
}

export interface AutomationState {
  rules: AutomationRule[];
  loading: boolean;
  error: string | null;
}

export interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: Date;
  isRead: boolean;
  deviceId?: string;
}
