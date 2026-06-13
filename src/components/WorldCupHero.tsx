import { useEffect, useState } from "react";


type Match = {
  strHomeTeam: string;
  strAwayTeam: string;
  dateEvent: string;
  strTime: string;
};

export default function WorldCupHero() {
  const [matches, setMatches] =
    useState<Match[]>([]);

  useEffect(() => {
    fetchMatches();
  }, []);

  async function fetchMatches() {
    const response = await fetch(
     // "http://localhost:3001/api/worldcup"
      "https://moj-dashboard-red.vercel.app/api/worldcup"
    );

    const data = await response.json();

    setMatches(
      data.matches?.slice(0, 3) || []
    );
  }

  return (
    <div className=" flex flex-col md:flex-row justify-between md:items-center mt-6 md:mt-0">
        <div className="w-[70%]">
          

      <div className="grid gap-3 md:grid-cols-3 mt-2 ">
        {matches.map((match) => (
          <div
            key={`${match.strHomeTeam}-${match.strAwayTeam}`}
            className="rounded-2xl bg-white/10 text-white p-4 backdrop-blur"
          >
            <div className="font-bold">
              {match.strHomeTeam}
            </div>

            <div className="text-sm opacity-70">
              vs
            </div>

            <div className="font-bold">
              {match.strAwayTeam}
            </div>

            <div className="mt-3 text-sm opacity-80">
              {new Date(
                `${match.dateEvent}T${match.strTime}`
              ).toLocaleString("sv-SE", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
      </div>
</div>
      <div>
      <img src="./2026_FIFA_World_Cup_emblem.svg.webp" alt="FIFA World Cup" className="h-[150px] mt-4 md:mt-0 rounded-2xl bg-white/10 text-white p-4 backdrop-blur"/>
      </div>
    </div>
  );
}