export default function Button({ children, className = '', disabled = false, type = 'button', loading = false, ...props }) {
  return (
    <button
      type={type}
      className={`
        w-full px-4 py-3.5 
        bg-[var(--primary)] hover:brightness-90
        text-white font-semibold rounded-lg
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200
        flex items-center justify-center gap-2
        hover:-translate-y-0.5

        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}