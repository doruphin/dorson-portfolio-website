import "../styles.css";

export function Overview() {
  return (
    <div className="overview flex flex-col">
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
        overview of who iam, resume, tootls and skills as you can tell, i made
        <p>
          this website all on my lonesome from my twisted, demented, mind. if
          you want something more officail, check out my resume
        </p>
      </div>
    </div>
  );
}
