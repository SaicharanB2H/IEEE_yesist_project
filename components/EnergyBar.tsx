import { Device } from '@/types';
import React from 'react';
import { Text as RNText, View } from 'react-native';

interface EnergyBarProps {
  device: Device;
  maxPower?: number;
  showLabel?: boolean;
  height?: number;
}

const EnergyBar: React.FC<EnergyBarProps> = ({ 
  device, 
  maxPower = 1000, 
  showLabel = true,
  height = 20 
}) => {
  const powerPercentage = Math.min((device.powerUsage / maxPower) * 100, 100);
  
  const getBarColor = (percentage: number) => {
    if (percentage < 30) return '#10B981'; // green
    if (percentage < 70) return '#F59E0B'; // yellow
    return '#EF4444'; // red
  };

  const getEfficiencyLabel = (percentage: number) => {
    if (percentage < 30) return 'Efficient';
    if (percentage < 70) return 'Moderate';
    return 'High Usage';
  };

  return (
    <View className="w-full">
      {showLabel && (
        <View className="flex-row justify-between items-center mb-2">
          <RNText className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Power Usage
          </RNText>
          <View className="flex-row items-center">
            <RNText className="text-sm font-semibold text-gray-900 dark:text-white">
              {device.powerUsage}W
            </RNText>
            <RNText className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              / {maxPower}W
            </RNText>
          </View>
        </View>
      )}
      
      <View className="relative">
        {/* Background Bar */}
        <View 
          className="w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
          style={{ height }}
        >
          {/* Progress Bar */}
          <View
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${powerPercentage}%`,
              backgroundColor: getBarColor(powerPercentage),
            }}
          />
        </View>
        
        {/* Percentage Text Overlay */}
        <View className="absolute inset-0 flex-row items-center justify-center">
          <RNText className="text-xs font-medium text-white drop-shadow-sm">
            {powerPercentage.toFixed(1)}%
          </RNText>
        </View>
      </View>

      {showLabel && (
        <View className="flex-row justify-between items-center mt-1">
          <RNText className="text-xs text-gray-500 dark:text-gray-400">
            {getEfficiencyLabel(powerPercentage)}
          </RNText>
          <RNText className="text-xs text-gray-500 dark:text-gray-400">
            ${device.estimatedCost.toFixed(3)}/day
          </RNText>
        </View>
      )}
    </View>
  );
};

export default EnergyBar;
