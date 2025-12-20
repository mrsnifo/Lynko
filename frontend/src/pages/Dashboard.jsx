import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getLinks, createLink, deleteLink, updateUser } from '@/lib/api';
import AddLinkForm from '@/components/AddLinkForm';
import LinkCard from '@/components/LinkCard';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ProfileEditForm from '@/components/ProfileEditForm';

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: '',
    bio: ''
  });
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login', { replace: true });
      return;
    }
    fetchLinks();
    const savedDisplayName = localStorage.getItem('displayName') || '';
    const savedBio = localStorage.getItem('bio') || '';
    setProfileData({ displayName: savedDisplayName, bio: savedBio });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLinks = async () => {
    try {
      const { data } = await getLinks();
      setLinks(data);
    } catch (err) {
      console.error('Failed to fetch links:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login', { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddLink = async (linkData) => {
    const { data } = await createLink(linkData);
    setLinks([...links, data]);
    setShowAddForm(false);
  };

  const handleDeleteLink = async (id) => {
    try {
      await deleteLink(id);
      setLinks(links.filter(link => link._id !== id));
    } catch (err) {
      console.error('Failed to delete link:', err);
    }
  };

  const handleUpdateProfile = async (data) => {
    try {
      await updateUser(data);
      setProfileData(data);
      localStorage.setItem('displayName', data.displayName);
      localStorage.setItem('bio', data.bio);
      setShowProfileEdit(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('displayName');
    localStorage.removeItem('bio');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--text-secondary)] text-lg">Loading...</div>
      </div>
    );
  }

  const displayNameToShow = profileData.displayName || username;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto py-8">
        {/* Header */}
        <div className="bg-[var(--surface)] rounded-3xl shadow-lg p-8 mb-6">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                Welcome back, {displayNameToShow}
              </h1>
              {profileData.bio && (
                <p className="text-[var(--text-secondary)] text-sm mb-3 max-w-md">
                  {profileData.bio}
                </p>
              )}
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-secondary)] text-sm">
                  Your page:
                </span>
                <Link
                  to={`/${username}`}
                  className="text-[var(--primary)] font-medium text-sm hover:underline"
                >
                  lynko.app/{username}
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowProfileEdit(!showProfileEdit)}
                className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--primary)] transition font-medium"
              >
                Edit Profile
              </button>
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-[var(--text-secondary)] hover:text-red-500 transition font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {showProfileEdit && (
          <ProfileEditForm
            initialData={profileData}
            onSave={handleUpdateProfile}
            onCancel={() => setShowProfileEdit(false)}
          />
        )}

        {!showAddForm && (
          <div className="mb-6">
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full py-4 bg-[var(--primary)] text-white font-semibold rounded-2xl hover:brightness-90 transition shadow-lg"
            >
              + Add New Link
            </button>
          </div>
        )}

        {showAddForm && (
          <AddLinkForm
            onAdd={handleAddLink}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        <div className="space-y-4">
          {links.length === 0 ? (
            <div className="bg-[var(--surface)] rounded-3xl shadow-lg p-12 text-center">
              <p className="text-[var(--text-secondary)] mb-4">
                No links yet. Start building your collection!
              </p>
              {!showAddForm && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-6 py-3 bg-[var(--primary)] text-white font-semibold rounded-xl hover:brightness-90 transition"
                >
                  Add Your First Link
                </button>
              )}
            </div>
          ) : (
            links.map((link, index) => (
              <LinkCard
                key={link._id}
                link={link}
                onDelete={handleDeleteLink}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}