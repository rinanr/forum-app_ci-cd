import {
  HiOutlineThumbDown,
  HiOutlineThumbUp,
} from 'react-icons/hi';

function VoteButton({
  type,
  count,
  active,
  onClick,
  disabled,
}) {
  const isUpVote = type === 'up';
  const Icon = isUpVote
    ? HiOutlineThumbUp
    : HiOutlineThumbDown;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-1 rounded-lg border px-3 py-2 text-sm transition ${
        active
          ? 'border-blue-600 bg-blue-50 text-blue-600'
          : 'border-gray-200 text-gray-500 hover:bg-gray-50'
      } disabled:cursor-not-allowed disabled:opacity-50`}
    >
      <Icon />

      <span>{count}</span>
    </button>
  );
}

export default VoteButton;
