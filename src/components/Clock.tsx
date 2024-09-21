import { useEffect, useState } from "react";
import "./Clock.css";

export function Clock() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const { hours, minutes, seconds } = formatTime(time);

  return (
    <>
      <div>
        <h1>Digital Clock</h1>
      </div>
      <div className="clock">
        <div className="time">
          <Digit value={hours[0]} />
          <Digit value={hours[1]} />
          <Colon />
          <Digit value={minutes[0]} />
          <Digit value={minutes[1]} />
          <Colon />
          <Digit value={seconds[0]} />
          <Digit value={seconds[1]} />
        </div>
      </div>
    </>
  );
}

const Digit = ({ value }: { value: string }) => {
  const [a, b, c, d, e, f, g] = segments[parseInt(value)];

  return (
    <div className="digit">
      <div className={`segment area-a ${a ? "on" : ""}`}></div>
      <div className={`segment area-b ${b ? "on" : ""}`}></div>
      <div className={`segment area-c ${c ? "on" : ""}`}></div>
      <div className={`segment area-d ${d ? "on" : ""}`}></div>
      <div className={`segment area-e ${e ? "on" : ""}`}></div>
      <div className={`segment area-f ${f ? "on" : ""}`}></div>
      <div className={`segment area-g ${g ? "on" : ""}`}></div>
    </div>
  );
};

const Colon = () => (
  <div className="colon">
    <div className="colon-dot"></div>
    <div className="colon-dot"></div>
  </div>
);

function formatTime(time: Date) {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return {
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };
}

const segments: Record<number, boolean[]> = {
  0: [true, true, true, true, true, true, false],
  1: [false, true, true, false, false, false, false],
  2: [true, true, false, true, true, false, true],
  3: [true, true, true, true, false, false, true],
  4: [false, true, true, false, false, true, true],
  5: [true, false, true, true, false, true, true],
  6: [true, false, true, true, true, true, true],
  7: [true, true, true, false, false, false, false],
  8: [true, true, true, true, true, true, true],
  9: [true, true, true, true, false, true, true],
};