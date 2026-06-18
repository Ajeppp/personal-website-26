export default function Wordmark({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span
      className={`font-display font-semibold lowercase tracking-[-0.02em] ${className}`}
    >
      jefer<span className="text-accent">.</span>
    </span>
  );
}
