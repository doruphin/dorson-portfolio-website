interface GuestBookEntry {
  created_at: Date;
  id: number;
  message: string;
  name: string;
}

const entries: GuestBookEntry[] = [
  {created_at: new Date(Date.now() - 86_400_000), id: 67, message: "This website rockz (˶>⩊<˶)", name: "x10n1c_r1pp3r"},
  {created_at: new Date(Date.now() - 5345_400_000), id: 67, message: "The material that this website presents is asinine and downright offensive. The mere thought that this was presented to me offends me greatly. Your resume will be burned in a pile along with the rest. Good day to you sir.", name: "Interviewer"},
  {created_at: new Date(Date.now() - 74534_400_000), id: 67, message: "spamspamspamspamspamspamspamspamspamspamspamspamspamspamspamspamspamspamspamspamspamspam", name: "pingus"},
  {created_at: new Date(0), id: 67, message: "Please, you've got to help me. I've been trapped in this website for... gods, I don't know how long. Head to the Lucky Mare and knock on the basement door three times, then ask for 'Margy'. She'll know what to do. Please, you're my last hope, I can hear them coming for me... ", name: "Forgotten"},
  {created_at: new Date(-10000), id: 67, message: "haha funi", name: "glue"},
]

export function GuestBook() {
  return (
    <div 
      className="bg-[#000080] text-white font-serif p-3 h-full overflow-y-auto border-4 border-t-gray-400 border-l-gray-400 border-b-black border-r-black custom-scrollbar select-none"
      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h10v10H0zm10 10h10v10H10z\' fill=\'%23000060\' fill-opacity=\'0.5\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }}
    >
      <div className="text-center mb-4 border-b-4 border-double border-white pb-2 p-2 px-0!">
        <h1 className="text-xl sm:text-2xl font-bold italic tracking-wider text-yellow-300 drop-shadow-[2px_2px_0_#000]">
          ~*My Guestbook*~
        </h1>
        <p className="text-[10px] sm:text-xs mt-1 text-cyan-200">Thanks for dropping by!</p>
      </div>

      <div className="space-y-4">
        {entries?.map((entry) => (
            <div key={entry.id} className="bg-[#c0c0c0] text-black border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-1 sm:p-2 shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
              <div className="flex flex-col sm:flex-row justify-between border-b-2 border-gray-500 py -1 mb-2 bg-[#000080] text-white px-2">
                <span className="font-bold text-sm">
                  <span className="text-yellow-300">{entry.name}</span>
                </span>
                <span className="text-[10px] sm:text-xs self-start sm:self-center text-gray-300">
                  {entry.created_at.toDateString()}
                </span>
              </div>
              <div className="font-sans text-xs sm:text-sm p-2 bg-white text-black! border-2 border-t-gray-800 border-l-gray-800 border-b-white border-r-white shadow-[inset_1px_1px_3px_rgba(0,0,0,0.5)] break-words">
                {entry.message}
              </div>
            </div>
          ))
        }
      </div>
      
      <div className="text-center mt-6 p-2 bg-black/50 border-t border-gray-500">
        <div className="flex justify-center items-center gap-2">
          <img src="images/torch.gif" className="h-6 w-auto pixelated" alt="construction" />
          <span className="text-[10px] text-gray-300 font-mono">EST. 2026</span>
          <img src="images/torch.gif" className="h-6 w-auto pixelated" alt="construction" />
        </div>
      </div>
    </div>
  );
}
