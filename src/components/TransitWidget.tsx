import {
  TramFront,
  Clock3,
} from "lucide-react";
import { useEffect, useState } from "react";

const lineColors: Record<string, string> = {
  "1": "bg-white text-black ring-1 ring-zinc-200",
  "7": "bg-amber-700 text-white",
  "8": "bg-purple-500 text-white",
};

type Departure = {
  line: string;
  destination: string;
  minutes: number;
};

export function TransitWidget() {
const [departures, setDepartures] =
  useState<Departure[]>([]);
  
  useEffect(() => {
  async function fetchDepartures() {
    const response = await fetch(
      "http://localhost:3001/departures"
    );

    const data = await response.json();

    const mappedDepartures =
      data.results.slice(0, 3).map(
        (departure: any) => ({
          line:
            departure.serviceJourney.line
              .shortName,

          destination:
            departure.serviceJourney.direction,

          minutes: Math.max(
            0,
            Math.round(
              (new Date(
                departure.estimatedTime
              ).getTime() -
                Date.now()) /
                60000
            )
          ),
        })
      );

    setDepartures(mappedDepartures);
  }

  fetchDepartures();
}, []);

  return (
    <section
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-sm
        ring-1
        ring-black/5
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#7c9a92]">
            Västtrafik
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#7c9a92]">
            Nymilsgatan
          </h2>
        </div>

        <div className="rounded-2xl bg-stone-100 p-3">
          <TramFront className="h-6 w-6 text-[#7c9a92]" />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {departures.map((departure) => (
          <div
            key={`${departure.line}-${departure.minutes}`}
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              bg-stone-50
              px-4
              py-3
            "
          >
            <div className="flex items-center gap-3">
              <div
                className={`
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          text-sm
          font-semibold
          ${
            lineColors[departure.line] ||
            "bg-[#7c9a92]"
          }
        `}
              >
                {departure.line}
              </div>

              <div>
                <p className="font-medium text-zinc-700">
                  {departure.destination}
                </p>

                <p className="text-sm text-zinc-400">
                  Spårvagn
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[#7c9a92]">
              <Clock3 className="h-4 w-4" />

              <span className="text-sm font-medium">
                {departure.minutes <= 1
  ? "Nu"
  : `${departure.minutes} min`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}