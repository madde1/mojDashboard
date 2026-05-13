import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Countdown() {
  const targetDate = new Date("2027-08-07T14:00:00");

  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 text-center justify-center lg:py-14">
      <TimeBox value={timeLeft.days} label="Dagar" />
      <TimeBox value={timeLeft.hours} label="Timmar" />
      <TimeBox value={timeLeft.minutes} label="Minuter" />
      <TimeBox value={timeLeft.seconds} label="Sekunder" />
    </div>
  );
}

type TimeBoxProps = {
  value: number;
  label: string;
};

function TimeBox({ value, label }: TimeBoxProps) {
  return (
    <div className=" text-black  p-2 lg:p-4 lg:w-80  text-center w-full">
      <div className="text-2xl lg:text-5xl font-bold">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-sm text-zinc-500">{label}</div>
    </div>
  );
}