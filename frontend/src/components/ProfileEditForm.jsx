import { useState } from 'react';

export default function ProfileEditForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    displayName: initialData?.displayName || '',
    bio: initialData?.bio || ''
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await onSave(formData);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-[var(--surface)] rounded-3xl shadow-lg p-8 mb-6">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
        Edit Profile
      </h2>
      
      <div className="space-y-5">
        <div>
          <label className="block text-[var(--text-primary)] font-medium mb-2">
            Display Name
          </label>
          <input
            type="text"
            value={formData.displayName}
            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
            placeholder="Your display name"
            className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            maxLength={50}
          />
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Leave empty to use your username
          </p>
        </div>

        <div>
          <label className="block text-[var(--text-primary)] font-medium mb-2">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Tell visitors about yourself..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
            maxLength={200}
          />
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {formData.bio.length}/200 characters
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 py-3 bg-[var(--primary)] text-white font-semibold rounded-xl hover:brightness-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            onClick={onCancel}
            disabled={saving}
            className="flex-1 py-3 bg-[var(--background)] text-[var(--text-secondary)] font-semibold rounded-xl hover:bg-[var(--border-color)] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}