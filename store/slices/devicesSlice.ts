import { deviceAPI } from '@/api/deviceAPI';
import { Device, DevicesState } from '@/types';
import { mockDevices } from '@/utils/mockData';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: DevicesState = {
  devices: mockDevices, // Initialize with mock devices for demo
  loading: false,
  error: null,
  selectedDevice: null,
};

// Async thunks
export const fetchDevices = createAsyncThunk(
  'devices/fetchDevices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await deviceAPI.getDevices();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleDevice = createAsyncThunk(
  'devices/toggleDevice',
  async (deviceId: string, { rejectWithValue }) => {
    try {
      const response = await deviceAPI.toggleDevice(deviceId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateDeviceMetrics = createAsyncThunk(
  'devices/updateMetrics',
  async (deviceId: string, { rejectWithValue }) => {
    try {
      const response = await deviceAPI.getDeviceMetrics(deviceId);
      return { deviceId, metrics: response.data };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setSelectedDevice: (state, action: PayloadAction<Device | null>) => {
      state.selectedDevice = action.payload;
    },
    updateDeviceStatus: (state, action: PayloadAction<{ id: string; status: Device['status'] }>) => {
      const device = state.devices.find(d => d.id === action.payload.id);
      if (device) {
        device.status = action.payload.status;
        device.lastUpdated = new Date();
      }
    },
    updateDevicePower: (state, action: PayloadAction<{ id: string; powerUsage: number }>) => {
      const device = state.devices.find(d => d.id === action.payload.id);
      if (device) {
        device.powerUsage = action.payload.powerUsage;
        device.lastUpdated = new Date();
      }
    },
    updateDevice: (state, action: PayloadAction<Device>) => {
      const index = state.devices.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.devices[index] = action.payload;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch devices
      .addCase(fetchDevices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.loading = false;
        state.devices = action.payload || [];
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Toggle device
      .addCase(toggleDevice.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleDevice.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const device = state.devices.find(d => d.id === action.payload!.id);
          if (device) {
            device.status = action.payload!.status;
            device.lastUpdated = new Date();
          }
        }
      })
      .addCase(toggleDevice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update metrics
      .addCase(updateDeviceMetrics.fulfilled, (state, action) => {
        const device = state.devices.find(d => d.id === action.payload.deviceId);
        if (device && action.payload.metrics) {
          device.powerUsage = action.payload.metrics.powerUsage;
          device.estimatedCost = action.payload.metrics.cost;
          device.lastUpdated = new Date();
        }
      });
  },
});

export const { setSelectedDevice, updateDeviceStatus, updateDevicePower, updateDevice, clearError } = devicesSlice.actions;
export default devicesSlice.reducer;
