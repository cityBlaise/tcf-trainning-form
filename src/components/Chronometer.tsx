import { FC, memo, useEffect, useRef, useState } from "react";
import { MdTimer } from "react-icons/md";
import { VscDebugRestart } from "react-icons/vsc";
import { FaPlay } from "react-icons/fa6";
import AudioTimer from "./AudioTimer";

interface Chronometer {
  play: boolean;
  setPlay: (value: boolean) => void;
  restart: boolean;
  setRestart?: (value: boolean) => void;
}

const Chronometer: FC<Chronometer> = memo(
  ({ play, restart, setPlay, }) => {
    const [time, setTime] = useState(0); // Time in milliseconds
    const intervalId = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
      if (play) {
        intervalId.current = setInterval(() => {
          setTime((prevTime) => prevTime + 1000);
        }, 1000);
      } else {
        clearInterval(intervalId.current!);
      }
      return () => clearInterval(intervalId.current!);
    }, [play]); // The effect depends on `play`

    useEffect(() => {
      if (restart) {
        resetChronometer();
      }
      return () => {};
    }, [restart]);

    const resetChronometer = () => {
      setTime(0);
      setPlay(false);
    };

    return (
      <div className="relative  font-biber bg-gray-800 text-white   mx-auto overflow-hidden  border shadow-md border-indigo-200 rounded-lg max-w-[200px]   grid gap-2 pb-2">
        <h1 className="border-b border-slate-50  w-full px-4 py-1 capitalize flex justify-between">
          <div className="text-2xl flex items-center gap-1 ">
            <MdTimer />
            chrono
          </div>
          <button onClick={resetChronometer} className="">
            <VscDebugRestart />
          </button>
        </h1>
        <div className="grid gap-2">
          <div className="text-3xl  grid grid-flow-col px-3 grid-cols-3 text-center gap-3">
            <div className="grid grid-cols-3 col-span-2 w-full  justify-self-start">
              <div className="rounded-md px-2 shadow-sm">
                {`${Math.floor(time / 60000)
                  .toString()
                  .padStart(2, "0")}`}:
              </div>
              <div className="rounded-md px-2 shadow-sm">
                {`${Math.floor((time % 60000) / 1000)
                  .toString()
                  .padStart(2, "0")}`}s
              </div>
            </div>
            <div className="order-first flex items-center text-base rounded-md px-2 shadow-sm">
              <button
                disabled={play}
                className={`disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                <FaPlay
                  onClick={() => {
                    setPlay(!play);
                  }}
                />
              </button>
            </div>
          </div>
        </div>
        <AudioTimer play={play} />
      </div>
    );
  }
);

export default Chronometer;
