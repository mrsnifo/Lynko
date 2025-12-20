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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[480px] bg-[var(--surface)] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-[var(--primary)] mb-3">
            Welcome Back
          </h2>
          <p className="text-[var(--text-secondary)] text-base">
            Sign in to continue to Lynko
          </p>
        </div>

        <ErrorMessage message={error} />
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

        <ThemeToggle />

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