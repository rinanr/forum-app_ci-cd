import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiTrophy } from 'react-icons/hi2';
import { HiOutlineUser } from 'react-icons/hi';

import Loading from '../components/Loading';
import { fetchLeaderboards } from '../states/leaderboard';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const { leaderboards, isLoading, error } = useSelector(
    (state) => state.leaderboard,
  );

  useEffect(() => {
    dispatch(fetchLeaderboards());
  }, [dispatch]);

  if (isLoading) {
    return <Loading text="Memuat leaderboard..." />;
  }

  if (error) {
    return (
      <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-100 bg-red-50 p-5 text-red-600">
          <p className="font-semibold">Gagal memuat leaderboard</p>
          <p className="mt-1 text-sm">{error}</p>
          <button
            type="button"
            onClick={() => dispatch(fetchLeaderboards())}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Coba lagi
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600 shadow-sm">
            <HiTrophy className="text-4xl" />
          </div>
          <p className="text-sm font-semibold text-blue-600">
            Apresiasi komunitas
          </p>
          <h1 className="mt-1 text-3xl font-extrabold text-slate-900">
            Leaderboard
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
            Pengguna dengan kontribusi terbaik di ForumKu.
          </p>
        </div>

        {leaderboards.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="font-semibold text-slate-600">
              Belum ada data leaderboard.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {leaderboards.map((leaderboard, index) => {
              const name = leaderboard.user?.name || 'Pengguna';

              return (
                <article
                  key={leaderboard.user.id}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-extrabold text-slate-600">
                    #{index + 1}
                  </div>

                  {leaderboard.user.avatar ? (
                    <img
                      src={leaderboard.user.avatar}
                      alt={`Avatar ${name}`}
                      className="h-12 w-12 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600"
                      aria-hidden="true"
                    >
                      <HiOutlineUser className="text-xl" />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-bold text-slate-800">
                      {name}
                    </h2>
                    <p className="text-xs text-slate-400">
                      Kontributor forum
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-extrabold text-blue-600">
                      {leaderboard.score}
                    </p>
                    <p className="text-xs font-medium text-slate-400">
                      poin
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default LeaderboardPage;
