import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineLogin,
} from 'react-icons/hi';

import {
  getOwnProfile,
  login,
} from '../states/auth';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isLoading,
    error,
  } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await dispatch(
      login({
        email: data.email,
        password: data.password,
      }),
    );

    if (login.fulfilled.match(result)) {
      await dispatch(getOwnProfile(result.payload));

      navigate('/');
    }
  };

  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <HiOutlineLogin className="text-2xl" />
            </div>

            <h1 className="text-2xl font-bold text-gray-800">
              Login Forum Diskusi App
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Masuk untuk mulai berdiskusi.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <div className="relative">
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  id="email"
                  type="email"
                  placeholder="Masukkan email"
                  {...register('email', {
                    required: 'Email wajib diisi',
                  })}
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  {...register('password', {
                    required: 'Password wajib diisi',
                  })}
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? 'Memproses...'
                : 'Login'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Belum punya akun?{' '}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;