import "../styles.css";

export function Overview() {
  return (
    <div className="overview">
      <img
        src="/images/favicon.ico"
        className="w-32 border-2 rounded-full p-2 mb-8"
      />
      <div className="mb-8 bg-yellow-200 w-full flex justify-center text-black">
        UNDER CONSTRUCTION
      </div>
      <div>introduction</div>
      <img src="images/construction.gif" alt="lol" className="mb-8" />
      <div className="w-2/3 h-1/2 border-2 rounded-2xl p-8">
        <div>This is gonna be a really cool website, i promise</div>
      </div>
    </div>
  );
}
