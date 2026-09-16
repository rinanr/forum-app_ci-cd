import {
  describe,
  it,
  expect,
} from 'vitest';

import authReducer, {
  logout,
} from '../../src/states/auth';

describe('Auth Reducer', () => {
  /**
   * Skenario pengujian:
   * Memastikan reducer logout menghapus data user,
   * token, dan error dari state.
   */
  it('harus menghapus user, token, dan error ketika logout', () => {
    const initialState = {
      user: {
        id: 'user-1',
        name: 'Rina',
      },
      token: 'token-123',
      isLoading: false,
      error: 'error sebelumnya',
    };

    const state = authReducer(
      initialState,
      logout(),
    );

    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.error).toBeNull();
  });

  /**
   * Skenario pengujian:
   * Memastikan reducer login fulfilled mengubah
   * state menjadi tidak loading dan menyimpan
   * token hasil login.
   */
  it('harus menyimpan token ketika login berhasil', () => {
    const initialState = {
      user: null,
      token: null,
      isLoading: true,
      error: null,
    };

    const action = {
      type: 'auth/login/fulfilled',
      payload: 'token-baru',
    };

    const state = authReducer(
      initialState,
      action,
    );

    expect(state.isLoading).toBe(false);
    expect(state.token).toBe('token-baru');
  });
});