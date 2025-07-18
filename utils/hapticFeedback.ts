import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

/**
 * Enhanced Haptic Feedback System
 * Provides contextual haptic feedback for different user interactions
 */

export class HapticFeedbackManager {
  private static instance: HapticFeedbackManager;
  private hapticEnabled: boolean = true;

  private constructor() {}

  static getInstance(): HapticFeedbackManager {
    if (!HapticFeedbackManager.instance) {
      HapticFeedbackManager.instance = new HapticFeedbackManager();
    }
    return HapticFeedbackManager.instance;
  }

  setHapticEnabled(enabled: boolean): void {
    this.hapticEnabled = enabled;
  }

  // Success feedback for device toggles, successful actions
  async success(): Promise<void> {
    if (!this.hapticEnabled || Platform.OS !== 'ios') return;
    
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  }

  // Error feedback for failed actions, connection issues
  async error(): Promise<void> {
    if (!this.hapticEnabled || Platform.OS !== 'ios') return;
    
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  }

  // Warning feedback for caution alerts
  async warning(): Promise<void> {
    if (!this.hapticEnabled || Platform.OS !== 'ios') return;
    
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  }

  // Light tap for button presses, card taps
  async light(): Promise<void> {
    if (!this.hapticEnabled) return;
    
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  }

  // Medium tap for toggles, selections
  async medium(): Promise<void> {
    if (!this.hapticEnabled) return;
    
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  }

  // Heavy tap for important actions, confirmations
  async heavy(): Promise<void> {
    if (!this.hapticEnabled) return;
    
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  }

  // Selection feedback for picker changes, slider adjustments
  async selection(): Promise<void> {
    if (!this.hapticEnabled) return;
    
    try {
      await Haptics.selectionAsync();
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  }

  // Custom haptic patterns for specific interactions
  async deviceConnect(): Promise<void> {
    if (!this.hapticEnabled) return;
    
    try {
      await this.light();
      await new Promise(resolve => setTimeout(resolve, 100));
      await this.success();
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  }

  async deviceDisconnect(): Promise<void> {
    if (!this.hapticEnabled) return;
    
    try {
      await this.medium();
      await new Promise(resolve => setTimeout(resolve, 150));
      await this.light();
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  }

  async automationTriggered(): Promise<void> {
    if (!this.hapticEnabled) return;
    
    try {
      await this.selection();
      await new Promise(resolve => setTimeout(resolve, 50));
      await this.light();
      await new Promise(resolve => setTimeout(resolve, 50));
      await this.light();
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  }

  async energySavingAlert(): Promise<void> {
    if (!this.hapticEnabled) return;
    
    try {
      await this.light();
      await new Promise(resolve => setTimeout(resolve, 300));
      await this.medium();
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  }

  async longPress(): Promise<void> {
    if (!this.hapticEnabled) return;
    
    try {
      await this.heavy();
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  }
}

export const hapticFeedback = HapticFeedbackManager.getInstance();

// Convenience functions for common patterns
export const HapticPatterns = {
  buttonTap: () => hapticFeedback.light(),
  toggleSwitch: () => hapticFeedback.medium(),
  cardSelect: () => hapticFeedback.selection(),
  actionSuccess: () => hapticFeedback.success(),
  actionFailed: () => hapticFeedback.error(),
  warningAlert: () => hapticFeedback.warning(),
  deviceConnected: () => hapticFeedback.deviceConnect(),
  deviceDisconnected: () => hapticFeedback.deviceDisconnect(),
  automationTriggered: () => hapticFeedback.automationTriggered(),
  energySaving: () => hapticFeedback.energySavingAlert(),
  longPressAction: () => hapticFeedback.longPress(),
};
