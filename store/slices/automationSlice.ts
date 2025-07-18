import { automationAPI } from '@/api/automationAPI';
import { AutomationRule, AutomationState } from '@/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AutomationState = {
  rules: [],
  loading: false,
  error: null,
};

export const fetchRules = createAsyncThunk(
  'automation/fetchRules',
  async (_, { rejectWithValue }) => {
    try {
      const response = await automationAPI.getRules();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createRule = createAsyncThunk(
  'automation/createRule',
  async (rule: Omit<AutomationRule, 'id' | 'createdAt'>, { rejectWithValue }) => {
    try {
      const response = await automationAPI.createRule(rule);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateRule = createAsyncThunk(
  'automation/updateRule',
  async (rule: AutomationRule, { rejectWithValue }) => {
    try {
      const response = await automationAPI.updateRule(rule);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRule = createAsyncThunk(
  'automation/deleteRule',
  async (ruleId: string, { rejectWithValue }) => {
    try {
      await automationAPI.deleteRule(ruleId);
      return ruleId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const automationSlice = createSlice({
  name: 'automation',
  initialState,
  reducers: {
    toggleRule: (state, action: PayloadAction<string>) => {
      const rule = state.rules.find(r => r.id === action.payload);
      if (rule) {
        rule.isActive = !rule.isActive;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch rules
      .addCase(fetchRules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRules.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.rules = action.payload;
        }
      })
      .addCase(fetchRules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create rule
      .addCase(createRule.fulfilled, (state, action) => {
        if (action.payload) {
          state.rules.push(action.payload);
        }
      })
      // Update rule
      .addCase(updateRule.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.rules.findIndex(r => r.id === action.payload!.id);
          if (index !== -1) {
            state.rules[index] = action.payload;
          }
        }
      })
      // Delete rule
      .addCase(deleteRule.fulfilled, (state, action) => {
        state.rules = state.rules.filter(r => r.id !== action.payload);
      });
  },
});

export const { toggleRule, clearError } = automationSlice.actions;
export default automationSlice.reducer;
