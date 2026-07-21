import { useEffect, useRef, useState } from "react";

const API = "https://api.dorsontang.com";

interface GuestBookEntry {
  created_at: string;
  id: number;
  message: string;
  name: string;
}

export function GuestBook() {
  const [entries, setEntries] = useState<GuestBookEntry[] | null>(null);
  const [error, setError] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return; 
    hasRun.current = true;

    (async () => {
      try {
        const res = await fetch(`${API}/guestbook`, { method: "GET" });
        if (!res.ok) throw new Error("Failed to fetch");
        const jsn = await res.json();
        setEntries(jsn.entries);
      } catch (e) {
        setError(true);
      }
    })();
  }, []);

  return (
    <div 
      className="bg-[#000080] text-white font-serif p-3 h-full overflow-y-auto border-4 border-t-gray-400 border-l-gray-400 border-b-black border-r-black custom-scrollbar select-none"
      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h10v10H0zm10 10h10v10H10z\' fill=\'%23000060\' fill-opacity=\'0.5\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }}
    >
      <div className="text-center mb-4 border-b-4 border-double border-white pb-2 bg-[#000080]/80 p-2">
        <h1 className="text-xl sm:text-2xl font-bold italic tracking-wider text-yellow-300 drop-shadow-[2px_2px_0_#000]">
          ~*~ My Guestbook ~*~
        </h1>
        <p className="text-[10px] sm:text-xs mt-1 text-cyan-200">Thanks for dropping by!</p>
      </div>

      <div className="space-y-4">
        {entries ? (
          entries.map((entry) => (
            <div key={entry.id} className="bg-[#c0c0c0] text-black border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-1 sm:p-2 shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
              <div className="flex flex-col sm:flex-row justify-between border-b-2 border-gray-500 pb-1 mb-2 bg-[#000080] text-white px-2">
                <span className="font-bold text-sm">
                  Name: <span className="text-yellow-300">{entry.name}</span>
                </span>
                <span className="text-[10px] sm:text-xs self-start sm:self-center text-gray-300">
                  {new Date(entry.created_at).toLocaleString()}
                </span>
              </div>
              <div className="font-sans text-xs sm:text-sm p-2 bg-white border-2 border-t-gray-800 border-l-gray-800 border-b-white border-r-white shadow-[inset_1px_1px_3px_rgba(0,0,0,0.5)] break-words">
                {entry.message}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-yellow-300 animate-pulse font-bold p-4 bg-black/50 border border-yellow-300">
            <marquee scrollamount="5">Loading entries... Please wait...</marquee>
          </div>
        )}
      </div>
      
      <div className="text-center mt-6 p-2 bg-black/50 border-t border-gray-500">
        <div className="flex justify-center items-center gap-2">
          <img src="images/construction.gif" className="h-6 w-auto pixelated" alt="construction" />
          <span className="text-[10px] text-gray-300 font-mono">EST. 1999</span>
          <img src="images/construction.gif" className="h-6 w-auto pixelated" alt="construction" />
        </div>
      </div>
    </div>
  );
}
