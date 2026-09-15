import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HiOutlineArrowLeft,
  HiOutlineChatAlt2,
  HiOutlineThumbDown,
  HiOutlineThumbUp,
} from 'react-icons/hi';
import { Link, useNavigate, useParams } from 'react-router-dom';

import CommentItem from '../components/CommentItem';
import Loading from '../components/Loading';
import { createComment } from '../states/comment';
import { fetchThreadDetail } from '../states/threadDetail';
import { voteComment, voteThread } from '../states/vote';

function ThreadDetailPage() {
  const { id } = useParams();
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { thread, isLoading, error } = useSelector(
    (state) => state.detail,
  );
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const commentLoading = useSelector(
    (state) => state.comment.isLoading,
  );
  const voteLoading = useSelector((state) => state.vote.isLoading);

  useEffect(() => {
    dispatch(fetchThreadDetail(id));
  }, [dispatch, id]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    if (!content.trim() || !token) {
      return;
    }

    const result = await dispatch(
      createComment({
        threadId: id,
        content: content.trim(),
        token,
      }),
    );

    if (createComment.fulfilled.match(result)) {
      setContent('');
      dispatch(fetchThreadDetail(id));
    }
  };

  const handleThreadVote = async (vote) => {
    if (!token || !user) {
      navigate('/login');
      return;
    }

    await dispatch(
      voteThread({
        threadId: id,
        vote,
        token,
      }),
    );
  };

  const handleCommentVote = async (commentId, vote) => {
    if (!token || !user) {
      navigate('/login');
      return;
    }

    await dispatch(
      voteComment({
        threadId: id,
        commentId,
        vote,
        token,
      }),
    );
  };

  if (isLoading) {
    return <Loading text="Memuat thread..." />;
  }

  if (error) {
    return (
      <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-red-600">
            <p className="font-semibold">Gagal memuat thread</p>
            <p className="mt-1 text-sm">{error}</p>
            <button
              type="button"
              onClick={() => dispatch(fetchThreadDetail(id))}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Coba lagi
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (!thread) {
    return (
      <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="font-semibold text-slate-700">
            Thread tidak ditemukan.
          </p>
          <Link
            to="/"
            className="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Kembali ke forum
          </Link>
        </div>
      </main>
    );
  }

  const isThreadUpVoted =
    Boolean(user) && thread.upVotesBy.includes(user.id);
  const isThreadDownVoted =
    Boolean(user) && thread.downVotesBy.includes(user.id);

  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
        >
          <HiOutlineArrowLeft />
          Kembali ke forum
        </Link>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-4 flex flex-wrap gap-2">
            {thread.category && (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                {thread.category}
              </span>
            )}
          </div>

          <h1 className="text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
            {thread.title}
          </h1>

          <div className="mt-5 flex items-center gap-3 border-b border-slate-100 pb-6">
            {thread.owner?.avatar ? (
              <img
                src={thread.owner.avatar}
                alt={`Avatar ${thread.owner.name}`}
                className="h-11 w-11 rounded-full object-cover"
              />
            ) : (
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600"
                aria-hidden="true"
              >
                {thread.owner?.name?.charAt(0).toUpperCase() || 'P'}
              </div>
            )}

            <div>
              <p className="text-sm font-bold text-slate-800">
                {thread.owner?.name || 'Pengguna'}
              </p>
              <p className="text-xs text-slate-400">
                {new Date(thread.createdAt).toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          <div className="whitespace-pre-wrap py-7 text-[15px] leading-7 text-slate-700">
            {thread.body}
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={() =>
                handleThreadVote('up')
              }
              disabled={voteLoading}
              aria-label="Up vote thread"
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition ${
                isThreadUpVoted
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              } disabled:cursor-not-allowed disabled:opacity-60`}
            >
              <HiOutlineThumbUp />
              {thread.upVotesBy.length}
            </button>

            <button
              type="button"
              onClick={() =>
                handleThreadVote('down')
              }
              disabled={voteLoading}
              aria-label="Down vote thread"
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition ${
                isThreadDownVoted
                  ? 'border-red-600 bg-red-50 text-red-600'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              } disabled:cursor-not-allowed disabled:opacity-60`}
            >
              <HiOutlineThumbDown />
              {thread.downVotesBy.length}
            </button>

            <span className="ml-1 flex items-center gap-1.5 text-sm text-slate-500">
              <HiOutlineChatAlt2 />
              {thread.comments.length} komentar
            </span>
          </div>
        </article>

        {token ? (
          <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-slate-800">
              Tulis Komentar
            </h2>

            <form onSubmit={handleCommentSubmit}>
              <label htmlFor="comment" className="sr-only">
                Isi komentar
              </label>
              <textarea
                id="comment"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Bagikan pendapat atau jawabanmu..."
                required
                className="mb-3 min-h-32 w-full resize-y rounded-xl border border-slate-300 p-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={commentLoading || !content.trim()}
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {commentLoading ? 'Mengirim...' : 'Kirim Komentar'}
                </button>
              </div>
            </form>
          </section>
        ) : (
          <section className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-sm text-blue-800">
              Ingin ikut berdiskusi? Silakan login untuk membuat komentar
              dan memberikan vote.
            </p>
            <Link
              to="/login"
              className="mt-3 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
            >
              Login
            </Link>
          </section>
        )}

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-end justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Komentar
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {thread.comments.length} komentar dalam diskusi ini.
              </p>
            </div>
          </div>

          {thread.comments.length === 0 ? (
            <div className="py-10 text-center">
              <p className="font-medium text-slate-600">
                Belum ada komentar.
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Jadilah orang pertama yang ikut berdiskusi.
              </p>
            </div>
          ) : (
            <div>
              {thread.comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  currentUserId={user?.id}
                  onVote={handleCommentVote}
                  isVoting={voteLoading}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default ThreadDetailPage;
