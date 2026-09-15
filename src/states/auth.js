import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,
};

const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const response = await api.login({ email, password });

    return response.data.token;
  },
);

const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }) => {
    const response = await api.register({
      name,
      email,
      password,
    });

    return response.data.user;
  },
);

const getOwnProfile = createAsyncThunk(
  'auth/getOwnProfile',
  async (token) => {
    const response = await api.getOwnProfile(token);

    return response.data.user;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getOwnProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOwnProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getOwnProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export { login, register, getOwnProfile };
export default authSlice.reducer;
