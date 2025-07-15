import { AutomationRule } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useRef } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../ThemedText';

interface RuleCardProps {
  rule: AutomationRule;
  onToggle: (ruleId: string) => void;
  onDelete: (ruleId: string, ruleName: string) => void;
}

const RuleCard: React.FC<RuleCardProps> = ({ rule, onToggle, onDelete }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = async () => {
    // Haptic feedback
    await Haptics.impactAsync(
      rule.isActive 
        ? Haptics.ImpactFeedbackStyle.Heavy 
        : Haptics.ImpactFeedbackStyle.Medium
    );
    
    // Scale animation
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onToggle(rule.id);
  };

  const getRuleTypeIcon = () => {
    const hasTimeCondition = rule.conditions.some(c => c.type === 'time');
    const hasUsageCondition = rule.conditions.some(c => c.type === 'usage');
    const hasCostCondition = rule.conditions.some(c => c.type === 'cost');
    
    if (hasTimeCondition) return 'time-outline';
    if (hasUsageCondition) return 'stats-chart-outline';
    if (hasCostCondition) return 'cash-outline';
    return 'settings-outline';
  };

  const formatConditions = () => {
    return rule.conditions.map(condition => {
      switch (condition.type) {
        case 'time':
          return `When time is ${condition.operator} ${condition.value}`;
        case 'usage':
          return `When usage is ${condition.operator} ${condition.value}${condition.unit || 'W'}`;
        case 'cost':
          return `When cost is ${condition.operator} $${condition.value}`;
        default:
          return `When ${condition.type} is ${condition.operator} ${condition.value}`;
      }
    }).join(' AND ');
  };

  const formatActions = () => {
    return rule.actions.map(action => {
      switch (action.type) {
        case 'toggle':
          return `Turn ${action.value} device`;
        case 'schedule':
          return `Schedule for ${action.value}`;
        case 'notify':
          return `Send notification: ${action.value}`;
        default:
          return `Perform ${action.type}`;
      }
    }).join(', ');
  };

  return (
    <Animated.View 
      style={{ transform: [{ scale }] }}
      className="p-4 mb-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center flex-1">
          <View className="items-center justify-center w-10 h-10 mr-3 bg-blue-100 rounded-full dark:bg-blue-900/30">
            <Ionicons 
              name={getRuleTypeIcon() as any} 
              size={20} 
              color="#3B82F6" 
            />
          </View>
          
          <View className="flex-1">
            <ThemedText className="text-lg font-semibold">
              {rule.name}
            </ThemedText>
            <ThemedText className="text-sm text-gray-500 dark:text-gray-400">
              Created {rule.createdAt.toLocaleDateString()}
            </ThemedText>
          </View>
        </View>

        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={handlePress}
            className={`w-12 h-7 rounded-full flex-row items-center px-1 mr-3 ${
              rule.isActive ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <Animated.View
              className={`w-5 h-5 rounded-full bg-white shadow-sm transform ${
                rule.isActive ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onDelete(rule.id, rule.name)}
            className="p-2"
          >
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mb-3">
        <ThemedText className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Conditions:
        </ThemedText>
        <ThemedText className="text-sm text-gray-600 dark:text-gray-400">
          {formatConditions()}
        </ThemedText>
      </View>

      <View>
        <ThemedText className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Actions:
        </ThemedText>
        <ThemedText className="text-sm text-gray-600 dark:text-gray-400">
          {formatActions()}
        </ThemedText>
      </View>

      <View className={`mt-3 px-2 py-1 rounded-full self-start ${
        rule.isActive 
          ? 'bg-green-100 dark:bg-green-900/30' 
          : 'bg-gray-100 dark:bg-gray-700'
      }`}>
        <ThemedText className={`text-xs font-medium ${
          rule.isActive 
            ? 'text-green-800 dark:text-green-400' 
            : 'text-gray-600 dark:text-gray-400'
        }`}>
          {rule.isActive ? 'Active' : 'Inactive'}
        </ThemedText>
      </View>
    </Animated.View>
  );
};

export default RuleCard;
