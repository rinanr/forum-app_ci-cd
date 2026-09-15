import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';

const initialState = {
  threads: [],
  isLoading: false,
  error: null,
};

const fetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async () => {
    const [threadsResponse, usersResponse] = await Promise.all([
      api.getThreads(),
      api.getUsers(),
    ]);

    const threads = threadsResponse.data.threads;
    const users = usersResponse.data.users;

    const threadsWithOwner = threads.map((thread) => {
      const owner = users.find(
        (user) => user.id === thread.ownerId,
      );

      return {
        ...thread,
        owner,
      };
    });

    return threadsWithOwner;
  },
);

const createThread = createAsyncThunk(
  'threads/createThread',
  async ({ title, body, category, token }) => {
    const response = await api.createThread({
      title,
      body,
      category,
      token,
    });

    return response.data.thread;
  },
);

const threadSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.threads = action.payload;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createThread.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createThread.fulfilled, (state, action) => {
        state.isLoading = false;
        state.threads.unshift(action.payload);
      })
      .addCase(createThread.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export { fetchThreads, createThread };
export default threadSlice.reducer;