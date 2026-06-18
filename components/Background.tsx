export default function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="glow glow-1" />
      <div className="glow glow-2" />
      <div className="grain" />
    </div>
  );
}
