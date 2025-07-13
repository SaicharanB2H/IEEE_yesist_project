import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Text as RNText, ScrollView, TouchableOpacity, View } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const AnalyticsScreen: React.FC = () => {
  const { styles, colors, colorScheme } = useThemedStyles();
  const [selectedChart, setSelectedChart] = useState<'usage' | 'cost' | 'devices'>('usage');
  const [period, setPeriod] = useState<'hourly' | 'daily' | 'weekly' | 'monthly'>('daily');

  const periods = [
    { key: 'hourly' as const, label: 'Today' },
    { key: 'daily' as const, label: 'Week' },
    { key: 'weekly' as const, label: 'Month' },
    { key: 'monthly' as const, label: 'Year' },
  ];

  const chartConfig = {
    backgroundColor: colors.card,
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(14, 165, 233, ${opacity})`, // Blue color that works in both themes
    labelColor: (opacity = 1) => colorScheme === 'dark' ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: colors.primary,
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
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
      {periods.map((p) => (
        <TouchableOpacity
          key={p.key}
          onPress={() => setPeriod(p.key)}
          style={[
            styles.filterChip,
            period === p.key ? styles.activeFilterChip : styles.inactiveFilterChip
          ]}
        >
          <ThemedText style={[
            { fontSize: 14, fontWeight: '500' },
            period === p.key ? styles.activeFilterText : styles.inactiveFilterText
          ]}>
            {p.label}
          </ThemedText>
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
          <RNText className={`ml-2 font-medium ${
            selectedChart === chart.key 
              ? 'text-white' 
              : 'text-gray-700 dark:text-gray-300'
          }`}>
            {chart.label}
          </RNText>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderSummaryCards = () => (
    <View style={{ flexDirection: 'row', marginBottom: 24 }}>
      <View style={[styles.card, { flex: 1, marginRight: 8, padding: 16 }]}>
        <ThemedText style={[styles.secondaryText, { fontSize: 14 }]}>Total Usage</ThemedText>
        <ThemedText style={[styles.primaryText, { fontSize: 24, fontWeight: 'bold', marginTop: 4 }]}>245 kWh</ThemedText>
        <ThemedText style={{ color: colors.success, fontSize: 14, marginTop: 4 }}>↓ 12% from last period</ThemedText>
      </View>
      
      <View style={[styles.card, { flex: 1, marginLeft: 8, padding: 16 }]}>
        <ThemedText style={[styles.secondaryText, { fontSize: 14 }]}>Total Cost</ThemedText>
        <ThemedText style={[styles.primaryText, { fontSize: 24, fontWeight: 'bold', marginTop: 4 }]}>$68.25</ThemedText>
        <ThemedText style={{ color: colors.error, fontSize: 14, marginTop: 4 }}>↑ 5% from last period</ThemedText>
      </View>
    </View>
  );

  const renderChart = () => {
    switch (selectedChart) {
      case 'usage':
        return (
          <View style={[styles.card, { padding: 16, marginBottom: 16 }]}>
            <ThemedText style={[styles.primaryText, { fontSize: 18, fontWeight: '600', marginBottom: 16 }]}>
              Energy Usage Trend
            </ThemedText>
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
            <RNText className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Cost Analysis
            </RNText>
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
            <RNText className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Usage by Device Type
            </RNText>
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
        <RNText className="text-lg font-semibold text-green-800 dark:text-green-400 ml-2">
          Eco Tips
        </RNText>
      </View>
      <RNText className="text-green-700 dark:text-green-300 mb-2">
        • Turn off devices when not in use to save ~15% on your bill
      </RNText>
      <RNText className="text-green-700 dark:text-green-300 mb-2">
        • Use smart scheduling for AC during peak hours
      </RNText>
      <RNText className="text-green-700 dark:text-green-300">
        • Replace old bulbs with LED to reduce consumption by 80%
      </RNText>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>
          Analytics & Insights
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Track your energy consumption patterns
        </ThemedText>
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 16 }}>
        {renderPeriodSelector()}
        {renderSummaryCards()}
        {renderChartSelector()}
        {renderChart()}
        {renderEcoTips()}
      </ScrollView>
    </ThemedView>
  );
};

export default AnalyticsScreen;
