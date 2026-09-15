import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';

const initialState = {
  isLoading: false,
  error: null,
};

const createComment = createAsyncThunk(
  'comment/createComment',
  async ({ threadId, content, token }) => {
    const response = await api.createComment({
      threadId,
      content,
      token,
    });

    return response.data.comment;
  },
);

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export { createComment };
export default commentSlice.reducer;