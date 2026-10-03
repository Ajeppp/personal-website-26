export default function Marquee({
  items,
  speed = 40,
  reverse = false,
  className = "",
  separator = "✦",
  separatorClass = "",
}: {
  items: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
  separator?: string;
  separatorClass?: string;
}) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap">{item}</span>
          <span className={`mx-[0.6em] text-[0.5em] ${separatorClass}`} aria-hidden="true">
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`flex overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="flex w-max"
        style={{
          animation: `marquee ${speed}s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {row}
        {row}
      </div>
    </div>
  );
}
