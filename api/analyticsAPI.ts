import { AnalyticsData, ApiResponse } from '@/types';
import apiClient from './deviceAPI';

export const analyticsAPI = {
  // Get analytics data for a specific period
  getAnalytics: (period: 'hourly' | 'daily' | 'weekly' | 'monthly'): Promise<ApiResponse<AnalyticsData>> => {
    return apiClient.get(`/analytics?period=${period}`).then(response => response.data);
  },

  // Get device-specific analytics
  getDeviceAnalytics: (deviceId: string, period: string): Promise<ApiResponse<AnalyticsData>> => {
    return apiClient.get(`/analytics/device/${deviceId}?period=${period}`).then(response => response.data);
  },

  // Get cost projections
  getCostProjections: (days: number = 30): Promise<ApiResponse<any>> => {
    return apiClient.get(`/analytics/projections?days=${days}`).then(response => response.data);
  },

  // Get eco-friendly tips
  getEcoTips: (): Promise<ApiResponse<any[]>> => {
    return apiClient.get('/analytics/eco-tips').then(response => response.data);
  },

  // Export analytics data
  exportData: (format: 'csv' | 'pdf', period: string): Promise<ApiResponse<string>> => {
    return apiClient.get(`/analytics/export?format=${format}&period=${period}`).then(response => response.data);
  },
};
