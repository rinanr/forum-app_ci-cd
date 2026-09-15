import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineSearch, HiPlus } from 'react-icons/hi';
import { Link } from 'react-router-dom';

import Loading from '../components/Loading';
import ThreadItem from '../components/ThreadItem';
import { fetchThreads } from '../states/thread';

function HomePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();

  const {
    threads,
    isLoading,
    error,
  } = useSelector((state) => state.threads);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(fetchThreads());
  }, [dispatch]);

  const categories = useMemo(
    () => [
      ...new Set(
        threads
          .map((thread) => thread.category)
          .filter(Boolean),
      ),
    ].sort((first, second) => first.localeCompare(second)),
    [threads],
  );

  const filteredThreads = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return threads.filter((thread) => {
      const searchableText = [
        thread.title,
        thread.body,
        thread.owner?.name,
        thread.category,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const matchesSearch = searchableText.includes(keyword);
      const matchesCategory =
        category === '' || thread.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [threads, search, category]);

  if (isLoading) {
    return <Loading text="Memuat thread..." />;
  }

  if (error) {
    return (
      <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-red-600">
            <p className="font-semibold">Gagal memuat thread</p>
            <p className="mt-1 text-sm">{error}</p>
            <button
              type="button"
              onClick={() => dispatch(fetchThreads())}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Coba lagi
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-50">
      <section className="bg-linear-to-br from-blue-700 via-blue-600 to-indigo-600 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold ring-1 ring-white/20">
              Forum Diskusi
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Tempat bertanya, berbagi, dan berkembang bersama.
            </h1>

            <p className="mt-4 text-sm leading-7 text-blue-100 sm:text-base">
              Temukan diskusi menarik, bagikan pengalaman, dan bantu
              pengguna lain melalui komunitas ForumKu.
            </p>

            {token && (
              <Link
                to="/threads/new"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-sm transition hover:bg-blue-50"
              >
                <HiPlus className="text-lg" />
                Buat Thread
              </Link>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <section className="mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Diskusi Terbaru
              </h2>
              <p className="text-sm text-slate-500">
                Jelajahi percakapan dari komunitas.
              </p>
            </div>

            <p className="text-sm font-medium text-slate-400">
              {filteredThreads.length} thread
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            <label className="relative block">
              <span className="sr-only">Cari thread</span>
              <HiOutlineSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Cari judul, isi, pengguna, atau kategori..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label>
              <span className="sr-only">Filter kategori</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="">Semua kategori</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        {filteredThreads.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <h2 className="font-bold text-slate-700">
              Thread tidak ditemukan
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Coba gunakan kata kunci atau kategori lain.
            </p>
          </div>
        ) : (
          <section className="grid gap-4 md:grid-cols-2">
            {filteredThreads.map((thread) => (
              <ThreadItem key={thread.id} thread={thread} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default HomePage;
