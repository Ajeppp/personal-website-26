"use client";

export default function Marquee({
  items,
  speed = 40,
  reverse = false,
  className = "",
  separator = "·",
}: {
  items: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
  separator?: string;
}) {
  const row = (
    <div className="flex shrink-0 items-center my-2">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap">{item}</span>
          <span className="mx-8 text-accent" aria-hidden="true">
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
