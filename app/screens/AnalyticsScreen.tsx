import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

const AnalyticsScreen: React.FC = () => {
  const [selectedChart, setSelectedChart] = useState<'usage' | 'cost' | 'devices'>('usage');
  const [period, setPeriod] = useState<'hourly' | 'daily' | 'weekly' | 'monthly'>('daily');

  const periods = [
    { key: 'hourly' as const, label: 'Today' },
    { key: 'daily' as const, label: 'Week' },
    { key: 'weekly' as const, label: 'Month' },
    { key: 'monthly' as const, label: 'Year' },
  ];

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#3B82F6',
    },
  };

  // Mock data for demonstration
  const usageData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 65],
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const costData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        data: [12.5, 18.3, 15.7, 22.1],
      },
    ],
  };

  const deviceUsageData = [
    {
      name: 'Lights',
      usage: 35,
      color: '#3B82F6',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'AC',
      usage: 25,
      color: '#10B981',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Fans',
      usage: 20,
      color: '#F59E0B',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Others',
      usage: 20,
      color: '#EF4444',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const renderPeriodSelector = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
      {periods.map((p) => (
        <TouchableOpacity
          key={p.key}
          onPress={() => setPeriod(p.key)}
          className={`px-4 py-2 rounded-full mr-3 ${
            period === p.key 
              ? 'bg-blue-500' 
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <Text className={`text-sm font-medium ${
            period === p.key 
              ? 'text-white' 
              : 'text-gray-700 dark:text-gray-300'
          }`}>
            {p.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderChartSelector = () => (
    <View className="flex-row mb-4">
      {[
        { key: 'usage' as const, label: 'Usage', icon: 'stats-chart' },
        { key: 'cost' as const, label: 'Cost', icon: 'cash' },
        { key: 'devices' as const, label: 'By Device', icon: 'pie-chart' },
      ].map((chart) => (
        <TouchableOpacity
          key={chart.key}
          onPress={() => setSelectedChart(chart.key)}
          className={`flex-1 flex-row items-center justify-center py-3 mx-1 rounded-lg ${
            selectedChart === chart.key 
              ? 'bg-blue-500' 
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <Ionicons 
            name={chart.icon as any} 
            size={20} 
            color={selectedChart === chart.key ? 'white' : '#6B7280'} 
          />
          <Text className={`ml-2 font-medium ${
            selectedChart === chart.key 
              ? 'text-white' 
              : 'text-gray-700 dark:text-gray-300'
          }`}>
            {chart.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderSummaryCards = () => (
    <View className="flex-row mb-6">
      <View className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-lg mr-2 shadow-sm">
        <Text className="text-gray-500 dark:text-gray-400 text-sm">Total Usage</Text>
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">245 kWh</Text>
        <Text className="text-green-500 text-sm mt-1">↓ 12% from last period</Text>
      </View>
      
      <View className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-lg ml-2 shadow-sm">
        <Text className="text-gray-500 dark:text-gray-400 text-sm">Total Cost</Text>
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">$68.25</Text>
        <Text className="text-red-500 text-sm mt-1">↑ 5% from last period</Text>
      </View>
    </View>
  );

  const renderChart = () => {
    switch (selectedChart) {
      case 'usage':
        return (
          <View className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-4">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Energy Usage Trend
            </Text>
            <LineChart
              data={usageData}
              width={screenWidth - 64}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        );
        
      case 'cost':
        return (
          <View className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-4">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Cost Analysis
            </Text>
            <BarChart
              data={costData}
              width={screenWidth - 64}
              height={220}
              chartConfig={chartConfig}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              yAxisLabel="$"
              yAxisSuffix=""
            />
          </View>
        );
        
      case 'devices':
        return (
          <View className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-4">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Usage by Device Type
            </Text>
            <PieChart
              data={deviceUsageData}
              width={screenWidth - 64}
              height={220}
              chartConfig={chartConfig}
              accessor="usage"
              backgroundColor="transparent"
              paddingLeft="15"
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        );
        
      default:
        return null;
    }
  };

  const renderEcoTips = () => (
    <View className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg shadow-sm">
      <View className="flex-row items-center mb-3">
        <Ionicons name="leaf" size={24} color="#10B981" />
        <Text className="text-lg font-semibold text-green-800 dark:text-green-400 ml-2">
          Eco Tips
        </Text>
      </View>
      <Text className="text-green-700 dark:text-green-300 mb-2">
        • Turn off devices when not in use to save ~15% on your bill
      </Text>
      <Text className="text-green-700 dark:text-green-300 mb-2">
        • Use smart scheduling for AC during peak hours
      </Text>
      <Text className="text-green-700 dark:text-green-300">
        • Replace old bulbs with LED to reduce consumption by 80%
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="px-4 py-4 bg-white dark:bg-gray-800 shadow-sm">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Analytics & Insights
        </Text>
        <Text className="text-gray-600 dark:text-gray-400">
          Track your energy consumption patterns
        </Text>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {renderPeriodSelector()}
        {renderSummaryCards()}
        {renderChartSelector()}
        {renderChart()}
        {renderEcoTips()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnalyticsScreen;
