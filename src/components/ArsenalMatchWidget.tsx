import { useEffect, useState } from "react";
import { FaFutbol } from "react-icons/fa";

type Match = {
  strHomeTeam: string;
  strAwayTeam: string;

  strHomeTeamBadge?: string;
  strAwayTeamBadge?: string;

  dateEvent: string;
  strTime: string;

  strLeague: string;

  intHomeScore?: string;
  intAwayScore?: string;

  strStatus?: string;
};

export default function ArsenalMatchWidget() {
    const [lastMatch, setLastMatch] =
  useState<any>(null);
  const [match, setMatch] =
    useState<Match | null>(null);

  const [loading, setLoading] =
    useState(true);

    

  async function fetchMatch() {
    try {
        const lastResponse = await fetch(
           // "http://localhost:3001/api/arsenal/last-match"
            "https://moj-dashboard-red.vercel.app/api/arsenal/last-match"
            );

            const lastData =
            await lastResponse.json();

            setLastMatch(lastData);
      const response = await fetch(
        //"http://localhost:3001/api/arsenal/match"
        "https://moj-dashboard-red.vercel.app/api/arsenal/match"
      );

      const data = await response.json();

      console.log(data);

      setMatch(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

useEffect(() => {
  fetchMatch();

  const interval = setInterval(() => {
    fetchMatch();
  }, 30000);

  return () => clearInterval(interval);
}, []);

  if (loading) {
    return (
      <div className="rounded-3xl  p-6 text-[#7c9a92]">
        Loading...
      </div>
    );
  }

  if (!match) {
    return (
      <div className="rounded-3xl  p-6 text-[#7c9a92]">
        No match found
      </div>
    );
  }

  const isLive =
    match.strStatus === "Live";

   const swedishDate = new Date(
  `${match.dateEvent}T${match.strTime}Z`
);

const formattedDate =
  swedishDate.toLocaleDateString(
    "sv-SE",
    {
      weekday: "short",
      day: "numeric",
      month: "short",
    }
  );

const formattedTime =
  swedishDate.toLocaleTimeString(
    "sv-SE",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );



  return (

<div className="overflow-hidden rounded-3xl bg-white p-6 text-[#7c9a92] shadow-2xl">
  <div className="flex items-center justify-between">
    <p className="text-sm text-[#7c9a92]">
      {lastMatch.strLeague}
    </p>   
    <div className="rounded-2xl bg-stone-100 p-3">
          <FaFutbol size={24} />
    </div>  
  </div>
        
  <div className="mt-2 mb-4 border-b-1 border-[#7c9a92]/20 pb-4" >
    <div className="text-2xl font-semibold  tracking-wide text-[#7c9a92]">
      Senaste matchen
    </div>

    <div className="mt-2 flex items-center justify-between">
      <div>
       
        <div className="font-semibold">
          {
            lastMatch.strHomeTeam
          }{" "}
          vs{" "}
          {
            lastMatch.strAwayTeam
          }
        </div>

        <div className="text-sm text-zinc-400">
          {lastMatch.dateEvent}
        </div>
      </div>

      <div className="text-2xl font-black">
        {
          lastMatch.intHomeScore
        }
        {" - "}
        {
          lastMatch.intAwayScore
        }
      </div>
    </div>
  </div>


      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
            
           <p className="text-sm text-[#7c9a92]">
            {match.strLeague}
          </p>
          <h2 className="text-2xl font-bold mt-2">
            {isLive
              ? "Live match"
              : "Nästa match"}
          </h2>

        
        </div>

        {isLive && (
          <div className="flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1 text-sm text-red-400">
            <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            LIVE
          </div>
        )}
      </div>
      {/* MATCH */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* HOME */}
        <div className="flex flex-col items-center gap-3 text-center">
          {match.strHomeTeamBadge && (
            <img
              src={match.strHomeTeamBadge}
              alt={match.strHomeTeam}
              className="h-20 w-20 object-contain"
            />
          )}

          <h3 className="text-lg font-semibold">
            {match.strHomeTeam}
          </h3>
        </div>

        {/* SCORE */}
        <div className="text-center">
          <div className="text-5xl font-black tracking-tight">
            {match.intHomeScore ?? "-"}

            <span className="mx-2 text-zinc-500">
              :
            </span>

            {match.intAwayScore ?? "-"}
          </div>

          {!isLive && (
            <div className="mt-4 flex flex-col items-center justify-center gap-1 text-sm text-zinc-400">
             <p> {formattedDate}{" "}</p>
             <p> {formattedTime}</p>
            </div>
          )}
        </div>

        {/* AWAY */}
        <div className="flex flex-col items-center gap-3 text-center">
          {match.strAwayTeamBadge && (
            <img
              src={match.strAwayTeamBadge}
              alt={match.strAwayTeam}
              className="h-20 w-20 object-contain"
            />
          )}

          <h3 className="text-lg font-semibold">
            {match.strAwayTeam}
          </h3>
        </div>
      </div>
    </div>
  );
}