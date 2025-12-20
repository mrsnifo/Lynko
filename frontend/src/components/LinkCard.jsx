export default function LinkCard({ link, onDelete }) {
  return (
    <div className="bg-[var(--surface)] rounded-2xl shadow-lg p-6 flex justify-between items-center hover:shadow-xl transition">
      <div className="flex-1 min-w-0 mr-4">
        <h3 className="font-semibold text-[var(--text-primary)] text-lg mb-1">
          {link.title}
        </h3>

        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--primary)] text-sm hover:underline break-all block"
        >
          {link.url}
        </a>
      </div>

      <button
        onClick={() => onDelete(link._id)}
        className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition flex-shrink-0"
      >
        Delete
      </button>
    </div>
  );
}
