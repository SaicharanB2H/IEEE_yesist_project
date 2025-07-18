import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { InAppNotification } from '@/utils/notifications';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

interface NotificationToastProps {
  notification: InAppNotification;
  onDismiss: (id: string) => void;
  onAction?: (id: string, actionId: string) => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  notification,
  onDismiss,
  onAction,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getNotificationIcon = (type: InAppNotification['type']) => {
    switch (type) {
      case 'success':
        return 'checkmark-circle';
      case 'error':
        return 'alert-circle';
      case 'warning':
        return 'warning';
      case 'energy':
        return 'leaf';
      case 'info':
      default:
        return 'information-circle';
    }
  };

  const getNotificationColor = (type: InAppNotification['type']) => {
    switch (type) {
      case 'success':
        return colors.success || '#10B981';
      case 'error':
        return colors.error || '#EF4444';
      case 'warning':
        return colors.warning || '#F59E0B';
      case 'energy':
        return '#22C55E';
      case 'info':
      default:
        return colors.primary || '#3B82F6';
    }
  };

  const getBackgroundColor = (type: InAppNotification['type']) => {
    const baseColor = getNotificationColor(type);
    return colorScheme === 'dark' 
      ? `${baseColor}20` // 20% opacity
      : `${baseColor}10`; // 10% opacity
  };

  return (
    <Animated.View
      style={{
        transform: [{ translateY: notification.translateY }],
        opacity: notification.opacity,
        marginBottom: 8,
      }}
    >
      <View
        style={{
          marginHorizontal: 16,
          padding: 16,
          backgroundColor: colors.card,
          borderRadius: 12,
          borderLeftWidth: 4,
          borderLeftColor: getNotificationColor(notification.type),
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: colorScheme === 'dark' ? 0.3 : 0.1,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          {/* Icon */}
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: getBackgroundColor(notification.type),
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <Ionicons
              name={getNotificationIcon(notification.type) as any}
              size={24}
              color={getNotificationColor(notification.type)}
            />
          </View>

          {/* Content */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: colors.textPrimary,
                marginBottom: 4,
              }}
            >
              {notification.title}
            </Text>
            
            <Text
              style={{
                fontSize: 14,
                color: colors.textSecondary,
                lineHeight: 20,
              }}
            >
              {notification.message}
            </Text>

            {/* Actions */}
            {notification.actions && notification.actions.length > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 12,
                  gap: 8,
                }}
              >
                {notification.actions.map((action) => (
                  <Pressable
                    key={action.id}
                    onPress={() => onAction?.(notification.id, action.id)}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 6,
                      backgroundColor: action.type === 'destructive' 
                        ? colors.error 
                        : getNotificationColor(notification.type),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '600',
                        color: 'white',
                      }}
                    >
                      {action.title}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}

            {/* Timestamp */}
            <Text
              style={{
                fontSize: 12,
                color: colors.textSecondary,
                marginTop: 8,
                opacity: 0.7,
              }}
            >
              {new Date(notification.timestamp).toLocaleTimeString()}
            </Text>
          </View>

          {/* Dismiss button */}
          <Pressable
            onPress={() => onDismiss(notification.id)}
            style={{
              padding: 4,
              marginLeft: 8,
            }}
          >
            <Ionicons
              name="close"
              size={20}
              color={colors.textSecondary}
            />
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
};

// Container component for all notifications
interface NotificationContainerProps {
  notifications: InAppNotification[];
  onDismiss: (id: string) => void;
  onAction?: (id: string, actionId: string) => void;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notifications,
  onDismiss,
  onAction,
}) => {
  if (notifications.length === 0) return null;

  return (
    <View
      style={{
        position: 'absolute',
        top: 60, // Below status bar
        left: 0,
        right: 0,
        zIndex: 1000,
        pointerEvents: 'box-none',
      }}
    >
      {notifications
        .filter(n => n.visible)
        .slice(0, 3) // Show max 3 notifications
        .map((notification) => (
          <NotificationToast
            key={notification.id}
            notification={notification}
            onDismiss={onDismiss}
            onAction={onAction}
          />
        ))}
    </View>
  );
};

export { NotificationContainer, NotificationToast };
export default NotificationContainer;
