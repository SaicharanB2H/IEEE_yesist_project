import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { HapticPatterns } from '@/utils/hapticFeedback';
import { notificationManager } from '@/utils/notifications';
import { smartSuggestions } from '@/utils/smartSuggestions';
import { voiceControl } from '@/utils/voiceControl';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Platform,
    Pressable,
    SafeAreaView,
    StatusBar,
    Text,
    View,
} from 'react-native';
import { NotificationContainer } from './NotificationToast';

interface PremiumLayoutProps {
  children: React.ReactNode;
  title?: string;
  showVoiceControl?: boolean;
  showNotifications?: boolean;
  onVoiceCommand?: (command: string) => void;
}

const PremiumLayout: React.FC<PremiumLayoutProps> = ({
  children,
  title,
  showVoiceControl = true,
  showNotifications = true,
  onVoiceCommand,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // State
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [notifications, setNotifications] = useState(notificationManager.getActiveNotifications());
  const [suggestions] = useState(smartSuggestions.getSuggestions().slice(0, 2));
  
  // Animation values
  const voiceButtonScale = useRef(new Animated.Value(1)).current;
  const voiceButtonOpacity = useRef(new Animated.Value(0.8)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(contentTranslateY, {
        toValue: 0,
        duration: 400,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Set up notifications listener
    const notificationInterval = setInterval(() => {
      setNotifications(notificationManager.getActiveNotifications());
    }, 1000);

    return () => clearInterval(notificationInterval);
  }, [headerOpacity, contentTranslateY]);

  useEffect(() => {
    // Voice listening pulse animation
    if (isVoiceListening) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(voiceButtonScale, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(voiceButtonScale, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();

      const glowAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(voiceButtonOpacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(voiceButtonOpacity, {
            toValue: 0.6,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      );
      glowAnimation.start();

      return () => {
        pulseAnimation.stop();
        glowAnimation.stop();
      };
    } else {
      voiceButtonScale.setValue(1);
      voiceButtonOpacity.setValue(0.8);
    }
  }, [isVoiceListening, voiceButtonScale, voiceButtonOpacity]);

  const handleVoiceToggle = async () => {
    await HapticPatterns.buttonTap();
    
    if (isVoiceListening) {
      await voiceControl.stopListening();
      setIsVoiceListening(false);
    } else {
      const started = await voiceControl.startListening();
      setIsVoiceListening(started);
    }
  };

  const handleNotificationDismiss = (id: string) => {
    notificationManager.dismissInAppNotification(id);
  };

  const handleNotificationAction = (notificationId: string, actionId: string) => {
    // Handle notification actions
    console.log('Notification action:', notificationId, actionId);
    handleNotificationDismiss(notificationId);
  };

  const renderHeader = () => (
    <Animated.View
      style={{
        opacity: headerOpacity,
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Title */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: '800',
              color: colors.textPrimary,
              letterSpacing: -0.5,
            }}
          >
            {title || 'WePower'}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.textSecondary,
              marginTop: 2,
              fontWeight: '500',
            }}
          >
            Smart IoT Control
          </Text>
        </View>

        {/* Header Actions */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          {/* Suggestions indicator */}
          {suggestions.length > 0 && (
            <Pressable
              onPress={() => HapticPatterns.buttonTap()}
              style={{
                padding: 8,
                borderRadius: 20,
                backgroundColor: colors.warning + '20',
                position: 'relative',
              }}
            >
              <Ionicons name="bulb" size={20} color={colors.warning} />
              <View
                style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: colors.error,
                }}
              />
            </Pressable>
          )}

          {/* Voice Control Button */}
          {showVoiceControl && (
            <Pressable onPress={handleVoiceToggle}>
              <Animated.View
                style={{
                  transform: [{ scale: voiceButtonScale }],
                  opacity: voiceButtonOpacity,
                  padding: 12,
                  borderRadius: 24,
                  backgroundColor: isVoiceListening ? colors.primary : colors.surfaceSecondary,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <Ionicons
                  name={isVoiceListening ? 'mic' : 'mic-outline'}
                  size={24}
                  color={isVoiceListening ? 'white' : colors.textPrimary}
                />
              </Animated.View>
            </Pressable>
          )}

          {/* Settings */}
          <Pressable
            onPress={() => HapticPatterns.buttonTap()}
            style={{
              padding: 8,
              borderRadius: 20,
              backgroundColor: colors.surfaceSecondary,
            }}
          >
            <Ionicons name="settings-outline" size={20} color={colors.textPrimary} />
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );

  const renderSmartSuggestionsBanner = () => {
    if (suggestions.length === 0) return null;

    return (
      <Animated.View
        style={{
          opacity: headerOpacity,
          marginHorizontal: 16,
          marginTop: 12,
          padding: 16,
          backgroundColor: colors.card,
          borderRadius: 12,
          borderLeftWidth: 4,
          borderLeftColor: colors.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Ionicons name="bulb" size={20} color={colors.primary} />
          <Text
            style={{
              marginLeft: 8,
              fontSize: 16,
              fontWeight: '600',
              color: colors.textPrimary,
            }}
          >
            Smart Suggestions
          </Text>
        </View>
        
        {suggestions.map((suggestion, index) => (
          <View key={suggestion.id} style={{ marginBottom: index < suggestions.length - 1 ? 8 : 0 }}>
            <Text
              style={{
                fontSize: 14,
                color: colors.textPrimary,
                fontWeight: '500',
                marginBottom: 2,
              }}
            >
              {suggestion.title}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: colors.textSecondary,
                lineHeight: 16,
              }}
            >
              {suggestion.description}
            </Text>
            {suggestion.estimatedSavings && (
              <Text
                style={{
                  fontSize: 12,
                  color: colors.success,
                  fontWeight: '600',
                  marginTop: 4,
                }}
              >
                Save ${suggestion.estimatedSavings.toFixed(2)}/day
              </Text>
            )}
          </View>
        ))}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
        translucent={Platform.OS === 'android'}
      />
      
      {/* Notifications Overlay */}
      {showNotifications && (
        <NotificationContainer
          notifications={notifications}
          onDismiss={handleNotificationDismiss}
          onAction={handleNotificationAction}
        />
      )}

      {/* Header */}
      {renderHeader()}

      {/* Smart Suggestions Banner */}
      {renderSmartSuggestionsBanner()}

      {/* Content */}
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateY: contentTranslateY }],
        }}
      >
        {children}
      </Animated.View>

      {/* Voice Listening Indicator */}
      {isVoiceListening && (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 100,
            left: 0,
            right: 0,
            alignItems: 'center',
            opacity: voiceButtonOpacity,
          }}
        >
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 12,
              backgroundColor: colors.primary,
              borderRadius: 24,
              flexDirection: 'row',
              alignItems: 'center',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <Animated.View
              style={{
                marginRight: 8,
                transform: [{ scale: voiceButtonScale }],
              }}
            >
              <Ionicons name="mic" size={16} color="white" />
            </Animated.View>
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                fontWeight: '600',
              }}
            >
              Listening...
            </Text>
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default PremiumLayout;
