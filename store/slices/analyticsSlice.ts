import { analyticsAPI } from '@/api/analyticsAPI';
import { AnalyticsData, AnalyticsState } from '@/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AnalyticsState = {
  data: null,
  loading: false,
  error: null,
  period: 'daily',
};

// Async thunk for fetching analytics data
export const fetchAnalyticsData = createAsyncThunk<
  AnalyticsData, // ✅ Thunk return type
  'hourly' | 'daily' | 'weekly' | 'monthly', // ✅ Thunk argument type
  { rejectValue: string } // ✅ Rejection value type
>(
  'analytics/fetchData',
  async (period, { rejectWithValue }) => {
    try {
      const response = await analyticsAPI.getAnalytics(period);
      if (!response.data) {
        return rejectWithValue('No data returned from server');
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch analytics data');
    }
  }
);

// Create slice
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
        state.data = action.payload ?? null; // ✅ Fix for TS2322 error
      })
      .addCase(fetchAnalyticsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error'; // fallback
      });
  },
});

// Export actions and reducer
export const { setPeriod, clearError } = analyticsSlice.actions;
export default analyticsSlice.reducer;
