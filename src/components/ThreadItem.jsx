import {
  HiOutlineChatAlt2,
  HiOutlineClock,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

function ThreadItem({ thread }) {
  const ownerName = thread.owner?.name;
  const createdAt = new Date(thread.createdAt).toLocaleString(
    'id-ID',
  );

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex items-start gap-3">
        {thread.owner?.avatar ? (
          <img
            src={thread.owner.avatar}
            alt={`Avatar ${ownerName}`}
            className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-slate-100"
          />
        ) : (
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600"
            aria-hidden="true"
          >
            {ownerName?.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-800">
            {ownerName}
          </p>

          <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
            <HiOutlineClock />
            {createdAt}
          </p>
        </div>

        {thread.category && (
          <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
            {thread.category}
          </span>
        )}
      </div>

      <h3 className="mb-2 text-lg font-bold leading-snug text-slate-800">
        <Link
          to={`/threads/${thread.id}`}
          className="transition hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          {thread.title}
        </Link>
      </h3>

      <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-600">
        {thread.body}
      </p>

      <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500">
        <span className="flex items-center gap-1.5">
          <HiOutlineChatAlt2 />
          {thread.totalComments ?? 0} komentar
        </span>

        <Link
          to={`/threads/${thread.id}`}
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Baca selengkapnya
        </Link>
      </div>
    </article>
  );
}

export default ThreadItem;