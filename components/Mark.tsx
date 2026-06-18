export default function Mark({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center font-body font-bold leading-none tracking-[-0.05em] ${className}`}
      style={{
        backgroundColor: "#f2693c",
        color: "#0e0d0b",
        borderRadius: "24%",
      }}
    >
      js
    </span>
  );
}
