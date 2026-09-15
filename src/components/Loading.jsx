function Loading({ text = 'Memuat...' }) {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center bg-slate-50 px-4"
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
        <p className="text-sm font-medium text-slate-500">{text}</p>
      </div>
    </div>
  );
}

export default Loading;
