import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Xəta baş verdi');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;