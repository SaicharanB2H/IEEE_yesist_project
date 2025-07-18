import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Device } from '@/types';
import { animationManager, AnimationPresets } from '@/utils/animations';
import { HapticPatterns } from '@/utils/hapticFeedback';
import { NotificationHelpers } from '@/utils/notifications';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    Pressable,
    Text,
    View,
} from 'react-native';

interface EnhancedDeviceCardProps {
  device: Device;
  onToggle: (deviceId: string) => void;
  onPress?: (device: Device) => void;
  onLongPress?: (device: Device) => void;
  isLoading?: boolean;
  index?: number;
  showEnergySaving?: boolean;
}

const EnhancedDeviceCard: React.FC<EnhancedDeviceCardProps> = ({
  device,
  onToggle,
  onPress,
  onLongPress,
  isLoading = false,
  index = 0,
  showEnergySaving = true,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Animation values
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const powerBarWidth = useRef(new Animated.Value(0)).current;
  const statusPulse = useRef(new Animated.Value(1)).current;
  const shimmerOpacity = useRef(new Animated.Value(0.3)).current;
  
  // State
  const [lastInteraction, setLastInteraction] = useState<Date | null>(null);
  const [energySavingVisible, setEnergySavingVisible] = useState(false);

  // Initialize entrance animation
  useEffect(() => {
    const delay = index * 100; // Stagger animation
    
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          ...AnimationPresets.smooth,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);

    // Animate power bar
    animationManager.animateProgress(
      powerBarWidth,
      Math.min((device.powerUsage / 1000) * 100, 100),
      1000
    );

    // Status indicator pulse for online devices
    if (device.isOnline && device.status === 'on') {
      const pulseAnimation = animationManager.pulse(statusPulse, 0.8, 1.2);
      pulseAnimation.start();
      
      return () => pulseAnimation.stop();
    }
  }, [device.powerUsage, device.isOnline, device.status, index, opacity, powerBarWidth, statusPulse, translateY]);

  // Loading shimmer effect
  useEffect(() => {
    if (isLoading) {
      const shimmerAnimation = animationManager.createShimmerAnimation(shimmerOpacity);
      shimmerAnimation.start();
      
      return () => shimmerAnimation.stop();
    }
  }, [isLoading, shimmerOpacity]);

  // Energy saving tip display
  useEffect(() => {
    if (showEnergySaving && device.status === 'on' && device.powerUsage > 500) {
      const timer = setTimeout(() => {
        setEnergySavingVisible(true);
        setTimeout(() => setEnergySavingVisible(false), 5000);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [device.status, device.powerUsage, showEnergySaving]);

  const getDeviceIcon = useCallback((type: Device['type']) => {
    const iconMap: Record<string, string> = {
      light: 'bulb',
      fan: 'fan',
      plug: 'power',
      ac: 'snow',
      heater: 'flame',
      other: 'hardware-chip',
    };
    return iconMap[type] || 'hardware-chip';
  }, []);

  const getStatusColor = useCallback((status: Device['status']) => {
    const colorMap = {
      on: colors.success || '#10B981',
      off: colors.error || '#EF4444',
      idle: colors.textSecondary || '#6B7280',
    };
    return colorMap[status] || colors.textSecondary;
  }, [colors]);

  const getWifiStrengthIcon = useCallback((strength: number) => {
    if (strength >= 75) return 'wifi';
    if (strength >= 50) return 'wifi-outline';
    if (strength >= 25) return 'cellular-outline';
    return 'cellular';
  }, []);

  const getEnergyEfficiencyColor = useCallback((powerUsage: number) => {
    if (powerUsage < 100) return colors.success;
    if (powerUsage < 500) return colors.warning;
    return colors.error;
  }, [colors]);

  // Gesture handlers
  const handlePress = useCallback(async () => {
    await HapticPatterns.buttonTap();
    setLastInteraction(new Date());
    
    const pressAnimation = animationManager.createPressAnimation(scale);
    pressAnimation.onPressIn();
    
    setTimeout(() => {
      pressAnimation.onPressOut();
      onPress?.(device);
    }, 100);
  }, [device, onPress, scale]);

  const handleLongPress = useCallback(async () => {
    await HapticPatterns.longPressAction();
    setLastInteraction(new Date());
    
    // More pronounced scale for long press
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    
    onLongPress?.(device);
  }, [device, onLongPress, scale]);

  const handleToggle = useCallback(async () => {
    if (!device.isOnline) {
      await HapticPatterns.actionFailed();
      NotificationHelpers.deviceDisconnected(device.name);
      return;
    }

    await HapticPatterns.toggleSwitch();
    setLastInteraction(new Date());
    
    // Optimistic UI update with animation
    if (device.status === 'off') {
      animationManager.bounce(scale);
      NotificationHelpers.deviceConnected(device.name);
    }
    
    onToggle(device.id);
  }, [device, onToggle, scale]);

  const renderEnergyTip = () => {
    if (!energySavingVisible) return null;
    
    const potentialSavings = (device.powerUsage * 0.12 * 24) / 1000; // Rough calculation
    
    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: -8,
          right: -8,
          backgroundColor: colors.warning,
          borderRadius: 16,
          paddingHorizontal: 12,
          paddingVertical: 6,
          zIndex: 10,
          opacity: energySavingVisible ? 1 : 0,
        }}
      >
        <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
          Save ${potentialSavings.toFixed(2)}/day
        </Text>
      </Animated.View>
    );
  };

  const renderConnectionStatus = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
      <Animated.View style={{ transform: [{ scale: statusPulse }] }}>
        <Ionicons
          name={getWifiStrengthIcon(device.wifiStrength)}
          size={16}
          color={device.isOnline ? colors.success : colors.error}
        />
      </Animated.View>
      <Text
        style={{
          marginLeft: 4,
          fontSize: 12,
          color: colors.textSecondary,
          fontWeight: '500',
        }}
      >
        {device.wifiStrength}%
      </Text>
      {!device.isOnline && (
        <View
          style={{
            marginLeft: 8,
            backgroundColor: colors.error,
            borderRadius: 4,
            paddingHorizontal: 4,
            paddingVertical: 1,
          }}
        >
          <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
            OFFLINE
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <Animated.View
      style={{
        transform: [{ scale }, { translateY }],
        opacity,
      }}
    >
      <Pressable
        onPress={handlePress}
        onLongPress={handleLongPress}
        style={{
          position: 'relative',
          padding: 20,
          marginBottom: 16,
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: device.isOnline ? colors.border : colors.error,
          borderRadius: 16,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: colorScheme === 'dark' ? 0.4 : 0.1,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        {renderEnergyTip()}
        
        {/* Loading overlay */}
        {isLoading && (
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: colors.card,
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: shimmerOpacity,
              zIndex: 5,
            }}
          >
            <ActivityIndicator size="large" color={colors.primary} />
          </Animated.View>
        )}

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Device Info */}
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 56,
                height: 56,
                marginRight: 16,
                backgroundColor: colors.surfaceSecondary,
                borderRadius: 28,
                borderWidth: 2,
                borderColor: getStatusColor(device.status),
              }}
            >
              <Ionicons
                name={getDeviceIcon(device.type) as any}
                size={28}
                color={getStatusColor(device.status)}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: colors.textPrimary,
                  marginBottom: 4,
                }}
              >
                {device.name}
              </Text>
              
              <Text
                style={{
                  fontSize: 14,
                  color: colors.textSecondary,
                  textTransform: 'capitalize',
                  marginBottom: 6,
                }}
              >
                {device.room} • {device.type}
              </Text>

              {/* Power Usage with color coding */}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: getEnergyEfficiencyColor(device.powerUsage),
                  }}
                >
                  {device.powerUsage}W
                </Text>
                <Text
                  style={{
                    marginLeft: 12,
                    fontSize: 13,
                    color: colors.textSecondary,
                    fontWeight: '500',
                  }}
                >
                  ${device.estimatedCost.toFixed(2)}/day
                </Text>
              </View>
            </View>
          </View>

          {/* Status and Controls */}
          <View style={{ alignItems: 'flex-end' }}>
            {renderConnectionStatus()}

            {/* Enhanced Toggle Switch */}
            <Pressable
              onPress={handleToggle}
              disabled={isLoading || !device.isOnline}
              style={{
                width: 60,
                height: 32,
                borderRadius: 16,
                backgroundColor: device.status === 'on' ? colors.success : colors.surfaceSecondary,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 2,
                opacity: !device.isOnline ? 0.5 : 1,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Animated.View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: 'white',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 3,
                    transform: [
                      {
                        translateX: device.status === 'on' ? 28 : 0,
                      },
                    ],
                  }}
                />
              )}
            </Pressable>
          </View>
        </View>

        {/* Enhanced Power Usage Bar */}
        <View style={{ marginTop: 16 }}>
          <View
            style={{
              height: 6,
              backgroundColor: colors.surfaceSecondary,
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <Animated.View
              style={{
                height: '100%',
                backgroundColor: getEnergyEfficiencyColor(device.powerUsage),
                borderRadius: 3,
                width: powerBarWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
              }}
            />
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <Text style={{ fontSize: 12, color: colors.textSecondary }}>
              Last updated: {new Date(device.lastUpdated).toLocaleTimeString()}
            </Text>
            
            {lastInteraction && (
              <Text style={{ fontSize: 12, color: colors.textSecondary }}>
                Interacted: {lastInteraction.toLocaleTimeString()}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default EnhancedDeviceCard;
