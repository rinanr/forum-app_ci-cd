import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';

const initialState = {
  leaderboards: [],
  isLoading: false,
  error: null,
};

const fetchLeaderboards = createAsyncThunk(
  'leaderboard/fetchLeaderboards',
  async () => {
    const response = await api.getLeaderboards();

    return response.data.leaderboards;
  },
);

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leaderboards = action.payload;
      })
      .addCase(fetchLeaderboards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export { fetchLeaderboards };
export default leaderboardSlice.reducer;