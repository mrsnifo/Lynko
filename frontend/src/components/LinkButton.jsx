export default function LinkButton({ link }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-[var(--surface)] hover:bg-[var(--primary)] rounded-xl transition-all duration-200 p-4 border border-[var(--border-color)] hover:border-[var(--primary)] shadow-sm hover:shadow-lg hover:-translate-y-0.5"
    >
      <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-white text-base mb-1 transition-colors">
        {link.title}
      </h3>
      <p className="text-[var(--text-secondary)] group-hover:text-white/80 text-xs truncate transition-colors">
        {link.url}
      </p>
    </a>
  );
}