import { useEffect } from 'react';

export default function ThemeToggle() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = !isDark;
    
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div className="text-center my-6">
      <button
        onClick={toggleTheme}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-transparent hover:bg-[var(--surface-light)] text-[var(--text-secondary)] hover:text-[var(--primary)] transition-all text-sm"
      >
        <span>Switch Appearance</span>
      </button>
    </div>
  );
}