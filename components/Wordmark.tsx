export default function Wordmark({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span
      className={`font-display font-bold lowercase tracking-[-0.04em] ${className}`}
    >
      jefer<span className="text-accent">.</span>
    </span>
  );
}
