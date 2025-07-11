import { ApiResponse, Device, DeviceMetrics } from '@/types';
import axios from 'axios';

// Base API configuration
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    // const token = AsyncStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      // Redirect to login
    }
    return Promise.reject(error);
  }
);

export const deviceAPI = {
  // Get all devices
  getDevices: (): Promise<ApiResponse<Device[]>> => {
    return apiClient.get('/devices').then(response => response.data);
  },

  // Get specific device
  getDevice: (deviceId: string): Promise<ApiResponse<Device>> => {
    return apiClient.get(`/devices/${deviceId}`).then(response => response.data);
  },

  // Toggle device state
  toggleDevice: (deviceId: string): Promise<ApiResponse<Device>> => {
    return apiClient.post(`/devices/${deviceId}/toggle`).then(response => response.data);
  },

  // Get device metrics
  getDeviceMetrics: (deviceId: string): Promise<ApiResponse<DeviceMetrics>> => {
    return apiClient.get(`/devices/${deviceId}/metrics`).then(response => response.data);
  },

  // Update device settings
  updateDevice: (deviceId: string, updates: Partial<Device>): Promise<ApiResponse<Device>> => {
    return apiClient.patch(`/devices/${deviceId}`, updates).then(response => response.data);
  },

  // Add new device
  addDevice: (device: Omit<Device, 'id'>): Promise<ApiResponse<Device>> => {
    return apiClient.post('/devices', device).then(response => response.data);
  },

  // Remove device
  removeDevice: (deviceId: string): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/devices/${deviceId}`).then(response => response.data);
  },
};

export default apiClient;
