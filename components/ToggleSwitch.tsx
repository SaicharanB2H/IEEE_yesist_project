import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  activeColor?: string;
  inactiveColor?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isOn,
  onToggle,
  disabled = false,
  size = 'medium',
  activeColor = '#10B981',
  inactiveColor = '#D1D5DB'
}) => {
  const animatedValue = React.useRef(new Animated.Value(isOn ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOn, animatedValue]);

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: 'w-10 h-6',
          thumb: 'w-4 h-4',
          translateX: 16
        };
      case 'large':
        return {
          container: 'w-16 h-10',
          thumb: 'w-8 h-8',
          translateX: 24
        };
      default:
        return {
          container: 'w-12 h-7',
          thumb: 'w-5 h-5',
          translateX: 20
        };
    }
  };

  const styles = getSizeStyles();
  
  const interpolatedColorAnimation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor],
  });

  const interpolatedTranslateAnimation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, styles.translateX],
  });

  return (
    <TouchableOpacity
      onPress={onToggle}
      disabled={disabled}
      activeOpacity={0.8}
      className={`${styles.container} rounded-full justify-center ${disabled ? 'opacity-50' : ''}`}
    >
      <Animated.View
        className="rounded-full flex-1"
        style={{
          backgroundColor: interpolatedColorAnimation,
        }}
      >
        <Animated.View
          className={`${styles.thumb} bg-white rounded-full shadow-md absolute top-1`}
          style={{
            transform: [
              {
                translateX: interpolatedTranslateAnimation,
              },
            ],
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ToggleSwitch;
