export default function Wordmark({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span className={`font-display font-extrabold lowercase leading-none tracking-[-0.01em] ${className}`}>
      jefer<span className="text-accent">.</span>
    </span>
  );
}
