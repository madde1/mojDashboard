import { useEffect, useState } from "react";
import { FaFutbol } from "react-icons/fa";

type Match = {
  idEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  strHomeTeamBadge?: string;
  strAwayTeamBadge?: string;
  strTimestamp: string;
  strVenue?: string;
  strGroup?: string;
};

type WorldCupResponse = {
  mode: "today" | "next";
  matches: Match[];
};

export default function WorldCupWidget() {
  const [data, setData] =
    useState<WorldCupResponse | null>(
      null
    );

  async function fetchWorldCup() {
    try {
      const response =
        await fetch(
          "http://localhost:3001/api/worldcup"
        );

      const data =
        await response.json();

      setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchWorldCup();

    const interval =
      setInterval(
        fetchWorldCup,
        1000 * 60 * 15
      );

    return () =>
      clearInterval(interval);
  }, []);

  function formatDate(
    timestamp: string
  ) {
    return new Date(
      timestamp
    ).toLocaleDateString(
      "sv-SE",
      {
        day: "numeric",
        month: "short",
      }
    );
  }

  function formatTime(
    timestamp: string
  ) {
    return new Date(
      timestamp
    ).toLocaleTimeString(
      "sv-SE",
      {
        timeZone:
          "Europe/Stockholm",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  }

  if (!data) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-2xl">
        Loading World Cup...
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-2xl">

<div className="flex items-center justify-between">
    <div>
    <p className="text-sm text-[#7c9a92]">
         World Cup 2026
    </p>   
    <div className="text-2xl font-semibold  tracking-wide text-[#7c9a92]">
       {data.mode === "today"
            ? "Dagens matcher"
            : "Kommande matcher"}
    </div>
    </div>
    <div className="rounded-2xl bg-stone-100 p-3">
          <FaFutbol size={24} />
    </div>  
  </div>


      <div className="mt-4">

        <div className="space-y-3">
          {data.matches.map(
            (match) => (
              <div
                key={
                  match.idEvent
                }
                className="rounded-2xl bg-gray-100 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {match.strHomeTeamBadge && (
                      <img
                        src={
                          match.strHomeTeamBadge
                        }
                        alt=""
                        className="h-8 w-8"
                      />
                    )}

                    <span className="font-medium">
                      {
                        match.strHomeTeam
                      }
                    </span>
                  </div>

                  <span className="text-sm text-gray-500">
                    vs
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="font-medium">
                      {
                        match.strAwayTeam
                      }
                    </span>

                    {match.strAwayTeamBadge && (
                      <img
                        src={
                          match.strAwayTeamBadge
                        }
                        alt=""
                        className="h-8 w-8"
                      />
                    )}
                  </div>
                </div>

                <div className="mt-3 flex justify-between text-sm text-gray-500">
                  <span>
                    {formatDate(
                      match.strTimestamp
                    )}
                  </span>

                  <span>
                    {formatTime(
                      match.strTimestamp
                    )}
                  </span>
                </div>

                {match.strGroup && (
                  <div className="mt-2 text-xs text-gray-400">
                    Group{" "}
                    {
                      match.strGroup
                    }
                  </div>
                )}

                {match.strVenue && (
                  <div className="text-xs text-gray-400">
                    {
                      match.strVenue
                    }
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}