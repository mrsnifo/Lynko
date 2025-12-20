import { useState } from 'react';

export default function FloatingInput({ label, type = 'text', value, onChange, required = false, error }) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="relative mb-6">
      <input
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder=" "
        required={required}
        className={`
          w-full px-4 py-4 
          border ${error ? 'border-[var(--error)]' : 'border-[var(--border-color)]'}
          rounded-lg
          bg-[var(--surface-light)] 
          text-[var(--text-primary)]
          text-[0.95rem]
          focus:outline-none focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_var(--primary-light)]
          transition-all
          peer
        `}
      />

      <label className="
        absolute left-4 top-4 
        text-[var(--text-secondary)] text-[0.9rem]
        transition-all duration-200
        pointer-events-none
        bg-transparent
        peer-focus:top-[-0.6rem] peer-focus:left-3 peer-focus:text-[0.75rem] peer-focus:text-[var(--primary)] peer-focus:bg-[var(--surface)] peer-focus:px-2
        peer-[:not(:placeholder-shown)]:top-[-0.6rem] peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-[0.75rem] peer-[:not(:placeholder-shown)]:text-[var(--primary)] peer-[:not(:placeholder-shown)]:bg-[var(--surface)] peer-[:not(:placeholder-shown)]:px-2
      ">
        {label}
      </label>

      {type === 'password' && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors text-sm"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      )}

      {error && (
        <div className="text-[var(--error)] text-sm mt-2">
          {error}
        </div>
      )}
    </div>
  );
}