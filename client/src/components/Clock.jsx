import { useState, useEffect } from "react";

// Digital Clock Algorithm (4.2): uses JavaScript's Date() object and
// setInterval() to update the current time every second.
const Clock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick); // cleanup on unmount
  }, []);

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="relative rounded-2xl bg-graphite-800 shadow-bezel p-8 flex flex-col items-center overflow-hidden">
      {/* bezel tick marks — signature element referencing an instrument face */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        
      />
      <span className="relative text-xs tracking-[0.3em] uppercase text-muted mb-3">
        Local Time
      </span>
      <div className="relative font-mono tabular text-6xl md:text-7xl font-semibold text-ivory tracking-tight">
        {time}
      </div>
      <div className="relative mt-3 text-sm text-muted">{date}</div>
    </div>
  );
};

export default Clock;
