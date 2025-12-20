import { useState } from 'react';
import Button from './ui/Button';
import FloatingInput from './ui/FloatingInput';

export default function AddLinkForm({ onAdd, onCancel }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let formattedUrl = url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        formattedUrl = 'https://' + url;
      }

      await onAdd({ title, url: formattedUrl });
      setTitle('');
      setUrl('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[var(--surface)] rounded-3xl shadow-lg p-8 mb-6">
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Add New Link</h3>
      
      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FloatingInput
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <FloatingInput
          label="URL"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="example.com"
          required
        />
        <div className="flex gap-3">
          <Button type="submit" loading={loading}>
            {loading ? 'Adding...' : 'Add Link'}
          </Button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border-2 border-[var(--border-color)] text-[var(--text-secondary)] font-semibold rounded-lg hover:bg-[var(--surface-light)] transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}