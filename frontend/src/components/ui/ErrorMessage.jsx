export default function ErrorMessage({ message }) {
  if (!message) return null;
  
  return (
    <div className="flex items-center gap-2 text-[var(--error)] bg-[var(--primary-light)] p-3 rounded-lg text-sm mb-4">
      <i className="bi bi-exclamation-circle-fill text-base"></i>
      <span>{message}</span>
    </div>
  );
}