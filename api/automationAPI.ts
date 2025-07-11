import { ApiResponse, AutomationRule } from '@/types';
import apiClient from './deviceAPI';

export const automationAPI = {
  // Get all automation rules
  getRules: (): Promise<ApiResponse<AutomationRule[]>> => {
    return apiClient.get('/automation/rules').then(response => response.data);
  },

  // Create new automation rule
  createRule: (rule: Omit<AutomationRule, 'id' | 'createdAt'>): Promise<ApiResponse<AutomationRule>> => {
    return apiClient.post('/automation/rules', rule).then(response => response.data);
  },

  // Update automation rule
  updateRule: (rule: AutomationRule): Promise<ApiResponse<AutomationRule>> => {
    return apiClient.put(`/automation/rules/${rule.id}`, rule).then(response => response.data);
  },

  // Delete automation rule
  deleteRule: (ruleId: string): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/automation/rules/${ruleId}`).then(response => response.data);
  },

  // Toggle rule active status
  toggleRule: (ruleId: string): Promise<ApiResponse<AutomationRule>> => {
    return apiClient.patch(`/automation/rules/${ruleId}/toggle`).then(response => response.data);
  },

  // Get rule execution history
  getRuleHistory: (ruleId: string): Promise<ApiResponse<any[]>> => {
    return apiClient.get(`/automation/rules/${ruleId}/history`).then(response => response.data);
  },

  // Test rule conditions
  testRule: (rule: Partial<AutomationRule>): Promise<ApiResponse<boolean>> => {
    return apiClient.post('/automation/rules/test', rule).then(response => response.data);
  },
};
