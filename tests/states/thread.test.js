import { describe, it, expect, beforeEach, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import threadReducer, {
  fetchThreads,
} from '../../src/states/thread';
import api from '../../src/utils/api';

/*
 * Skenario pengujian:
 * 1. Memastikan thunk fetchThreads berhasil mengambil data thread
 *    dan user dari API.
 * 2. Memastikan data user yang sesuai dengan ownerId berhasil
 *    ditambahkan ke setiap thread.
 *
 * Test double:
 * API getThreads() dan getUsers() dibuat sebagai mock agar
 * pengujian tidak benar-benar mengakses server.
 */

vi.mock('../../src/utils/api', () => ({
  default: {
    getThreads: vi.fn(),
    getUsers: vi.fn(),
  },
}));

describe('Thread Thunk', () => {
  let store;

  beforeEach(() => {
    vi.clearAllMocks();

    store = configureStore({
      reducer: {
        threads: threadReducer,
      },
    });
  });

  it('harus mengambil thread dan menggabungkan data owner', async () => {
    const mockThreads = [
      {
        id: 'thread-1',
        title: 'Belajar React',
        body: 'Bagaimana cara belajar React?',
        ownerId: 'user-1',
        createdAt: '2026-01-01T10:00:00.000Z',
        totalComments: 2,
      },
      {
        id: 'thread-2',
        title: 'Belajar Redux',
        body: 'Apa fungsi Redux?',
        ownerId: 'user-2',
        createdAt: '2026-01-02T10:00:00.000Z',
        totalComments: 1,
      },
    ];

    const mockUsers = [
      {
        id: 'user-1',
        name: 'Rina',
        email: 'rina@example.com',
      },
      {
        id: 'user-2',
        name: 'Budi',
        email: 'budi@example.com',
      },
    ];

    api.getThreads.mockResolvedValue({
      data: {
        threads: mockThreads,
      },
    });

    api.getUsers.mockResolvedValue({
      data: {
        users: mockUsers,
      },
    });

    await store.dispatch(fetchThreads());

    const state = store.getState().threads;

    expect(api.getThreads).toHaveBeenCalledTimes(1);
    expect(api.getUsers).toHaveBeenCalledTimes(1);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.threads).toHaveLength(2);

    expect(state.threads[0].owner).toEqual(mockUsers[0]);
    expect(state.threads[1].owner).toEqual(mockUsers[1]);
  });

  it('harus menyimpan error ketika pengambilan thread gagal', async () => {
    api.getThreads.mockRejectedValue(
      new Error('Gagal mengambil data thread'),
    );

    api.getUsers.mockResolvedValue({
      data: {
        users: [],
      },
    });

    await store.dispatch(fetchThreads());

    const state = store.getState().threads;

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Gagal mengambil data thread');
    expect(state.threads).toEqual([]);
  });
});