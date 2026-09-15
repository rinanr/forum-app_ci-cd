import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HiOutlineMail,
  HiOutlineUser,
} from 'react-icons/hi';

import { getOwnProfile } from '../states/auth';
import Loading from '../components/Loading';

function ProfilePage() {
  const dispatch = useDispatch();

  const {
    user,
    token,
    isLoading,
    error,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(getOwnProfile(token));
    }
  }, [dispatch, token, user]);

  if (isLoading && !user) {
    return <Loading text="Memuat profile..." />;
  }

  if (error) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-xl bg-red-50 p-5 text-red-600">
          Gagal memuat profile: {error}
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <p>Silakan login terlebih dahulu.</p>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Profile
        </h1>

        <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-center text-center">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="mb-4 h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
                {user.name
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}

            <h2 className="text-xl font-bold text-gray-800">
              {user.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Profil pengguna ForumKu
            </p>
          </div>

          <div className="mt-8 space-y-4 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-3">
              <HiOutlineUser className="text-xl text-blue-600" />

              <div>
                <p className="text-xs text-gray-400">
                  Nama
                </p>

                <p className="text-sm font-medium text-gray-800">
                  {user.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <HiOutlineMail className="text-xl text-blue-600" />

              <div>
                <p className="text-xs text-gray-400">
                  Email
                </p>

                <p className="text-sm font-medium text-gray-800">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProfilePage;