import { ApiResponse, User } from '@/types';
import apiClient from './deviceAPI';

export const authAPI = {
  // Login with email and password
  login: (email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> => {
    return apiClient.post('/auth/login', { email, password }).then(response => response.data);
  },

  // Register new user
  register: (userData: { name: string; email: string; password: string }): Promise<ApiResponse<{ user: User; token: string }>> => {
    return apiClient.post('/auth/register', userData).then(response => response.data);
  },

  // Send OTP for passwordless login
  sendOTP: (email: string): Promise<ApiResponse<void>> => {
    return apiClient.post('/auth/send-otp', { email }).then(response => response.data);
  },

  // Verify OTP
  verifyOTP: (email: string, otp: string): Promise<ApiResponse<{ user: User; token: string }>> => {
    return apiClient.post('/auth/verify-otp', { email, otp }).then(response => response.data);
  },

  // Refresh authentication token
  refreshToken: (): Promise<ApiResponse<{ token: string }>> => {
    return apiClient.post('/auth/refresh').then(response => response.data);
  },

  // Logout
  logout: (): Promise<ApiResponse<void>> => {
    return apiClient.post('/auth/logout').then(response => response.data);
  },

  // Get current user profile
  getProfile: (): Promise<ApiResponse<User>> => {
    return apiClient.get('/auth/profile').then(response => response.data);
  },

  // Update user profile
  updateProfile: (updates: Partial<User>): Promise<ApiResponse<User>> => {
    return apiClient.patch('/auth/profile', updates).then(response => response.data);
  },

  // Change password
  changePassword: (currentPassword: string, newPassword: string): Promise<ApiResponse<void>> => {
    return apiClient.post('/auth/change-password', { currentPassword, newPassword }).then(response => response.data);
  },

  // Reset password
  resetPassword: (email: string): Promise<ApiResponse<void>> => {
    return apiClient.post('/auth/reset-password', { email }).then(response => response.data);
  },
};
