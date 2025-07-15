import RuleCard from '@/components/automation/RuleCard';
import RuleCreationModal from '@/components/automation/RuleCreationModal';
import { AutomationRule, Device } from '@/types';
import { mockAutomationRules, mockDevices } from '@/utils/mockData';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text as RNText, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AutomationScreen: React.FC = () => {
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    // Simulate API calls with mock data
    setTimeout(() => {
      setRules(mockAutomationRules);
      setDevices(mockDevices);
      setLoading(false);
    }, 1000);
  }, []);

  const handleToggleRule = (ruleId: string) => {
    setRules(prevRules => 
      prevRules.map(rule => 
        rule.id === ruleId 
          ? { ...rule, isActive: !rule.isActive }
          : rule
      )
    );
  };

  const handleDeleteRule = (ruleId: string, ruleName: string) => {
    Alert.alert(
      'Delete Rule',
      `Are you sure you want to delete "${ruleName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => setRules(prevRules => prevRules.filter(rule => rule.id !== ruleId))
        },
      ]
    );
  };

  const renderRuleCard = ({ item: rule }: { item: AutomationRule }) => (
    <RuleCard
      rule={rule}
      onToggle={handleToggleRule}
      onDelete={handleDeleteRule}
    />
  );

  const renderQuickActions = () => (
    <View className="mb-6">
      <RNText className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
        Quick Rules
      </RNText>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[
          { title: 'Schedule Off', icon: 'time', description: 'Turn off at specific time' },
          { title: 'Energy Saver', icon: 'leaf', description: 'Auto-optimize usage' },
          { title: 'Cost Alert', icon: 'cash', description: 'Notify when cost exceeds limit' },
          { title: 'Smart Schedule', icon: 'calendar', description: 'AI-based scheduling' },
        ].map((action, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => Alert.alert('Coming Soon', 'Rule creation feature will be available soon!')}
            className="w-32 p-4 mr-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <View className="items-center justify-center w-10 h-10 mb-2 bg-blue-100 rounded-full dark:bg-blue-900/30">
              <Ionicons name={action.icon as any} size={20} color="#3B82F6" />
            </View>
            <RNText className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
              {action.title}
            </RNText>
            <RNText className="text-xs text-gray-500 dark:text-gray-400">
              {action.description}
            </RNText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderEmptyState = () => (
    <View className="items-center justify-center flex-1 py-12">
      <Ionicons name="settings-outline" size={64} color="#9CA3AF" />
      <RNText className="mt-4 mb-2 text-lg font-semibold text-gray-500 dark:text-gray-400">
        No automation rules yet
      </RNText>
      <RNText className="px-8 mb-6 text-center text-gray-400 dark:text-gray-500">
        Create your first automation rule to save energy and reduce costs
      </RNText>
      <TouchableOpacity
        onPress={() => Alert.alert('Coming Soon', 'Rule creation feature will be available soon!')}
        className="px-6 py-3 bg-blue-500 rounded-lg"
      >
        <RNText className="font-medium text-white">Create First Rule</RNText>
      </TouchableOpacity>
    </View>
  );

  const handleAddRule = (newRule: AutomationRule) => {
    setRules(prevRules => [newRule, ...prevRules]);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <RuleCreationModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleAddRule}
        devices={devices}
      />
      
      {/* Header */}
      <View className="px-4 py-4 bg-white shadow-sm dark:bg-gray-800">
        <View className="flex-row items-center justify-between">
          <View>
            <RNText className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              Smart Automation
            </RNText>
            <RNText className="text-gray-600 dark:text-gray-400">
              Set rules to automate your devices
            </RNText>
          </View>
          
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            className="items-center justify-center w-12 h-12 bg-blue-500 rounded-full"
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {renderQuickActions()}
        
        <View className="flex-row items-center justify-between mb-4">
          <RNText className="text-lg font-semibold text-gray-900 dark:text-white">
            Your Rules ({rules.length})
          </RNText>
          
          {rules.length > 0 && (
            <RNText className="text-sm text-gray-500 dark:text-gray-400">
              {rules.filter(r => r.isActive).length} active
            </RNText>
          )}
        </View>

        {rules.length === 0 ? (
          renderEmptyState()
        ) : loading ? (
          <View className="items-center justify-center py-12">
            <RNText className="text-gray-500 dark:text-gray-400">Loading rules...</RNText>
          </View>
        ) : (
          <FlatList
            data={rules}
            renderItem={renderRuleCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AutomationScreen;
