import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[var(--primary)] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">Page Not Found</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          The page you're looking for doesn't exist.
        </p>
        <Link 
          to="/login" 
          className="inline-block px-6 py-3 bg-[var(--primary)] text-white font-semibold rounded-xl hover:brightness-90 transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}