import { useWindowStore } from "./windows";

export function Desktop() {
  const addWindows = useWindowStore((state) => state.addWindow);

  return (
    <div className="w-full h-screen bg-red-600 grid grid-rows-15 grid-cols-15 p-8">
      <div className="col-start-1 row-start-1 bg-amber-500 flex aspect-square w-24">
        <img
          src="images/fretnot.ico"
          onClick={() => {
            addWindows("buhnana");
          }}
        />
      </div>
    </div>
  );
}
