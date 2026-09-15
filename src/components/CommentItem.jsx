import {
  HiOutlineThumbDown,
  HiOutlineThumbUp,
} from 'react-icons/hi';

function CommentItem({
  comment,
  currentUserId,
  onVote,
  isVoting,
}) {
  const isUpVoted =
    Boolean(currentUserId) &&
    comment.upVotesBy.includes(currentUserId);
  const isDownVoted =
    Boolean(currentUserId) &&
    comment.downVotesBy.includes(currentUserId);

  const ownerName = comment.owner?.name || 'Pengguna';

  return (
    <article className="border-b border-slate-100 py-5 last:border-b-0">
      <div className="mb-3 flex items-center gap-3">
        {comment.owner?.avatar ? (
          <img
            src={comment.owner.avatar}
            alt={`Avatar ${ownerName}`}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600"
            aria-hidden="true"
          >
            {ownerName.charAt(0).toUpperCase()}
          </div>
        )}

        <div>
          <p className="text-sm font-bold text-slate-800">
            {ownerName}
          </p>
          <p className="text-xs text-slate-400">
            {new Date(comment.createdAt).toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      <p className="mb-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">
        {comment.content}
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          disabled={isVoting}
          onClick={() =>
            onVote(comment.id, 'up')
          }
          aria-label="Up vote komentar"
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
            isUpVoted
              ? 'border-blue-600 bg-blue-50 text-blue-600'
              : 'border-slate-200 text-slate-500 hover:bg-slate-50'
          } disabled:cursor-not-allowed disabled:opacity-50`}
        >
          <HiOutlineThumbUp />
          {comment.upVotesBy.length}
        </button>

        <button
          type="button"
          disabled={isVoting}
          onClick={() =>
            onVote(comment.id, 'down')
          }
          aria-label="Down vote komentar"
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
            isDownVoted
              ? 'border-red-600 bg-red-50 text-red-600'
              : 'border-slate-200 text-slate-500 hover:bg-slate-50'
          } disabled:cursor-not-allowed disabled:opacity-50`}
        >
          <HiOutlineThumbDown />
          {comment.downVotesBy.length}
        </button>
      </div>
    </article>
  );
}

export default CommentItem;
