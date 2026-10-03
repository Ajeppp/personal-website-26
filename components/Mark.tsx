export default function Mark({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center bg-accent font-sans font-bold leading-none tracking-[-0.05em] text-bg ${className}`}
      style={{ borderRadius: "24%" }}
    >
      js
    </span>
  );
}
