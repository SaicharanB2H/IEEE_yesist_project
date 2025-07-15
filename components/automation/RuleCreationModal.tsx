import { AutomationAction, AutomationCondition, AutomationRule, Device } from '@/types';
import { generateUUID } from '@/utils';
import * as Validation from '@/utils/validation';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Modal, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../ThemedText';

interface RuleCreationModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (rule: AutomationRule) => void;
  devices: Device[]; // Add devices prop
}

const RuleCreationModal: React.FC<RuleCreationModalProps> = ({ 
  visible, 
  onClose, 
  onSave,
  devices 
}) => {
  const [name, setName] = useState('');
  const [conditions, setConditions] = useState<AutomationCondition[]>([]);
  const [actions, setActions] = useState<AutomationAction[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const conditionTypes = [
    { type: 'time', label: 'Time', icon: 'time-outline' },
    { type: 'usage', label: 'Energy Usage', icon: 'stats-chart-outline' },
    { type: 'cost', label: 'Cost', icon: 'cash-outline' },
  ];

  const actionTypes = [
    { type: 'toggle', label: 'Toggle Device', icon: 'power-outline' },
    { type: 'schedule', label: 'Schedule', icon: 'calendar-outline' },
    { type: 'notify', label: 'Send Notification', icon: 'notifications-outline' },
  ];

  const handleAddCondition = (type: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setConditions([...conditions, {
      id: generateUUID(),
      type: type as any,
      operator: '=',
      value: '',
      unit: type === 'usage' ? 'W' : undefined
    }]);
  };

  const handleAddAction = (type: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActions([...actions, {
      id: generateUUID(),
      type: type as any,
      value: '',
    }]);
  };

  const handleRemoveCondition = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setConditions(conditions.filter(c => c.id !== id));
  };

  const handleRemoveAction = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setActions(actions.filter(a => a.id !== id));
  };

  const validateCondition = (condition: AutomationCondition): boolean => {
    let validationResult;
    switch (condition.type) {
      case 'time':
        validationResult = Validation.validateTimeValue(condition.value);
        break;
      case 'usage':
        validationResult = Validation.validateUsageValue(condition.value);
        break;
      case 'cost':
        validationResult = Validation.validateCostValue(condition.value);
        break;
      default:
        validationResult = { isValid: true };
    }

    if (!validationResult.isValid) {
      setErrors(prev => ({
        ...prev,
        [condition.id]: validationResult.error || 'Invalid value'
      }));
      return false;
    }

    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[condition.id];
      return newErrors;
    });
    return true;
  };

  const validateAction = (action: AutomationAction): boolean => {
    let validationResult;
    switch (action.type) {
      case 'toggle':
        validationResult = Validation.validateToggleValue(action.value);
        break;
      case 'schedule':
        validationResult = Validation.validateScheduleValue(action.value);
        break;
      case 'notify':
        validationResult = Validation.validateNotificationValue(action.value);
        break;
      default:
        validationResult = { isValid: true };
    }

    if (!validationResult.isValid) {
      setErrors(prev => ({
        ...prev,
        [action.id]: validationResult.error || 'Invalid value'
      }));
      return false;
    }

    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[action.id];
      return newErrors;
    });
    return true;
  };

  const handleUpdateCondition = (id: string, updates: Partial<AutomationCondition>) => {
    setConditions(conditions.map(c => {
      if (c.id === id) {
        const updatedCondition = { ...c, ...updates };
        validateCondition(updatedCondition);
        return updatedCondition;
      }
      return c;
    }));
  };

  const handleUpdateAction = (id: string, updates: Partial<AutomationAction>) => {
    setActions(actions.map(a => {
      if (a.id === id) {
        const updatedAction = { ...a, ...updates };
        validateAction(updatedAction);
        return updatedAction;
      }
      return a;
    }));
  };

  const handleSave = () => {
    // Reset errors
    setErrors({});

    if (!name.trim()) {
      setErrors(prev => ({ ...prev, name: 'Please enter a rule name' }));
      return;
    }

    if (conditions.length === 0) {
      setErrors(prev => ({ ...prev, conditions: 'Please add at least one condition' }));
      return;
    }

    if (actions.length === 0) {
      setErrors(prev => ({ ...prev, actions: 'Please add at least one action' }));
      return;
    }

    // Validate all conditions
    const conditionsValid = conditions.every(validateCondition);
    if (!conditionsValid) return;

    // Validate all actions
    const actionsValid = actions.every(validateAction);
    if (!actionsValid) return;

    const newRule: AutomationRule = {
      id: generateUUID(),
      name: name.trim(),
      conditions,
      actions,
      isActive: true,
      createdAt: new Date(),
      deviceId: selectedDevice?.id, // Add device reference
    };

    onSave(newRule);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName('');
    setConditions([]);
    setActions([]);
    setSelectedDevice(null);
  };

  const renderConditionEditor = (condition: AutomationCondition) => (
    <View key={condition.id} className="p-4 mb-3 rounded-lg bg-gray-50 dark:bg-gray-800">
      <View className="flex-row items-center justify-between mb-2">
        <ThemedText className="font-medium">
          {conditionTypes.find(t => t.type === condition.type)?.label}
        </ThemedText>
        <TouchableOpacity 
          onPress={() => handleRemoveCondition(condition.id)}
          className="p-2"
        >
          <Ionicons name="close-circle-outline" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center space-x-2">
        <View className="flex-1">
          <TextInput
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={`Enter ${condition.type} value...`}
            value={condition.value}
            onChangeText={(value) => handleUpdateCondition(condition.id, { value })}
            keyboardType={condition.type === 'usage' || condition.type === 'cost' ? 'numeric' : 'default'}
          />
        </View>
        
        <TouchableOpacity
          onPress={() => {
            const operators: ('=' | '<' | '>' | '<=' | '>=')[] = condition.type === 'time' 
              ? ['=', '<', '>'] 
              : ['=', '<', '>', '<=', '>='];
            
            const currentIndex = operators.indexOf(condition.operator);
            const nextOperator = operators[(currentIndex + 1) % operators.length];
            handleUpdateCondition(condition.id, { operator: nextOperator });
          }}
          className="px-4 py-2 bg-blue-100 rounded-lg dark:bg-blue-900"
        >
          <ThemedText className="text-blue-600 dark:text-blue-400">
            {condition.operator}
          </ThemedText>
        </TouchableOpacity>
      </View>

      {errors[condition.id] && (
        <ThemedText className="mt-1 text-xs text-red-500">
          {errors[condition.id]}
        </ThemedText>
      )}
    </View>
  );

  const renderActionEditor = (action: AutomationAction) => (
    <View key={action.id} className="p-4 mb-3 rounded-lg bg-gray-50 dark:bg-gray-800">
      <View className="flex-row items-center justify-between mb-2">
        <ThemedText className="font-medium">
          {actionTypes.find(t => t.type === action.type)?.label}
        </ThemedText>
        <TouchableOpacity 
          onPress={() => handleRemoveAction(action.id)}
          className="p-2"
        >
          <Ionicons name="close-circle-outline" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <TextInput
        className="px-3 py-2 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder={
          action.type === 'toggle' ? 'on/off' :
          action.type === 'schedule' ? 'time (HH:MM)' :
          'message'
        }
        value={action.value}
        onChangeText={(value) => handleUpdateAction(action.id, { value })}
      />

      {errors[action.id] && (
        <ThemedText className="mt-1 text-xs text-red-500">
          {errors[action.id]}
        </ThemedText>
      )}
    </View>
  );

  const renderDeviceSelector = () => (
    <View className="mb-6">
      <ThemedText className="mb-2 text-sm font-medium">Target Device</ThemedText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {devices.map((device) => (
          <TouchableOpacity
            key={device.id}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setSelectedDevice(device);
            }}
            className={`px-4 py-3 mr-2 rounded-lg border ${
              selectedDevice?.id === device.id
                ? 'bg-blue-500 border-blue-600'
                : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
            }`}
          >
            <ThemedText
              className={`text-sm font-medium ${
                selectedDevice?.id === device.id
                  ? 'text-white'
                  : 'text-gray-900 dark:text-gray-100'
              }`}
            >
              {device.name}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white dark:bg-gray-900">
        {/* Header */}
        <View className="px-4 py-4 border-b border-gray-200 dark:border-gray-800">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={onClose} className="p-2">
              <Ionicons name="close-outline" size={24} color="#6B7280" />
            </TouchableOpacity>
            <ThemedText className="text-lg font-semibold">
              Create New Rule
            </ThemedText>
            <TouchableOpacity onPress={handleSave} className="p-2">
              <ThemedText className="text-blue-500 dark:text-blue-400">
                Save
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1 p-4">
          {/* Rule Name */}
          <View className="mb-6">
            <ThemedText className="mb-2 text-sm font-medium">Rule Name</ThemedText>
            <TextInput
              className="px-3 py-2 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter rule name..."
              value={name}
              onChangeText={setName}
            />
            {errors.name && (
              <ThemedText className="mt-1 text-xs text-red-500">
                {errors.name}
              </ThemedText>
            )}
          </View>

          {renderDeviceSelector()}

          {/* Conditions */}
          <View className="mb-6">
            <ThemedText className="mb-2 text-sm font-medium">Conditions</ThemedText>
            {conditions.map(renderConditionEditor)}
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
              {conditionTypes.map((type) => (
                <TouchableOpacity
                  key={type.type}
                  onPress={() => handleAddCondition(type.type)}
                  className="flex-row items-center px-4 py-2 mr-2 bg-blue-100 rounded-full dark:bg-blue-900"
                >
                  <Ionicons 
                    name={type.icon as any} 
                    size={16} 
                    color="#3B82F6" 
                    style={{ marginRight: 4 }}
                  />
                  <ThemedText className="text-sm text-blue-600 dark:text-blue-400">
                    Add {type.label}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Actions */}
          <View className="mb-6">
            <ThemedText className="mb-2 text-sm font-medium">Actions</ThemedText>
            {actions.map(renderActionEditor)}
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
              {actionTypes.map((type) => (
                <TouchableOpacity
                  key={type.type}
                  onPress={() => handleAddAction(type.type)}
                  className="flex-row items-center px-4 py-2 mr-2 bg-green-100 rounded-full dark:bg-green-900"
                >
                  <Ionicons 
                    name={type.icon as any} 
                    size={16} 
                    color="#10B981" 
                    style={{ marginRight: 4 }}
                  />
                  <ThemedText className="text-sm text-green-600 dark:text-green-400">
                    Add {type.label}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default RuleCreationModal;
