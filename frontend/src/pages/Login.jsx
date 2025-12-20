import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '@/lib/api';
import Button from '@/components/ui/Button';
import FloatingInput from '@/components/ui/FloatingInput';
import ErrorMessage from '@/components/ui/ErrorMessage';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const { data } = await login({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] opacity-20 -top-32 -right-32 blur-3xl"></div>
        <div className="absolute w-[250px] h-[250px] rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] opacity-15 bottom-20 -left-20 blur-2xl"></div>
        <div className="absolute w-[150px] h-[150px] rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] opacity-10 bottom-40 right-32 blur-xl"></div>
      </div>

      {/* Login Container */}
      <div className="w-full max-w-[480px] bg-[var(--surface)] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[var(--primary)] to-[#E09D00] bg-clip-text text-transparent mb-3">
            Welcome Back
          </h2>
          <p className="text-[var(--text-secondary)] text-base">
            Sign in to continue to Lynko
          </p>
        </div>

        {/* Error Message */}
        <ErrorMessage message={error} />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <FloatingInput
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <FloatingInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link 
              to="/forgot-password" 
              className="text-[var(--primary)] hover:underline transition text-sm font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" loading={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--border-color)]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[var(--surface)] text-[var(--text-secondary)]">
              New to Lynko?
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <Link 
            to="/register" 
            className="inline-block w-full py-3 px-4 border-2 border-[var(--primary)] text-[var(--primary)] font-semibold rounded-lg hover:bg-[var(--primary-light)] transition-all"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}