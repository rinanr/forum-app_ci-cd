import {
  describe,
  it,
  expect,
} from 'vitest';

import threadDetailReducer, {
  setThreadVote,
  setCommentVote,
  getVoteType,
} from '../../src/states/threadDetail';

describe('Thread Detail Reducer', () => {
  /**
   * Skenario pengujian:
   * Memastikan reducer setThreadVote dapat menambahkan
   * up vote user ke sebuah thread.
   */
  it('harus menambahkan up vote pada thread', () => {
    const initialState = {
      thread: {
        id: 'thread-1',
        upVotesBy: [],
        downVotesBy: [],
        comments: [],
      },
      isLoading: false,
      error: null,
    };

    const action = setThreadVote({
      userId: 'user-1',
      vote: 'up',
    });

    const state = threadDetailReducer(
      initialState,
      action,
    );

    expect(state.thread.upVotesBy).toContain('user-1');
    expect(state.thread.downVotesBy).not.toContain(
      'user-1',
    );
  });

  /**
   * Skenario pengujian:
   * Memastikan reducer setThreadVote dapat mengubah
   * vote user dari up vote menjadi down vote.
   */
  it('harus mengubah up vote menjadi down vote', () => {
    const initialState = {
      thread: {
        id: 'thread-1',
        upVotesBy: ['user-1'],
        downVotesBy: [],
        comments: [],
      },
      isLoading: false,
      error: null,
    };

    const action = setThreadVote({
      userId: 'user-1',
      vote: 'down',
    });

    const state = threadDetailReducer(
      initialState,
      action,
    );

    expect(state.thread.upVotesBy).not.toContain(
      'user-1',
    );

    expect(state.thread.downVotesBy).toContain(
      'user-1',
    );
  });

  /**
   * Skenario pengujian:
   * Memastikan reducer setCommentVote dapat menambahkan
   * up vote pada komentar tertentu.
   */
  it('harus menambahkan up vote pada komentar', () => {
    const initialState = {
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
    };

    const action = setCommentVote({
      userId: 'user-1',
      commentId: 'comment-1',
      vote: 'up',
    });

    const state = threadDetailReducer(
      initialState,
      action,
    );

    expect(
      state.thread.comments[0].upVotesBy,
    ).toContain('user-1');
  });

  /**
   * Skenario pengujian:
   * Memastikan getVoteType mengembalikan jenis vote
   * sesuai data vote user pada sebuah item.
   */
  it('harus mengembalikan jenis vote user dengan benar', () => {
    const item = {
      upVotesBy: ['user-1'],
      downVotesBy: ['user-2'],
    };

    expect(
      getVoteType(item, 'user-1'),
    ).toBe('up');

    expect(
      getVoteType(item, 'user-2'),
    ).toBe('down');

    expect(
      getVoteType(item, 'user-3'),
    ).toBe('neutral');
  });
});