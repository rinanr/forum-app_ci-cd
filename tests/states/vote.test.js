import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
} from 'vitest';

import { configureStore } from '@reduxjs/toolkit';

import voteReducer, {
  voteThread,
  voteComment,
} from '../../src/states/vote';

import threadDetailReducer from '../../src/states/threadDetail';
import authReducer from '../../src/states/auth';

import api from '../../src/utils/api';

vi.mock('../../src/utils/api', () => ({
  default: {
    voteThread: vi.fn(),
    voteComment: vi.fn(),
  },
}));

describe('Vote Thread Thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Skenario pengujian:
   * Memastikan thunk voteThread berhasil mengirim
   * request vote thread ke API.
   *
   * Data vote pada thread juga diperbarui secara
   * optimistik sebelum request API selesai.
   */
  it('harus berhasil melakukan up vote pada thread', async () => {
    api.voteThread.mockResolvedValue({
      data: {
        message: 'Vote berhasil',
      },
    });

    const store = configureStore({
      reducer: {
        auth: authReducer,
        detail: threadDetailReducer,
        vote: voteReducer,
      },
      preloadedState: {
        auth: {
          user: {
            id: 'user-1',
            name: 'Rina',
          },
          token: 'token-123',
          isLoading: false,
          error: null,
        },
        detail: {
          thread: {
            id: 'thread-1',
            upVotesBy: [],
            downVotesBy: [],
            comments: [],
          },
          isLoading: false,
          error: null,
        },
        vote: {
          isLoading: false,
          error: null,
        },
      },
    });

    await store.dispatch(
      voteThread({
        threadId: 'thread-1',
        vote: 'up',
        token: 'token-123',
      }),
    );

    expect(api.voteThread).toHaveBeenCalledTimes(1);

    expect(api.voteThread).toHaveBeenCalledWith({
      threadId: 'thread-1',
      vote: 'up',
      token: 'token-123',
    });

    const state = store.getState();

    expect(
      state.detail.thread.upVotesBy,
    ).toContain('user-1');

    expect(state.vote.isLoading).toBe(false);
    expect(state.vote.error).toBeNull();
  });

  /**
   * Skenario pengujian:
   * Memastikan thunk voteComment berhasil mengirim
   * request vote komentar ke API dan memperbarui
   * data vote komentar.
   */
  it('harus berhasil melakukan down vote pada komentar', async () => {
    api.voteComment.mockResolvedValue({
      data: {
        message: 'Vote komentar berhasil',
      },
    });

    const store = configureStore({
      reducer: {
        auth: authReducer,
        detail: threadDetailReducer,
        vote: voteReducer,
      },
      preloadedState: {
        auth: {
          user: {
            id: 'user-1',
            name: 'Rina',
          },
          token: 'token-123',
          isLoading: false,
          error: null,
        },
        detail: {
          thread: {
            id: 'thread-1',
            upVotesBy: [],
            downVotesBy: [],
            comments: [
              {
                id: 'comment-1',
                upVotesBy: [],
                downVotesBy: [],
              },
            ],
          },
          isLoading: false,
          error: null,
        },
        vote: {
          isLoading: false,
          error: null,
        },
      },
    });

    await store.dispatch(
      voteComment({
        threadId: 'thread-1',
        commentId: 'comment-1',
        vote: 'down',
        token: 'token-123',
      }),
    );

    expect(api.voteComment).toHaveBeenCalledTimes(1);

    expect(api.voteComment).toHaveBeenCalledWith({
      threadId: 'thread-1',
      commentId: 'comment-1',
      vote: 'down',
      token: 'token-123',
    });

    const state = store.getState();

    expect(
      state.detail.thread.comments[0].downVotesBy,
    ).toContain('user-1');

    expect(state.vote.isLoading).toBe(false);
    expect(state.vote.error).toBeNull();
  });
});