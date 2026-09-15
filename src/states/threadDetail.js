import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';

const initialState = {
  thread: null,
  isLoading: false,
  error: null,
};

function getVoteType(item, userId) {
  if (item.upVotesBy.includes(userId)) {
    return 'up';
  }

  if (item.downVotesBy.includes(userId)) {
    return 'down';
  }

  return 'neutral';
}

function setVote(item, userId, vote) {
  item.upVotesBy = item.upVotesBy.filter(
    (id) => id !== userId,
  );

  item.downVotesBy = item.downVotesBy.filter(
    (id) => id !== userId,
  );

  if (vote === 'up') {
    item.upVotesBy.push(userId);
  }

  if (vote === 'down') {
    item.downVotesBy.push(userId);
  }
}

const fetchThreadDetail = createAsyncThunk(
  'detail/fetchThreadDetail',
  async (id) => {
    const response = await api.getThreadDetail(id);

    return response.data.detailThread;
  },
);

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    setThreadVote(state, action) {
      const { userId, vote } = action.payload;

      if (!state.thread || !userId) {
        return;
      }

      setVote(state.thread, userId, vote);
    },

    setCommentVote(state, action) {
      const {
        userId,
        commentId,
        vote,
      } = action.payload;

      const comment = state.thread?.comments.find(
        (item) => item.id === commentId,
      );

      if (!comment || !userId) {
        return;
      }

      setVote(comment, userId, vote);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreadDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.thread = action.payload;
      })
      .addCase(fetchThreadDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setThreadVote,
  setCommentVote,
} = detailSlice.actions;

export { fetchThreadDetail, getVoteType };
export default detailSlice.reducer;