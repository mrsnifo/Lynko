import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getUser } from '@/lib/api';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LinkButton from '@/components/LinkButton';

export default function User() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const fetchProfile = async () => {
    try {
      const { data } = await getUser(username);
      setProfile(data);
    } catch  {
      navigate('/404', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `@${profile.username} on Lynko`,
          url: url
        });
      } catch  {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--text-secondary)] text-lg">Loading...</div>
      </div>
    );
  }

  const displayName = profile.displayName || profile.username;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-xl">
        <div className="bg-[var(--surface)] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden relative">
          <div className="relative bg-gradient-to-br from-[var(--primary)] via-purple-600 to-purple-700 p-8">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
            <div className="absolute top-0 left-0 w-20 h-20 bg-white/10 rounded-full -ml-10 -mt-10"></div>
            
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition rounded-lg hover:bg-white/10"
              title="Share profile"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>

            {/* Display Name / Username - Centered */}
            <div className="text-center relative z-10">
              <h1 className="text-4xl font-bold text-white mb-2">{displayName}</h1>
              {profile.displayName && (
                <p className="text-white/70 text-sm mb-2">@{profile.username}</p>
              )}
              {profile.bio && (
                <p className="text-white/80 leading-relaxed max-w-md mx-auto text-sm mt-3">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>

          <div className="px-10 pt-8 pb-4">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              Links
            </h2>
          </div>

          <div className="px-10 pb-10">
            {/* Links */}
            <div className="space-y-4 mb-10">
              {profile.links.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-[var(--text-secondary)]">No links yet</p>
                </div>
              ) : (
                profile.links.map((link) => (
                  <LinkButton key={link._id} link={link} />
                ))
              )}
            </div>

            <div className="pt-6 border-t border-[var(--border-color)]">
              <Link
                to="/register"
                className="block w-full py-4 bg-gradient-to-r from-[var(--primary)] to-purple-600 text-white font-semibold rounded-xl hover:brightness-110 transition text-center shadow-lg mb-6"
              >
                Join {displayName} on Lynko
              </Link>

              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Small Footer */}
        <div className="text-center mt-4">
          <p className="text-[var(--text-secondary)] text-xs">
            Powered by Lynko
          </p>
        </div>
      </div>
    </div>
  );
}