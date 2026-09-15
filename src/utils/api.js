const BASE_URL = 'https://forum-api.dicoding.dev/v1';

async function request(url, options = {}) {
  const response = await fetch(url, options);
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      responseJson.message || 'Terjadi kesalahan pada server.',
    );
  }

  return responseJson;
}

const api = {
  async register({ name, email, password }) {
    return request(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
  },

  async login({ email, password }) {
    return request(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  },

  async getThreads() {
    return request(`${BASE_URL}/threads`);
  },

  async getUsers() {
    return request(`${BASE_URL}/users`);
  },

  async getThreadDetail(id) {
    return request(`${BASE_URL}/threads/${id}`);
  },

  async createThread({ title, body, category, token }) {
    return request(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, body, category }),
    });
  },

  async createComment({ threadId, content, token }) {
    return request(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });
  },

  async getOwnProfile(token) {
    return request(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async voteThread({ threadId, vote, token }) {
    return request(`${BASE_URL}/threads/${threadId}/${vote}-vote`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async voteComment({ threadId, commentId, vote, token }) {
    return request(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/${vote}-vote`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },

  async getLeaderboards() {
    return request(`${BASE_URL}/leaderboards`);
  },
};

export default api;