// Constants for the IoT Smart Power Regulation System

export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

export const DEVICE_TYPES = {
  LIGHT: 'light',
  FAN: 'fan',
  PLUG: 'plug',
  AC: 'ac',
  HEATER: 'heater',
  OTHER: 'other',
} as const;

export const DEVICE_STATUS = {
  ON: 'on',
  OFF: 'off',
  IDLE: 'idle',
} as const;

export const ANALYTICS_PERIODS = {
  HOURLY: 'hourly',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
} as const;

export const NOTIFICATION_TYPES = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  SUCCESS: 'success',
} as const;

export const AUTOMATION_CONDITION_TYPES = {
  TIME: 'time',
  USAGE: 'usage',
  COST: 'cost',
  SENSOR: 'sensor',
} as const;

export const AUTOMATION_ACTION_TYPES = {
  TOGGLE: 'toggle',
  SCHEDULE: 'schedule',
  NOTIFY: 'notify',
} as const;

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
} as const;

export const COLORS = {
  PRIMARY: '#3B82F6',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#3B82F6',
  GRAY: '#6B7280',
  LIGHT_GRAY: '#9CA3AF',
  DARK_GRAY: '#374151',
};

export const POWER_THRESHOLDS = {
  LOW: 50,      // watts
  MEDIUM: 200,  // watts
  HIGH: 500,    // watts
  CRITICAL: 1000, // watts
};

export const COST_THRESHOLDS = {
  LOW: 5,       // dollars per day
  MEDIUM: 15,   // dollars per day
  HIGH: 30,     // dollars per day
  CRITICAL: 50, // dollars per day
};

export const REFRESH_INTERVALS = {
  DEVICE_STATUS: 5000,    // 5 seconds
  ANALYTICS: 60000,       // 1 minute
  AUTOMATION: 30000,      // 30 seconds
  NOTIFICATIONS: 10000,   // 10 seconds
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_PREFERENCES: 'userPreferences',
  DEVICE_CACHE: 'deviceCache',
  ANALYTICS_CACHE: 'analyticsCache',
  LAST_SYNC: 'lastSync',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  UNAUTHORIZED: 'You need to log in to access this feature.',
  DEVICE_OFFLINE: 'Device is currently offline.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_REQUIRED: 'Email is required.',
  PASSWORD_REQUIRED: 'Password is required.',
  WEAK_PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase, and numbers.',
  DEVICE_NOT_FOUND: 'Device not found.',
  RULE_CREATION_FAILED: 'Failed to create automation rule.',
  DATA_SYNC_FAILED: 'Failed to sync data with server.',
};

export const SUCCESS_MESSAGES = {
  DEVICE_TOGGLED: 'Device status updated successfully.',
  RULE_CREATED: 'Automation rule created successfully.',
  RULE_UPDATED: 'Automation rule updated successfully.',
  RULE_DELETED: 'Automation rule deleted successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  EMAIL_VERIFIED: 'Email verified successfully.',
  DATA_EXPORTED: 'Data exported successfully.',
};

export const CHART_CONFIG = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#3B82F6',
  },
};

export const DEFAULT_ROOM_NAMES = [
  'Living Room',
  'Bedroom',
  'Kitchen',
  'Bathroom',
  'Office',
  'Garage',
  'Basement',
  'Attic',
];

export const ECO_TIPS = [
  'Turn off devices when not in use to save ~15% on your bill',
  'Use smart scheduling for AC during peak hours',
  'Replace old bulbs with LED to reduce consumption by 80%',
  'Set optimal temperature: 78°F in summer, 68°F in winter',
  'Unplug electronics to avoid phantom loads',
  'Use natural light during the day',
  'Regular maintenance of devices improves efficiency',
  'Group similar devices for better automation',
];

export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  DEVICE_NAME_MAX_LENGTH: 50,
  RULE_NAME_MAX_LENGTH: 100,
  OTP_LENGTH: 6,
  OTP_EXPIRY_MINUTES: 5,
};

export const PERMISSIONS = {
  NOTIFICATIONS: 'notifications',
  LOCATION: 'location',
  CAMERA: 'camera',
  STORAGE: 'storage',
};

export const WEBSOCKET_EVENTS = {
  DEVICE_STATUS_CHANGED: 'device_status_changed',
  POWER_USAGE_UPDATE: 'power_usage_update',
  AUTOMATION_TRIGGERED: 'automation_triggered',
  NOTIFICATION_RECEIVED: 'notification_received',
  CONNECTION_STATUS: 'connection_status',
};

export const MOCK_DATA_ENABLED = process.env.NODE_ENV === 'development';

export const FEATURE_FLAGS = {
  VOICE_CONTROL: false,
  QR_ONBOARDING: true,
  CARBON_TRACKING: true,
  SOCIAL_SHARING: false,
  ADVANCED_ANALYTICS: true,
  MULTI_HOME_SUPPORT: false,
};
