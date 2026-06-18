export default function Footer() {
  return (
    <footer className="relative z-[1] border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} Jefer Setiawan
        </p>
        <p className="text-xs text-text-muted/60">
          Next.js &middot; Tailwind CSS &middot; Framer Motion
        </p>
      </div>
    </footer>
  );
}
