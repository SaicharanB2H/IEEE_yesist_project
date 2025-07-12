import DeviceCard from '@/components/DeviceCard';
import { store } from '@/store';
import { mockDevices } from '@/utils/mockData';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';

// Example test structure for DeviceCard component
describe('DeviceCard', () => {
  const mockOnToggle = jest.fn();
  const mockOnPress = jest.fn();
  const mockDevice = mockDevices[0];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders device information correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <DeviceCard
          device={mockDevice}
          onToggle={mockOnToggle}
          onPress={mockOnPress}
        />
      </Provider>
    );

    expect(getByText(mockDevice.name)).toBeTruthy();
    expect(getByText(mockDevice.room)).toBeTruthy();
  });

  it('calls onToggle when toggle button is pressed', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <DeviceCard
          device={mockDevice}
          onToggle={mockOnToggle}
          onPress={mockOnPress}
        />
      </Provider>
    );

    const toggleButton = getByRole('button');
    fireEvent.press(toggleButton);

    expect(mockOnToggle).toHaveBeenCalledWith(mockDevice.id);
  });

  it('shows correct status colors', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <DeviceCard
          device={mockDevice}
          onToggle={mockOnToggle}
          onPress={mockOnPress}
        />
      </Provider>
    );

    // Add testID to components and verify colors
  });
});
