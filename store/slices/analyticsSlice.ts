import { analyticsAPI } from '@/api/analyticsAPI';
import { AnalyticsState } from '@/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AnalyticsState = {
  data: null,
  loading: false,
  error: null,
  period: 'daily',
};

export const fetchAnalyticsData = createAsyncThunk(
  'analytics/fetchData',
  async (period: 'hourly' | 'daily' | 'weekly' | 'monthly', { rejectWithValue }) => {
    try {
      const response = await analyticsAPI.getAnalytics(period);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setPeriod: (state, action: PayloadAction<'hourly' | 'daily' | 'weekly' | 'monthly'>) => {
      state.period = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAnalyticsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPeriod, clearError } = analyticsSlice.actions;
export default analyticsSlice.reducer;
