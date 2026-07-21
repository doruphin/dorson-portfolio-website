import { useEffect, useRef, useState } from "react";

const API = "https://api.dorsontang.com";

interface CountResponse {
  count: number;
}

export function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return; 
    hasRun.current = true;

    (async () => {
      try {
        const res = await fetch(`${API}/increment`, { method: "POST" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: CountResponse = await res.json();
        setCount(data.count);
      } catch {
        setError(true);
      }
    })();
  }, []);

  const displayCount = error ? null : count;
  const digits = displayCount !== null ? displayCount.toString().padStart(6, '0').split('') : ['-','-','-','-','-','-'];

  return (
    <div className="flex flex-col items-center justify-center bg-[#c0c0c0] p-2 sm:p-4 w-full h-full select-none">
      <div className="font-bold text-xs sm:text-sm text-black my-1 font-serif tracking-widest uppercase text-black!">
        You are visitor
      </div>
      <div className="flex w-full h-full bg-black p-[2px] shadow-[inset_0_2px_4px_rgba(0,0,0,1)] border-2 border-gray-600">
        {digits.map((digit, i) => (
          <div 
            key={i} 
            className="relative flex-1 bg-[#222] text-white font-mono text-4xl sm:text-6xl font-bold border-r border-black last:border-r-0 flex items-center justify-center shadow-[inset_0_1px_5px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Middle line for mechanical odometer look */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black/60 z-10"></div>
            <span className="relative z-0" style={{ textShadow: '0 2px 4px rgba(0,0,0,1)' }}>
              {digit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
