import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';

import {
  getVoteType,
  setCommentVote,
  setThreadVote,
} from './threadDetail';

const initialState = {
  isLoading: false,
  error: null,
};

const voteThread = createAsyncThunk(
  'vote/voteThread',
  async (
    { threadId, vote, token },
    { getState, dispatch },
  ) => {
    const state = getState();
    const userId = state.auth.user?.id;
    const thread = state.detail.thread;

    if (!userId || !thread) {
      throw new Error('Data pengguna atau thread tidak tersedia.');
    }

    const previousVote = getVoteType(thread, userId);

    // Ubah tampilan secara optimistik sebelum request API.
    dispatch(
      setThreadVote({
        userId,
        vote:
          previousVote === vote
            ? 'neutral'
            : vote,
      }),
    );

    try {
      await api.voteThread({
        threadId,
        vote,
        token,
      });

      return {
        threadId,
        vote,
      };
    } catch (error) {
      // Kembalikan state jika request gagal.
      dispatch(
        setThreadVote({
          userId,
          vote: previousVote,
        }),
      );

      throw error;
    }
  },
);

const voteComment = createAsyncThunk(
  'vote/voteComment',
  async (
    { threadId, commentId, vote, token },
    { getState, dispatch },
  ) => {
    const state = getState();
    const userId = state.auth.user?.id;
    const thread = state.detail.thread;

    const comment = thread?.comments.find(
      (item) => item.id === commentId,
    );

    if (!userId || !comment) {
      throw new Error(
        'Data pengguna atau komentar tidak tersedia.',
      );
    }

    const previousVote = getVoteType(comment, userId);

    dispatch(
      setCommentVote({
        userId,
        commentId,
        vote:
          previousVote === vote
            ? 'neutral'
            : vote,
      }),
    );

    try {
      await api.voteComment({
        threadId,
        commentId,
        vote,
        token,
      });

      return {
        threadId,
        commentId,
        vote,
      };
    } catch (error) {
      dispatch(
        setCommentVote({
          userId,
          commentId,
          vote: previousVote,
        }),
      );

      throw error;
    }
  },
);

const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(voteThread.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(voteThread.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(voteThread.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(voteComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(voteComment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(voteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export { voteThread, voteComment };
export default voteSlice.reducer;