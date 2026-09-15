import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HiOutlineArrowLeft,
  HiOutlineChatAlt2,
  HiOutlineDocumentText,
} from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';

import { createThread } from '../states/thread';

function CreateThreadPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.threads.isLoading);
  const error = useSelector((state) => state.threads.error);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await dispatch(
      createThread({
        title: title.trim(),
        body: body.trim(),
        category: category.trim(),
        token,
      }),
    );

    if (createThread.fulfilled.match(result)) {
      navigate(`/threads/${result.payload.id}`);
    }
  };

  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
        >
          <HiOutlineArrowLeft />
          Kembali ke forum
        </Link>

        <div className="mb-6">
          <p className="text-sm font-semibold text-blue-600">
            Diskusi baru
          </p>
          <h1 className="mt-1 text-3xl font-extrabold text-slate-900">
            Buat Thread
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Bagikan pertanyaan, pengalaman, atau topik yang ingin kamu
            diskusikan bersama komunitas.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {error && (
            <div
              className="mb-5 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600"
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Judul Thread
              </label>
              <div className="relative">
                <HiOutlineDocumentText className="absolute left-3 top-3.5 text-slate-400" />
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Contoh: Bagaimana cara menggunakan Redux Toolkit?"
                  minLength={5}
                  required
                  className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Kategori
              </label>
              <input
                id="category"
                type="text"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="Contoh: React, JavaScript, General"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="body"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Isi Thread
              </label>
              <div className="relative">
                <HiOutlineChatAlt2 className="absolute left-3 top-3.5 text-slate-400" />
                <textarea
                  id="body"
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  placeholder="Tulis pertanyaan atau topik diskusimu..."
                  minLength={10}
                  required
                  className="min-h-52 w-full resize-y rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm leading-6 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={
                  isLoading ||
                  title.trim().length < 5 ||
                  body.trim().length < 10
                }
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Mempublikasikan...' : 'Publikasikan Thread'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default CreateThreadPage;
