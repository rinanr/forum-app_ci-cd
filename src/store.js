import { configureStore } from '@reduxjs/toolkit';
import authReducer from './states/auth';
import threadReducer from './states/thread';
import detailReducer from './states/threadDetail';
import leaderboardReducer from './states/leaderboard';
import commentReducer from './states/comment';
import voteReducer from './states/vote';

const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadReducer,
    detail: detailReducer,
    leaderboard: leaderboardReducer,
    comment: commentReducer,
    vote: voteReducer,
  },
});

export default store;