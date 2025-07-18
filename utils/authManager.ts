import { authAPI } from '@/api/authAPI';
import { User } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export class AuthManager {
  private static instance: AuthManager;
  private tokens: AuthTokens | null = null;

  private constructor() {}

  static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  async initialize(): Promise<boolean> {
    try {
      const storedTokens = await AsyncStorage.getItem('auth_tokens');
      if (storedTokens) {
        this.tokens = JSON.parse(storedTokens);
        
        // Check if tokens are still valid
        if (this.tokens && this.tokens.expiresAt > Date.now()) {
          return true;
        } else {
          // Try to refresh tokens
          return await this.refreshTokens();
        }
      }
      return false;
    } catch (error) {
      console.error('Error initializing auth:', error);
      return false;
    }
  }

  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const response = await authAPI.login(email, password);
      
      if (response.success && response.data) {
        this.tokens = {
          accessToken: response.data.token,
          refreshToken: response.data.token, // Use same token for refresh in mock
          expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        };
        await this.storeTokens();
        
        return {
          success: true,
          user: response.data.user
        };
      }
      
      return {
        success: false,
        error: response.error || 'Login failed'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error'
      };
    }
  }

  async loginWithOTP(email: string): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const response = await authAPI.sendOTP(email);
      
      if (response.success) {
        return {
          success: true,
          message: 'OTP sent to your email'
        };
      }
      
      return {
        success: false,
        error: response.error || 'Failed to send OTP'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error'
      };
    }
  }

  async verifyOTP(email: string, otp: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const response = await authAPI.verifyOTP(email, otp);
      
      if (response.success && response.data) {
        this.tokens = {
          accessToken: response.data.token,
          refreshToken: response.data.token,
          expiresAt: Date.now() + (24 * 60 * 60 * 1000)
        };
        await this.storeTokens();
        
        return {
          success: true,
          user: response.data.user
        };
      }
      
      return {
        success: false,
        error: response.error || 'Invalid OTP'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error'
      };
    }
  }

  async register(userData: { name: string; email: string; password: string }): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const response = await authAPI.register(userData);
      
      if (response.success && response.data) {
        this.tokens = {
          accessToken: response.data.token,
          refreshToken: response.data.token,
          expiresAt: Date.now() + (24 * 60 * 60 * 1000)
        };
        await this.storeTokens();
        
        return {
          success: true,
          user: response.data.user
        };
      }
      
      return {
        success: false,
        error: response.error || 'Registration failed'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error'
      };
    }
  }

  async logout(): Promise<void> {
    try {
      if (this.tokens) {
        await authAPI.logout();
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      this.tokens = null;
      await AsyncStorage.removeItem('auth_tokens');
    }
  }

  async refreshTokens(): Promise<boolean> {
    try {
      if (!this.tokens) return false;
      
      const response = await authAPI.refreshToken();
      
      if (response.success && response.data) {
        this.tokens = {
          accessToken: response.data.token,
          refreshToken: response.data.token,
          expiresAt: Date.now() + (24 * 60 * 60 * 1000)
        };
        await this.storeTokens();
        return true;
      }
      
      // Refresh failed, clear tokens
      await this.logout();
      return false;
    } catch (error) {
      console.error('Error refreshing tokens:', error);
      await this.logout();
      return false;
    }
  }

  getAccessToken(): string | null {
    return this.tokens?.accessToken || null;
  }

  isAuthenticated(): boolean {
    return this.tokens !== null && this.tokens.expiresAt > Date.now();
  }

  private async storeTokens(): Promise<void> {
    if (this.tokens) {
      await AsyncStorage.setItem('auth_tokens', JSON.stringify(this.tokens));
    }
  }

  // Biometric authentication methods
  async enableBiometrics(): Promise<boolean> {
    try {
      // This would integrate with expo-local-authentication
      // For now, just store the preference
      await AsyncStorage.setItem('biometrics_enabled', 'true');
      return true;
    } catch (error) {
      console.error('Error enabling biometrics:', error);
      return false;
    }
  }

  async disableBiometrics(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem('biometrics_enabled');
      return true;
    } catch {
      console.error('Error disabling biometrics');
      return false;
    }
  }

  async isBiometricsEnabled(): Promise<boolean> {
    try {
      const enabled = await AsyncStorage.getItem('biometrics_enabled');
      return enabled === 'true';
    } catch {
      return false;
    }
  }

  async authenticateWithBiometrics(): Promise<{ success: boolean; error?: string }> {
    // This would integrate with expo-local-authentication
    // For now, simulate biometric authentication
    return { success: true };
  }
}

// Singleton instance
export const authManager = AuthManager.getInstance();
